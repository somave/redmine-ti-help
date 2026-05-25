import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusCircle, Paperclip, X, CheckCircle, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { createIssue, uploadFile, getProjects, getTrackers } from '../services/redmineApi'
import { getCategoriesForTracker, PRIORITY_OPTIONS } from '../data/ticketTitles'

const EXCLUDED_PROJECTS = ['marketing', 'p&d', 'pesquisa']
const ALLOWED_TRACKER_IDS = [1, 2, 3, 4]

export default function NewTicket() {
  const { credentials } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    project_id: '',
    tracker_id: '3',
    subject: '',
    customSubject: false,
    description: '',
    priority_id: '4',
  })
  const [files, setFiles] = useState([])
  const [success, setSuccess] = useState(false)
  const [createdId, setCreatedId] = useState(null)
  const [subjectQuery, setSubjectQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const { data: projectsData } = useQuery({
    queryKey: ['projects', credentials?.username],
    queryFn: () => getProjects(credentials),
    enabled: !!credentials,
    staleTime: 300000,
  })

  const { data: trackersData } = useQuery({
    queryKey: ['trackers', credentials?.username],
    queryFn: () => getTrackers(credentials),
    enabled: !!credentials,
    staleTime: 300000,
  })

  const projects = (projectsData?.projects || []).filter(
    p => !EXCLUDED_PROJECTS.some(ex => p.name.toLowerCase().includes(ex))
  )
  const trackers = (trackersData?.trackers || []).filter(t => ALLOWED_TRACKER_IDS.includes(t.id))

  const trackerCategories = getCategoriesForTracker(parseInt(form.tracker_id))
    .slice()
    .sort((a, b) => (b.freq || 0) - (a.freq || 0))
  const filteredTitles = subjectQuery.length > 1
    ? trackerCategories.filter(t => t.label.toLowerCase().includes(subjectQuery.toLowerCase()))
    : trackerCategories

  const mutation = useMutation({
    mutationFn: async (data) => {
      let uploads = []
      for (const file of files) {
        const res = await uploadFile(credentials, file)
        uploads.push({ token: res.upload.token, filename: file.name, content_type: file.type })
      }
      return createIssue(credentials, { ...data, uploads })
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['my-open'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      setCreatedId(res.issue.id)
      setSuccess(true)
    },
  })

  function handleFileAdd(e) {
    const newFiles = Array.from(e.target.files || [])
    const valid = newFiles.filter(f => f.size <= 10 * 1024 * 1024)
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name))
      return [...prev, ...valid.filter(f => !names.has(f.name))]
    })
    e.target.value = ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = form.customSubject ? subjectQuery : form.subject
    if (!subject || !form.project_id || !form.description) return
    mutation.mutate({
      project_id: parseInt(form.project_id),
      tracker_id: parseInt(form.tracker_id),
      subject,
      description: form.description,
      priority_id: parseInt(form.priority_id),
    })
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto card p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Chamado aberto com sucesso!</h2>
        <p className="text-gray-500 mb-6">Chamado <span className="font-bold text-somave-red">#{createdId}</span> foi criado.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate(`/chamados/${createdId}`)} className="btn-primary">
            Ver chamado
          </button>
          <button onClick={() => { setSuccess(false); setForm({ project_id: '', tracker_id: '3', subject: '', customSubject: false, description: '', priority_id: '4' }); setFiles([]); setSubjectQuery('') }} className="btn-secondary">
            Novo chamado
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-somave-red" />
          Abrir Novo Chamado
        </h2>

        {mutation.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {mutation.error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa / Unidade *</label>
            <select
              value={form.project_id}
              onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))}
              className="input"
              required
            >
              <option value="">Selecione uma empresa...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          {/* Tracker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de chamado *</label>
            <select
              value={form.tracker_id}
              onChange={e => {
                setForm(f => ({ ...f, tracker_id: e.target.value, subject: '', customSubject: false }))
                setSubjectQuery('')
              }}
              className="input"
              required
            >
              <option value="">Selecione o tipo...</option>
              {trackers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          {/* Subject with autocomplete */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria do chamado *</label>
            <div className="relative">
              <input
                type="text"
                value={subjectQuery}
                onChange={e => {
                  setSubjectQuery(e.target.value)
                  setForm(f => ({ ...f, subject: e.target.value, customSubject: true }))
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Digite para buscar ou selecione uma categoria..."
                className="input pr-8"
                required
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              {showSuggestions && filteredTitles.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 mt-1 max-h-64 overflow-y-auto">
                  {!subjectQuery && (
                    <p className="px-3 py-2 text-xs text-gray-400 font-medium border-b">Mais frequentes</p>
                  )}
                  {filteredTitles.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onMouseDown={() => {
                        setSubjectQuery(t.label)
                        setForm(f => ({ ...f, subject: t.value, customSubject: false }))
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-3 py-2.5 hover:bg-orange-50 text-sm text-gray-800 flex items-center justify-between border-b border-gray-50 last:border-0"
                    >
                      <span>{t.label}</span>
                      {t.freq > 0 && <span className="text-xs text-gray-400 shrink-0 ml-2">{t.freq}×</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {form.customSubject && subjectQuery && (
              <p className="text-xs text-amber-600 mt-1">
                Título personalizado — use as categorias sugeridas quando possível para melhor triagem.
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <div className="flex gap-2">
              {PRIORITY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, priority_id: opt.value }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                    form.priority_id === opt.value
                      ? opt.value === '7' ? 'bg-red-500 text-white border-red-500'
                        : opt.value === '6' ? 'bg-orange-500 text-white border-orange-500'
                        : opt.value === '4' ? 'bg-yellow-500 text-white border-yellow-500'
                        : 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Descreva o problema com detalhes: o que estava fazendo, mensagem de erro (se houver), ID do AnyDesk para acesso remoto, etc."
              className="input resize-none"
              rows={5}
              required
              minLength={10}
            />
            <p className="text-xs text-gray-400 mt-1">{form.description.length} caracteres (mínimo 10)</p>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Anexos (opcional)</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-somave-orange hover:bg-orange-50 transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-400 mx-auto mb-1" />
              <p className="text-sm text-gray-500">Clique para anexar arquivos (máx. 10MB cada)</p>
            </div>
            <input ref={fileRef} type="file" multiple onChange={handleFileAdd} className="hidden" />
            {files.length > 0 && (
              <ul className="mt-2 space-y-1">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between text-sm bg-gray-50 rounded px-3 py-1.5">
                    <span className="truncate text-gray-700">{f.name}</span>
                    <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500 ml-2">
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="flex-1 py-3 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700">
              {mutation.isPending ? 'Abrindo chamado...' : 'Abrir Chamado'}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 rounded-lg font-medium text-white transition-colors bg-somave-red hover:bg-somave-red-dark">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
