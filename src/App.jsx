import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SettingsProvider } from './contexts/SettingsContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tables from './pages/Tables'
import Students from './pages/Students'
import Images from './pages/Images'
import Charts from './pages/Charts'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import TopNav from './components/TopNav'
import SideNav from './components/SideNav'
import Footer from './components/Footer'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [])

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    // Prevent body scroll when menu is open
    if (newState) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.classList.remove('menu-open')
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <SideNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <div className="flex-1 flex flex-col w-full lg:ml-64 h-screen overflow-hidden relative">
        {/* Fixed TopNav */}
        <div className="fixed top-0 right-0 left-0 lg:left-64 z-30">
          <TopNav onMenuClick={toggleMobileMenu} />
        </div>
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto pt-16 pb-20">
          {children}
        </main>
        
        {/* Fixed Footer */}
        <div className="fixed bottom-0 right-0 left-0 lg:left-64 z-30">
          <Footer />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tables"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Tables />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Students />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/images"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Images />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/charts"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Charts />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </SettingsProvider>
  )
}

export default App
