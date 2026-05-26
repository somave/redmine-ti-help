import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogIn, LayoutDashboard, PlusCircle, Ticket, MessageSquare,
  BookOpen, Bell, ChevronDown, ChevronUp, AlertCircle, CheckCircle2,
  Search, Paperclip, Tag, Clock, ArrowRight
} from 'lucide-react'

const sections = [
  {
    id: 'login',
    icon: LogIn,
    title: '1. Como fazer login',
    color: '#c62828',
    steps: [
      {
        step: 1,
        title: 'Acesse o sistema',
        desc: 'Abra o navegador e acesse o endereço do T.I. Chamados. A tela de login será exibida automaticamente.',
      },
      {
        step: 2,
        title: 'Informe seu usuário',
        desc: 'Digite seu nome de usuário da rede Somave (o mesmo que você usa no computador ou no e-mail corporativo).',
      },
      {
        step: 3,
        title: 'Informe sua senha',
        desc: 'Digite sua senha. Caso não saiba sua senha, entre em contato com o T.I. para redefinição.',
      },
      {
        step: 4,
        title: 'Clique em "Entrar"',
        desc: 'Após clicar em "Entrar", você será redirecionado para o Dashboard principal do sistema.',
      },
    ],
    tip: 'Seu acesso é vinculado ao seu usuário do Redmine. Se tiver dificuldade, chame o T.I. pelo ramal ou WhatsApp.',
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: '2. Dashboard (Página inicial)',
    color: '#1565c0',
    steps: [
      {
        step: 1,
        title: 'Resumo dos seus chamados',
        desc: 'Ao entrar, você vê cartões com a contagem de chamados abertos, em andamento e fechados. Clique em qualquer cartão para ir direto à lista filtrada.',
      },
      {
        step: 2,
        title: 'Chamados recentes',
        desc: 'Abaixo dos cartões aparece uma lista dos seus chamados mais recentes com status colorido: verde = resolvido, amarelo = em andamento, cinza = novo.',
      },
      {
        step: 3,
        title: 'Acesso rápido',
        desc: 'Use o botão "Novo Chamado" no canto superior direito (em computadores) para abrir um chamado sem precisar ir ao menu lateral.',
      },
    ],
    tip: null,
  },
  {
    id: 'novo',
    icon: PlusCircle,
    title: '3. Abrir um novo chamado',
    color: '#2e7d32',
    steps: [
      {
        step: 1,
        title: 'Acesse "Novo Chamado"',
        desc: 'Clique em "Novo Chamado" no menu lateral esquerdo ou no botão do cabeçalho.',
      },
      {
        step: 2,
        title: 'Selecione o tipo',
        desc: 'Escolha o tipo que melhor descreve sua situação: Incidente (algo parou de funcionar), Requisição (pedido de serviço), Mudança (alteração em sistema) ou Interna (uso exclusivo do T.I.).',
      },
      {
        step: 3,
        title: 'Escolha o título',
        desc: 'Selecione o título que mais se encaixa no seu problema. Os títulos são organizados por categoria e foram criados com base nos chamados mais comuns da Somave.',
      },
      {
        step: 4,
        title: 'Defina a prioridade',
        desc: 'Selecione a prioridade: Urgente (sistema parado, impacto crítico), Alta (impacto alto mas há alternativa), Normal (padrão para a maioria), Baixa (sem urgência).',
      },
      {
        step: 5,
        title: 'Descreva o problema',
        desc: 'No campo de descrição, explique o problema com detalhes: o que aconteceu, quando começou, se outros colegas foram afetados. Quanto mais detalhes, mais rápido o T.I. resolve.',
      },
      {
        step: 6,
        title: 'Anexe arquivos (opcional)',
        desc: 'Se tiver uma captura de tela (print) ou arquivo relacionado ao problema, clique no ícone de clipe para anexar. Imagens ajudam muito no diagnóstico.',
      },
      {
        step: 7,
        title: 'Envie o chamado',
        desc: 'Clique em "Abrir Chamado". Você receberá uma confirmação e o chamado aparecerá em "Meus Chamados".',
      },
    ],
    tip: 'Dica de ouro: um título bem escolhido + uma descrição clara = chamado resolvido muito mais rápido. Evite títulos como "não está funcionando" sem detalhar o quê.',
  },
  {
    id: 'chamados',
    icon: Ticket,
    title: '4. Acompanhar meus chamados',
    color: '#6a1b9a',
    steps: [
      {
        step: 1,
        title: 'Acesse "Meus Chamados"',
        desc: 'Clique em "Meus Chamados" no menu lateral para ver todos os chamados que você já abriu.',
      },
      {
        step: 2,
        title: 'Filtre por status',
        desc: 'Use as abas no topo da lista para alternar entre chamados "Abertos" (em andamento) e "Fechados" (resolvidos).',
      },
      {
        step: 3,
        title: 'Entenda os status',
        desc: 'Novo: chamado recebido, ainda não analisado. Em andamento: o T.I. está trabalhando. Aguardando: precisa de retorno seu. Resolvido/Fechado: problema solucionado.',
      },
      {
        step: 4,
        title: 'Clique para ver detalhes',
        desc: 'Clique em qualquer chamado da lista para abrir a tela de detalhes, onde você vê todo o histórico e pode comentar.',
      },
    ],
    tip: null,
  },
  {
    id: 'detalhe',
    icon: MessageSquare,
    title: '5. Ver detalhes e comentar',
    color: '#e65100',
    steps: [
      {
        step: 1,
        title: 'Veja o histórico completo',
        desc: 'Na tela de detalhes do chamado você verá: a descrição original, todos os comentários trocados com o T.I., a data de cada atualização e o status atual.',
      },
      {
        step: 2,
        title: 'Adicione um comentário',
        desc: 'No campo "Adicionar comentário", escreva qualquer informação nova que surgiu, resposta a uma pergunta do T.I., ou atualização sobre o problema.',
      },
      {
        step: 3,
        title: 'Envie o comentário',
        desc: 'Clique em "Enviar Comentário". Sua mensagem ficará registrada no histórico e o T.I. será notificado.',
      },
      {
        step: 4,
        title: 'Anexe arquivos ao comentário (opcional)',
        desc: 'Assim como na abertura do chamado, você pode anexar imagens ou arquivos ao responder um comentário.',
      },
    ],
    tip: 'Se o T.I. marcar seu chamado como "Aguardando", é sinal de que precisam de mais informações suas. Responda pelo sistema para agilizar a resolução.',
  },
  {
    id: 'faq',
    icon: BookOpen,
    title: '6. Base de Conhecimento',
    color: '#00695c',
    steps: [
      {
        step: 1,
        title: 'Acesse a Base de Conhecimento',
        desc: 'Clique em "Base de Conhecimento" no menu lateral. Aqui você encontra respostas para os problemas mais comuns sem precisar abrir um chamado.',
      },
      {
        step: 2,
        title: 'Pesquise por palavra-chave',
        desc: 'Use a barra de pesquisa no topo para encontrar rapidamente o que precisa. Digite palavras como "impressora", "senha", "VPN", "e-mail" etc.',
      },
      {
        step: 3,
        title: 'Navegue por categorias',
        desc: 'Se preferir, clique nas categorias (Acesso e Login, Erros em Sistema, Impressoras, E-mail, Equipamentos, Internet) para filtrar os artigos.',
      },
      {
        step: 4,
        title: 'Expanda a resposta',
        desc: 'Clique em qualquer pergunta para expandir e ver a resposta completa com o passo a passo de solução.',
      },
      {
        step: 5,
        title: 'Abra um chamado se necessário',
        desc: 'Se a solução da Base de Conhecimento não resolver, cada artigo tem um botão para abrir um chamado diretamente.',
      },
    ],
    tip: 'Consulte sempre a Base de Conhecimento antes de abrir um chamado. Muitos problemas comuns (reset de senha, configuração de impressora, VPN) têm solução documentada.',
  },
  {
    id: 'notificacoes',
    icon: Bell,
    title: '7. Notificações',
    color: '#f57f17',
    steps: [
      {
        step: 1,
        title: 'O sino de notificações',
        desc: 'No canto superior direito do cabeçalho há um ícone de sino. Quando há atualizações nos seus chamados, um número vermelho aparece sobre ele.',
      },
      {
        step: 2,
        title: 'Veja as notificações',
        desc: 'Clique no sino para abrir o painel de notificações, que lista os chamados atualizados recentemente com a data e hora da última mudança.',
      },
      {
        step: 3,
        title: 'Navegue para o chamado',
        desc: 'Clique em qualquer notificação para ir diretamente à tela de detalhes daquele chamado.',
      },
      {
        step: 4,
        title: 'Marque como lido',
        desc: 'Use o botão "Limpar tudo" para descartar todas as notificações após lê-las.',
      },
    ],
    tip: 'O sistema verifica automaticamente por atualizações a cada 60 segundos enquanto você estiver com o sistema aberto.',
  },
]

