'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Clock, X, CheckCircle, Send, UserX } from 'lucide-react'

const initialCampaigns = [
  { name: 'Just Herbs', status: 'Active', totalLeads: 20, requestStatus: { sent: 0, pending: 20, rejected: 0 }, connectionStatus: { connected: 0, messaged: 0, rejected: 0 } },
  { name: 'Juicy chemistry', status: 'Active', totalLeads: 11, requestStatus: { sent: 0, pending: 11, rejected: 0 }, connectionStatus: { connected: 0, messaged: 0, rejected: 0 } },
  { name: 'Hyugalife 2', status: 'Active', totalLeads: 19, requestStatus: { sent: 0, pending: 19, rejected: 0 }, connectionStatus: { connected: 0, messaged: 0, rejected: 0 } },
  { name: 'Honeyveda', status: 'Inactive', totalLeads: 3, requestStatus: { sent: 0, pending: 3, rejected: 0 }, connectionStatus: { connected: 0, messaged: 0, rejected: 0 } },
  { name: 'HempStreet', status: 'Active', totalLeads: 7, requestStatus: { sent: 0, pending: 7, rejected: 0 }, connectionStatus: { connected: 0, messaged: 0, rejected: 0 } },
  { name: 'HealthyHey 2', status: 'Inactive', totalLeads: 5, requestStatus: { sent: 0, pending: 5, rejected: 0 }, connectionStatus: { connected: 0, messaged: 0, rejected: 0 } },
]

const now = new Date()
const recentActivitySeed = [
  { name: 'Om Satyarthy', title: 'Regional Head', campaign: 'Gynoveda', status: 'Pending Approval', statusType: 'pending', date: new Date(now.getTime() - 5 * 60 * 1000) },
  { name: 'Dr. Bhuvaneshwari', title: "Fertility & Women's Health", campaign: 'Gynoveda', status: 'Sent 7 mins ago', statusType: 'sent', date: new Date(now.getTime() - 7 * 60 * 1000) },
  { name: 'Surdeep Singh', title: 'Building Product-led SEO Growth...', campaign: 'Gynoveda', status: 'Sent 20 mins ago', statusType: 'sent', date: new Date(now.getTime() - 20 * 60 * 1000) },
  { name: 'Dilbag Singh', title: 'Manager Marketing & Communication', campaign: 'Gynoveda', status: 'Sent yesterday', statusType: 'sent', date: new Date(now.getTime() - 26 * 60 * 60 * 1000) },
  { name: 'Vanshy Jain', title: 'Ayurveda|primary infertility|...', campaign: 'Gynoveda', status: 'Sent 2 days ago', statusType: 'sent', date: new Date(now.getTime() - 48 * 60 * 60 * 1000) },
  { name: 'Sunil Pal', title: 'Helping Fashion & Lifestyle Br...', campaign: 'Digi Sidekick', status: 'Pending Approval', statusType: 'pending', date: new Date(now.getTime() - 2 * 60 * 60 * 1000) },
  { name: 'Utkarsh K.', title: 'Airbnb Host | Ex-The Skin Store...', campaign: 'The skin story', status: 'Do Not Contact', statusType: 'do-not-contact', date: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000) },
  { name: 'Shreya Ramakrishna', title: "Deputy Manager - Founder's Off...", campaign: 'Pokonut', status: 'Followup 10 mins ago', statusType: 'followup', date: new Date(now.getTime() - 10 * 60 * 1000) },
  { name: 'Deepak Kumar', title: 'Deputy manager', campaign: "Re'equil", status: 'Followup 3 days ago', statusType: 'followup', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
]

