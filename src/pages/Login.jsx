import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSettings } from '../contexts/SettingsContext'
import Button from '../components/Button'
import { LogIn } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { settings } = useSettings()
  const navigate = useNavigate()

  // Get login background style
  const getLoginBackgroundStyle = () => {
    if (settings.loginBackgroundType === 'image' && settings.loginBackgroundImage) {
      return {
        backgroundImage: `url(${settings.loginBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    } else {
      return {
        backgroundColor: settings.loginBackgroundColor || '#e0e7ff',
      }
    }
  }

  // Get login form card style
  const getLoginFormStyle = () => {
    const opacity = (settings.loginFormBgOpacity !== undefined ? settings.loginFormBgOpacity : 100) / 100
    const bgColor = settings.loginFormBgColor || '#ffffff'
    
    // Convert hex to rgba for opacity support
    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    
    return {
      backgroundColor: hexToRgba(bgColor, opacity),
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = login(email, password)
    
    setTimeout(() => {
      setLoading(false)
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Invalid credentials')
      }
    }, 500)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-all duration-300"
      style={getLoginBackgroundStyle()}
    >
      <div 
        className="rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md transition-all duration-300"
        style={getLoginFormStyle()}
      >
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full mb-4">
            <LogIn className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Demo credentials: <br />
            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              admin@example.com / admin123
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
