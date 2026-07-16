import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const faqs = [
    {
      q: 'Ders kayıtlarını daha sonra tekrar izleyebilir miyim?',
      a: 'Evet, katıldığınız tüm canlı derslerin kayıtları, canlı yayın tamamlandıktan hemen sonra Öğrenci Panelinizdeki ders kütüphanesine otomatik olarak yüklenir ve sınırsız süreyle erişiminize açık kalır.'
    },
    {
      q: 'Eğitimlerden sonra sertifika veriliyor mu?',
      a: 'Evet, müfredat kapsamındaki konu tamamlama oranları %80 ve üzeri olan ve dönem sonundaki değerlendirme sınavını başarıyla geçen öğrencilerimize Al-Hikmah Ed onaylı İcazet/Katılım Sertifikası verilmektedir.'
    },
    {
      q: 'Dersler için herhangi bir ön bilgiye sahip olmam gerekir mi?',
      a: 'Hayır, Kur\'an-ı Kerim Tecvid dersimiz ve Arapça Dil Bilgisi programımız tamamen sıfırdan başlayan öğrencilere uygun şekilde tasarlanmıştır. Orta seviye hadis ve siyer programlarımız ise temel İslami ilimler terminolojisine aşina olanlar için idealdir.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(data.error || 'Mesaj gönderilirken hata oluştu.');
      }
    } catch (err: any) {
      setErrorMsg('Bağlantı hatası: Mesaj gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 text-left" id="contact-view">
      
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">BİZE ULAŞIN</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1.5">
          İletişim & Destek
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
          Platformumuz, derslerimiz veya akademik sürecimiz hakkında sormak istediğiniz her konuyu bizimle paylaşabilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column (Form) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-stone-900 tracking-tight">İletişim Formu</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Adınız Soyadınız *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  id="contact-name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">E-posta Adresiniz *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  id="contact-email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Konu Başlığı *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                id="contact-subject"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Mesajınız *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                id="contact-message"
              />
            </div>

            {/* Error or Success notification displays */}
            {successMsg && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-mono font-bold flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-800 border border-red-100 rounded-xl text-xs font-mono font-bold">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-colors shadow-md cursor-pointer flex items-center justify-center space-x-2"
              id="contact-submit"
            >
              <span>{loading ? 'Mesajınız İletiliyor...' : 'Gönder'}</span>
              {!loading && <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>

        {/* Right column (Info Cards & Styled map mockup) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Detailed Info Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-stone-900 tracking-tight">İletişim Kanallarımız</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-emerald-700 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-800">Akademi Merkezi</h4>
                  <p className="text-stone-500 text-xs">İskenderpaşa Mahallesi, Fatih, İstanbul, Türkiye</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-sm">
                <Phone className="h-5 w-5 text-emerald-700 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-800">Telefon Destek</h4>
                  <p className="text-stone-500 text-xs">+90 (212) 555 4321 (Hafta içi 09:00 - 18:00)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Mail className="h-5 w-5 text-emerald-700 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-800">E-posta Adresi</h4>
                  <p className="text-stone-500 text-xs">iletisim@alhikmahed.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Styled SVG Map Mockup */}
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-bold text-sm text-stone-800 leading-none">Kampüs Konumu</h4>
              <span className="text-[10px] font-mono text-stone-400">İstanbul / Fatih</span>
            </div>
            
            {/* Custom styled map container */}
            <div className="relative h-44 bg-emerald-50 rounded-2xl border border-emerald-100 overflow-hidden flex items-center justify-center">
              {/* Abstract map layout inside SVG */}
              <svg viewBox="0 0 300 150" className="w-full h-full opacity-60">
                <rect width="300" height="150" fill="#f4fbf7" />
                
                {/* Streets/Grids line draw */}
                <line x1="20" y1="0" x2="20" y2="150" stroke="#c5d7d1" strokeWidth="2" />
                <line x1="120" y1="0" x2="120" y2="150" stroke="#c5d7d1" strokeWidth="3" />
                <line x1="250" y1="0" x2="250" y2="150" stroke="#c5d7d1" strokeWidth="2" />
                
                <line x1="0" y1="40" x2="300" y2="40" stroke="#c5d7d1" strokeWidth="3" />
                <line x1="0" y1="110" x2="300" y2="110" stroke="#c5d7d1" strokeWidth="2" />

                {/* Styled park rectangle */}
                <rect x="140" y="55" width="90" height="40" fill="#e2ebe8" rx="4" />
                <text x="185" y="78" className="text-[8px] fill-stone-400 font-bold font-mono" textAnchor="middle">Fatih Parkı</text>

                {/* Pin pointer animation */}
                <circle cx="120" cy="40" r="8" className="fill-emerald-800 animate-pulse opacity-30" />
                <circle cx="120" cy="40" r="4" className="fill-emerald-800" />
              </svg>

              {/* Pin Tag tooltip overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 bg-emerald-950 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg shadow-md border border-white/10 font-mono tracking-wide">
                AL-HIKMAH ED
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FAQs Panel */}
      <div className="space-y-8 pt-10 border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">SORULAR VE YANITLAR</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-stone-600 text-sm">
            Eğitim modelimiz, ödeme ve katılım koşulları hakkında kafanıza takılan en yaygın soruların yanıtları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-3"
              id={`contact-faq-${idx}`}
            >
              <div className="flex items-center space-x-2 text-emerald-800">
                <HelpCircle className="h-5 w-5 text-emerald-700 shrink-0" />
                <h4 className="font-display font-bold text-sm text-stone-900 leading-tight">{faq.q}</h4>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed font-light pl-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
