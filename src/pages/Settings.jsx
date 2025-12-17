import { useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import Button from '../components/Button'
import { Moon, Sun, Palette, Type, Gauge } from 'lucide-react'

const Settings = () => {
  const { settings, updateSettings } = useSettings()
  const [localSettings, setLocalSettings] = useState(settings)

  const fontFamilies = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Raleway',
    'Ubuntu',
  ]

  const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '22px', '24px']

  const colorPresets = {
    sideNav: [
      { name: 'Slate', value: '#1e293b' },
      { name: 'Blue', value: '#1e40af' },
      { name: 'Purple', value: '#6b21a8' },
      { name: 'Green', value: '#166534' },
      { name: 'Red', value: '#991b1b' },
    ],
    topNav: [
      { name: 'White', value: '#ffffff' },
      { name: 'Light Gray', value: '#f3f4f6' },
      { name: 'Slate', value: '#475569' },
      { name: 'Blue', value: '#3b82f6' },
    ],
  }

  const handleChange = (key, value) => {
    const updated = { ...localSettings, [key]: value }
    setLocalSettings(updated)
    updateSettings(updated)
  }

  const handleReset = () => {
    const defaultSettings = {
      darkMode: false,
      fontFamily: 'Inter',
      fontSize: '16px',
      sideNavColor: '#1e293b',
      topNavColor: '#ffffff',
    }
    setLocalSettings(defaultSettings)
    updateSettings(defaultSettings)
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Customize your application appearance and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dark Mode */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            {localSettings.darkMode ? (
              <Moon className="w-6 h-6 text-gray-900 dark:text-white" />
            ) : (
              <Sun className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Theme Mode
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Switch between light and dark mode
          </p>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
              className="sr-only"
            />
            <div className={`relative w-14 h-7 rounded-full transition-colors ${
              localSettings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                localSettings.darkMode ? 'transform translate-x-7' : ''
              }`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              {localSettings.darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </label>
        </div>

        {/* Font Family */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-6 h-6 text-gray-900 dark:text-white" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Font Family
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Choose your preferred font family
          </p>
          <select
            value={localSettings.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ fontFamily: localSettings.fontFamily }}
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Gauge className="w-6 h-6 text-gray-900 dark:text-white" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Font Size
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Adjust the base font size
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="12"
              max="24"
              value={parseInt(localSettings.fontSize)}
              onChange={(e) => handleChange('fontSize', `${e.target.value}px`)}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16 text-right">
              {localSettings.fontSize}
            </span>
          </div>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p style={{ fontSize: localSettings.fontSize, fontFamily: localSettings.fontFamily }}>
              Preview: The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>

        {/* SideNav Color */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-gray-900 dark:text-white" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Side Navigation Color
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Customize the sidebar background color
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
            {colorPresets.sideNav.map((color) => (
              <button
                key={color.value}
                onClick={() => handleChange('sideNavColor', color.value)}
                className={`h-12 rounded-lg border-2 transition-all ${
                  localSettings.sideNavColor === color.value
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={localSettings.sideNavColor}
              onChange={(e) => handleChange('sideNavColor', e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={localSettings.sideNavColor}
              onChange={(e) => handleChange('sideNavColor', e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#1e293b"
            />
          </div>
        </div>

        {/* TopNav Color */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-gray-900 dark:text-white" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Top Navigation Color
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Customize the top navigation background color
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {colorPresets.topNav.map((color) => (
              <button
                key={color.value}
                onClick={() => handleChange('topNavColor', color.value)}
                className={`h-12 rounded-lg border-2 transition-all ${
                  localSettings.topNavColor === color.value
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={localSettings.topNavColor}
              onChange={(e) => handleChange('topNavColor', e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={localSettings.topNavColor}
              onChange={(e) => handleChange('topNavColor', e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button variant="secondary" onClick={handleReset}>
          Reset to Default
        </Button>
      </div>
    </div>
  )
}

export default Settings
