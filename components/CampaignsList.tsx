'use client'

import { useState } from 'react'
import { ChevronDown, Search, Users, Clock, X, MessageCircle, Plus, Save, X as XIcon } from 'lucide-react'
import Link from 'next/link'

const campaigns = [
  { 
    id: 1,
    name: 'Fix My Curls', 
    status: 'Active', 
    totalLeads: 12, 
    requestStatus: { sent: 0, pending: 12, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  },
  { 
    id: 2,
    name: 'Fitspire', 
    status: 'Active', 
    totalLeads: 12, 
    requestStatus: { sent: 0, pending: 12, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  },
  { 
    id: 3,
    name: 'FitDay', 
    status: 'Active', 
    totalLeads: 5, 
    requestStatus: { sent: 0, pending: 5, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  },
  { 
    id: 4,
    name: 'FB Nutrition', 
    status: 'Active', 
    totalLeads: 4, 
    requestStatus: { sent: 0, pending: 4, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  },
  { 
    id: 5,
    name: 'Dr. Dento', 
    status: 'Active', 
    totalLeads: 4, 
    requestStatus: { sent: 0, pending: 4, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  },
  { 
    id: 6,
    name: 'COAL Clean Beauty', 
    status: 'Active', 
    totalLeads: 9, 
    requestStatus: { sent: 0, pending: 9, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  },
  { 
    id: 7,
    name: 'Digi Sidekick', 
    status: 'Active', 
    totalLeads: 37, 
    requestStatus: { sent: 37, pending: 0, rejected: 0 }, 
    connectionStatus: { connected: 12, messaged: 0, rejected: 0 } 
  },
  { 
    id: 8,
    name: 'Gynoveda', 
    status: 'Active', 
    totalLeads: 60, 
    requestStatus: { sent: 15, pending: 0, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  },
  { 
    id: 9,
    name: 'Cholayil', 
    status: 'Active', 
    totalLeads: 69, 
    requestStatus: { sent: 0, pending: 69, rejected: 0 }, 
    connectionStatus: { connected: 0, messaged: 0, rejected: 0 } 
  }
]

export default function CampaignsList() {
  const [activeTab, setActiveTab] = useState('All Campaigns')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [campaignsList, setCampaignsList] = useState(campaigns)
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    status: 'Active'
  })

  const tabs = ['All Campaigns', 'Active', 'Inactive']

  const handleCreateCampaign = () => {
    if (newCampaign.name.trim()) {
      const campaign = {
        id: campaignsList.length + 1,
        name: newCampaign.name,
        status: newCampaign.status,
        totalLeads: 0,
        requestStatus: { sent: 0, pending: 0, rejected: 0 },
        connectionStatus: { connected: 0, messaged: 0, rejected: 0 }
      }
      
      setCampaignsList([...campaignsList, campaign])
      setNewCampaign({ name: '', description: '', status: 'Active' })
      setIsCreateModalOpen(false)
    }
  }

  const handleCloseModal = () => {
    setIsCreateModalOpen(false)
    setNewCampaign({ name: '', description: '', status: 'Active' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-2">Manage your campaigns and track their performance.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Connection Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignsList.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/campaigns/${campaign.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="status-badge status-active">{campaign.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{campaign.totalLeads}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          <Users className="w-4 h-4" />
                          <Plus className="w-3 h-3 -ml-1" />
                        </div>
                        <span>{campaign.requestStatus.sent}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{campaign.requestStatus.pending}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <X className="w-4 h-4 text-red-500" />
                        <span>{campaign.requestStatus.rejected}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          <Users className="w-4 h-4" />
                          <Plus className="w-3 h-3 -ml-1" />
                        </div>
                        <span>{campaign.connectionStatus.connected}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{campaign.connectionStatus.messaged}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Create New Campaign</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="Enter campaign name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  placeholder="Enter campaign description (optional)"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newCampaign.status}
                  onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!newCampaign.name.trim()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>Create Campaign</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
