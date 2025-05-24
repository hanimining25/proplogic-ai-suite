
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, FileText, Search, Calendar, Users, TrendingUp, Settings, Zap, Bot } from 'lucide-react';

const QuickAccessAssistantTab = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      type: 'assistant',
      message: 'Hello! I\'m your AI assistant. How can I help you today? I can help with proposals, RFPs, deadlines, and more.',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      type: 'user',
      message: 'What proposals are due this week?',
      timestamp: '10:31 AM'
    },
    {
      id: '3',
      type: 'assistant',
      message: 'You have 2 proposals due this week:\n\n1. Enterprise Software Implementation (TechCorp Inc.) - Due Jun 15\n2. Data Analytics Platform (Finance Corp) - Due Jul 10\n\nWould you like me to show you the status of these proposals?',
      timestamp: '10:31 AM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, {
        id: Date.now().toString(),
        type: 'user',
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          message: 'I understand your request. Let me help you with that information.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  };

  const quickActions = [
    { icon: <FileText className="h-4 w-4" />, label: 'Create Proposal', action: 'create-proposal' },
    { icon: <Search className="h-4 w-4" />, label: 'Search RFPs', action: 'search-rfps' },
    { icon: <Calendar className="h-4 w-4" />, label: 'Check Deadlines', action: 'check-deadlines' },
    { icon: <TrendingUp className="h-4 w-4" />, label: 'View Analytics', action: 'view-analytics' },
    { icon: <Users className="h-4 w-4" />, label: 'Client Management', action: 'client-management' },
    { icon: <Settings className="h-4 w-4" />, label: 'Settings', action: 'settings' }
  ];

  const suggestedQuestions = [
    "What's my win rate this month?",
    "Show me high-priority RFPs",
    "Which proposals need urgent attention?",
    "Create a new proposal template",
    "Export this month's report",
    "Schedule a proposal review"
  ];

  const aiCapabilities = [
    { icon: <Bot className="h-4 w-4" />, title: 'Smart Search', description: 'Find proposals, RFPs, and clients instantly' },
    { icon: <Zap className="h-4 w-4" />, title: 'Quick Actions', description: 'Create, update, and manage with simple commands' },
    { icon: <TrendingUp className="h-4 w-4" />, title: 'Analytics', description: 'Get insights and reports on demand' },
    { icon: <Calendar className="h-4 w-4" />, title: 'Scheduling', description: 'Manage deadlines and set reminders' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Quick Access Assistant</h3>
        <p className="text-muted-foreground">Your AI-powered copilot for proposal management. Get instant help, perform quick actions, and access information conversationally.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Assistant Chat
              </CardTitle>
              <CardDescription>Ask questions, request actions, or get help with your proposals</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{chat.message}</p>
                      <p className="text-xs opacity-70 mt-1">{chat.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your proposals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>One-click access to common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {quickActions.map((action, index) => (
                  <Button key={index} variant="outline" className="justify-start" size="sm">
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-muted rounded">
                      {capability.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{capability.title}</p>
                      <p className="text-xs text-muted-foreground">{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suggested Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Questions</CardTitle>
          <CardDescription>Try these common queries to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setMessage(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assistant Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queries Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <p className="text-xs text-muted-foreground">Successful responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1.2s</div>
            <p className="text-xs text-muted-foreground">Lightning fast</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions Completed</CardTitle>
            <Bot className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">156</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickAccessAssistantTab;
