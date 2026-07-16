import React, { useState, useMemo } from 'react';
import { BookOpen, Star, Clock, Award, Play, CheckCircle, Video, ArrowRight, Sparkles, Send, GraduationCap } from 'lucide-react';
import { Course, CanliDers, StudentProfile } from '../types';

interface DashboardViewProps {
  profile: StudentProfile;
  courses: Course[];
  liveSessions: CanliDers[];
  onSelectCourse: (courseId: string) => void;
  onAskTutor: (message: string, context: string) => Promise<string>;
  onUpdateProgress: (courseId: string, progress: number, completedLessons: string[]) => void;
}

export default function DashboardView({
  profile,
  courses,
  liveSessions,
  onSelectCourse,
  onAskTutor,
  onUpdateProgress
}: DashboardViewProps) {
  // Find courses student is enrolled in
  const enrolledCoursesList = useMemo(() => {
    return profile.enrolledCourses.map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId);
      return {
        course,
        enrollment
      };
    }).filter(item => item.course !== undefined) as { course: Course; enrollment: any }[];
  }, [profile.enrolledCourses, courses]);

  // Selected Active Learning Course in the viewer
  const [activeCourseId, setActiveCourseId] = useState<string | null>(
    enrolledCoursesList.length > 0 ? enrolledCoursesList[0].course.id : null
  );

  const activeCourseItem = useMemo(() => {
    if (!activeCourseId) return null;
    return enrolledCoursesList.find(item => item.course.id === activeCourseId) || null;
  }, [activeCourseId, enrolledCoursesList]);

  // Selected lesson to play
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(
    activeCourseItem?.course.videos && activeCourseItem.course.videos.length > 0
      ? activeCourseItem.course.videos[0].id
      : null
  );

  const playingVideo = useMemo(() => {
    if (!activeCourseItem || !playingVideoId) return null;
    return activeCourseItem.course.videos?.find(v => v.id === playingVideoId) || null;
  }, [activeCourseItem, playingVideoId]);

  // General dashboard AI chatbot
  const [dashQuestion, setDashQuestion] = useState('');
  const [dashHistory, setDashHistory] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [loadingDashAi, setLoadingDashAi] = useState(false);

  const handleAskDashAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dashQuestion.trim()) return;

    const userMsg = dashQuestion;
    setDashQuestion('');
    setDashHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoadingDashAi(true);

    try {
      const contextString = `Öğrenci Paneli Genel Sohbet. Öğrenci Adı: ${profile.name}. Aktif Kurs Sayısı: ${enrolledCoursesList.length}.`;
      // Convert history for API
      const historyPayload = dashHistory.map(h => ({ sender: h.sender, text: h.text }));
      const response = await onAskTutor(userMsg, contextString);
      setDashHistory(prev => [...prev, { sender: 'bot', text: response }]);
    } catch (err: any) {
      setDashHistory(prev => [...prev, { sender: 'bot', text: "Hata oluştu: " + err.message }]);
    } finally {
      setLoadingDashAi(false);
    }
  };

  // Toggle video completed status and recalculate progress percentage
  const handleToggleLessonCompleted = (lessonId: string) => {
    if (!activeCourseItem) return;
    const { course, enrollment } = activeCourseItem;
    
    let updatedCompleted = [...enrollment.completedLessons];
    if (updatedCompleted.includes(lessonId)) {
      updatedCompleted = updatedCompleted.filter(id => id !== lessonId);
    } else {
      updatedCompleted.push(lessonId);
    }

    // Calculate new progress percentage
    const totalVideos = course.videos ? course.videos.length : 12;
    const newProgress = Math.min(100, Math.round((updatedCompleted.length / totalVideos) * 100));
    
    onUpdateProgress(course.id, newProgress, updatedCompleted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left" id="student-dashboard">
      
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md border border-emerald-700">
        <div className="flex items-center space-x-4 text-center md:text-left">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <GraduationCap className="h-10 w-10 text-amber-300" />
          </div>
          <div className="space-y-1">
            <span className="block text-xs uppercase tracking-widest text-emerald-200 font-mono font-bold">HOŞ GELDİNİZ, KURSİYER</span>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">{profile.name}</h1>
            <p className="text-emerald-100 text-xs font-light">İlim tahsilinizde istikrar ve bereket dileriz. İlerleme durumunuz aşağıda güncellenmiştir.</p>
          </div>
        </div>

        {/* Quick motivational phrase */}
        <div className="bg-emerald-955/60 border border-emerald-700 px-4 py-2.5 rounded-lg text-xs font-mono text-emerald-300 font-semibold text-center max-w-xs shrink-0 leading-relaxed">
          "İlim, rütbelerin en yücesidir."
        </div>
      </div>

      {/* Learning Bento Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6" id="dashboard-stats-grid">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-left space-y-2">
          <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest font-mono">Aktif Sınıflar</span>
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-extrabold text-emerald-800">{enrolledCoursesList.length}</span>
            <BookOpen className="h-5 w-5 text-emerald-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-left space-y-2">
          <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest font-mono">Ders Çalışma Saati</span>
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-extrabold text-emerald-800">{profile.studyHoursThisWeek} Sa / Hafta</span>
            <Clock className="h-5 w-5 text-emerald-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-left space-y-2">
          <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest font-mono">Tamamlanan Dersler</span>
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-extrabold text-emerald-800">
              {profile.enrolledCourses.reduce((acc, curr) => acc + curr.completedLessons.length, 0)} Konu
            </span>
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-left space-y-2">
          <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest font-mono">Kazanılan Rozetler</span>
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-extrabold text-emerald-800">{profile.badges.length} Başarı</span>
            <Award className="h-5 w-5 text-emerald-600 shrink-0" />
          </div>
        </div>
      </div>

      {/* Main learning layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column (Ders Çalışma Grafiği + Öğrenim Odası Viewer) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Enrolled courses tabs */}
          {enrolledCoursesList.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-stone-900 tracking-tight">Eğitimlerim ve İlerleme Sınıfı</h3>
                <span className="text-xs text-stone-400 font-mono">Tıklayarak Çalışma Odasını Açın</span>
              </div>

              {/* Course select tab buttons */}
              <div className="flex flex-wrap gap-2">
                {enrolledCoursesList.map(({ course, enrollment }) => (
                  <button
                    key={course.id}
                    onClick={() => {
                      setActiveCourseId(course.id);
                      if (course.videos && course.videos.length > 0) {
                        setPlayingVideoId(course.videos[0].id);
                      } else {
                        setPlayingVideoId(null);
                      }
                    }}
                    className={`px-4 py-3 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer text-left border flex items-center space-x-2 ${
                      activeCourseId === course.id
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span>{course.title.split(':')[0]}</span>
                    <span className="bg-black/10 text-[9px] px-1.5 py-0.5 rounded font-mono">
                      {enrollment.progress}%
                    </span>
                  </button>
                ))}
              </div>

              {/* Interactive Video Viewer Lecture Room */}
              {activeCourseItem && (
                <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6" id="dashboard-lecture-room">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-mono font-bold">ÖĞRENİM ODASI</span>
                      <h4 className="font-display font-bold text-base text-stone-900 mt-0.5">
                        {activeCourseItem.course.title}
                      </h4>
                    </div>
                    {/* Course Detail quick redirection button */}
                    <button
                      onClick={() => onSelectCourse(activeCourseItem.course.id)}
                      className="text-xs text-emerald-700 hover:text-emerald-950 font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Müfredatı Gör</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Syllabus Videos & Video player placeholder */}
                  {activeCourseItem.course.videos && activeCourseItem.course.videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Video Screen Column */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-inner group">
                          {playingVideo ? (
                            <video
                              key={playingVideo.id}
                              src={playingVideo.url}
                              controls
                              className="w-full h-full object-cover"
                              poster="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-stone-500 font-mono text-xs">
                              Video yüklenemedi.
                            </div>
                          )}
                          
                          {/* Floating active overlay */}
                          <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md font-mono">
                            HLS Medya
                          </div>
                        </div>

                        {playingVideo && (
                          <div className="space-y-1.5 text-left">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 font-mono">Şu An Oynatılan</span>
                            <h5 className="font-display font-semibold text-sm text-stone-900 leading-tight">
                              {playingVideo.title}
                            </h5>
                          </div>
                        )}
                      </div>

                      {/* Video Syllabus List Column */}
                      <div className="md:col-span-5 flex flex-col h-64 overflow-y-auto border border-stone-100 rounded-2xl bg-stone-50/50 p-2 space-y-2">
                        {activeCourseItem.course.videos.map((vid) => {
                          const isPlayed = activeCourseItem.enrollment.completedLessons.includes(vid.id);
                          const isPlaying = playingVideoId === vid.id;
                          
                          return (
                            <div
                              key={vid.id}
                              className={`p-2.5 rounded-lg border flex justify-between items-center gap-2 transition-all cursor-pointer ${
                                isPlaying
                                  ? 'bg-emerald-50 border-emerald-200'
                                  : 'bg-white border-stone-100 hover:border-stone-200'
                              }`}
                              onClick={() => setPlayingVideoId(vid.id)}
                            >
                              <div className="space-y-0.5 text-left flex items-start space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleLessonCompleted(vid.id);
                                  }}
                                  className={`p-1 rounded-full border shrink-0 transition-colors mt-0.5 ${
                                    isPlayed
                                      ? 'bg-emerald-700 text-white border-emerald-700'
                                      : 'bg-stone-50 border-stone-300 hover:bg-stone-100 text-transparent'
                                  }`}
                                >
                                  <CheckCircle className="h-3 w-3 fill-current" />
                                </button>
                                
                                <div>
                                  <span className={`block text-xs font-semibold leading-tight line-clamp-2 ${isPlaying ? 'text-emerald-900' : 'text-stone-800'}`}>
                                    {vid.title}
                                  </span>
                                  <span className="block text-[10px] text-stone-400 font-mono mt-0.5">Süre: {vid.duration}</span>
                                </div>
                              </div>

                              <Play className={`h-3 w-3 shrink-0 ${isPlaying ? 'text-emerald-700' : 'text-stone-300'}`} />
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ) : (
                    /* General No Video syllabus panel fallback */
                    <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 font-mono text-xs">
                      Bu ders sadece canlı yayın derslerinden oluşmaktadır. Kayıt arşivi yakında yüklenecektir.
                    </div>
                  )}

                  {/* Progress bar inside the active course card */}
                  <div className="space-y-2 pt-4 border-t border-stone-100">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold text-stone-700">Ders Tamamlama Oranı</span>
                      <span className="font-bold text-emerald-800">{activeCourseItem.enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-800 h-full rounded-full transition-all duration-500"
                        style={{ width: `${activeCourseItem.enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          ) : (
            /* Dashboard Empty State - No classes enrolled */
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-sm space-y-4">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-full w-fit mx-auto border border-emerald-100">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900 tracking-tight">Kayıtlı Dersiniz Bulunmuyor</h3>
              <p className="text-stone-500 text-xs max-w-md mx-auto leading-relaxed">
                Herhangi bir eğitim programına kayıt yapmamış görünüyorsunuz. Eğitim Kataloğumuzu inceleyerek kendinize uygun dersleri seçebilir ogrenim yolculugunuza baslayabilirsiniz.
              </p>
              <button
                onClick={() => onSelectCourse('catalog')} // Catalog page Redirection
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Eğitim Kataloğuna Git
              </button>
            </div>
          )}

          {/* Plotted Study Activity Chart (Visual custom SVG drawing) */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h4 className="font-display font-bold text-base text-stone-900">
                Haftalık Ders Çalışma Grafiği
              </h4>
              <span className="text-xs text-stone-400 font-mono font-medium">Toplam Çalışma: 8.5 Saat</span>
            </div>

            {/* Custom SVG Bar Graph */}
            <div className="relative pt-4">
              <svg viewBox="0 0 400 150" className="w-full h-40">
                {/* Horizontal guide lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="130" x2="380" y2="130" stroke="#cbd5e1" strokeWidth="1" />

                {/* Left labels (study hours) */}
                <text x="15" y="24" className="text-[9px] font-mono fill-stone-400 font-bold" textAnchor="middle">3 Sa</text>
                <text x="15" y="64" className="text-[9px] font-mono fill-stone-400 font-bold" textAnchor="middle">2 Sa</text>
                <text x="15" y="104" className="text-[9px] font-mono fill-stone-400 font-bold" textAnchor="middle">1 Sa</text>
                <text x="15" y="134" className="text-[9px] font-mono fill-stone-400 font-bold" textAnchor="middle">0 Sa</text>

                {/* Bar drawings */}
                {/* Pazartesi: 1.5 saat (height mapping to y coordinate) */}
                <rect x="65" y="70" width="16" height="60" rx="4" className="fill-emerald-800" />
                {/* Salı: 2.2 saat */}
                <rect x="110" y="42" width="16" height="88" rx="4" className="fill-emerald-800" />
                {/* Çarşamba: 0.8 saat */}
                <rect x="155" y="98" width="16" height="32" rx="4" className="fill-emerald-800" />
                {/* Perşembe: 1.8 saat */}
                <rect x="200" y="58" width="16" height="72" rx="4" className="fill-emerald-800" />
                {/* Cuma: 2.5 saat */}
                <rect x="245" y="30" width="16" height="100" rx="4" className="fill-emerald-800" />
                {/* Cumartesi: 0 saat */}
                <rect x="290" y="130" width="16" height="0" rx="2" className="fill-stone-200" />
                {/* Pazar: 1.2 saat */}
                <rect x="335" y="82" width="16" height="48" rx="4" className="fill-emerald-800" />

                {/* Day labels */}
                <text x="73" y="145" className="text-[8px] font-mono fill-stone-500 font-semibold" textAnchor="middle">Pzt</text>
                <text x="118" y="145" className="text-[8px] font-mono fill-stone-500 font-semibold" textAnchor="middle">Sal</text>
                <text x="163" y="145" className="text-[8px] font-mono fill-stone-500 font-semibold" textAnchor="middle">Çar</text>
                <text x="208" y="145" className="text-[8px] font-mono fill-stone-500 font-semibold" textAnchor="middle">Per</text>
                <text x="253" y="145" className="text-[8px] font-mono fill-stone-500 font-semibold" textAnchor="middle">Cum</text>
                <text x="298" y="145" className="text-[8px] font-mono fill-stone-500 font-semibold" textAnchor="middle">Cmt</text>
                <text x="343" y="145" className="text-[8px] font-mono fill-stone-500 font-semibold" textAnchor="middle">Paz</text>
              </svg>
            </div>
          </div>

        </div>

        {/* Right column (Canlı Ders Programı + dedicated general AI Advisor Chatbot) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Canlı ders list */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-4">
              <Video className="h-5 w-5 text-emerald-800" />
              <h4 className="font-display font-bold text-base text-stone-900">
                Canlı Ders Takvimi
              </h4>
            </div>

            <div className="space-y-4">
              {liveSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3.5 bg-stone-50 border border-stone-100 rounded-lg space-y-2 text-left animate-fade-in"
                  id={`dash-live-item-${session.id}`}
                >
                  <span className="text-[8px] uppercase font-bold tracking-widest text-emerald-800 font-mono block">
                    {session.courseTitle.split(':')[0]}
                  </span>
                  <h5 className="font-display font-bold text-xs text-stone-900 leading-tight">
                    {session.topic}
                  </h5>
                  <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono pt-1">
                    <span>{session.date} - {session.time}</span>
                  </div>
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors inline-block"
                  >
                    Oturumu Başlat
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Academic General AI Advisor helper panel */}
          <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md border border-stone-800 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-300">
              <Sparkles className="h-4 w-4" />
              <h4 className="font-display font-bold text-sm">Yapay Zeka İslami Danışman</h4>
            </div>
            
            <p className="text-stone-300 text-[11px] leading-relaxed font-light">
              Kur'an-ı Kerim ayetleri, Arapça dil bilgisi yapıları, Hadis-i Şerifler veya İslami tahliller ile ilgili sormak istediğiniz soruları buraya yazabilirsiniz.
            </p>

            {/* General chatbot history */}
            {dashHistory.length > 0 && (
              <div className="border border-white/10 rounded-lg p-3 bg-black/40 h-44 overflow-y-auto space-y-3 scrollbar-none text-xs leading-relaxed">
                {dashHistory.map((h, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg text-left ${
                      h.sender === 'user'
                        ? 'bg-emerald-900/40 text-stone-100 ml-6 border border-emerald-800/30'
                        : 'bg-white/10 text-stone-200 mr-6 border border-white/5'
                    }`}
                  >
                    <span className="block font-bold text-[9px] text-emerald-300 uppercase tracking-widest font-mono mb-0.5">
                      {h.sender === 'user' ? 'ÖĞRENCİ' : 'AL-HIKMAH DANIŞMAN'}
                    </span>
                    {h.text}
                  </div>
                ))}
                {loadingDashAi && (
                  <p className="text-[10px] text-emerald-400 font-mono font-semibold animate-pulse">
                    Hoca düşünüyor ve temellendiriyor...
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleAskDashAi} className="flex gap-2">
              <input
                type="text"
                placeholder="Örn: Tecvid ilminde ihfa kuralı nedir?"
                value={dashQuestion}
                onChange={(e) => setDashQuestion(e.target.value)}
                required
                className="w-full text-xs bg-white/10 border border-white/15 px-3.5 py-2.5 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-stone-400 font-sans"
                id="dash-ai-input"
              />
              <button
                type="submit"
                disabled={loadingDashAi}
                className="bg-emerald-700 hover:bg-emerald-600 text-white p-2.5 rounded-lg cursor-pointer shrink-0 transition-all flex items-center justify-center"
                id="dash-ai-submit"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
