// Categorias organizadas por tipo de chamado, baseadas na análise real do banco (mai/2026)

const INCIDENTE_CATEGORIES = [
  // Senior ERP
  { value: 'ERRO NO SISTEMA SENIOR ERP (TELA TRAVADA, MENSAGEM DE ERRO)', label: 'Erro no sistema Senior ERP (tela travada, mensagem de erro)', freq: 87 },
  { value: 'SISTEMA SENIOR FORA DO AR / INACESSÍVEL', label: 'Sistema Senior fora do ar / inacessível', freq: 40 },
  // EDATA
  { value: 'ERRO NO SISTEMA EDATA (TELA TRAVADA, MENSAGEM DE ERRO)', label: 'Erro no sistema EDATA (tela travada, mensagem de erro)', freq: 95 },
  { value: 'SISTEMA EDATA FORA DO AR / INACESSÍVEL', label: 'Sistema EDATA fora do ar / inacessível', freq: 20 },
  // Integration
  { value: 'FALHA NA INTEGRAÇÃO SENIOR ↔ EDATA', label: 'Falha na integração Senior ↔ EDATA', freq: 35 },
  // Access
  { value: 'ERRO DE LOGIN / SENHA OU PERMISSÃO NEGADA EM SISTEMA', label: 'Erro de login / senha ou permissão negada em sistema', freq: 54 },
  // Email
  { value: 'FALHA NO E-MAIL CORPORATIVO (NÃO ENVIA / NÃO RECEBE)', label: 'Falha no e-mail corporativo (não envia / não recebe)', freq: 156 },
  { value: 'E-MAIL RECEBENDO SPAM / MENSAGENS SUSPEITAS', label: 'E-mail recebendo spam / mensagens suspeitas', freq: 10 },
  // Printer
  { value: 'IMPRESSORA NÃO IMPRIME / ERRO NA FILA DE IMPRESSÃO', label: 'Impressora não imprime / erro na fila de impressão', freq: 110 },
  { value: 'IMPRESSORA DE ETIQUETAS NÃO FUNCIONANDO', label: 'Impressora de etiquetas não funcionando', freq: 29 },
  // Computer / hardware
  { value: 'COMPUTADOR TRAVADO / LENTO / NÃO LIGA', label: 'Computador travado / lento / não liga', freq: 172 },
  { value: 'MONITOR COM PROBLEMA / TELA PRETA / SEM SINAL', label: 'Monitor com problema / tela preta / sem sinal', freq: 11 },
  { value: 'SCANNER NÃO RECONHECIDO / NÃO DIGITALIZA', label: 'Scanner não reconhecido / não digitaliza', freq: 7 },
  // Network
  { value: 'SEM ACESSO À INTERNET / REDE CAÍDA', label: 'Sem acesso à internet / rede caída', freq: 58 },
  { value: 'FALHA NO ACESSO REMOTO / VPN CAÍDA', label: 'Falha no acesso remoto / VPN caída', freq: 15 },
  // OneDrive / Office
  { value: 'ERRO NO ONEDRIVE / OFFICE 365 (NÃO SINCRONIZA, NÃO ABRE)', label: 'Erro no OneDrive / Office 365 (não sincroniza, não abre)', freq: 30 },
]

const REQUISICAO_CATEGORIES = [
  // Access requests
  { value: 'SOLICITAÇÃO DE ACESSO AO SISTEMA SENIOR ERP', label: 'Solicitação de acesso ao sistema Senior ERP', freq: 100 },
  { value: 'SOLICITAÇÃO DE ACESSO AO SISTEMA EDATA', label: 'Solicitação de acesso ao sistema EDATA', freq: 60 },
  { value: 'SOLICITAÇÃO DE ACESSO A PASTA DE REDE / ONEDRIVE', label: 'Solicitação de acesso a pasta de rede / OneDrive', freq: 57 },
  { value: 'CRIAÇÃO OU INATIVAÇÃO DE USUÁRIO (AD / SISTEMA)', label: 'Criação ou inativação de usuário (AD / sistema)', freq: 51 },
  // Equipment
  { value: 'SOLICITAÇÃO DE NOTEBOOK / COMPUTADOR', label: 'Solicitação de notebook / computador', freq: 80 },
  { value: 'SOLICITAÇÃO DE CELULAR CORPORATIVO', label: 'Solicitação de celular corporativo', freq: 23 },
  { value: 'SOLICITAÇÃO DE IMPRESSORA / ETIQUETADORA', label: 'Solicitação de impressora / etiquetadora', freq: 20 },
  { value: 'SOLICITAÇÃO DE PERIFÉRICO (MOUSE, TECLADO, HEADSET, WEBCAM)', label: 'Solicitação de periférico (mouse, teclado, headset, webcam)', freq: 15 },
  // Software
  { value: 'INSTALAÇÃO DE SOFTWARE AUTORIZADO', label: 'Instalação de software autorizado', freq: 64 },
  { value: 'SOLICITAÇÃO DE LICENÇA DE SOFTWARE', label: 'Solicitação de licença de software', freq: 8 },
  // Reports / data
  { value: 'SOLICITAÇÃO DE RELATÓRIO / EXTRAÇÃO DE DADOS DO SENIOR', label: 'Solicitação de relatório / extração de dados do Senior', freq: 9 },
  { value: 'SOLICITAÇÃO DE RELATÓRIO / EXTRAÇÃO DE DADOS DO EDATA', label: 'Solicitação de relatório / extração de dados do EDATA', freq: 9 },
  // Remote / VPN
  { value: 'SOLICITAÇÃO DE VPN / ACESSO REMOTO', label: 'Solicitação de VPN / acesso remoto', freq: 0 },
  // Other
  { value: 'INSTALAÇÃO DE CERTIFICADO / ASSINATURA DIGITAL', label: 'Instalação de certificado / assinatura digital', freq: 7 },
  { value: 'CONFIGURAÇÃO DE E-MAIL EM NOVO DISPOSITIVO', label: 'Configuração de e-mail em novo dispositivo', freq: 43 },
]

