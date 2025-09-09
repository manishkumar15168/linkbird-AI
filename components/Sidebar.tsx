'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  Users, 
  Megaphone, 
  MessageSquare, 
  Linkedin, 
  Settings, 
  FileText, 
  UserCheck,
  ChevronDown,
  LogOut,
  Bot
} from 'lucide-react'
import { useAuth } from './AuthProvider'
import AIAssistant from './AIAssistant'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Campaign', href: '/campaigns', icon: Megaphone },
  { name: 'Messages', href: '/messages', icon: MessageSquare, badge: '10+' },
  { name: 'LinkedIn Accounts', href: '/linkedin', icon: Linkedin },
]

const settings = [
  { name: 'Setting & Billing', href: '/settings', icon: Settings },
]

const adminPanel = [
  { name: 'Activity logs', href: '/activity-logs', icon: FileText },
  { name: 'User logs', href: '/user-logs', icon: UserCheck },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🐦</span>
          </div>
          <span className="text-xl font-bold text-gray-900">LinkBird</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-sm">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'PE'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.name || 'Kandid Personal'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        {isProfileOpen && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Settings */}
        <div className="pt-4">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Settings
          </p>
          <div className="space-y-1">
            {settings.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin Panel */}
        <div className="pt-4">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Admin Panel
          </p>
          <div className="space-y-1">
            {adminPanel.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="pt-4">
          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            <Bot className="w-5 h-5" />
            <span>AI Assistant</span>
          </button>
        </div>
      </nav>

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  )
}
