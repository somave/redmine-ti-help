import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, MessageSquare, Paperclip, Clock, User, Tag, Send, CheckCircle, CheckCircle2, XCircle, RefreshCw, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getIssue, addComment } from '../services/redmineApi'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const PRIORITY_BADGE = {
  'Urgente': 'badge-urgente',
  'Alta': 'badge-alta',
  'Normal': 'badge-media',
  'Baixa': 'badge-baixa',
}

export default function TicketDetail() {
  const { id } = useParams()
  const { credentials } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [comment, setComment] = useState('')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['issue', id, credentials?.username],
    queryFn: () => getIssue(credentials, id),
    enabled: !!credentials && !!id,
  })

  const commentMutation = useMutation({
    mutationFn: () => addComment(credentials, id, comment),
    onSuccess: () => {
      setComment('')
      refetch()
      queryClient.invalidateQueries({ queryKey: ['my-open'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
    },
  })

  const finalizeMutation = useMutation({
    mutationFn: () => addComment(
      credentials, id,
      comment.trim() || 'Problema resolvido. Chamado finalizado pelo usuário.',
      3
    ),
    onSuccess: () => {
      setComment('')
      refetch()
      queryClient.invalidateQueries({ queryKey: ['my-open'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: () => addComment(
      credentials, id,
      comment.trim() || 'Solução não resolveu o problema. Chamado rejeitado pelo usuário.',
      6
    ),
    onSuccess: () => {
      setComment('')
      refetch()
      queryClient.invalidateQueries({ queryKey: ['my-open'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        Carregando chamado...
      </div>
    )
  }

  const issue = data?.issue
  if (!issue) return (
    <div className="text-center py-12 text-gray-400">Chamado não encontrado</div>
  )

  const journals = (issue.journals || []).filter(j => j.notes || j.details?.length > 0)
  const isClosed = ['Resolvida', 'Retirada', 'Fechado por Falta de Resposta', 'Pausado'].includes(issue.status?.name)
  const isWaitingUser = issue.status?.name === 'Aguardando usuário'

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Header card */}
      <div className="card p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm font-mono text-gray-400">#{issue.id}</span>
              <span className={PRIORITY_BADGE[issue.priority?.name] || 'badge-media'}>{issue.priority?.name}</span>
              <StatusBadge status={issue.status?.name} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">{issue.subject}</h2>
          </div>
          <button onClick={() => refetch()} className="text-gray-400 hover:text-gray-600 shrink-0">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
          <MetaItem icon={Tag} label="Projeto" value={issue.project?.name} />
          <MetaItem icon={User} label="Autor" value={issue.author?.name} />
          <MetaItem icon={Clock} label="Criado em" value={format(parseISO(issue.created_on), "dd/MM/yyyy HH:mm", { locale: ptBR })} />
          <MetaItem icon={Clock} label="Atualizado" value={format(parseISO(issue.updated_on), "dd/MM/yyyy HH:mm", { locale: ptBR })} />
          {issue.assigned_to && <MetaItem icon={User} label="Responsável" value={issue.assigned_to.name} />}
        </div>
      </div>

      {/* Description */}
      {issue.description && (
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide text-gray-500">Descrição</h3>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
            {issue.description}
          </div>
        </div>
      )}

      {/* Attachments */}
      {issue.attachments?.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
            <Paperclip className="w-4 h-4" />
            Anexos ({issue.attachments.length})
          </h3>
          <div className="space-y-1">
            {issue.attachments.map(att => (
              <a
                key={att.id}
                href={att.content_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-somave-red hover:underline py-1"
              >
                <Paperclip className="w-3.5 h-3.5 shrink-0" />
                {att.filename}
                <span className="text-gray-400 text-xs">({(att.filesize / 1024).toFixed(1)} KB)</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {journals.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Histórico ({journals.length})
          </h3>
          <div className="space-y-4">
            {journals.map(j => (
              <div key={j.id} className="relative pl-4 border-l-2 border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-somave-orange" />
                  <span className="text-sm font-medium text-gray-800">{j.user?.name}</span>
                  <span className="text-xs text-gray-400">
                    {format(parseISO(j.created_on), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </span>
                </div>
                {j.details?.map((d, i) => (
                  <p key={i} className="text-xs text-gray-500 italic mb-0.5">
                    {describeChange(d)}
                  </p>
                ))}
                {j.notes && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-1.5 text-sm text-gray-700 whitespace-pre-wrap">
                    {j.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add comment */}
      {!isClosed && (
        <div className="card p-5">
          {isWaitingUser && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                O T.I. está aguardando seu retorno. Confirme se o problema foi resolvido ou rejeite caso a solução não tenha funcionado.
              </p>
            </div>
          )}

          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            {isWaitingUser ? 'Comentário (opcional)' : 'Adicionar Comentário'}
          </h3>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={isWaitingUser
              ? 'Descreva o que aconteceu — o problema foi resolvido? Ainda persiste? Detalhe aqui.'
              : 'Descreva a atualização do chamado, informações adicionais, ID do AnyDesk, etc.'}
            className="input resize-none"
            rows={4}
          />

          {(commentMutation.error || finalizeMutation.error || rejectMutation.error) && (
            <p className="text-sm text-red-600 mt-2">
              {(commentMutation.error || finalizeMutation.error || rejectMutation.error)?.message}
            </p>
          )}
          {commentMutation.isSuccess && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Comentário adicionado!
            </p>
          )}

          {isWaitingUser ? (
            <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => rejectMutation.mutate()}
                disabled={rejectMutation.isPending || finalizeMutation.isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-white transition-colors disabled:opacity-50 bg-red-600 hover:bg-red-700"
              >
                <XCircle className="w-4 h-4" />
                {rejectMutation.isPending ? 'Rejeitando...' : 'Rejeitar — Problema não resolvido'}
              </button>
              <button
                onClick={() => finalizeMutation.mutate()}
                disabled={finalizeMutation.isPending || rejectMutation.isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-white transition-colors disabled:opacity-50 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4" />
                {finalizeMutation.isPending ? 'Finalizando...' : 'Confirmar — Problema resolvido'}
              </button>
            </div>
          ) : (
            <div className="flex justify-end mt-3">
              <button
                onClick={() => commentMutation.mutate()}
                disabled={!comment.trim() || commentMutation.isPending}
                className="btn-green flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {commentMutation.isPending ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          )}
        </div>
      )}

      {isClosed && (
        <div className="card p-4 bg-gray-50 text-center text-sm text-gray-500">
          <CheckCircle className="w-5 h-5 mx-auto mb-1 text-gray-400" />
          Este chamado está fechado
        </div>
      )}
    </div>
  )
}

function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-gray-700 font-medium">{value || '—'}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    'Nova':                        'bg-blue-50 text-blue-700',
    'Em andamento':                'bg-orange-50 text-orange-700',
    'Em análise':                  'bg-orange-50 text-orange-700',
    'Aguardando usuário':          'bg-amber-100 text-amber-800',
    'Resolvida':                   'bg-green-100 text-green-700',
    'Rejeitada':                   'bg-red-100 text-red-700',
    'Retirada':                    'bg-gray-100 text-gray-600',
    'Pausado':                     'bg-gray-100 text-gray-600',
    'Fechado por Falta de Resposta': 'bg-gray-100 text-gray-600',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

function describeChange(detail) {
  const labels = {
    'status_id': 'Status',
    'priority_id': 'Prioridade',
    'assigned_to_id': 'Responsável',
    'subject': 'Título',
    'description': 'Descrição',
  }
  const field = labels[detail.property === 'attr' ? detail.name : detail.property] || detail.name
  if (detail.old_value && detail.new_value) return `${field}: "${detail.old_value}" → "${detail.new_value}"`
  if (detail.new_value) return `${field} definido como "${detail.new_value}"`
  return `${field} alterado`
}
