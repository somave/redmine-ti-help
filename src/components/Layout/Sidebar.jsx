import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Ticket, PlusCircle, BookOpen, LogOut, Monitor, X
} from 'lucide-react'
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
        fixed top-0 left-0 h-full w-64 bg-blue-900 text-white z-30 flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-800">
          <div className="flex items-center gap-2">
            <Monitor className="w-6 h-6 text-blue-300" />
            <div>
              <p className="font-bold text-sm leading-tight">T.I. Chamados</p>
              <p className="text-xs text-blue-400">Somave</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-blue-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-4 py-3 border-b border-blue-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold mb-1">
              {user.firstname?.[0]}{user.lastname?.[0]}
            </div>
            <p className="text-sm font-medium truncate">{user.firstname} {user.lastname}</p>
            <p className="text-xs text-blue-400 truncate">{user.mail}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {nav.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}
