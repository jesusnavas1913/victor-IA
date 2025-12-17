import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { AI_TOOLS } from '../constants';
import { Message } from '../types';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Greetings, Netrunner. I am your Nexus Guide. Ask me about any AI tool in our database or describe your task.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Construct context from our local database
      const context = AI_TOOLS.map(t => `- ${t.name} (${t.category}): ${t.description} Cost: ${t.cost}`).join('\n');
      
      const systemInstruction = `You are the Nexus AI Guide, a cyberpunk-themed assistant for a website listing AI tools. 
      Your tone is helpful, slightly technical, and futuristic.
      Use the following database of tools to answer user questions:
      ${context}
      
      If a user asks about a tool not in this list, answer generally but mention it's not in the Nexus database.
      Keep answers concise and formatted for readability.`;

      const model = 'gemini-2.5-flash';
      
      const response = await ai.models.generateContent({
        model,
        contents: [
            { role: 'user', parts: [{ text: `System Instruction: ${systemInstruction}` }] }, // Prepend instruction as we are using generateContent
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMsg }] }
        ],
      });

      const text = response.text || "Connection interrupted. Please try again.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Access denied. My neural link to the core is disrupted (API Error). Check your credentials." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 p-4 bg-cyber-pink hover:bg-red-600 text-white rounded-full shadow-[0_0_15px_rgba(255,0,60,0.5)] transition-all hover:scale-110 duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} className="animate-spin-slow" />
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-cyber-card/95 backdrop-blur-xl border border-cyber-pink/50 rounded-lg shadow-[0_0_40px_rgba(255,0,60,0.2)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyber-pink/20 to-transparent p-4 border-b border-cyber-pink/30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="text-cyber-pink" />
              <span className="font-mono font-bold text-cyber-pink tracking-wider">NEXUS GUIDE</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-cyber-pink/20 border border-cyber-pink/30 text-white rounded-tr-none' 
                    : 'bg-cyber-dark border border-gray-700 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-cyber-dark border border-gray-700 p-3 rounded-lg rounded-tl-none">
                  <Loader2 size={16} className="animate-spin text-cyber-cyan" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800 bg-cyber-black">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query database..."
                className="flex-1 bg-cyber-dark border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-cyber-pink transition-colors font-mono placeholder-gray-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-cyber-pink/20 border border-cyber-pink/50 text-cyber-pink hover:bg-cyber-pink hover:text-white p-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiAssistant;
