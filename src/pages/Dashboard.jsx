import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { Ticket, CheckCircle, Clock, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getIssueStats, getMyOpenIssues, getMyAssignedIssues } from '../services/redmineApi'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const PRIORITY_COLORS = {
  'Urgente': '#ef4444',
  'Alta': '#f97316',
  'Normal': '#eab308',
  'Baixa': '#22c55e',
}

const STATUS_COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#ec4899']

function StatCard({ icon: Icon, label, value, color, to }) {
  const content = (
    <div className={`card p-5 flex items-center gap-4 ${to ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}

export default function Dashboard() {
  const { credentials, user } = useAuth()

  const { data: stats } = useQuery({
    queryKey: ['stats', credentials?.username],
    queryFn: () => getIssueStats(credentials),
    enabled: !!credentials,
  })

  const { data: openData } = useQuery({
    queryKey: ['open-issues', credentials?.username],
    queryFn: () => getMyOpenIssues(credentials, 0, 25),
    enabled: !!credentials,
  })

  const { data: assignedData } = useQuery({
    queryKey: ['assigned-issues', credentials?.username],
    queryFn: () => getMyAssignedIssues(credentials, 0, 10),
    enabled: !!credentials,
  })

  const issues = openData?.issues || []
  const assignedIssues = assignedData?.issues || []

  // Group by priority for pie chart
  const byPriority = issues.reduce((acc, i) => {
    const p = i.priority?.name || 'Normal'
    acc[p] = (acc[p] || 0) + 1
    return acc
  }, {})
  const priorityData = Object.entries(byPriority).map(([name, value]) => ({ name, value }))

  // Group by subject/category for bar chart
  const byCategory = issues.reduce((acc, i) => {
    const s = i.subject || 'Sem categoria'
    // Normaliza para title case curto — pega até a primeira vírgula ou parêntese
    const label = s.split(/[,(]/)[0].trim()
    acc[label] = (acc[label] || 0) + 1
    return acc
  }, {})
  const categoryData = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  const urgentCount = issues.filter(i => i.priority?.name === 'Urgente').length

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Olá, {user?.firstname}! 👋
        </h2>
        <p className="text-gray-500 text-sm mt-0.5">Aqui está o resumo dos seus chamados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={Ticket} label="Abertos por mim" value={stats?.total_open} color="bg-somave-red" to="/chamados" />
        <StatCard icon={CheckCircle} label="Fechados por mim" value={stats?.total_closed} color="bg-green-600" />
        <StatCard icon={UserCheck} label="Atribuídos a mim" value={stats?.total_assigned} color="bg-somave-orange" />
        <StatCard icon={AlertTriangle} label="Urgentes abertos" value={urgentCount} color="bg-somave-red-dark" />
        <StatCard icon={Clock} label="Total geral" value={(stats?.total_open || 0) + (stats?.total_closed || 0)} color="bg-gray-500" />
      </div>

      {/* Charts */}
      {issues.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Priority Pie */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Chamados por Prioridade</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={priorityData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                  {priorityData.map((entry, i) => (
                    <Cell key={i} fill={PRIORITY_COLORS[entry.name] || STATUS_COLORS[i % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Bar */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Chamados por Categoria</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#c62828" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent tickets opened by me */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Chamados Abertos por Mim</h3>
          <Link to="/chamados" className="text-sm text-somave-red hover:underline flex items-center gap-1">
            Ver todos <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {issues.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Ticket className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p>Nenhum chamado aberto</p>
            <Link to="/novo" className="text-somave-red text-sm hover:underline mt-1 inline-block">
              Abrir primeiro chamado
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {issues.slice(0, 5).map(issue => (
              <IssueRow key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>

      {/* Assigned to me */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-500" />
            <h3 className="font-semibold text-gray-800">Chamados Atribuídos a Mim</h3>
            {stats?.total_assigned > 0 && (
              <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {stats.total_assigned}
              </span>
            )}
          </div>
        </div>
        {assignedIssues.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p>Nenhum chamado atribuído a você</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {assignedIssues.map(issue => (
              <IssueRow key={issue.id} issue={issue} showAuthor />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PriorityBadge({ name }) {
  const map = {
    'Urgente': 'badge-urgente',
    'Alta': 'badge-alta',
    'Normal': 'badge-media',
    'Baixa': 'badge-baixa',
  }
  return <span className={map[name] || 'badge-media'}>{name || 'Normal'}</span>
}

function IssueRow({ issue, showAuthor }) {
  return (
    <Link
      to={`/chamados/${issue.id}`}
      className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs text-gray-400 font-mono">#{issue.id}</span>
          <PriorityBadge name={issue.priority?.name} />
        </div>
        <p className="text-sm font-medium text-gray-800 truncate">{issue.subject}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {issue.project?.name}
          {showAuthor && issue.author?.name && ` · por ${issue.author.name}`}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-gray-400">
          {format(parseISO(issue.updated_on), "dd/MM", { locale: ptBR })}
        </p>
      </div>
    </Link>
  )
}
