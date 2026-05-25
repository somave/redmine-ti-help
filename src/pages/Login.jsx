import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Verdana, Tahoma, Arial, sans-serif' }}>

      {/* Header — igual ao Redmine */}
      <header
        className="flex items-center px-6"
        style={{ backgroundColor: '#c62828', borderBottom: '3px solid #ff6f00', height: '80px' }}
      >
        <img src="/logo_somave.png" alt="Somave" style={{ height: '52px', objectFit: 'contain' }} />
        <span className="ml-auto text-white text-sm font-bold">Entrar</span>
      </header>

      {/* Corpo */}
      <main className="flex-1 flex items-center justify-center bg-white py-12 px-4">
        <div
          className="w-full"
          style={{ maxWidth: '340px' }}
        >
          {/* Card creme — igual ao box do Redmine */}
          <div
            className="rounded p-7"
            style={{ backgroundColor: '#fef9e4', border: '1px solid #ddd5aa' }}
          >
            {error && (
              <div
                className="mb-4 p-2 rounded text-sm"
                style={{ backgroundColor: '#ffebee', border: '1px solid #c62828', color: '#b71c1c' }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">Usuário</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder=""
                  className="w-full border border-gray-400 px-2 py-1.5 text-sm bg-white"
                  style={{ borderRadius: '2px' }}
                  required
                  autoComplete="username"
                  autoFocus
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-bold text-gray-800">Senha</label>
                  <a
                    href="https://redmine.somave.com.br/account/lost_password"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs"
                    style={{ color: '#5c5c5c' }}
                  >
                    Perdi minha senha
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-gray-400 px-2 py-1.5 text-sm bg-white pr-8"
                    style={{ borderRadius: '2px' }}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full py-2 text-white text-sm font-bold transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#c62828', borderRadius: '3px' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b71c1c'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#c62828'}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Use as mesmas credenciais do Redmine
          </p>
        </div>
      </main>

      {/* Footer — igual ao Redmine */}
      <footer
        className="text-center py-2.5 text-xs text-white"
        style={{ backgroundColor: '#c62828' }}
      >
        Powered by <strong>Redmine</strong> · Sistema de Chamados T.I. – Somave
      </footer>
    </div>
  )
}
