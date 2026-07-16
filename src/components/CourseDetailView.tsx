import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, BookOpen, Check, MessageSquare, GraduationCap, ChevronDown, ChevronUp, Sparkles, Send } from 'lucide-react';
import { Course, Instructor } from '../types';

interface CourseDetailViewProps {
  course: Course;
  instructor: Instructor;
  onBack: () => void;
  isEnrolled: boolean;
  onEnroll: (courseId: string) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onAskTutor: (message: string, context: string) => Promise<string>;
}

export default function CourseDetailView({
  course,
  instructor,
  onBack,
  isEnrolled,
  onEnroll,
  isLoggedIn,
  onLoginClick,
  onAskTutor
}: CourseDetailViewProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const toggleWeek = (weekNum: number) => {
    if (expandedWeek === weekNum) {
      setExpandedWeek(null);
    } else {
      setExpandedWeek(weekNum);
    }
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setLoadingAi(true);
    setAiAnswer('');
    try {
      const contextString = `Kurs Sayfası: ${course.title}. Eğitmen: ${instructor.name}. Seviye: ${course.level}.`;
      const response = await onAskTutor(aiQuestion, contextString);
      setAiAnswer(response);
    } catch (err: any) {
      setAiAnswer("Maalesef bir hata oluştu: " + err.message);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left" id="course-detail-view">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-stone-500 hover:text-emerald-700 font-bold text-sm cursor-pointer focus:outline-none self-start"
        id="detail-back-btn"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Kataloğa Geri Dön</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-stone-800">
        <div className="absolute inset-0 opacity-5 mix-blend-overlay" style={{ backgroundImage: `url(${course.image})` }}></div>
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <span className="inline-block bg-emerald-700/60 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono">
            {course.category === 'quran' ? 'Kur\'an-ı Kerim' : course.category === 'arabic' ? 'Arapça' : course.category === 'islamic-sciences' ? 'İslami İlimler' : 'Tarih & Medeniyet'}
          </span>
          
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
            {course.title}
          </h1>
          
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
            {course.description}
          </p>

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300 pt-2 font-mono">
            <div className="flex items-center space-x-1.5 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-bold text-white">{course.rating.toFixed(1)}</span>
              <span className="text-stone-400">({course.reviewsCount} Değerlendirme)</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-stone-400" />
              <span>Süre: {course.duration}</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <BookOpen className="h-4 w-4 text-stone-400" />
              <span>{course.lessonsCount} Ders</span>
            </div>

            <span className="bg-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
              {course.level === 'Baslangic' ? 'Başlangıç Seviyesi' : course.level === 'Orta' ? 'Orta Seviye' : 'İleri Seviye'}
            </span>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (Details, syllabus, benefits, audience) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* About Course */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-stone-900 tracking-tight pb-2 border-b border-stone-200">
              Kurs Hakkında Geniş Bilgi
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              {course.longDescription || course.description}
            </p>
          </section>

          {/* Benefits / Outcomes */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-stone-900 tracking-tight pb-2 border-b border-stone-200">
              Bu Eğitimden Neler Kazanacaksınız?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {course.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-sm text-stone-600">
                  <div className="bg-emerald-50 text-emerald-800 p-1 rounded-full mt-0.5 shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="leading-tight font-light">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Target Audience */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-stone-900 tracking-tight pb-2 border-b border-stone-200">
              Kimler Katılmalı?
            </h2>
            <ul className="space-y-2.5 text-sm text-stone-600 list-disc list-inside font-light pl-1">
              {course.audience.map((aud, idx) => (
                <li key={idx} className="marker:text-emerald-700">{aud}</li>
              ))}
            </ul>
          </section>

          {/* Syllabus / Week by week course flow */}
          <section className="space-y-6">
            <h2 className="font-display text-xl font-bold text-stone-900 tracking-tight pb-2 border-b border-stone-200">
              Haftalık Ders Programı (Müfredat)
            </h2>
            
            <div className="space-y-3">
              {course.syllabus.map((wk) => {
                const isExpanded = expandedWeek === wk.week;
                return (
                  <div
                    key={wk.week}
                    className="border border-stone-200 rounded-2xl overflow-hidden bg-white"
                    id={`syllabus-week-${wk.week}`}
                  >
                    {/* Week Header Toggle */}
                    <button
                      onClick={() => toggleWeek(wk.week)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left cursor-pointer hover:bg-stone-50/50"
                    >
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold tracking-widest text-emerald-700 font-mono">HAFTA {wk.week}</span>
                        <h4 className="font-display font-bold text-sm text-stone-900 leading-snug">
                          {wk.title}
                        </h4>
                      </div>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-stone-500 shrink-0" /> : <ChevronDown className="h-5 w-5 text-stone-500 shrink-0" />}
                    </button>

                    {/* Week Details Content */}
                    {isExpanded && (
                      <div className="px-6 pb-5 pt-1 border-t border-stone-100 bg-stone-50/20">
                        <ul className="space-y-2 text-xs text-stone-600 font-mono">
                          {wk.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-center space-x-2">
                              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0"></span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Instructor bio */}
          <section className="bg-stone-50 rounded-2xl border border-stone-200/80 p-6 flex flex-col sm:flex-row gap-6">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-stone-200 shrink-0 mx-auto sm:mx-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 font-mono">DERS EĞİTMENİ</span>
              <h3 className="font-display font-bold text-base text-stone-900 leading-none">{instructor.name}</h3>
              <p className="text-stone-400 text-xs font-mono">{instructor.role}</p>
              <p className="text-stone-600 text-xs leading-relaxed font-light pt-1">
                {instructor.bio.slice(0, 180)}...
              </p>
            </div>
          </section>

        </div>

        {/* Right Column (CTA register box, Course-specific AI helper) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Enrollment Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-mono font-bold mb-1">
              DERS KATILIM TUTARI
            </span>
            
            <div className="flex items-baseline space-x-2">
              <span className="font-display text-3xl font-extrabold text-emerald-800">
                {typeof course.price === 'number' ? `${course.price} TL` : course.price}
              </span>
              {typeof course.price === 'number' && (
                <span className="text-xs text-stone-400 font-mono">tek ödeme / ömür boyu erişim</span>
              )}
            </div>

            <div className="space-y-4 mt-6">
              {isEnrolled ? (
                <div className="space-y-2">
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg p-3 text-center text-xs font-bold font-mono">
                    ✓ BU DERSE KAYITLISINIZ
                  </div>
                  <p className="text-[10px] text-stone-400 text-center font-mono">
                    Öğrenci paneliniz üzerinden canlı oturumlara ve video kütüphanesine erişebilirsiniz.
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      onLoginClick();
                    } else {
                      onEnroll(course.id);
                    }
                  }}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors shadow-sm cursor-pointer text-center block"
                  id="enroll-cta-btn"
                >
                  {isLoggedIn ? 'Hemen Kayıt Ol' : 'Kayıt Olmak İçin Giriş Yap'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-100 text-left text-xs font-mono text-stone-500">
              <div className="space-y-0.5">
                <span className="block font-semibold text-stone-800">Tür:</span>
                <span>{course.isLive ? 'Canlı + Kayıt' : 'Kayıt Eğitim'}</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-semibold text-stone-800">Erişim:</span>
                <span>Ömür Boyu Sınırsız</span>
              </div>
            </div>
          </div>

          {/* AI Advisor course-specific box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-900 mb-4">
              <div className="bg-emerald-700 text-white p-1.5 rounded-lg">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-sm tracking-tight">Müfredat Danışmanına Sor</h3>
            </div>
            
            <p className="text-stone-600 text-[11px] leading-relaxed font-light mb-4">
              Bu dersin içeriği, tecvid kuralları veya Arapça dil bilgisi hedefleriyle alakalı kafanıza takılan bir soruyu yapay zeka danışmanımıza hemen sorun.
            </p>

            <form onSubmit={handleAskAi} className="space-y-3">
              <textarea
                placeholder="Örn: Bu derste idgam-ı meal gunne konusu hangi hafta işlenecek?"
                rows={3}
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                required
                className="w-full text-xs p-3 rounded-lg bg-white border border-emerald-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
                id="detail-ai-textarea"
              />
              <button
                type="submit"
                disabled={loadingAi}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1 shadow-sm"
                id="detail-ai-submit"
              >
                <span>{loadingAi ? 'Danışman Düşünüyor...' : 'Soru Sor'}</span>
                {!loadingAi && <Send className="h-3 w-3" />}
              </button>
            </form>

            {/* AI Response Display */}
            {aiAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-white border border-emerald-100 text-left text-xs font-sans text-stone-700 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-wrap shadow-sm">
                <div className="font-bold text-emerald-800 mb-1 flex items-center space-x-1">
                  <span>Danışman Yanıtı:</span>
                </div>
                {aiAnswer}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
