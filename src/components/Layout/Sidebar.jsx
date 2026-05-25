import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Ticket, PlusCircle, BookOpen, LogOut, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/chamados', icon: Ticket, label: 'Meus Chamados' },
  { to: '/novo', icon: PlusCircle, label: 'Novo Chamado' },
  { to: '/faq', icon: BookOpen, label: 'Base de Conhecimento' },
]

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 z-30 flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `} style={{ backgroundColor: '#c62828' }}>

        {/* Logo / Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#b71c1c]">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="/logo_somave.png"
              alt="Somave"
              className="h-9 w-auto object-contain shrink-0"
            />
            <div className="min-w-0">
              <p className="font-bold text-xs text-white leading-tight">T.I. Chamados</p>
              <p className="text-[10px] text-red-200 leading-tight">Suporte Técnico</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-red-200 hover:text-white shrink-0 ml-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-4 py-3 border-b border-[#b71c1c]">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: '#ff6f00' }}
              >
                {user.firstname?.[0]}{user.lastname?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.firstname} {user.lastname}</p>
                <p className="text-xs text-red-200 truncate">{user.mail}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {nav.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'text-white'
                  : 'text-red-100 hover:text-white hover:bg-[#b71c1c]'
                }`
              }
              style={({ isActive }) => isActive ? { backgroundColor: '#ff6f00' } : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#b71c1c]">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-red-100 hover:text-white hover:bg-[#b71c1c] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}
