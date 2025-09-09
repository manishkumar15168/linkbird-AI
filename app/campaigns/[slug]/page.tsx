import ResponsiveLayout from '@/components/ResponsiveLayout'
import CampaignDetails from '@/components/CampaignDetails'
import ProtectedRoute from '@/components/ProtectedRoute'

interface CampaignPageProps {
  params: {
    slug: string
  }
}

export default function CampaignPage({ params }: CampaignPageProps) {
  return (
    <ProtectedRoute>
      <ResponsiveLayout>
        <CampaignDetails campaignSlug={params.slug} />
      </ResponsiveLayout>
    </ProtectedRoute>
  )
}
