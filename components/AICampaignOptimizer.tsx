'use client'

import { useState } from 'react'
import { TrendingUp, Target, Users, MessageSquare, Clock, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react'

interface CampaignMetrics {
  totalLeads: number
  requestSent: number
  requestAccepted: number
  requestReplied: number
  leadsContacted: number
  acceptanceRate: number
  replyRate: number
}

interface AIOptimization {
  id: string
  type: 'performance' | 'timing' | 'messaging' | 'targeting'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  effort: string
  action: string
}

interface AICampaignOptimizerProps {
  campaignMetrics: CampaignMetrics
  onOptimizationApplied?: (optimizationId: string) => void
}

export default function AICampaignOptimizer({ campaignMetrics, onOptimizationApplied }: AICampaignOptimizerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [optimizations, setOptimizations] = useState<AIOptimization[]>([])

  const analyzeCampaign = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const newOptimizations = generateOptimizations(campaignMetrics)
      setOptimizations(newOptimizations)
      setIsAnalyzing(false)
    }, 3000)
  }

  const generateOptimizations = (metrics: CampaignMetrics): AIOptimization[] => {
    const optimizations: AIOptimization[] = []

    // Performance-based optimizations
    if (metrics.requestSent === 0) {
      optimizations.push({
        id: 'start-outreach',
        type: 'performance',
        priority: 'high',
        title: 'Start Sending Connection Requests',
        description: 'No connection requests have been sent yet. Begin your outreach campaign to start generating leads.',
        impact: 'High - Will activate your entire campaign',
        effort: 'Low - Just click send',
        action: 'Send connection requests to your leads'
      })
    }

    if (metrics.acceptanceRate === 0 && metrics.requestSent > 0) {
      optimizations.push({
        id: 'improve-messaging',
        type: 'messaging',
        priority: 'high',
        title: 'Improve Connection Request Messages',
        description: 'Low acceptance rate suggests your messages need improvement. Personalize and add value.',
        impact: 'High - Will increase acceptance rate',
        effort: 'Medium - Requires message optimization',
        action: 'Update connection request templates'
      })
    }

    if (metrics.replyRate === 0 && metrics.requestAccepted > 0) {
      optimizations.push({
        id: 'follow-up-sequence',
        type: 'messaging',
        priority: 'medium',
        title: 'Implement Follow-up Sequence',
        description: 'No replies yet. Set up automated follow-up messages to nurture accepted connections.',
        impact: 'Medium - Will improve engagement',
        effort: 'Medium - Requires sequence setup',
        action: 'Create follow-up message sequence'
      })
    }

    // Timing optimizations
    optimizations.push({
      id: 'optimal-timing',
      type: 'timing',
      priority: 'medium',
      title: 'Optimize Send Times',
      description: 'Send connection requests during business hours (9 AM - 5 PM) for better response rates.',
      impact: 'Medium - 15-20% improvement',
      effort: 'Low - Schedule automation',
      action: 'Set up time-based sending rules'
    })

    // Targeting optimizations
    if (metrics.totalLeads < 50) {
      optimizations.push({
        id: 'expand-targeting',
        type: 'targeting',
        priority: 'medium',
        title: 'Expand Lead Targeting',
        description: 'Small lead pool limits campaign reach. Consider expanding your target criteria.',
        impact: 'High - More potential leads',
        effort: 'High - Requires research',
        action: 'Research and add more target companies'
      })
    }

    // General best practices
    optimizations.push({
      id: 'personalization',
      type: 'messaging',
      priority: 'high',
      title: 'Increase Message Personalization',
      description: 'Use lead-specific information in your messages to improve response rates.',
      impact: 'High - 30-40% improvement',
      effort: 'Medium - Requires data integration',
      action: 'Add personalization tokens to messages'
    })

    return optimizations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <TrendingUp className="w-4 h-4" />
      case 'timing': return <Clock className="w-4 h-4" />
      case 'messaging': return <MessageSquare className="w-4 h-4" />
      case 'targeting': return <Target className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  const applyOptimization = (optimizationId: string) => {
    onOptimizationApplied?.(optimizationId)
    // Remove applied optimization
    setOptimizations(prev => prev.filter(opt => opt.id !== optimizationId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Campaign Optimizer</h3>
            <p className="text-sm text-gray-500">Intelligent recommendations to improve your campaign</p>
          </div>
        </div>
        <button
          onClick={analyzeCampaign}
          disabled={isAnalyzing}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <TrendingUp className="w-4 h-4" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Campaign'}</span>
        </button>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600 animate-pulse" />
            <span className="text-sm font-medium text-gray-700">AI Analysis in Progress</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Analyzing campaign performance and generating optimization recommendations...
          </p>
        </div>
      )}

      {/* Current Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{campaignMetrics.totalLeads}</div>
          <div className="text-sm text-gray-500">Total Leads</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{campaignMetrics.requestSent}</div>
          <div className="text-sm text-gray-500">Requests Sent</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{campaignMetrics.acceptanceRate}%</div>
          <div className="text-sm text-gray-500">Acceptance Rate</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{campaignMetrics.replyRate}%</div>
          <div className="text-sm text-gray-500">Reply Rate</div>
        </div>
      </div>

      {/* Optimizations */}
      {optimizations.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">AI Recommendations</h4>
          {optimizations.map((optimization) => (
            <div key={optimization.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(optimization.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="text-lg font-semibold text-gray-900">{optimization.title}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(optimization.priority)}`}>
                        {optimization.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{optimization.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Impact:</span>
                        <p className="font-medium text-gray-900">{optimization.impact}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Effort:</span>
                        <p className="font-medium text-gray-900">{optimization.effort}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Action:</span>
                        <p className="font-medium text-gray-900">{optimization.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => applyOptimization(optimization.id)}
                    className="btn-primary text-sm"
                  >
                    Apply
                  </button>
                  <button className="btn-secondary text-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Optimizations */}
      {optimizations.length === 0 && !isAnalyzing && (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Optimizations Available</h4>
          <p className="text-gray-500 mb-4">
            Your campaign is performing well! Click "Analyze Campaign" to get fresh AI recommendations.
          </p>
          <button
            onClick={analyzeCampaign}
            className="btn-primary"
          >
            Analyze Campaign
          </button>
        </div>
      )}
    </div>
  )
}

