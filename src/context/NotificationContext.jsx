import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { getMyOpenIssues } from '../services/redmineApi'

const NotificationContext = createContext(null)

const POLL_INTERVAL = 60000 // 1 minuto

export function NotificationProvider({ children }) {
  const { credentials, isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const lastUpdateRef = useRef({})

  const checkUpdates = useCallback(async () => {
    if (!isAuthenticated || !credentials) return
    try {
      const data = await getMyOpenIssues(credentials, 0, 50)
      const issues = data.issues || []
      const newNotifs = []
      issues.forEach(issue => {
        const lastSeen = lastUpdateRef.current[issue.id]
        if (lastSeen && new Date(issue.updated_on) > new Date(lastSeen)) {
          newNotifs.push({
            id: `${issue.id}-${issue.updated_on}`,
            issueId: issue.id,
            title: `Chamado #${issue.id} foi atualizado`,
            subject: issue.subject,
            time: issue.updated_on,
            read: false,
          })
        }
        lastUpdateRef.current[issue.id] = issue.updated_on
      })
      if (newNotifs.length > 0) {
        setNotifications(prev => [...newNotifs, ...prev].slice(0, 50))
        setUnreadCount(prev => prev + newNotifs.length)
      }
    } catch (_) {}
  }, [isAuthenticated, credentials])

  useEffect(() => {
    if (!isAuthenticated) return
    checkUpdates()
    const interval = setInterval(checkUpdates, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [isAuthenticated, checkUpdates])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}