const linkedinAccounts = [
  { name: 'Pulkit Garg', email: '1999pulkitgarg@gmail.com', status: 'Connected', requests: 17, limit: 30 },
  { name: 'Jivesh Lakhani', email: 'ljivesh@gmail.com', status: 'Connected', requests: 19, limit: 30 },
  { name: 'Indrajit Sahani', email: 'indrajit@example.com', status: 'Connected', requests: 18, limit: 30 },
  { name: 'Bhavya Arora', email: 'bhavyaarora199.ba@gmail.com', status: 'Connected', requests: 18, limit: 100 },
  { name: 'Bhavya From Kand...', email: 'ya@kandid.ai', status: 'Connected', requests: 15, limit: 30 },
]

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [campaignFilter, setCampaignFilter] = useState('All Campaigns')
  const [activityFilter, setActivityFilter] = useState('Most Recent')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newCampaignName, setNewCampaignName] = useState('')
  const [newCampaignStatus, setNewCampaignStatus] = useState<'Active' | 'Inactive'>('Active')
  const [recentActivity] = useState(recentActivitySeed)

  const getStatusBadge = (statusType: string) => {
    const baseClasses = 'status-badge flex items-center space-x-1'
    switch (statusType) {
      case 'pending':
        return `${baseClasses} bg-purple-100 text-purple-800`
      case 'sent':
        return `${baseClasses} bg-orange-100 text-orange-800`
      case 'followup':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'do-not-contact':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} status-active`
    }
  }

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case 'pending':
        return <Clock className="w-3 h-3" />
      case 'sent':
        return <Send className="w-3 h-3" />
      case 'followup':
        return <Send className="w-3 h-3" />
      case 'do-not-contact':
        return <UserX className="w-3 h-3" />
      default:
        return null
    }
  }

  const filteredCampaigns = useMemo(() => {
    if (campaignFilter === 'All Campaigns') return campaigns
    return campaigns.filter(c => c.status === campaignFilter)
  }, [campaigns, campaignFilter])

  const filteredActivity = useMemo(() => {
    if (activityFilter === 'Most Recent') return [...recentActivity].sort((a, b) => b.date.getTime() - a.date.getTime())
    const start = new Date()
    if (activityFilter === 'Today') {
      start.setHours(0, 0, 0, 0)
      return recentActivity.filter(a => a.date >= start).sort((a, b) => b.date.getTime() - a.date.getTime())
    }
    if (activityFilter === 'This Week') {
      const day = start.getDay()
      const diffToMonday = (day + 6) % 7
      start.setDate(start.getDate() - diffToMonday)
      start.setHours(0, 0, 0, 0)
      return recentActivity.filter(a => a.date >= start).sort((a, b) => b.date.getTime() - a.date.getTime())
    }
    return recentActivity
  }, [recentActivity, activityFilter])

  const addCampaign = () => {
    const name = newCampaignName.trim()
    if (!name) return
    setCampaigns(prev => ([
      ...prev,
      {
        name,
        status: newCampaignStatus,
        totalLeads: 0,
        requestStatus: { sent: 0, pending: 0, rejected: 0 },
        connectionStatus: { connected: 0, messaged: 0, rejected: 0 }
      }
    ]))
    setNewCampaignName('')
    setNewCampaignStatus('Active')
    setIsAddOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="btn-primary" onClick={() => setIsAddOpen(true)}>New Campaign</button>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setIsAddOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Campaign</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsAddOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newCampaignStatus}
                  onChange={(e) => setNewCampaignStatus(e.target.value as 'Active' | 'Inactive')}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button className="px-4 py-2 rounded-lg border" onClick={() => setIsAddOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={addCampaign}>Add</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaigns Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Campaigns</h2>
            <div className="relative">
              <select
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>All Campaigns</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            {filteredCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  <span className={`status-badge text-xs ${campaign.status === 'Active' ? 'status-active' : 'status-do-not-contact'}`}>{campaign.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <div className="relative">
              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>Most Recent</option>
                <option>Today</option>
                <option>This Week</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
            <div>Lead</div>
            <div>Campaign</div>
            <div>Status</div>
          </div>
          <div className="space-y-3">
            {filteredActivity.map((activity, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center py-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {activity.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                    <div className="text-xs text-gray-500">{activity.title}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{activity.campaign}</div>
                <div className={getStatusBadge(activity.statusType)}>
                  {getStatusIcon(activity.statusType)}
                  <span className="text-xs">{activity.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LinkedIn Accounts Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">LinkedIn Accounts</h2>
        </div>
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
          <div>Account</div>
          <div>Status</div>
          <div>Requests</div>
        </div>
        <div className="space-y-3">
          {linkedinAccounts.map((account, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-xs">
                    {account.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{account.name}</div>
                  <div className="text-xs text-gray-500">{account.email}</div>
                </div>
              </div>
              <div className="status-badge status-active flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span className="text-xs">{account.status}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-xs">{account.requests}/{account.limit}</span>
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-primary-600 h-1.5 rounded-full" 
                    style={{ width: `${(account.requests / account.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
