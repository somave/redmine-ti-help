import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Lock, User, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username.trim(), password)
    } catch (err) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">

      {/* Header */}
      <header
        className="flex items-center px-6 shrink-0"
        style={{ backgroundColor: '#c62828', borderBottom: '3px solid #ff6f00', height: '80px' }}
      >
        <img src="/logo_somave.png" alt="Somave" style={{ height: '52px', objectFit: 'contain' }} />
        <span className="ml-auto text-white text-sm font-bold">Entrar</span>
      </header>

      {/* Corpo */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: '#ff6f00' }} />
              <h2 className="text-lg font-semibold text-gray-800">Entrar com sua conta</h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="seu.usuario"
                    className="input pl-10"
                    required
                    autoComplete="username"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input pl-10 pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !username || !password}
                className="btn-primary w-full py-3 mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Entrando...
                  </span>
                ) : 'Entrar'}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Use as mesmas credenciais de acesso ao sistema
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-2.5 text-xs text-white shrink-0"
        style={{ backgroundColor: '#c62828' }}
      >
        Sistema de Chamados T.I. &mdash; Somave Alimentos
      </footer>
    </div>
  )
}
