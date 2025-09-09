'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Search, ExternalLink, Trash2, ChevronUp, ThumbsUp, CheckCircle, Minus } from 'lucide-react'

const leads = [
  {
    id: 1,
    name: 'Om Satyarthy',
    title: 'Regional Head',
    campaign: 'Gynoveda',
    activity: 'yellow',
    status: 'Pending Approval',
    statusType: 'pending',
    avatar: 'OS'
  },
  {
    id: 2,
    name: 'Dr. Bhuvaneshwari',
    title: 'Fertility & Women\'s Health',
    campaign: 'Gynoveda',
    activity: 'yellow',
    status: 'Sent 7 mins ago',
    statusType: 'sent',
    avatar: 'DB'
  },
  {
    id: 3,
    name: 'Surdeep Singh',
    title: 'Building Product-led SEO Growth...',
    campaign: 'Gynoveda',
    activity: 'yellow',
    status: 'Sent 7 mins ago',
    statusType: 'sent',
    avatar: 'SS'
  },
  {
    id: 4,
    name: 'Dilbag Singh',
    title: 'Manager Marketing & Communication at Gynoveda, Author: रंग और यादें',
    campaign: 'Gynoveda',
    activity: 'yellow',
    status: 'Sent 7 mins ago',
    statusType: 'sent',
    avatar: 'DS'
  },
  {
    id: 5,
    name: 'Vanshy Jain',
    title: 'Ayurveda|primary infertility|...',
    campaign: 'Gynoveda',
    activity: 'yellow',
    status: 'Sent 7 mins ago',
    statusType: 'sent',
    avatar: 'VJ'
  },
  {
    id: 6,
    name: 'Sunil Pal',
    title: 'Helping Fashion & Lifestyle Br...',
    campaign: 'Digi Sidekick',
    activity: 'yellow',
    status: 'Pending Approval',
    statusType: 'pending',
    avatar: 'SP'
  },
  {
    id: 7,
    name: 'Utkarsh K.',
    title: 'Airbnb Host | Ex-The Skin Store...',
    campaign: 'The skin story',
    activity: 'purple',
    status: 'Do Not Contact',
    statusType: 'do-not-contact',
    avatar: 'UK'
  },
  {
    id: 8,
    name: 'Shreya Ramakrishna',
    title: 'Deputy Manager - Founder\'s Off...',
    campaign: 'Pokonut',
    activity: 'blue',
    status: 'Followup 10 mins ago',
    statusType: 'followup',
    avatar: 'SR'
  },
  {
    id: 9,
    name: 'Deepak Kumar',
    title: 'Deputy manager Advertising and...',
    campaign: 'Re\'equil',
    activity: 'blue',
    status: 'Followup 10 mins ago',
    statusType: 'followup',
    avatar: 'DK'
  },
  {
    id: 10,
    name: 'Nandita Daman',
    title: 'Marketing Manager',
    campaign: 'Gynoveda',
    activity: 'yellow',
    status: 'Sent 5 mins ago',
    statusType: 'sent',
    avatar: 'ND'
  }
]

const timeline = [
  { type: 'invitation', message: 'Message: Hi Om, I\'m building consultative A', status: 'completed' },
  { type: 'connection', message: 'Check connection status', status: 'pending' },
  { type: 'replied', message: 'View Reply', status: 'completed' }
]

export default function LeadsTable() {
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(leads[0]) // Default to first lead
  const [campaignFilter, setCampaignFilter] = useState('Campaign Name')
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(true)

  // Filter leads based on selected campaign
  const filteredLeads = campaignFilter === 'Campaign Name' 
    ? leads 
    : leads.filter(lead => lead.campaign === campaignFilter)

  // Update selected lead if it's not in the filtered results
  const currentSelectedLead = filteredLeads.find(lead => lead.id === selectedLead?.id) || filteredLeads[0] || null

  // Update selected lead when filter changes
  useEffect(() => {
    if (currentSelectedLead && currentSelectedLead.id !== selectedLead?.id) {
      setSelectedLead(currentSelectedLead)
    }
  }, [currentSelectedLead, selectedLead])

  const getStatusBadge = (statusType: string) => {
    const baseClasses = 'status-badge flex items-center space-x-1'
    switch (statusType) {
      case 'pending':
        return `${baseClasses} status-pending`
      case 'sent':
        return `${baseClasses} status-sent`
      case 'followup':
        return `${baseClasses} status-followup`
      case 'do-not-contact':
        return `${baseClasses} status-do-not-contact`
      default:
        return `${baseClasses} status-active`
    }
  }

  const getActivityBars = (activity: string) => {
    const colors = {
      yellow: 'bg-yellow-400',
      purple: 'bg-purple-400',
      blue: 'bg-blue-400'
    }
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-1 h-4 ${colors[activity as keyof typeof colors] || 'bg-gray-300'}`}></div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* Main Table */}
      <div className="flex-1">
        <div className="card h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={campaignFilter}
                    onChange={(e) => setCampaignFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>Campaign Name</option>
                    <option>Gynoveda</option>
                    <option>Digi Sidekick</option>
                    <option>The skin story</option>
                    <option>Pokonut</option>
                    <option>Re'equil</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <button className="btn-primary">Seek</button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${currentSelectedLead?.id === lead.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">{lead.avatar}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.campaign}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getActivityBars(lead.activity)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">🔍</span>
                        </div>
                        <p className="text-lg font-medium">No leads found</p>
                        <p className="text-sm">No leads match the selected campaign filter</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Profile Sidebar - Always Fixed */}
      <div className="w-96 bg-white border-l border-gray-200 h-full overflow-y-auto">
        {currentSelectedLead ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Lead Profile</h2>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600">{currentSelectedLead.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{currentSelectedLead.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">{currentSelectedLead.title}</p>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  {currentSelectedLead.campaign}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {currentSelectedLead.status}
                </span>
              </div>
            </div>

            {/* Additional Profile Info */}
            <div className="mb-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsProfileInfoOpen(!isProfileInfoOpen)}
              >
                <h4 className="font-medium text-gray-900">Additional Profile Info</h4>
                <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform ${isProfileInfoOpen ? 'rotate-180' : ''}`} />
              </div>
              {isProfileInfoOpen && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">JL</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Jivesh Lakhani</p>
                      <p className="text-sm text-gray-500">ljivesh@gmail.com</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 capitalize">{item.type.replace('-', ' ')}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-lg font-medium">Select a lead</p>
              <p className="text-sm">Click on a lead from the list to view their profile</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