function Section({ section }) {
  const [open, setOpen] = useState(false)
  const Icon = section.icon

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: section.color + '18' }}
        >
          <Icon className="w-5 h-5" style={{ color: section.color }} />
        </div>
        <span className="flex-1 font-semibold text-gray-800 text-base">{section.title}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
          : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        }
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <ol className="mt-5 space-y-4">
            {section.steps.map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: section.color }}
                >
                  {step}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{title}</p>
                  <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {section.tip && (
            <div className="mt-5 flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">{section.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Manual() {
  const navigate = useNavigate()
  const [allOpen, setAllOpen] = useState(false)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Hero */}
      <div
        className="rounded-2xl p-6 md:p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manual do Usuário</h1>
            <p className="text-red-100 mt-1 text-sm leading-relaxed">
              Guia completo do sistema T.I. Chamados — aprenda a abrir, acompanhar e resolver chamados de suporte.
            </p>
          </div>
          <BookOpen className="w-10 h-10 text-red-300 shrink-0 hidden sm:block" />
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: LogIn, label: 'Login' },
            { icon: PlusCircle, label: 'Novo Chamado' },
            { icon: Ticket, label: 'Acompanhar' },
            { icon: Bell, label: 'Notificações' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <Icon className="w-4 h-4 text-red-200 shrink-0" />
              <span className="text-xs text-red-100 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guia rápido */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <h2 className="font-semibold text-gray-800">Guia rápido — o fluxo completo</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          {['Faça login', 'Consulte a Base de Conhecimento', 'Abra um chamado se necessário', 'Acompanhe o status', 'Responda comentários do T.I.', 'Chamado resolvido!'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-2">
              <span className="bg-gray-100 rounded-full px-3 py-1">{item}</span>
              {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />}
            </span>
          ))}
        </div>
      </div>

      {/* Controle expandir todos */}
      <div className="flex justify-end">
        <button
          onClick={() => setAllOpen(o => !o)}
          className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
        >
          {allOpen ? 'Recolher tudo' : 'Expandir tudo'}
        </button>
      </div>

      {/* Seções */}
      <div className="space-y-3">
        {sections.map(section => (
          <ExpandableSection key={section.id} section={section} forceOpen={allOpen} />
        ))}
      </div>

      {/* Rodapé */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center space-y-3">
        <p className="text-sm text-gray-600">
          Ainda com dúvidas? Abra um chamado ou consulte a Base de Conhecimento.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/faq')}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Base de Conhecimento
          </button>
          <button
            onClick={() => navigate('/novo')}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: '#c62828' }}
          >
            <PlusCircle className="w-4 h-4" />
            Abrir um Chamado
          </button>
        </div>
      </div>
    </div>
  )
}

function ExpandableSection({ section, forceOpen }) {
  const [localOpen, setLocalOpen] = useState(false)
  const open = forceOpen || localOpen
  const Icon = section.icon

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setLocalOpen(o => !o)}
        className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: section.color + '18' }}
        >
          <Icon className="w-5 h-5" style={{ color: section.color }} />
        </div>
        <span className="flex-1 font-semibold text-gray-800 text-base">{section.title}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
          : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        }
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <ol className="mt-5 space-y-4">
            {section.steps.map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: section.color }}
                >
                  {step}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{title}</p>
                  <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {section.tip && (
            <div className="mt-5 flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">{section.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
