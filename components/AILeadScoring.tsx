'use client'

import { useState, useEffect } from 'react'
import { Brain, TrendingUp, Target, Users, Star, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface Lead {
  id: number
  name: string
  title: string
  company: string
  industry: string
  companySize: string
  linkedinActivity: string
  recentActivity: string
  jobChange: boolean
  engagement: number
  aiScore?: number
  aiInsights?: string[]
}

interface AILeadScoringProps {
  leads: Lead[]
  onScoreUpdate?: (leadId: number, score: number, insights: string[]) => void
}

export default function AILeadScoring({ leads, onScoreUpdate }: AILeadScoringProps) {
  const [scoredLeads, setScoredLeads] = useState<Lead[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    if (leads.length > 0) {
      analyzeLeads()
    }
  }, [leads])

  const analyzeLeads = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const analyzedLeads = leads.map((lead, index) => {
      // Simulate AI analysis delay
      setTimeout(() => {
        setAnalysisProgress(((index + 1) / leads.length) * 100)
      }, index * 200)

      const score = calculateAIScore(lead)
      const insights = generateAIInsights(lead, score)
      
      return {
        ...lead,
        aiScore: score,
        aiInsights: insights
      }
    })

    // Simulate final analysis delay
    setTimeout(() => {
      setScoredLeads(analyzedLeads)
      setIsAnalyzing(false)
      setAnalysisProgress(100)
    }, leads.length * 200 + 500)
  }

  const calculateAIScore = (lead: Lead): number => {
    let score = 0

    // Job title relevance (0-30 points)
    const titleKeywords = ['manager', 'director', 'vp', 'ceo', 'founder', 'head', 'lead']
    const titleLower = lead.title.toLowerCase()
    if (titleKeywords.some(keyword => titleLower.includes(keyword))) {
      score += 25
    } else if (titleLower.includes('senior') || titleLower.includes('sr')) {
      score += 20
    } else {
      score += 10
    }

    // Company size (0-20 points)
    if (lead.companySize === 'Large (1000+)') score += 20
    else if (lead.companySize === 'Medium (100-999)') score += 15
    else if (lead.companySize === 'Small (10-99)') score += 10
    else score += 5

    // LinkedIn activity (0-20 points)
    if (lead.linkedinActivity === 'High') score += 20
    else if (lead.linkedinActivity === 'Medium') score += 15
    else if (lead.linkedinActivity === 'Low') score += 10
    else score += 5

    // Recent activity (0-15 points)
    if (lead.recentActivity === 'This week') score += 15
    else if (lead.recentActivity === 'This month') score += 12
    else if (lead.recentActivity === 'This quarter') score += 8
    else score += 5

    // Job change (0-15 points)
    if (lead.jobChange) score += 15

    return Math.min(100, Math.max(0, score))
  }

  const generateAIInsights = (lead: Lead, score: number): string[] => {
    const insights: string[] = []

    if (score >= 80) {
      insights.push('High-priority lead with excellent engagement potential')
      insights.push('Strong decision-making authority and active LinkedIn presence')
    } else if (score >= 60) {
      insights.push('Good potential with moderate engagement likelihood')
      insights.push('Consider personalized outreach approach')
    } else if (score >= 40) {
      insights.push('Moderate priority - may require more nurturing')
      insights.push('Focus on value-driven messaging')
    } else {
      insights.push('Lower priority - consider automated follow-up')
      insights.push('May need multiple touchpoints for engagement')
    }

    // Specific insights based on lead data
    if (lead.jobChange) {
      insights.push('Recent job change indicates openness to new opportunities')
    }

    if (lead.linkedinActivity === 'High') {
      insights.push('Active on LinkedIn - good response probability')
    }

    if (lead.companySize === 'Large (1000+)') {
      insights.push('Large company - longer sales cycle but higher value potential')
    }

    return insights
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-blue-600 bg-blue-100'
    if (score >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'High Priority'
    if (score >= 60) return 'Medium Priority'
    if (score >= 40) return 'Low Priority'
    return 'Very Low Priority'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4" />
    if (score >= 60) return <TrendingUp className="w-4 h-4" />
    if (score >= 40) return <Clock className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Lead Scoring</h3>
            <p className="text-sm text-gray-500">Intelligent lead prioritization and insights</p>
          </div>
        </div>
        <button
          onClick={analyzeLeads}
          disabled={isAnalyzing}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <Brain className="w-4 h-4" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Re-analyze'}</span>
        </button>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-5 h-5 text-primary-600 animate-pulse" />
            <span className="text-sm font-medium text-gray-700">AI Analysis in Progress</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Analyzing {leads.length} leads... {Math.round(analysisProgress)}% complete
          </p>
        </div>
      )}

      {/* Scored Leads */}
      {scoredLeads.length > 0 && (
        <div className="space-y-4">
          {scoredLeads
            .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
            .map((lead) => (
              <div key={lead.id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">{lead.name}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.aiScore || 0)}`}>
                          {getScoreLabel(lead.aiScore || 0)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{lead.title}</p>
                      <p className="text-sm text-gray-500">{lead.company} • {lead.industry}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getScoreIcon(lead.aiScore || 0)}
                      <span className="text-2xl font-bold text-gray-900">{lead.aiScore}</span>
                    </div>
                    <div className="text-sm text-gray-500">AI Score</div>
                  </div>
                </div>

                {/* AI Insights */}
                {lead.aiInsights && lead.aiInsights.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">AI Insights</h5>
                    <div className="space-y-1">
                      {lead.aiInsights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-600">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lead Details */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Company Size:</span>
                      <p className="font-medium text-gray-900">{lead.companySize}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">LinkedIn Activity:</span>
                      <p className="font-medium text-gray-900">{lead.linkedinActivity}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Recent Activity:</span>
                      <p className="font-medium text-gray-900">{lead.recentActivity}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Job Change:</span>
                      <p className="font-medium text-gray-900">{lead.jobChange ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Summary Stats */}
      {scoredLeads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {scoredLeads.filter(l => (l.aiScore || 0) >= 80).length}
            </div>
            <div className="text-sm text-gray-500">High Priority</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {scoredLeads.filter(l => (l.aiScore || 0) >= 60 && (l.aiScore || 0) < 80).length}
            </div>
            <div className="text-sm text-gray-500">Medium Priority</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {scoredLeads.filter(l => (l.aiScore || 0) >= 40 && (l.aiScore || 0) < 60).length}
            </div>
            <div className="text-sm text-gray-500">Low Priority</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {scoredLeads.filter(l => (l.aiScore || 0) < 40).length}
            </div>
            <div className="text-sm text-gray-500">Very Low Priority</div>
          </div>
        </div>
      )}
    </div>
  )
}

