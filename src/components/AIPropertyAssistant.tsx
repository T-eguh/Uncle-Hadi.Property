import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Sparkles, User, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AIPropertyAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Halo! Saya **Uncle Hadi AI**, asisten properti pribadi Anda. Saya di sini sebagai **Teman Cari Property** Anda untuk menjawab pertanyaan seputar DP ideal, skema KPR, tips investasi, legalitas surat (SHM/HGB), hingga area berkembang di Bekasi dan sekitarnya. Ada yang bisa saya bantu hari ini?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'Berapa DP rumah ideal?',
    'Apa itu KPR?',
    'Apakah investasi apartemen masih bagus?',
    'Bagaimana cara investasi properti?',
    'Apa bedanya SHM dan HGB?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Map history for API
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI Server');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'Maaf, saya sedang mengalami kendala teknis. Silakan tanyakan kembali beberapa saat lagi.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error sending message to AI Assistant:', error);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Maaf, sepertinya ada gangguan koneksi internet. Namun jangan khawatir, Anda juga dapat berkonsultasi langsung secara gratis dengan menghubungi **WhatsApp Uncle Hadi** di nomor **+62 812-3456-7890**!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 min-h-[80vh]" id="ai-chat-section">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8" id="ai-chat-header">
          <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#AA7C11] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            AI Property Assistant
          </div>
          <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
            Tanya AI Seputar Properti
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500">
            Dapatkan jawaban cepat, akurat, dan edukatif mengenai simulasi KPR, legalitas tanah, DP ideal, atau prospek properti kapan saja secara real-time.
          </p>
        </div>

        {/* Chat Widget Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[600px]" id="chat-widget-container">
          {/* Active Title bar */}
          <div className="bg-[#0F172A] p-4 flex items-center justify-between border-b border-[#D4A017]/20" id="chat-title-bar">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4A017] to-[#AA7C11] rounded-full flex items-center justify-center shadow-inner">
                <Sparkles className="h-5 w-5 text-[#0F172A]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Uncle Hadi AI Assistant
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" title="Online"></span>
                </h3>
                <p className="text-xs text-[#F8FAFC]/75 font-medium">Asisten Edukasi Properti Terpercaya</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center text-xs text-[#D4A017] font-semibold bg-[#D4A017]/10 py-1.5 px-3 rounded-full border border-[#D4A017]/20 gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Powered by Gemini 3.5
            </div>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50" id="chat-messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
                id={`chat-msg-${msg.id}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow ${
                  msg.role === 'user' 
                    ? 'bg-[#D4A017] text-[#0F172A]' 
                    : 'bg-[#0F172A] text-white border border-[#D4A017]/30'
                }`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : 'UH'}
                </div>

                {/* Bubble content */}
                <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#D4A017] text-[#0F172A] rounded-tr-none font-medium'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ 
                    // Support basic markdown like **bold** in safe manner
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\* (.*?)/g, '• $1')
                  }} />
                  <span className={`block text-[10px] mt-1 text-right ${
                    msg.role === 'user' ? 'text-[#0F172A]/70' : 'text-gray-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* AI is thinking loader */}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto" id="chat-msg-loading">
                <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold border border-[#D4A017]/30">
                  UH
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 text-sm shadow-sm border border-gray-100 rounded-tl-none flex items-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin text-[#D4A017]" />
                  <span>Uncle Hadi sedang menganalisis...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ / Questions suggestions bar */}
          <div className="p-3 bg-white border-t border-gray-100" id="chat-faq-bar">
            <p className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-[#D4A017]" />
              Rekomendasi pertanyaan untuk Anda tanyakan:
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="bg-slate-100 hover:bg-[#D4A017]/10 border border-slate-200 hover:border-[#D4A017]/30 text-gray-600 hover:text-[#0F172A] text-xs px-3 py-1.5 rounded-full transition font-medium text-left disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input field area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="p-4 bg-slate-50 border-t border-gray-200 flex gap-2"
            id="chat-input-form"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pertanyaan Anda di sini... (Contoh: Berapa DP ideal?)"
              className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all"
              disabled={isLoading}
              id="chat-input-field"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-[#0F172A] hover:bg-[#1E293B] disabled:bg-gray-300 text-[#D4A017] disabled:text-gray-400 p-3 rounded-xl transition duration-200 shadow flex items-center justify-center shrink-0"
              id="chat-send-btn"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
