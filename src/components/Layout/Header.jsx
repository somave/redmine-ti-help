import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, PlusCircle } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Header({ onMenuClick, title }) {
  const navigate = useNavigate()
  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications()
  const [showNotif, setShowNotif] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setShowNotif(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 sticky top-0 z-10 border-l-4 border-l-somave-orange">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="font-semibold text-gray-800 flex-1 text-sm md:text-base truncate">{title}</h1>

      <button
        onClick={() => navigate('/novo')}
        className="hidden sm:flex items-center gap-1.5 bg-somave-red text-white text-sm px-3 py-1.5 rounded-lg hover:bg-somave-red-dark transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        Novo Chamado
      </button>

      {/* Notifications */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => { setShowNotif(p => !p); if (unreadCount) markAllRead() }}
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {showNotif && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-semibold text-sm text-gray-800">Notificações</span>
              {notifications.length > 0 && (
                <button onClick={clearAll} className="text-xs text-somave-red hover:underline">Limpar</button>
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">Nenhuma notificação</p>
            ) : (
              notifications.map(n => (
                <button
                  key={n.id}
                  onClick={() => { navigate(`/chamados/${n.issueId}`); setShowNotif(false) }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                >
                  <p className="text-sm font-medium text-gray-800">{n.title}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{n.subject}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDistanceToNow(new Date(n.time), { addSuffix: true, locale: ptBR })}
                  </p>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </header>
  )
}
