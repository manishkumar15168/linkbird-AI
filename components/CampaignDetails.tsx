'use client'

import { useState } from 'react'
import { ChevronDown, Users, Clock, X, MessageCircle, Info, Eye, Save, Mail, MessageSquare, Target, Calendar, BarChart3, TrendingUp, Bot, Sparkles } from 'lucide-react'
import AIAssistant from './AIAssistant'
import AIMessageGenerator from './AIMessageGenerator'
import AILeadScoring from './AILeadScoring'
import AICampaignOptimizer from './AICampaignOptimizer'

interface CampaignDetailsProps {
  campaignSlug: string
}

const campaignLeads = [
  {
    id: 1,
    name: 'Sumeet Malhotra',
    title: 'Don\'t Stop When you tired Stop when You\'...',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'SM'
  },
  {
    id: 2,
    name: 'Megha Sabhlok',
    title: 'Co-founder, Just Herbs (acquired by Mari...',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'MS'
  },
  {
    id: 3,
    name: 'Archee P.',
    title: 'Content and Marketing Specialist at Just...',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'AP'
  },
  {
    id: 4,
    name: 'Hindustan Herbs',
    title: 'Co-Founder at Hindustan Herbs',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'HH'
  },
  {
    id: 5,
    name: 'Ritika Ohri',
    title: 'Brand Manager: Marketing, Talent and Inn...',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'RO'
  },
  {
    id: 6,
    name: 'Praveen Kumar Gautam',
    title: 'Vice President - Offline Sales @ Just He...',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'PKG'
  },
  {
    id: 7,
    name: 'Shubham Saboo',
    title: 'Associated as C&F Agent & Superstockiest...',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'SS'
  },
  {
    id: 8,
    name: 'Megha Sabhlok',
    title: 'Brand Director at Just Herbs',
    activity: 'yellow',
    status: 'Pending',
    statusType: 'pending',
    avatar: 'MS'
  }
]

const tabs = [
  { id: 'overview', name: 'Overview', icon: Users },
  { id: 'leads', name: 'Leads', icon: Users },
  { id: 'sequence', name: 'Sequence', icon: MessageCircle },
  { id: 'settings', name: 'Settings', icon: Users }
]

export default function CampaignDetails({ campaignSlug }: CampaignDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [requestMessage, setRequestMessage] = useState('')
  const [messageTemplate, setMessageTemplate] = useState('Hi {{firstName}}, I\'m building consultative AI salespersons for personal care brands with the guarantee to boost your D2C revenue by min of 2%. Would love to connect if you\'re open to exploring this for Just Herbs!')
  const [connectionMessage, setConnectionMessage] = useState('Awesome to connect, {{firstName}}! Allow me to explain Kandid a bit: So these are consultative salespersons that...')
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)

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

  const getStatusBadge = (statusType: string) => {
    const baseClasses = 'status-badge flex items-center space-x-1'
    switch (statusType) {
      case 'pending':
        return `${baseClasses} status-pending`
      default:
        return `${baseClasses} status-active`
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
                    <p className="text-2xl font-bold text-gray-900">20</p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Request Sent</h3>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Request Accepted</h3>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Request Replied</h3>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Campaign Progress */}
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Progress</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Leads Contacted</span>
                        <span className="text-sm text-gray-500">0.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Acceptance Rate</span>
                        <span className="text-sm text-gray-500">0.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Reply Rate</span>
                        <span className="text-sm text-gray-500">0.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Details */}
              <div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Start Date</p>
                        <p className="text-sm text-gray-500">02/09/2025</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Status</p>
                        <p className="text-sm text-gray-500">Active</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Conversion Rate</p>
                        <p className="text-sm text-gray-500">0.0%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Campaign Optimizer */}
            <AICampaignOptimizer 
              campaignMetrics={{
                totalLeads: 20,
                requestSent: 0,
                requestAccepted: 0,
                requestReplied: 0,
                leadsContacted: 0,
                acceptanceRate: 0,
                replyRate: 0
              }}
            />
          </div>
        )

      case 'leads':
        return (
          <div className="space-y-6">
            {/* AI Lead Scoring */}
            <AILeadScoring 
              leads={campaignLeads.map(lead => ({
                id: lead.id,
                name: lead.name,
                title: lead.title,
                company: 'Just Herbs',
                industry: 'Personal Care',
                companySize: 'Medium (100-999)',
                linkedinActivity: 'Medium',
                recentActivity: 'This month',
                jobChange: false,
                engagement: 0
              }))}
            />
            
            {/* Leads Table */}
            <div className="card">
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
                        Lead Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <span>Status</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaignLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">{lead.avatar}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{lead.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getActivityBars(lead.activity)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={getStatusBadge(lead.statusType)}>
                            <Clock className="w-4 h-4" />
                            <span>{lead.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'sequence':
        return (
          <div className="space-y-6">
            {/* AI Message Generator */}
            <AIMessageGenerator 
              leadName="Sumeet Malhotra"
              leadTitle="Marketing Manager"
              leadCompany="Just Herbs"
            />
            
            {/* Request Message */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Request Message</h3>
                <button
                  onClick={() => setIsAIAssistantOpen(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Help</span>
                </button>
              </div>
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Edit your request message here."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Available fields:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{'{{fullName}}'} - Full Name</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{'{{firstName}}'} - First Name</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{'{{lastName}}'} - Last Name</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{'{{jobTitle}}'} - Job Title</span>
                </div>
              </div>
            </div>

            {/* Message Template */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Message Template</h3>
                <div className="flex space-x-2">
                  <button className="btn-secondary flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button className="btn-primary flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">Design your message template using the available fields</p>
              <div className="flex items-start space-x-2 mb-4">
                <Info className="w-4 h-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-600">Use {'{{field_name}}'} to insert mapped fields from your Data.</p>
              </div>
              <div className="relative">
                <div className="absolute top-2 right-2 text-xs text-gray-400">0/270 characters</div>
                <textarea
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                />
              </div>
            </div>

            {/* Connection Message */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Connection Message</h3>
                <div className="flex space-x-2">
                  <button className="btn-secondary flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button className="btn-primary flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
              <textarea
                value={connectionMessage}
                onChange={(e) => setConnectionMessage(e.target.value)}
                placeholder="Edit your connection message here."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={4}
              />
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                  <input
                    type="text"
                    defaultValue="Just Herbs"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    defaultValue="Campaign for Just Herbs brand outreach"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Paused</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Details</h1>
          <p className="text-gray-600 mt-2">Manage and track your campaign performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Bot className="w-4 h-4" />
            <span>AI Assistant</span>
          </button>
          <span className="status-badge status-active">Active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  )
}
