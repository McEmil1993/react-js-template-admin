import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return context
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    fontFamily: 'Inter',
    fontSize: '16px',
    sideNavColor: '#1e293b',
    topNavColor: '#ffffff',
    sideNavFontColor: '#e2e8f0',
    sideNavHoverColor: '#ffffff',
    sideNavActiveColor: '#ffffff',
    topNavFontColor: '#1f2937',
    loginBackgroundType: 'color', // 'color' or 'image'
    loginBackgroundColor: '#e0e7ff', // Default gradient start color
    loginBackgroundImage: '',
    loginFormBgColor: '#ffffff', // Login form card background color
    loginFormBgOpacity: 100, // Opacity percentage (0-100)
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      
      // Apply dark mode
      if (parsed.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // Apply font family
      document.documentElement.style.setProperty('--font-family', parsed.fontFamily)
      
      // Apply font size
      document.documentElement.style.fontSize = parsed.fontSize
    }
  }, [])

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('appSettings', JSON.stringify(updated))
    
    // Apply dark mode
    if (updated.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Apply font family
    document.documentElement.style.setProperty('--font-family', updated.fontFamily)
    
    // Apply font size
    document.documentElement.style.fontSize = updated.fontSize
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
