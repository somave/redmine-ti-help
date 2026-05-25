import { createContext, useContext, useState, useCallback } from 'react'
import { authenticate } from '../services/redmineApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ti_user')
    return saved ? JSON.parse(saved) : null
  })
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem('ti_creds')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback(async (username, password) => {
    const data = await authenticate(username, password)
    const userData = data.user
    const creds = { username, password }
    setUser(userData)
    setCredentials(creds)
    localStorage.setItem('ti_user', JSON.stringify(userData))
    localStorage.setItem('ti_creds', JSON.stringify(creds))
    return userData
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setCredentials(null)
    localStorage.removeItem('ti_user')
    localStorage.removeItem('ti_creds')
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      credentials,
      isAuthenticated: !!user && !!credentials,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
