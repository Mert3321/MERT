import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Book, GraduationCap, ChevronDown } from 'lucide-react';

interface AiTutorProps {
  onAskTutor: (message: string, context: string) => Promise<string>;
}

export default function AiTutor({ onAskTutor }: AiTutorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    {
      sender: 'bot',
      text: 'Selamun Aleyküm! Ben Al-Hikmah Ed İslami İlimler ve Arapça Yapay Zeka Akademik Danışmanıyım. Tecvid kuralları, Arapça dil bilgisi ve Kur\'an-ı Kerim konularında dilediğiniz soruyu bana sorabilirsiniz. Size nasıl yardımcı olabilirim?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'Tecvid nedir ve önemi nedir?',
    'Nahiv ile Sarf arasındaki fark nedir?',
    'Arapça kelime türleri nelerdir?'
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userText = textToSend;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await onAskTutor(userText, 'Yüzen Yapay Zeka Hızlı Soru Paneli.');
      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
    } catch (err: any) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorunuzu şu an yanıtlayamıyorum, lütfen biraz sonra tekrar deneyin.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="ai-floating-tutor">
      
      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden mb-4 animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 flex justify-between items-center border-b border-emerald-700 shrink-0">
            <div className="flex items-center space-x-2.5 text-left">
              <div className="bg-white/10 p-2 rounded-xl border border-white/10 text-amber-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm tracking-tight leading-none">Al-Hikmah Yapay Zeka</h4>
                <span className="text-[10px] text-emerald-300 font-mono font-medium block mt-1">Akademik Danışman • Çevrimiçi</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-stone-50/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl text-xs text-left max-w-[85%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white ml-auto rounded-tr-none border border-emerald-900'
                    : 'bg-white text-stone-700 mr-auto rounded-tl-none border border-stone-200'
                }`}
              >
                <span className="block font-bold text-[8px] uppercase tracking-widest mb-1 font-mono">
                  {msg.sender === 'user' ? 'Kursiyer' : 'Al-Hikmah Danışman'}
                </span>
                <span className="whitespace-pre-wrap">{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div className="bg-white text-stone-500 mr-auto rounded-2xl rounded-tl-none border border-stone-200 p-3 text-[10px] font-mono font-bold animate-pulse max-w-[85%] text-left">
                Danışman yanıtını formüle ediyor...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick sample prompt questions suggestions */}
          {messages.length === 1 && !loading && (
            <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex flex-col gap-1.5 text-left shrink-0">
              <span className="text-[9px] font-bold text-stone-400 font-mono uppercase tracking-wider">Hızlı Başlangıç Soruları</span>
              <div className="flex flex-col gap-1">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-[10px] text-emerald-800 hover:bg-emerald-50 border border-emerald-100/60 bg-white rounded-lg p-2 text-left cursor-pointer transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Form Footer input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-stone-200 bg-white flex gap-2 shrink-0">
            <input
              type="text"
              placeholder="Mesajınızı yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-colors"
              id="floating-ai-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-800 hover:bg-emerald-900 text-white p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              id="floating-ai-submit"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Toggle Bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-emerald-700 flex items-center justify-center relative group"
        id="ai-tutor-toggle-bubble"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        
        {/* Decorative Badge Alert */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white font-mono">
            AI
          </span>
        )}
      </button>

    </div>
  );
}
