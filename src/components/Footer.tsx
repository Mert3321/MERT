import React, { useState } from 'react';
import { GraduationCap, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  onSelectCourse: (courseId: string | null) => void;
}

export default function Footer({ setCurrentPage, onSelectCourse }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleLinkClick = (pageId: string) => {
    onSelectCourse(null);
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-700 p-2 rounded-lg text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white leading-none">
                AL-HIKMAH ED
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              İslami ilimleri ve Arapça dil eğitimini modern teknolojiyle buluşturarak, dileyen herkesin doğru bilgiye güvenilir kaynaklardan, esnek koşullarla ulaşmasını hedefleyen yenilikçi öğrenim platformu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none">
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('catalog')} className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none">
                  Eğitim Kataloğu
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('instructors')} className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none">
                  Eğitmenlerimiz
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none">
                  Hakkımızda
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none">
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-white font-semibold text-sm uppercase tracking-wider mb-5">
              İletişim Bilgileri
            </h3>
            <ul className="space-y-4 text-sm text-stone-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>İskenderpaşa Mh. Fatih, İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>+90 (212) 555 4321</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>iletisim@alhikmahed.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h3 className="font-display text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Bültenimize Katılın
            </h3>
            <p className="text-sm text-stone-400 mb-4 leading-relaxed">
              Yeni açılacak canlı eğitim programları, ücretsiz webinerler ve akademik yayınlardan ilk siz haberdar olun.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-stone-800 text-stone-200 text-sm px-4 py-2.5 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 border border-transparent"
                  id="newsletter-email"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 rounded-r-xl transition-colors cursor-pointer flex items-center justify-center"
                  id="newsletter-submit"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-medium mt-1 animate-pulse">
                  Kayıt başarılı! Haber bültenimize abone oldunuz.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500">
          <p>© 2026 Al-Hikmah Ed. Tüm Hakları Saklıdır.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-emerald-400 transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Gizlilik Sözleşmesi</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">KVKK Aydınlatma Metni</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