const MUDANCA_CATEGORIES = [
  // Senior permissions
  { value: 'ALTERAÇÃO DE PERFIL / PERMISSÃO NO SISTEMA SENIOR ERP', label: 'Alteração de perfil / permissão no sistema Senior ERP', freq: 80 },
  { value: 'ALTERAÇÃO DE REGRA DE APROVAÇÃO / WORKFLOW NO SENIOR', label: 'Alteração de regra de aprovação / workflow no Senior', freq: 10 },
  { value: 'ATUALIZAÇÃO DE VERSÃO DO SISTEMA SENIOR ERP', label: 'Atualização de versão do sistema Senior ERP', freq: 5 },
  // EDATA permissions
  { value: 'ALTERAÇÃO DE PERFIL / PERMISSÃO NO SISTEMA EDATA', label: 'Alteração de perfil / permissão no sistema EDATA', freq: 40 },
  { value: 'ATUALIZAÇÃO DE VERSÃO DO SISTEMA EDATA', label: 'Atualização de versão do sistema EDATA', freq: 5 },
  // Integration config
  { value: 'CONFIGURAÇÃO / AJUSTE DE INTEGRAÇÃO SENIOR ↔ EDATA', label: 'Configuração / ajuste de integração Senior ↔ EDATA', freq: 0 },
  // Hardware
  { value: 'FORMATAÇÃO / REINSTALAÇÃO DE COMPUTADOR', label: 'Formatação / reinstalação de computador', freq: 15 },
  { value: 'TROCA DE EQUIPAMENTO (ATUALIZAÇÃO / UPGRADE)', label: 'Troca de equipamento (atualização / upgrade)', freq: 12 },
  // Network / infra
  { value: 'ALTERAÇÃO DE CONFIGURAÇÃO DE REDE / FIREWALL', label: 'Alteração de configuração de rede / firewall', freq: 0 },
  { value: 'MUDANÇA DE CONFIGURAÇÃO DE E-MAIL / DOMÍNIO', label: 'Mudança de configuração de e-mail / domínio', freq: 0 },
  { value: 'INCLUSÃO DE NOVOS CAMPOS / FUNÇÕES EM SISTEMA', label: 'Inclusão de novos campos / funções em sistema', freq: 8 },
]

const INTERNA_CATEGORIES = [
  { value: 'MONITORAMENTO DE SERVIDORES / VERIFICAÇÃO DE BACKUPS', label: 'Monitoramento de servidores / verificação de backups', freq: 0 },
  { value: 'ATUALIZAÇÃO DE PATCHES DE SEGURANÇA', label: 'Atualização de patches de segurança', freq: 0 },
  { value: 'DOCUMENTAÇÃO DE PROCESSOS INTERNOS DE T.I.', label: 'Documentação de processos internos de T.I.', freq: 0 },
  { value: 'MIGRAÇÃO DE DADOS ENTRE SISTEMAS / SERVIDORES', label: 'Migração de dados entre sistemas / servidores', freq: 0 },
  { value: 'REVISÃO DE LOGS / AUDITORIA DE ACESSOS', label: 'Revisão de logs / auditoria de acessos', freq: 0 },
  { value: 'PLANEJAMENTO DE CAPACIDADE (STORAGE, REDE, CPU)', label: 'Planejamento de capacidade (storage, rede, CPU)', freq: 0 },
  { value: 'CONFIGURAÇÃO DE NOVO SERVIDOR / SERVIÇO DE INFRAESTRUTURA', label: 'Configuração de novo servidor / serviço de infraestrutura', freq: 0 },
  { value: 'TESTES DE CONTINGÊNCIA / PLANO DE CONTINUIDADE', label: 'Testes de contingência / plano de continuidade', freq: 0 },
  { value: 'REVISÃO E ATUALIZAÇÃO DE INVENTÁRIO (HARDWARE / SOFTWARE)', label: 'Revisão e atualização de inventário (hardware / software)', freq: 0 },
  { value: 'REUNIÃO TÉCNICA / PLANEJAMENTO T.I.', label: 'Reunião técnica / planejamento T.I.', freq: 0 },
  { value: 'CRIAÇÃO OU ALTERAÇÃO DE ROTINAS AUTOMÁTICAS (SCRIPTS, JOBS)', label: 'Criação ou alteração de rotinas automáticas (scripts, jobs)', freq: 0 },
]

// tracker ID -> categories
const TRACKER_CATEGORIES = {
  1: MUDANCA_CATEGORIES,
  2: REQUISICAO_CATEGORIES,
  3: INCIDENTE_CATEGORIES,
  4: INTERNA_CATEGORIES,
}

export const ALL_CATEGORIES = [
  ...INCIDENTE_CATEGORIES,
  ...REQUISICAO_CATEGORIES,
  ...MUDANCA_CATEGORIES,
  ...INTERNA_CATEGORIES,
]

export function getCategoriesForTracker(trackerId) {
  return TRACKER_CATEGORIES[trackerId] || INCIDENTE_CATEGORIES
}

export const PRIORITY_OPTIONS = [
  { value: '7', label: 'Urgente', color: 'red' },
  { value: '6', label: 'Alta', color: 'orange' },
  { value: '4', label: 'Normal', color: 'yellow' },
  { value: '3', label: 'Baixa', color: 'green' },
]
