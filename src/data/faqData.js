export const FAQ_CATEGORIES = [
  {
    id: 'acesso',
    title: 'Acesso e Login',
    icon: '🔐',
    items: [
      {
        question: 'Esqueci minha senha do Senior / EDATA / e-mail corporativo. O que fazer?',
        answer: `Abra um chamado com o tipo "Problemas de acesso (login/senha, permissão negada)" e informe:\n- Seu nome completo\n- Sistema que não consegue acessar\n- ID do AnyDesk (para acesso remoto)\n\nO TI irá realizar a redefinição de senha em breve.`,
      },
      {
        question: 'Preciso de acesso a uma pasta compartilhada ou sistema.',
        answer: `Abra um chamado com o tipo "Solicitação de acesso a sistema ou pasta" e informe:\n- Nome da pasta ou sistema\n- Motivo da necessidade\n- ID do AnyDesk ou ramal\n\nLembrando que o acesso precisa de autorização do seu gestor.`,
      },
      {
        question: 'Minha VPN parou de funcionar.',
        answer: `Abra um chamado com o tipo "Solicitação de VPN / acesso remoto" e informe:\n- Mensagem de erro exibida\n- Desde quando ocorre o problema\n- ID do AnyDesk\n\nEm casos urgentes, entre em contato direto com o TI.`,
      },
    ],
  },
  {
    id: 'sistema',
    title: 'Erros em Sistema',
    icon: '⚙️',
    items: [
      {
        question: 'O sistema Senior está travando ou exibindo erro. O que devo fazer?',
        answer: `1. Tire um print/foto da mensagem de erro\n2. Feche e reabra o Senior\n3. Se persistir, abra um chamado com:\n   - Print do erro\n   - Nome da tela/módulo com problema\n   - ID do AnyDesk: informe para acesso remoto\n   - Nome do usuário afetado`,
      },
      {
        question: 'O EDATA não está integrando com o Senior.',
        answer: `Este é um problema crítico de produção. Abra chamado como URGENTE com o tipo "Erro em sistema" e informe:\n- Hora aproximada que parou\n- Tipo de integração afetada (cargas, ordens, etc.)\n- Contato de quem deve ser notificado`,
      },
      {
        question: 'Não consigo abrir PDFs ou arquivos no meu computador.',
        answer: `Abra um chamado com tipo "Computador travando / não liga / não abre arquivos" informando:\n- Quais tipos de arquivo não abrem\n- Mensagem de erro (se houver)\n- ID do AnyDesk para suporte remoto`,
      },
      {
        question: 'O sistema ficou fora do ar para toda a equipe.',
        answer: `Abra um chamado URGENTE com tipo "Sistema fora do ar" e informe:\n- Nome do sistema\n- Quantas pessoas estão afetadas\n- Hora que começou o problema\n- Impacto na operação`,
      },
    ],
  },
  {
    id: 'impressora',
    title: 'Impressoras',
    icon: '🖨️',
    items: [
      {
        question: 'Minha impressora não está imprimindo. Como resolver?',
        answer: `Tente primeiro:\n1. Desligue e ligue a impressora\n2. Verifique o cabo de rede/USB\n3. Cancele todos os trabalhos na fila de impressão\n4. Reinicie o serviço de impressão (se souber)\n\nSe não resolver, abra um chamado com tipo "Impressora não funcionando" informando:\n- Modelo da impressora\n- Localização (setor)\n- Mensagem de erro (se houver)`,
      },
      {
        question: 'O toner/cartucho acabou.',
        answer: `Abra um chamado com tipo "Impressora não funcionando" e informe:\n- Modelo da impressora\n- Localização\n- Mensagem exibida (ex.: "substituir toner")\n\nO TI verificará o estoque e realizará a troca.`,
      },
      {
        question: 'Preciso instalar uma impressora em um novo computador.',
        answer: `Abra um chamado com tipo "Instalação de software autorizado" informando:\n- Nome/modelo da impressora\n- Localização da impressora\n- ID do AnyDesk do computador onde será instalada`,
      },
    ],
  },
  {
    id: 'email',
    title: 'E-mail Corporativo',
    icon: '📧',
    items: [
      {
        question: 'Não estou recebendo e-mails. O que fazer?',
        answer: `Abra um chamado com tipo "Falha em e-mail corporativo" e informe:\n- Endereço de e-mail com problema\n- Desde quando não recebe\n- Se outros da equipe têm o mesmo problema\n- ID do AnyDesk`,
      },
      {
        question: 'Preciso configurar e-mail em um novo dispositivo (celular ou notebook).',
        answer: `Abra um chamado com tipo "Configuração de novo dispositivo (notebook, celular, e-mail)" e informe:\n- Modelo do dispositivo\n- E-mail a ser configurado\n- ID do AnyDesk (se notebook) ou modelo do celular`,
      },
      {
        question: 'Preciso criar um e-mail para um novo colaborador.',
        answer: `Abra um chamado com tipo "Solicitação de criação de usuário" e informe:\n- Nome completo do colaborador\n- Cargo/setor\n- E-mail desejado (ex.: nome.sobrenome@somave.com.br)\n- Data de início\n- Sistemas que precisará acessar`,
      },
    ],
  },
  {
    id: 'equipamento',
    title: 'Equipamentos e Hardware',
    icon: '💻',
    items: [
      {
        question: 'Preciso de um notebook/celular/periférico novo.',
        answer: `Abra um chamado com tipo "Solicitação de equipamento (notebook, celular, periféricos)" e informe:\n- Tipo de equipamento necessário\n- Justificativa\n- Para qual colaborador\n- Urgência`,
      },
      {
        question: 'Meu computador está travando com frequência.',
        answer: `Abra um chamado com tipo "Computador travando / não liga / não abre arquivos" e informe:\n- ID do AnyDesk para suporte remoto\n- Descrição do problema (trava, lentidão, desliga sozinho)\n- Há quanto tempo ocorre`,
      },
      {
        question: 'Como compartilhar o ID do AnyDesk com o TI?',
        answer: `O AnyDesk é o programa de suporte remoto que o TI usa.\n\n1. Abra o AnyDesk no seu computador\n2. O número grande no centro da tela é o seu ID (ex.: 123 456 789)\n3. Informe este número no chamado ou pelo WhatsApp do TI\n4. Quando o TI solicitar, clique em "Aceitar" para permitir o acesso`,
      },
    ],
  },
  {
    id: 'conectividade',
    title: 'Internet e Rede',
    icon: '🌐',
    items: [
      {
        question: 'Estou sem internet ou sem acesso à rede interna.',
        answer: `Tente primeiro:\n1. Desconecte e reconecte o cabo de rede\n2. Reinicie o computador\n3. Verifique se outros computadores do setor têm o mesmo problema\n\nSe persistir, abra um chamado com tipo "Perda de conectividade (internet/rede local)" e informe:\n- Se é só seu computador ou todo o setor\n- Mensagem de erro (se houver)\n- ID do AnyDesk`,
      },
      {
        question: 'O sistema está muito lento.',
        answer: `Abra um chamado com tipo "Lentidão em sistema ou rede" e informe:\n- Qual sistema está lento\n- Desde quando ocorre\n- Se outros da equipe estão com o mesmo problema`,
      },
    ],
  },
]
