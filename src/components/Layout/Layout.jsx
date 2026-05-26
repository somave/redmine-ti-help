import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/chamados': 'Meus Chamados',
  '/novo': 'Novo Chamado',
  '/faq': 'Base de Conhecimento',
  '/manual': 'Manual do Usuário',
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const title = location.pathname.startsWith('/chamados/')
    ? `Chamado #${location.pathname.split('/').pop()}`
    : PAGE_TITLES[location.pathname] || 'T.I. Chamados'

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
