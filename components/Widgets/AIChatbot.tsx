import React, { useState, useRef, useEffect } from 'react';
import { saveChatLead, ChatLead } from '../../lib/supabase';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface CollectedData {
    name?: string;
    email?: string;
    linkedin_url?: string;
    company?: string;
    role?: string;
}

const SYSTEM_PROMPT = `You are Bogi's AI assistant on her professional website. Your goals are:
1. Build trust by being helpful, professional, and knowledgeable about Bogi's expertise
2. Answer questions about Bogi's background: 14+ years in digital transformation, SAP S/4HANA, PEGA, Lean Six Sigma, €700k+ documented savings
3. Gently collect visitor information: name, email, company, role, LinkedIn profile
4. Encourage LinkedIn connection with Bogi

Keep responses concise (2-3 sentences max). Be warm but professional.
If they haven't shared their name yet, ask for it naturally.
If they ask about services or collaboration, ask for their email to have Bogi reach out.
Always mention LinkedIn connection as a way to stay connected.

Bogi's LinkedIn: https://www.linkedin.com/in/boglarka-paczari-horvath/`;

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! 👋 I'm Bogi's AI assistant. I can tell you about her expertise in digital transformation, process optimization, and SAP/PEGA projects. What would you like to know?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [collectedData, setCollectedData] = useState<CollectedData>({});
    const [leadSaved, setLeadSaved] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Extract data from conversation
    const extractData = (text: string, currentData: CollectedData): CollectedData => {
        const newData = { ...currentData };

        // Email pattern
        const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) newData.email = emailMatch[0];

        // LinkedIn URL pattern
        const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
        if (linkedinMatch) newData.linkedin_url = `https://www.${linkedinMatch[0]}`;

        // Name extraction (simple heuristic - after "I'm" or "My name is")
        const nameMatch = text.match(/(?:I'm|I am|my name is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
        if (nameMatch) newData.name = nameMatch[1];

        // Company extraction
        const companyMatch = text.match(/(?:work at|from|at|company is)\s+([A-Z][A-Za-z0-9\s]+?)(?:\s+as|\s+and|\.|\,|$)/i);
        if (companyMatch) newData.company = companyMatch[1].trim();

        return newData;
    };

    // Save lead to Supabase when we have enough data
    const maybeSaveLead = async (data: CollectedData, conversationSummary: string) => {
        if (leadSaved) return;

        // Save if we have at least email or LinkedIn
        if (data.email || data.linkedin_url) {
            const leadData: ChatLead = {
                name: data.name,
                email: data.email,
                linkedin_url: data.linkedin_url,
                company: data.company,
                role: data.role,
                conversation_summary: conversationSummary,
                lead_score: calculateLeadScore(data),
            };

            const success = await saveChatLead(leadData);
            if (success) {
                setLeadSaved(true);
                console.log('Lead saved to Supabase');
            }
        }
    };

    const calculateLeadScore = (data: CollectedData): number => {
        let score = 0;
        if (data.name) score += 10;
        if (data.email) score += 30;
        if (data.linkedin_url) score += 25;
        if (data.company) score += 20;
        if (data.role) score += 15;
        return score;
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        // Extract data from user message
        const newCollectedData = extractData(userMessage, collectedData);
        setCollectedData(newCollectedData);

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Use Gemini API (already in the project)
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

            const conversationHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');
            const prompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${conversationHistory}\nuser: ${userMessage}\nassistant:`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: prompt,
            });

            const assistantMessage = response.text || "I apologize, I'm having trouble responding. Please try again or contact Bogi directly at horvath.boglarka@hotmail.com";

            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);

            // Try to save lead after each exchange
            const summary = [...messages, { role: 'user', content: userMessage }, { role: 'assistant', content: assistantMessage }]
                .map(m => `${m.role}: ${m.content}`).join('\n');
            await maybeSaveLead(newCollectedData, summary);

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having technical difficulties. Feel free to connect with Bogi directly on LinkedIn: linkedin.com/in/boglarka-paczari-horvath/"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-accent to-accent-dark text-white rounded-full shadow-2xl shadow-accent/40 flex items-center justify-center text-2xl z-50 transition-all hover:scale-110 hover:-translate-y-1 ${isOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Open chat"
            >
                <i className="fas fa-comments"></i>
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-accent to-accent-dark p-5 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <i className="fas fa-robot"></i>
                            </div>
                            <div>
                                <h3 className="font-bold">Bogi's AI Assistant</h3>
                                <p className="text-xs opacity-80">Ask me anything!</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Close chat"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${message.role === 'user'
                                ? 'bg-accent text-white rounded-br-sm'
                                : 'bg-white text-text-primary shadow-sm rounded-bl-sm'
                                }`}>
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-2 border-t border-slate-100 bg-white">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => { setInputValue("What's Bogi's expertise?"); }}
                            className="whitespace-nowrap text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                        >
                            💼 Bogi's expertise
                        </button>
                        <button
                            onClick={() => { setInputValue("I'd like to connect on LinkedIn"); }}
                            className="whitespace-nowrap text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full transition-colors"
                        >
                            <i className="fab fa-linkedin mr-1"></i> Connect on LinkedIn
                        </button>
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-accent/30 text-sm"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            className="w-12 h-12 bg-accent hover:bg-accent-dark text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
                            aria-label="Send message"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIChatbot;
