import ResponsiveLayout from '@/components/ResponsiveLayout'
import CampaignsList from '@/components/CampaignsList'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function CampaignsPage() {
  return (
    <ProtectedRoute>
      <ResponsiveLayout>
        <CampaignsList />
      </ResponsiveLayout>
    </ProtectedRoute>
  )
}
