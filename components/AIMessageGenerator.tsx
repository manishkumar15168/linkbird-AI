'use client'

import { useState } from 'react'
import { Sparkles, Copy, RefreshCw, Target, Users, MessageSquare, TrendingUp } from 'lucide-react'

interface AIMessageGeneratorProps {
  leadName?: string
  leadTitle?: string
  leadCompany?: string
  onMessageGenerated?: (message: string) => void
}

export default function AIMessageGenerator({ 
  leadName = '', 
  leadTitle = '', 
  leadCompany = '',
  onMessageGenerated 
}: AIMessageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [messageType, setMessageType] = useState('connection')
  const [tone, setTone] = useState('professional')
  const [industry, setIndustry] = useState('')
  const [valueProposition, setValueProposition] = useState('')

  const messageTypes = [
    { id: 'connection', name: 'Connection Request', icon: Users },
    { id: 'followup', name: 'Follow-up Message', icon: MessageSquare },
    { id: 'value', name: 'Value Proposition', icon: Target },
    { id: 'closing', name: 'Closing Message', icon: TrendingUp }
  ]

  const tones = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly' },
    { id: 'direct', name: 'Direct' },
    { id: 'consultative', name: 'Consultative' }
  ]

  const generateMessage = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const message = createAIMessage()
      setGeneratedMessage(message)
      onMessageGenerated?.(message)
      setIsGenerating(false)
    }, 2000)
  }

  const createAIMessage = (): string => {
    const name = leadName || '[Name]'
    const title = leadTitle || '[Job Title]'
    const company = leadCompany || '[Company]'
    
    switch (messageType) {
      case 'connection':
        return `Hi ${name},

I noticed your work as ${title} at ${company} and was impressed by your recent insights on [industry topic].

I'm reaching out because I believe there's a great opportunity for collaboration. At [Your Company], we help companies like ${company} boost their D2C revenue by at least 2% through AI-powered sales solutions.

Would you be interested in a brief 15-minute call to explore how this might benefit ${company}?

Best regards,
[Your Name]`

      case 'followup':
        return `Hi ${name},

Following up on my previous message about helping ${company} boost D2C revenue.

I thought you might find this interesting: [relevant industry insight or case study].

Given your role as ${title}, I believe there's significant potential for ${company} to leverage AI-driven sales optimization.

Would you be open to a quick call this week to discuss?

Best,
[Your Name]`

      case 'value':
        return `Hi ${name},

I've been following ${company}'s growth and noticed some exciting developments in your market.

As ${title}, you're likely focused on driving revenue growth. I wanted to share how we've helped similar companies achieve:

• 2-5x increase in D2C revenue
• 40% improvement in conversion rates
• 60% reduction in sales cycle time

Would you be interested in a brief case study discussion?

Best regards,
[Your Name]`

      case 'closing':
        return `Hi ${name},

I understand you're busy, so I'll keep this brief.

We've helped companies like ${company} achieve significant revenue growth through AI-powered sales optimization.

If you're interested in exploring this further, I'd love to schedule a 15-minute call to discuss how this could benefit ${company}.

If not, no worries - I'll respect your time and won't follow up again.

Best,
[Your Name]`

      default:
        return 'Please select a message type.'
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage)
    // You could add a toast notification here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Message Generator</h3>
          <p className="text-sm text-gray-500">Generate personalized LinkedIn messages using AI</p>
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Message Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Message Type</label>
          <div className="grid grid-cols-2 gap-2">
            {messageTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setMessageType(type.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  messageType === type.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Tone</label>
          <div className="grid grid-cols-2 gap-2">
            {tones.map((toneOption) => (
              <button
                key={toneOption.id}
                onClick={() => setTone(toneOption.id)}
                className={`p-3 rounded-lg border transition-colors ${
                  tone === toneOption.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm font-medium">{toneOption.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lead Name</label>
          <input
            type="text"
            value={leadName}
            onChange={(e) => {/* Handle change */}}
            placeholder="Enter lead name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            value={leadTitle}
            onChange={(e) => {/* Handle change */}}
            placeholder="Enter job title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <input
            type="text"
            value={leadCompany}
            onChange={(e) => {/* Handle change */}}
            placeholder="Enter company name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={generateMessage}
          disabled={isGenerating}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Message</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Message */}
      {generatedMessage && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Generated Message</h4>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="btn-secondary flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={generateMessage}
                disabled={isGenerating}
                className="btn-secondary flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-gray-900 font-mono">
              {generatedMessage}
            </pre>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>AI Tip:</strong> This message is personalized based on the lead's information and optimized for LinkedIn's character limits. Remember to customize the placeholders before sending.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}



