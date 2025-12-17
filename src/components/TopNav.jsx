import { Bell, Search, User, LogOut, Menu } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSettings } from '../contexts/SettingsContext'

const TopNav = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const { settings } = useSettings()

  // Determine text color based on background brightness
  const getTextColor = (bgColor) => {
    if (!bgColor) return 'text-gray-900 dark:text-white'
    const hex = bgColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? 'text-gray-900' : 'text-white'
  }

  return (
    <nav 
      className={`h-16 px-4 md:px-6 flex items-center justify-between shadow-md transition-colors duration-300 ${getTextColor(settings.topNavColor)}`}
      style={{ backgroundColor: settings.topNavColor }}
    >
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Icon for Mobile */}
        <button className="md:hidden p-2 rounded-lg transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <button className={`relative p-2 rounded-lg transition-colors ${
          getTextColor(settings.topNavColor) === 'text-white' 
            ? 'hover:bg-white hover:bg-opacity-20' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}>
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className={`text-xs ${getTextColor(settings.topNavColor) === 'text-white' ? 'text-gray-300' : 'text-gray-500'}`}>{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className={`p-2 rounded-lg transition-colors ${
            getTextColor(settings.topNavColor) === 'text-white' 
              ? 'hover:bg-white hover:bg-opacity-20' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}

export default TopNav
