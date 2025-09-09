'use client'

import { CheckCircle, ExternalLink, Minus, ThumbsUp, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export interface LeadItem {
  id: number
  name: string
  title: string
  campaign: string
  status: string
  statusType: string
  avatar: string
}

interface LeadProfileDrawerProps {
  open: boolean
  lead: LeadItem | null
  onClose: () => void
}

const defaultTimeline = [
  { type: 'invitation', message: "Message: Hi, I'm building consultative A", status: 'completed' },
  { type: 'connection', message: 'Check connection status', status: 'pending' },
  { type: 'connection acceptance message', message: 'Awesome to connect...', status: 'completed' },
  { type: 'follow-up 1', message: 'Hey, did you get a chance...', status: 'pending' },
]

export default function LeadProfileDrawer({ open, lead, onClose }: LeadProfileDrawerProps) {
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(true)
  if (!open || !lead) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black bg-opacity-40" onClick={onClose} />
      <aside className="w-full max-w-md h-full bg-white shadow-xl border-l border-gray-200">
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lead Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-gray-600">{lead.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">{lead.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {lead.campaign}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {lead.status}
            </span>
          </div>

          <div>
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
                    <span className="text-primary-600 font-semibold text-sm">{lead.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">example@email.com</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {defaultTimeline.map((item, index) => (
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
                  <p className="text-sm font-medium text-gray-900 capitalize">{item.type}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}


