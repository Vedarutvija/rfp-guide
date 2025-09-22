import { useState } from "react";
import { Send, Bot, User, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  sources?: string[];
}

export const InquiryBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your RFP inquiry assistant. I can help you with questions about uploaded RFPs, UAE MOF policies, benefits, and regulatory guidelines. What would you like to know?',
      timestamp: '10:00 AM',
      sources: []
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    "What are the key compliance requirements in the latest RFP?",
    "What is the deadline for technical proposal submission?",
    "What are the UAE MOF procurement policies for IT services?",
    "What are the evaluation criteria for vendor selection?"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Based on the uploaded RFP documents and UAE MOF policies, here's what I found regarding your question: "${inputMessage}"\n\nThe key requirements include compliance with UAE Federal Law No. 6 of 2023, adherence to technical specifications outlined in section 3.2, and submission deadlines as per the procurement timeline. All proposals must include mandatory documentation as specified in the guidelines.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: ['RFP_Document_2024.pdf', 'UAE_MOF_Policies.pdf', 'Procurement_Guidelines.pdf']
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="shadow-card h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>RFP Inquiry Assistant</span>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </CardTitle>
            <CardDescription>
              Ask questions about RFPs, policies, and regulatory guidelines
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-accent-foreground" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {message.timestamp}
                        </span>
                        {message.sources && message.sources.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <FileText className="h-3 w-3" />
                            <span className="text-xs">{message.sources.length} sources</span>
                          </div>
                        )}
                      </div>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-muted-foreground/20">
                          <p className="text-xs font-medium mb-1">Sources:</p>
                          <div className="space-y-1">
                            {message.sources.map((source, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs mr-1">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about RFPs, policies, or guidelines..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions & Info */}
      <div className="space-y-6">
        {/* Sample Questions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-sm">Sample Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sampleQuestions.map((question, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="w-full text-left text-xs p-2 h-auto whitespace-normal justify-start"
                onClick={() => setInputMessage(question)}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>
        
        {/* Available Documents */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-sm">Available Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">RFP Documents</span>
              </div>
              <Badge>12 Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">UAE MOF Policies</span>
              </div>
              <Badge>Updated</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Guidelines</span>
              </div>
              <Badge variant="outline">Syncing</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};