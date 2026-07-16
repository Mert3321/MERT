import React, { useState, useMemo } from 'react';
import { COURSES, INSTRUCTORS, CANLI_DERSLER, TESTIMONIALS } from './data';
import { Course, Instructor, CanliDers, Testimonial, StudentProfile, Enrollment } from './types';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import InstructorsView from './components/InstructorsView';
import CatalogView from './components/CatalogView';
import CourseDetailView from './components/CourseDetailView';
import DashboardView from './components/DashboardView';
import ContactView from './components/ContactView';
import AiTutor from './components/AiTutor';

import { X, Sparkles, LogIn, Mail, Lock } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('kursiyer@alhikmahed.com');
  const [loginPassword, setLoginPassword] = useState<string>('123456');

  // Student Profile state
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: 'Ahmet Hakan Erdem',
    email: 'kursiyer@alhikmahed.com',
    enrolledCourses: [
      {
        courseId: 'course-1',
        progress: 45,
        completedLessons: ['l-1', 'l-2']
      },
      {
        courseId: 'course-2',
        progress: 70,
        completedLessons: ['la-1', 'la-2', 'la-3']
      }
    ],
    activeCourses: 2,
    completedCourses: 0,
    studyHoursThisWeek: 8.5,
    badges: ['Manevi Kaşif', 'Arapça Sevdalısı']
  });

  // Fetch API tutor response
  const handleAskTutor = async (message: string, context: string): Promise<string> => {
    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          context,
          history: [] // history could be appended here
        })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data.text;
    } catch (err: any) {
      console.error('Tutor error:', err);
      return 'Bağlantı hatası: Yapay Zeka Danışmanına şu an ulaşılamıyor.';
    }
  };

  // Enroll in a course
  const handleEnrollInCourse = (courseId: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // Check if already enrolled
    const exists = studentProfile.enrolledCourses.some((c) => c.courseId === courseId);
    if (exists) return;

    const newEnrollment: Enrollment = {
      courseId,
      progress: 0,
      completedLessons: []
    };

    const updatedProfile = {
      ...studentProfile,
      enrolledCourses: [...studentProfile.enrolledCourses, newEnrollment],
      activeCourses: studentProfile.activeCourses + 1
    };

    setStudentProfile(updatedProfile);
    
    // Take student immediately to dashboard so they can learn
    setCurrentPage('dashboard');
    setSelectedCourseId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update progress
  const handleUpdateProgress = (courseId: string, progress: number, completedLessons: string[]) => {
    const updatedCourses = studentProfile.enrolledCourses.map((enrollment) => {
      if (enrollment.courseId === courseId) {
        return {
          ...enrollment,
          progress,
          completedLessons
        };
      }
      return enrollment;
    });

    // Check completed courses
    const completedCoursesCount = updatedCourses.filter(c => c.progress === 100).length;

    setStudentProfile({
      ...studentProfile,
      enrolledCourses: updatedCourses,
      completedCourses: completedCoursesCount
    });
  };

  // Perform user login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const handleSelectCourse = (courseId: string | null) => {
    setSelectedCourseId(courseId);
    if (courseId) {
      setCurrentPage('detail');
    }
  };

  // Map selected course
  const activeCourse = useMemo(() => {
    if (!selectedCourseId) return null;
    return COURSES.find((c) => c.id === selectedCourseId) || null;
  }, [selectedCourseId]);

  const activeInstructor = useMemo(() => {
    if (!activeCourse) return null;
    return INSTRUCTORS.find((i) => i.id === activeCourse.instructorId) || null;
  }, [activeCourse]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900" id="app-root">
      {/* Navigation bar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSelectCourse={handleSelectCourse}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomeView
            courses={COURSES}
            liveSessions={CANLI_DERSLER}
            testimonials={TESTIMONIALS}
            onSelectCourse={handleSelectCourse}
            setCurrentPage={setCurrentPage}
            onLoginClick={() => setShowLoginModal(true)}
            isLoggedIn={isLoggedIn}
          />
        )}

        {currentPage === 'catalog' && (
          <CatalogView
            courses={COURSES}
            instructors={INSTRUCTORS}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {currentPage === 'instructors' && (
          <InstructorsView
            instructors={INSTRUCTORS}
            courses={COURSES}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {currentPage === 'about' && <AboutView />}

        {currentPage === 'contact' && <ContactView />}

        {currentPage === 'detail' && activeCourse && activeInstructor && (
          <CourseDetailView
            course={activeCourse}
            instructor={activeInstructor}
            onBack={() => handleSelectCourse(null)}
            isEnrolled={studentProfile.enrolledCourses.some((c) => c.courseId === activeCourse.id)}
            onEnroll={handleEnrollInCourse}
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setShowLoginModal(true)}
            onAskTutor={handleAskTutor}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardView
            profile={studentProfile}
            courses={COURSES}
            liveSessions={CANLI_DERSLER}
            onSelectCourse={handleSelectCourse}
            onAskTutor={handleAskTutor}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </main>

      {/* Footer bar */}
      <Footer
        setCurrentPage={setCurrentPage}
        onSelectCourse={handleSelectCourse}
      />

      {/* Floating Global Yapay Zeka Danışmanı Bubble */}
      <AiTutor onAskTutor={handleAskTutor} />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="login-modal-overlay">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden animate-fade-in text-left">
            
            {/* Header banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-stone-300 hover:text-white p-1 rounded-lg"
                id="close-login-modal"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2 text-amber-300">
                <Sparkles className="h-5 w-5" />
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold">AKADEMİ PORTALI</span>
              </div>
              <h3 className="font-display font-bold text-xl tracking-tight mt-1">Öğrenci Girişi</h3>
              <p className="text-stone-300 text-xs font-light mt-1">Al-Hikmah Ed ilim meclislerine ve kişisel ilerleme panelinize erişin.</p>
            </div>

            {/* Login Form body */}
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono flex items-center space-x-1">
                  <Mail className="h-3 w-3 text-stone-400" />
                  <span>E-posta Adresi</span>
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  id="modal-email-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono flex items-center space-x-1">
                  <Lock className="h-3 w-3 text-stone-400" />
                  <span>Şifre</span>
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  id="modal-password-input"
                />
              </div>

              {/* Fast autofill helper guide */}
              <div className="p-3 bg-stone-50 border border-stone-200/50 rounded-xl text-[10px] text-stone-500 font-mono leading-relaxed">
                <span className="font-bold text-emerald-800">Hızlı Test Girişi:</span> <br />
                Giriş bilgilerini değiştirmeden doğrudan <span className="font-bold">Giriş Yap</span> butonuna basarak öğrenci panelinizi test edebilirsiniz.
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-md cursor-pointer flex items-center justify-center space-x-2"
                id="modal-login-submit"
              >
                <LogIn className="h-4 w-4" />
                <span>Giriş Yap</span>
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
