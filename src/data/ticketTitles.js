// Títulos atualizados com base na análise do banco de dados Redmine (mai/2026)
// Frequências baseadas em 1.440 chamados reais, excluindo Marketing e P&D

export const USER_TICKET_TITLES = [
  // Mais frequentes (>50 ocorrências)
  { value: 'ERRO EM SISTEMA (TELA TRAVADA, MENSAGEM DE ERRO)', label: 'Erro em sistema (tela travada, mensagem de erro)', freq: 302 },
  { value: 'SOLICITAÇÃO DE ACESSO A SISTEMA OU PASTA', label: 'Solicitação de acesso a sistema ou pasta', freq: 237 },
  { value: 'IMPRESSORA NÃO FUNCIONANDO', label: 'Impressora não funcionando', freq: 110 },
  { value: 'SOLICITAÇÃO DE EQUIPAMENTO (NOTEBOOK, CELULAR, PERIFÉRICOS)', label: 'Solicitação de equipamento (notebook, celular, periféricos)', freq: 103 },
  { value: 'FALHA EM E-MAIL CORPORATIVO', label: 'Falha em e-mail corporativo', freq: 103 },
  { value: 'INSTALAÇÃO DE SOFTWARE AUTORIZADO', label: 'Instalação de software autorizado', freq: 64 },
  { value: 'SISTEMA FORA DO AR', label: 'Sistema fora do ar', freq: 62 },
  { value: 'PROBLEMAS DE ACESSO (LOGIN/SENHA, PERMISSÃO NEGADA)', label: 'Problemas de acesso (login/senha, permissão negada)', freq: 54 },
  { value: 'SOLICITAÇÃO DE CRIAÇÃO DE USUÁRIO', label: 'Solicitação de criação de usuário', freq: 51 },
  // Frequentes (20-50)
  { value: 'CONFIGURAÇÃO DE NOVO DISPOSITIVO (NOTEBOOK, CELULAR, E-MAIL)', label: 'Configuração de novo dispositivo (notebook, celular, e-mail)', freq: 43 },
  { value: 'PERDA DE CONECTIVIDADE (INTERNET/REDE LOCAL)', label: 'Perda de conectividade (internet/rede local)', freq: 32 },
  { value: 'COMPUTADOR TRAVANDO / NÃO LIGA / NÃO ABRE ARQUIVOS', label: 'Computador travando / não liga / não abre arquivos', freq: 27 },
  { value: 'LENTIDÃO EM SISTEMA OU REDE', label: 'Lentidão em sistema ou rede', freq: 19 },
  // Médios (5-20)
  { value: 'TROCA DE EQUIPAMENTO POR ATUALIZAÇÃO', label: 'Troca de equipamento por atualização', freq: 12 },
  { value: 'SOLICITAÇÃO DE RELATÓRIO OU EXTRAÇÃO DE DADOS', label: 'Solicitação de relatório ou extração de dados', freq: 9 },
  { value: 'INCLUSÃO DE NOVOS CAMPOS/FUNÇÕES EM SISTEMA', label: 'Inclusão de novos campos/funções em sistema', freq: 8 },
  { value: 'SOLICITAÇÃO DE LICENÇA DE SOFTWARE', label: 'Solicitação de licença de software', freq: 8 },
  // Novos (baseados em padrões identificados nas descrições)
  { value: 'INSTALAÇÃO DE CERTIFICADO / ASSINATURA DIGITAL', label: 'Instalação de certificado / assinatura digital', freq: 0 },
  { value: 'FORMATAÇÃO / REINSTALAÇÃO DE COMPUTADOR', label: 'Formatação / reinstalação de computador', freq: 0 },
  { value: 'SOLICITAÇÃO DE VPN / ACESSO REMOTO', label: 'Solicitação de VPN / acesso remoto', freq: 0 },
]

export const IT_TICKET_TITLES = [
  { value: 'ALTERAÇÃO DE CONFIGURAÇÃO DE SERVIDOR', label: 'Alteração de configuração de servidor' },
  { value: 'ALTERAÇÃO DE PERFIL DE ACESSO EM MASSA', label: 'Alteração de perfil de acesso em massa' },
  { value: 'ALTERAÇÃO DE WORKFLOW EM SISTEMA ERP', label: 'Alteração de workflow em sistema ERP' },
  { value: 'ATUALIZAÇÃO DE PATCHES DE SEGURANÇA', label: 'Atualização de patches de segurança' },
  { value: 'ATUALIZAÇÃO DE VERSÃO DE SISTEMA', label: 'Atualização de versão de sistema' },
  { value: 'CRIAÇÃO OU ALTERAÇÃO DE ROTINAS AUTOMÁTICAS (SCRIPTS, JOBS)', label: 'Criação ou alteração de rotinas automáticas (scripts, jobs)' },
  { value: 'DOCUMENTAÇÃO DE PROCESSOS INTERNOS', label: 'Documentação de processos internos' },
  { value: 'MIGRAÇÃO DE DADOS ENTRE SISTEMAS/SERVIDORES', label: 'Migração de dados entre sistemas/servidores' },
  { value: 'MONITORAMENTO DE SERVIDORES', label: 'Monitoramento de servidores' },
  { value: 'MUDANÇA EM REGRAS DE FIREWALL OU REDE', label: 'Mudança em regras de firewall ou rede' },
  { value: 'ORGANIZAÇÃO DE INVENTÁRIO DE HARDWARE/SOFTWARE', label: 'Organização de inventário de hardware/software' },
  { value: 'PLANEJAMENTO DE CAPACIDADE (STORAGE, REDE, CPU)', label: 'Planejamento de capacidade (storage, rede, CPU)' },
  { value: 'PROBLEMAS COM ANTIVÍRUS/SEGURANÇA', label: 'Problemas com antivírus/segurança' },
  { value: 'PUBLICAÇÃO DE ATUALIZAÇÃO EM SITE OU PORTAL INTERNO', label: 'Publicação de atualização em site ou portal interno' },
  { value: 'REUNIÕES TÉCNICAS/PLANEJAMENTO', label: 'Reuniões técnicas/planejamento' },
  { value: 'REVISÃO DE BACKUPS', label: 'Revisão de backups' },
  { value: 'REVISÃO DE LOGS DE SISTEMA', label: 'Revisão de logs de sistema' },
  { value: 'REVISÃO DE PERMISSÕES DE ACESSO', label: 'Revisão de permissões de acesso' },
  { value: 'SOLICITAÇÃO DE CÓPIA/BACKUP DE ARQUIVOS', label: 'Solicitação de cópia/backup de arquivos' },
  { value: 'TESTES DE CONTINGÊNCIA E PLANO DE CONTINUIDADE', label: 'Testes de contingência e plano de continuidade' },
]

export const PRIORITY_OPTIONS = [
  { value: '7', label: 'Urgente', color: 'red' },
  { value: '6', label: 'Alta', color: 'orange' },
  { value: '4', label: 'Normal', color: 'yellow' },
  { value: '3', label: 'Baixa', color: 'green' },
]
