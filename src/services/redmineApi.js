const BASE_URL = 'https://redmine.somave.com.br'

function getHeaders(credentials) {
  const encoded = btoa(`${credentials.username}:${credentials.password}`)
  return {
    'Authorization': `Basic ${encoded}`,
    'Content-Type': 'application/json',
  }
}

export async function authenticate(username, password) {
  const encoded = btoa(`${username}:${password}`)
  const res = await fetch(`${BASE_URL}/users/current.json`, {
    headers: { 'Authorization': `Basic ${encoded}` },
  })
  if (!res.ok) throw new Error('Usuário ou senha inválidos')
  return res.json()
}

export async function getProjects(credentials) {
  const res = await fetch(`${BASE_URL}/projects.json?limit=100`, {
    headers: getHeaders(credentials),
  })
  if (!res.ok) throw new Error('Erro ao buscar projetos')
  return res.json()
}

export async function getMyOpenIssues(credentials, offset = 0, limit = 25) {
  const res = await fetch(
    `${BASE_URL}/issues.json?author_id=me&status_id=open&limit=${limit}&offset=${offset}&sort=updated_on:desc`,
    { headers: getHeaders(credentials) }
  )
  if (!res.ok) throw new Error('Erro ao buscar chamados abertos')
  return res.json()
}

export async function getMyClosedIssues(credentials, offset = 0, limit = 25) {
  const res = await fetch(
    `${BASE_URL}/issues.json?author_id=me&status_id=closed&limit=${limit}&offset=${offset}&sort=updated_on:desc`,
    { headers: getHeaders(credentials) }
  )
  if (!res.ok) throw new Error('Erro ao buscar chamados fechados')
  return res.json()
}

export async function getIssue(credentials, id) {
  const res = await fetch(
    `${BASE_URL}/issues/${id}.json?include=journals,attachments,watchers`,
    { headers: getHeaders(credentials) }
  )
  if (!res.ok) throw new Error('Erro ao buscar chamado')
  return res.json()
}

export async function getIssueStats(credentials) {
  const [open, closed] = await Promise.all([
    fetch(`${BASE_URL}/issues.json?author_id=me&status_id=open&limit=1`, { headers: getHeaders(credentials) }),
    fetch(`${BASE_URL}/issues.json?author_id=me&status_id=closed&limit=1`, { headers: getHeaders(credentials) }),
  ])
  const openData = await open.json()
  const closedData = await closed.json()
  return {
    total_open: openData.total_count || 0,
    total_closed: closedData.total_count || 0,
  }
}

export async function createIssue(credentials, issueData) {
  const res = await fetch(`${BASE_URL}/issues.json`, {
    method: 'POST',
    headers: getHeaders(credentials),
    body: JSON.stringify({ issue: issueData }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.errors?.join(', ') || 'Erro ao criar chamado')
  }
  return res.json()
}

export async function addComment(credentials, issueId, notes, statusId) {
  const body = { issue: { notes } }
  if (statusId) body.issue.status_id = statusId
  const res = await fetch(`${BASE_URL}/issues/${issueId}.json`, {
    method: 'PUT',
    headers: getHeaders(credentials),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Erro ao adicionar comentário')
}

export async function updateStatus(credentials, issueId, statusId, notes = '') {
  const res = await fetch(`${BASE_URL}/issues/${issueId}.json`, {
    method: 'PUT',
    headers: getHeaders(credentials),
    body: JSON.stringify({ issue: { status_id: statusId, notes } }),
  })
  if (!res.ok) throw new Error('Erro ao atualizar status')
}

export async function uploadFile(credentials, file) {
  const encoded = btoa(`${credentials.username}:${credentials.password}`)
  const res = await fetch(`${BASE_URL}/uploads.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  })
  if (!res.ok) throw new Error('Erro no upload do arquivo')
  return res.json()
}

export async function getTrackers(credentials) {
  const res = await fetch(`${BASE_URL}/trackers.json`, {
    headers: getHeaders(credentials),
  })
  if (!res.ok) throw new Error('Erro ao buscar trackers')
  return res.json()
}

export async function getAllOpenIssues(credentials, limit = 25, offset = 0) {
  const res = await fetch(
    `${BASE_URL}/issues.json?author_id=me&status_id=open&limit=${limit}&offset=${offset}&sort=updated_on:desc`,
    { headers: getHeaders(credentials) }
  )
  if (!res.ok) throw new Error('Erro ao buscar chamados')
  return res.json()
}
