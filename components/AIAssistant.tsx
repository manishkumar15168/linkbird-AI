'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, MessageSquare, TrendingUp, Target, Users } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you with:\n\n• Generate personalized LinkedIn messages\n• Analyze campaign performance\n• Suggest lead engagement strategies\n• Optimize your outreach sequences\n\nWhat would you like help with today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    {
      icon: MessageSquare,
      title: 'Generate Message',
      description: 'Create personalized outreach messages',
      prompt: 'Generate a personalized LinkedIn connection request for a marketing manager at a tech startup'
    },
    {
      icon: TrendingUp,
      title: 'Campaign Analysis',
      description: 'Analyze campaign performance',
      prompt: 'Analyze my current campaign performance and suggest improvements'
    },
    {
      icon: Target,
      title: 'Lead Scoring',
      description: 'Score and prioritize leads',
      prompt: 'Help me score and prioritize my leads based on engagement potential'
    },
    {
      icon: Users,
      title: 'Sequence Optimization',
      description: 'Optimize follow-up sequences',
      prompt: 'Suggest improvements for my follow-up message sequence'
    }
  ]

  const handleSendMessage = async (message?: string) => {
    const userMessage = message || inputMessage.trim()
    if (!userMessage) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage)
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newAIMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('message') || lowerMessage.includes('outreach')) {
      return `Here's a personalized LinkedIn message for you:

**Subject: Quick question about [Company]'s growth**

Hi [Name],

I noticed [Company] has been making impressive strides in [industry/area]. Your recent post about [specific topic] really resonated with me.

I'm working with [Your Company] to help similar companies boost their D2C revenue by at least 2% through AI-powered sales solutions. 

Would you be open to a brief 15-minute call to discuss how this might benefit [Company]?

Best regards,
[Your Name]

---
*This message is personalized, professional, and includes a clear value proposition. Would you like me to adjust the tone or focus on a specific aspect?*`
    }
    
    if (lowerMessage.includes('campaign') || lowerMessage.includes('performance')) {
      return `Based on your campaign data, here's my analysis:

**Current Performance:**
• Total Leads: 20
• Request Sent: 0 (0%)
• Acceptance Rate: 0%
• Reply Rate: 0%

**Key Insights:**
1. **Low Engagement**: No requests have been sent yet
2. **High Lead Pool**: 20 leads ready for outreach
3. **Optimization Opportunity**: Focus on message personalization

**Recommendations:**
1. **Start Outreach**: Begin sending connection requests
2. **A/B Test Messages**: Try different message templates
3. **Timing Optimization**: Send requests during business hours
4. **Follow-up Sequence**: Set up automated follow-ups

Would you like me to help you create a specific action plan?`
    }
    
    if (lowerMessage.includes('lead') || lowerMessage.includes('score')) {
      return `Here's how I'd score your leads:

**High Priority (Score: 8-10):**
• Decision makers with high engagement
• Companies in growth phase
• Recent job changes or promotions

**Medium Priority (Score: 5-7):**
• Mid-level professionals
• Stable companies
• Moderate LinkedIn activity

**Low Priority (Score: 1-4):**
• Inactive profiles
• Unrelated industries
• No recent activity

**Scoring Factors:**
• Job title relevance
• Company size and growth
• LinkedIn engagement
• Recent activity
• Industry alignment

Would you like me to analyze specific leads from your list?`
    }
    
    if (lowerMessage.includes('sequence') || lowerMessage.includes('follow')) {
      return `Here's an optimized follow-up sequence:

**Day 1**: Connection request with personalized message
**Day 3**: Follow-up with value-add content
**Day 7**: Share relevant industry insight
**Day 14**: Direct value proposition
**Day 21**: Final follow-up with clear CTA

**Message Templates:**
1. **Connection**: Personalized intro + value proposition
2. **Follow-up**: Share relevant article or insight
3. **Value-add**: Offer free consultation or resource
4. **Direct**: Clear ask with specific benefit
5. **Final**: Last attempt with different angle

**Best Practices:**
• Space messages 3-7 days apart
• Always add value
• Keep messages under 200 characters
• Use personalization tokens

Would you like me to customize this sequence for your specific campaign?`
    }
    
    return `I understand you're asking about "${userMessage}". 

I'm here to help you with:
• **Message Generation**: Create personalized LinkedIn messages
• **Campaign Analysis**: Analyze performance and suggest improvements  
• **Lead Scoring**: Prioritize leads based on engagement potential
• **Sequence Optimization**: Improve your follow-up strategies

Could you be more specific about what you'd like help with? I can provide detailed guidance on any of these areas.`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-500">Powered by advanced AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(action.prompt)}
                className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <action.icon className="w-4 h-4 text-primary-600" />
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <Bot className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your campaigns, leads, or messaging..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



