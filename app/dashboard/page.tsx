import ResponsiveLayout from '@/components/ResponsiveLayout'
import Dashboard from '@/components/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <ResponsiveLayout>
        <Dashboard />
      </ResponsiveLayout>
    </ProtectedRoute>
  )
}
