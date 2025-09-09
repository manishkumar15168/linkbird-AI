import ResponsiveLayout from '@/components/ResponsiveLayout'
import LeadsTable from '@/components/LeadsTable'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function LeadsPage() {
  return (
    <ProtectedRoute>
      <ResponsiveLayout>
        <LeadsTable />
      </ResponsiveLayout>
    </ProtectedRoute>
  )
}
