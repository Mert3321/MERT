import React, { useState } from 'react';
import { BookOpen, Menu, X, GraduationCap, ArrowRight, User } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onSelectCourse: (courseId: string | null) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  onSelectCourse,
  isLoggedIn,
  onLogout,
  onLoginClick
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'catalog', label: 'Eğitim Kataloğu' },
    { id: 'instructors', label: 'Eğitmenlerimiz' },
    { id: 'about', label: 'Hakkımızda' },
    { id: 'contact', label: 'İletişim' }
  ];

  const handleNavClick = (pageId: string) => {
    onSelectCourse(null);
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 cursor-pointer text-left focus:outline-none"
              id="nav-logo"
            >
              <div className="bg-emerald-800 p-2.5 rounded-xl text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="block font-display text-xl font-bold tracking-tight text-emerald-900 leading-none">
                  AL-HIKMAH
                </span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-amber-600 font-mono mt-1">
                  Ed Platformu
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                    currentPage === 'dashboard'
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-white text-emerald-800 border-stone-200 hover:bg-stone-50'
                  }`}
                  id="nav-to-dashboard"
                >
                  <User className="h-4 w-4" />
                  <span>Öğrenci Paneli</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-stone-500 hover:text-red-600 text-sm font-medium transition-colors cursor-pointer"
                  id="nav-logout-btn"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-900 shadow-sm transition-all duration-200 cursor-pointer"
                id="nav-login-btn"
              >
                <span>Öğrenci Girişi</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-stone-100 focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 animate-fade-in" id="mobile-nav-panel">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                currentPage === item.id
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
              }`}
              id={`mobile-nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-stone-100">
            {isLoggedIn ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center justify-center space-x-2 w-full bg-emerald-800 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-md"
                  id="mobile-nav-to-dashboard"
                >
                  <User className="h-5 w-5" />
                  <span>Öğrenci Paneli</span>
                </button>
                <button
                  onClick={onLogout}
                  className="block w-full text-center py-2.5 text-stone-500 hover:text-red-600 text-sm font-semibold"
                  id="mobile-nav-logout-btn"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLoginClick();
                }}
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-md"
                id="mobile-nav-login-btn"
              >
                <span>Öğrenci Girişi</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
