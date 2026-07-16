import React from 'react';
import { ArrowRight, BookOpen, Clock, Award, Star, Calendar, MessageSquare, ShieldCheck, HelpCircle, Users } from 'lucide-react';
import { Course, CanliDers, Testimonial } from '../types';

interface HomeViewProps {
  courses: Course[];
  liveSessions: CanliDers[];
  testimonials: Testimonial[];
  onSelectCourse: (courseId: string) => void;
  setCurrentPage: (page: string) => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export default function HomeView({
  courses,
  liveSessions,
  testimonials,
  onSelectCourse,
  setCurrentPage,
  onLoginClick,
  isLoggedIn
}: HomeViewProps) {
  // Highlight 3 main courses on home screen
  const featuredCourses = courses.slice(0, 3);

  // Categories configurations
  const categories = [
    {
      id: 'quran',
      title: 'Apoya Basayım',
      desc: 'Tecvid, mahreç, güzel okuma (tilavet) ve ezber teknikleri.',
      count: courses.filter(c => c.category === 'quran').length,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      icon: '📖'
    },
    {
      id: 'arabic',
      title: 'Arap Dili ve Edebiyatı',
      desc: 'Sıfırdan ileri seviyeye Nahiv, Sarf, konuşma ve klasik metin okumaları.',
      count: courses.filter(c => c.category === 'arabic').length,
      color: 'bg-amber-50 text-amber-800 border-amber-100',
      icon: '✒️'
    },
    {
      id: 'islamic-sciences',
      title: 'Temel İslami İlimler',
      desc: 'Tefsir, Hadis usulü, Fıkıh esasları ve inanç (Akait) dersleri.',
      count: courses.filter(c => c.category === 'islamic-sciences').length,
      color: 'bg-teal-50 text-teal-800 border-teal-100',
      icon: '🕌'
    },
    {
      id: 'history',
      title: 'Tarih ve Medeniyet',
      desc: 'Asr-ı Saadet, Dört Halife dönemi ve büyük İslam devletleri tarihi.',
      count: courses.filter(c => c.category === 'history').length,
      color: 'bg-stone-50 text-stone-800 border-stone-200',
      icon: '🗺️'
    }
  ];

  return (
    <div className="space-y-24 pb-20" id="home-view">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-emerald-950 to-teal-950 text-white pt-20 pb-28 md:pt-28 md:pb-36 px-4" id="home-hero">
        {/* Background Islamic Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-repeat bg-center" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ24bi3Q4pI8kPOOgWPeoFOWt13-BJtsRHW1NWGInME-v2NKsXhWYtfwus7&s=10')" }}></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-300 font-mono self-start">
              <span>🌟 İslami İlimlerde Dijital Rehberiniz</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Sünnet ve Bilginin <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Hikmet Kapısı
              </span>
            </h1>
            
            <p className="text-stone-300 text-base sm:text-lg max-w-xl leading-relaxed font-light">
              Kur'an lisanı Arapça'yı, sahih hadisleri, tefsir, fıkıh ve İslam tarihini alanında yetkin ve icazetli akademisyenlerden canlı dersler ve esnek müfredatlarla öğrenin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('catalog')}
                className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer text-sm"
                id="hero-cta-explore"
              >
                <span>Eğitimleri Keşfet</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              {isLoggedIn ? (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 cursor-pointer text-sm"
                  id="hero-cta-dashboard"
                >
                  <span>Öğrenci Panelim</span>
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="flex items-center justify-center space-x-2 bg-white text-emerald-950 hover:bg-stone-50 font-semibold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer text-sm"
                  id="hero-cta-login"
                >
                  <span>Şimdi Kaydol</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Image/Graphic column */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="relative w-full min-h-[350px] lg:min-h-full group flex-1">
              {/* Outer glowing frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 rounded-2xl blur opacity-35 group-hover:opacity-55 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-stone-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl w-full h-full min-h-[350px] cursor-pointer">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ24bi3Q4pI8kPOOgWPeoFOWt13-BJtsRHW1NWGInME-v2NKsXhWYtfwus7&s=10"
                  alt="Kur'an-ı Kerim Tilaveti"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105 group-hover:saturate-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/10 text-left transition-all duration-300 group-hover:bg-black/80">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-600 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-stone-400 uppercase tracking-wider font-semibold">Yaklaşan Oturum</h4>
                      <p className="text-sm font-semibold text-white">Cumartesi 14:00 - Tecvid Pratikleri</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-20" id="home-stats">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-emerald-800">12K+</span>
            <span className="block text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1.5 font-mono">Aktif Öğrenci</span>
          </div>
          <div className="border-l border-stone-100">
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-emerald-800">45+</span>
            <span className="block text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1.5 font-mono">Uzman Akademisyen</span>
          </div>
          <div className="border-l border-stone-100">
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-emerald-800">98%</span>
            <span className="block text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1.5 font-mono">Memnuniyet Oranı</span>
          </div>
          <div className="border-l border-stone-100">
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-emerald-800">120+</span>
            <span className="block text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1.5 font-mono">Ders Saati / Hafta</span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-categories">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">EĞİTİM KATEGORİLERİ</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            İlgi Alanınıza Göre Eğitimlerimizi İnceleyin
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Maneviyatınızı zenginleştirecek, dil ve tarih ufkunuzu açacak akademik İslami ilimler kürsülerimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCurrentPage('catalog')}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer focus:outline-none flex flex-col justify-between h-56 ${cat.color}`}
              id={`category-card-${cat.id}`}
            >
              <div>
                <span className="text-3xl block mb-4">{cat.icon}</span>
                <h3 className="font-display text-lg font-bold tracking-tight mb-2">{cat.title}</h3>
                <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">{cat.desc}</p>
              </div>
              <div className="flex justify-between items-center w-full pt-4 border-t border-black/5 mt-auto">
                <span className="text-xs font-semibold font-mono">{cat.count} Eğitim Programı</span>
                <span className="text-xs font-bold flex items-center space-x-1">
                  <span>İncele</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-stone-50 py-20 border-y border-stone-200/50" id="home-featured-courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">SEÇKİN EĞİTİMLERİMİZ</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Öne Çıkan Eğitim Programları
              </h2>
              <p className="text-stone-600 text-sm max-w-xl">
                Öğrencilerimiz tarafından en çok ilgi gören ve akademik kadromuzun en popüler dersleri.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('catalog')}
              className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm mt-4 sm:mt-0 cursor-pointer focus:outline-none"
              id="view-all-courses-btn"
            >
              <span>Tüm Kataloğu Gör</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full text-left"
                id={`featured-course-${course.id}`}
              >
                {/* Course Image & Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {course.isLive && (
                    <span className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm font-mono flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-ping"></span>
                      <span>CANLI EĞİTİM</span>
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm">
                    {course.level === 'Baslangic' ? 'Başlangıç Seviyesi' : course.level === 'Orta' ? 'Orta Seviye' : 'İleri Seviye'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display text-lg font-bold tracking-tight text-stone-900 hover:text-emerald-800 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-stone-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Rating / Duration */}
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono mt-4 pt-4 border-t border-stone-100">
                    <div className="flex items-center space-x-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold text-stone-800">{course.rating.toFixed(1)}</span>
                      <span className="text-stone-400">({course.reviewsCount})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-stone-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between mt-auto pt-5">
                    <div className="text-left">
                      <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-mono font-semibold">Program Ücreti</span>
                      <span className="font-display text-lg font-bold text-emerald-800">
                        {typeof course.price === 'number' ? `${course.price} TL` : course.price}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                      id={`course-detail-btn-${course.id}`}
                    >
                      Ders Detayı
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Programs & Live Sessions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-upcoming-sessions">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">DİNAMİK ÖĞRENİM</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
              Canlı Yayın Sınıfları ve İnteraktif Meclisler
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Sadece video dersleri izlemekle kalmayın. Her hafta düzenlenen canlı yayın oturumlarına katılarak hocalarımızla doğrudan etkileşim kurun, telaffuzunuzu düzelttirin ve fıkhi, akademik sorularınızı bizzat yöneltin.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 text-left text-sm">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-800 mt-1 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">İcazet ve Sertifika İmkanı</h4>
                  <p className="text-stone-500 text-xs">Canlı ders devamlılığını sağlayan ve sınavları tamamlayan öğrencilerimize resmi katılım sertifikası sunulur.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-left text-sm">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-800 mt-1 shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Öğrenci Soru-Cevap Odaları</h4>
                  <p className="text-stone-500 text-xs">Sınıf arkadaşlarınızla birlikte yardımlaşabileceğiniz özel çalışma odaları ve tartışma panelleri aktiftir.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions List column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-emerald-700" />
                <h3 className="font-display text-lg font-bold text-stone-900">Yaklaşan Canlı Dersler</h3>
              </div>
              <span className="bg-amber-50 text-amber-800 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full font-mono">
                BU HAFTA
              </span>
            </div>

            <div className="space-y-4">
              {liveSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-xl border border-stone-100 hover:border-emerald-100 bg-stone-50 hover:bg-emerald-50/20 transition-all duration-200 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  id={`live-session-${session.id}`}
                >
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-wider text-emerald-700 font-mono font-bold">
                      {session.courseTitle}
                    </span>
                    <h4 className="font-display font-bold text-sm text-stone-900 leading-tight">
                      {session.topic}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs text-stone-500 font-mono pt-1">
                      <span className="font-semibold text-stone-700">{session.instructorName}</span>
                      <span>|</span>
                      <span>{session.date} - {session.time}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        onLoginClick();
                      } else {
                        setCurrentPage('dashboard');
                      }
                    }}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors shrink-0"
                    id={`join-live-btn-${session.id}`}
                  >
                    Katıl
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel / Grid */}
      <section className="bg-stone-50 py-20 border-y border-stone-200/50" id="home-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">MİSAFİR DEFTERİ</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Öğrencilerimiz Ne Diyor?
            </h2>
            <p className="text-stone-600 text-sm">
              Al-Hikmah Ed ile hayatına manevi ilimlerin ışığını ve Arapça derinliğini katmış kursiyerlerimizin gerçek deneyimleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between text-left"
                id={`testimonial-${test.id}`}
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>
                <div className="flex items-center space-x-3.5 pt-6 mt-6 border-t border-stone-100">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-stone-900 leading-none">{test.name}</h4>
                    <span className="text-stone-400 text-xs mt-1 block font-mono font-medium">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-cta-bottom">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl text-left border border-emerald-700">
          <div className="absolute inset-0 opacity-5 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200')" }}></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl"></div>

          <div className="max-w-3xl space-y-6 relative z-10">
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
              Manevi Yolculuğunuza Bugün Başlayın
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-light">
              Öğretmenlerimizin engin bilgisine, platformumuzun esnek ders modüllerine ve yapay zeka destekli rehberlik asistanımıza dilediğiniz her an, dilediğiniz her cihazdan ulaşın. Şimdi ücretsiz kaydolup ders tahlillerine hemen başlayabilirsiniz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {isLoggedIn ? (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 rounded-lg shadow-sm transition-all duration-200 cursor-pointer text-sm"
                  id="bottom-cta-dashboard"
                >
                  <span>Öğrenci Paneline Git</span>
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 rounded-lg shadow-sm transition-all duration-200 cursor-pointer text-sm"
                  id="bottom-cta-register"
                >
                  <span>Hesap Oluştur ve Başla</span>
                </button>
              )}
              
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer text-sm"
                id="bottom-cta-contact"
              >
                <span>Sıkça Sorulan Sorular / İletişim</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
