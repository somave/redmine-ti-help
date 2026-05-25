import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Ticket, Search, Filter, RefreshCw, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getMyOpenIssues, getMyClosedIssues } from '../services/redmineApi'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const PRIORITY_BADGE = {
  'Urgente': 'badge-urgente',
  'Alta': 'badge-alta',
  'Normal': 'badge-media',
  'Baixa': 'badge-baixa',
}

const STATUS_BADGE = {
  'Em andamento': 'badge-aberto',
  'Novo': 'badge-aberto',
  'Resolvido': 'bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full',
  'Fechado': 'badge-fechado',
  'Fechado por Falta de Resposta': 'badge-fechado',
}

function TicketRow({ issue }) {
  return (
    <Link
      to={`/chamados/${issue.id}`}
      className="flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <span className="text-xs text-gray-400 font-mono shrink-0">#{issue.id}</span>
          <span className={PRIORITY_BADGE[issue.priority?.name] || 'badge-media'}>
            {issue.priority?.name}
          </span>
          <span className={STATUS_BADGE[issue.status?.name] || 'badge-aberto'}>
            {issue.status?.name}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-800 truncate">{issue.subject}</p>
        <p className="text-xs text-gray-400 mt-0.5">{issue.project?.name}</p>
      </div>
      <div className="text-right shrink-0 text-xs text-gray-400 pt-0.5">
        <p>{format(parseISO(issue.updated_on), "dd/MM/yy HH:mm", { locale: ptBR })}</p>
      </div>
    </Link>
  )
}

export default function MyTickets() {
  const { credentials } = useAuth()
  const [tab, setTab] = useState('open')
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('')

  const { data: openData, isFetching: loadingOpen, refetch: refetchOpen } = useQuery({
    queryKey: ['my-open', credentials?.username],
    queryFn: () => getMyOpenIssues(credentials, 0, 100),
    enabled: !!credentials,
  })

  const { data: closedData, isFetching: loadingClosed, refetch: refetchClosed } = useQuery({
    queryKey: ['my-closed', credentials?.username],
    queryFn: () => getMyClosedIssues(credentials, 0, 100),
    enabled: !!credentials,
    staleTime: 60000,
  })

  const allOpen = openData?.issues || []
  const allClosed = closedData?.issues || []
  const current = tab === 'open' ? allOpen : allClosed

  const filtered = current.filter(i => {
    const matchSearch = !search || i.subject.toLowerCase().includes(search.toLowerCase()) || String(i.id).includes(search)
    const matchPriority = !priority || i.priority?.name === priority
    return matchSearch && matchPriority
  })

  const isLoading = tab === 'open' ? loadingOpen : loadingClosed
  const refetch = tab === 'open' ? refetchOpen : refetchClosed

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Tabs */}
      <div className="card">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setTab('open')}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === 'open'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Abertos ({allOpen.length})
          </button>
          <button
            onClick={() => setTab('closed')}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === 'closed'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Fechados ({allClosed.length})
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-3 border-b border-gray-50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título ou nº..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-9 text-sm py-1.5"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="input pl-8 text-sm py-1.5 pr-3 w-36"
            >
              <option value="">Prioridade</option>
              {['Urgente', 'Alta', 'Normal', 'Baixa'].map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => refetch()}
            className="btn-secondary py-1.5 px-3 flex items-center gap-1"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">
            <RefreshCw className="w-6 h-6 mx-auto animate-spin mb-2" />
            Carregando...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Ticket className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">
              {search || priority ? 'Nenhum chamado encontrado com esses filtros' : `Nenhum chamado ${tab === 'open' ? 'aberto' : 'fechado'}`}
            </p>
          </div>
        ) : (
          <div>
            {filtered.map(issue => <TicketRow key={issue.id} issue={issue} />)}
          </div>
        )}
      </div>
    </div>
  )
}
