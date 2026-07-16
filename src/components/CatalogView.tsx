import React, { useState, useMemo } from 'react';
import { Search, Star, Clock, Filter, BookOpen, X, Sparkles } from 'lucide-react';
import { Course, Instructor } from '../types';

interface CatalogViewProps {
  courses: Course[];
  instructors: Instructor[];
  onSelectCourse: (courseId: string) => void;
}

export default function CatalogView({ courses, instructors, onSelectCourse }: CatalogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');

  const instructorMap = useMemo(() => {
    return new Map(instructors.map((inst) => [inst.id, inst]));
  }, [instructors]);

  // Handle filtering
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search term matching
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;

      // Level matching
      const matchesLevel =
        selectedLevel === 'all' || course.level === selectedLevel;

      // Price matching
      const matchesPrice =
        selectedPrice === 'all' ||
        (selectedPrice === 'free' && course.price === 'Ucretsiz') ||
        (selectedPrice === 'paid' && typeof course.price === 'number');

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedPrice]);

  const categories = [
    { id: 'all', label: 'Tüm Kategoriler' },
    { id: 'quran', label: 'Kur\'an-ı Kerim' },
    { id: 'arabic', label: 'Arapça Dil Eğitimi' },
    { id: 'islamic-sciences', label: 'Temel İslami İlimler' },
    { id: 'history', label: 'Tarih & Medeniyet' }
  ];

  const levels = [
    { id: 'all', label: 'Tüm Seviyeler' },
    { id: 'Baslangic', label: 'Başlangıç Seviyesi' },
    { id: 'Orta', label: 'Orta Seviye' },
    { id: 'Ileri', label: 'İleri Seviye' }
  ];

  const priceOptions = [
    { id: 'all', label: 'Tüm Fiyatlar' },
    { id: 'free', label: 'Sadece Ücretsizler' },
    { id: 'paid', label: 'Sadece Ücretliler' }
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-left" id="catalog-view">
      
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">EĞİTİM DEPOSU</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1.5">
            Eğitim Kataloğu
          </h1>
          <p className="text-stone-500 text-sm mt-1 max-w-xl font-light">
            Eğitim programlarımızı inceleyerek ilim tahsilinize bugün başlayın. Çeşitli kürsülerden onlarca zengin ders sizleri bekliyor.
          </p>
        </div>
        
        {/* Dynamic total count */}
        <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-4 py-2 rounded-lg border border-emerald-100 font-mono">
          {filteredCourses.length} Eğitim Programı Listeleniyor
        </span>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
          <input
            type="text"
            placeholder="Ders adı, konusu veya anahtar kelime ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
            id="catalog-search-input"
          />
        </div>

        {/* Categories Tab selectors */}
        <div className="space-y-2">
          <span className="block text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Kürsü Seçimi</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
                id={`catalog-filter-cat-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Extra Level & Price dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 font-mono mb-2">Akademik Seviye</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
              id="catalog-level-select"
            >
              {levels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>{lvl.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 font-mono mb-2">Katılım / Fiyat Türü</label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
              id="catalog-price-select"
            >
              {priceOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            {(searchTerm || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPrice !== 'all') && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center space-x-1 w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-colors border border-stone-200 shadow-sm"
                id="catalog-clear-filters"
              >
                <X className="h-4 w-4" />
                <span>Filtreleri Temizle</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Courses Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const inst = instructorMap.get(course.instructorId);
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full text-left"
                id={`catalog-course-${course.id}`}
              >
                {/* Course Image */}
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {course.isLive && (
                    <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm font-mono flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-ping"></span>
                      <span>CANLI</span>
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg font-mono">
                    {course.level === 'Baslangic' ? 'Başlangıç' : course.level === 'Orta' ? 'Orta Seviye' : 'İleri Seviye'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Category small indicator */}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 font-mono mb-1.5">
                    {course.category === 'quran' ? 'Kur\'an-ı Kerim' : course.category === 'arabic' ? 'Arapça' : course.category === 'islamic-sciences' ? 'İslami İlimler' : 'Tarih & Kültür'}
                  </span>
                  
                  <h3 className="font-display text-base font-bold tracking-tight text-stone-900 hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  
                  <p className="text-stone-500 text-xs mt-2 line-clamp-3 leading-relaxed font-light">
                    {course.description}
                  </p>

                  {/* Instructor name */}
                  {inst && (
                    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-stone-100">
                      <img
                        src={inst.image}
                        alt={inst.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs text-stone-600 font-medium">{inst.name}</span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono mt-4 pt-3.5 border-t border-stone-100">
                    <div className="flex items-center space-x-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-bold text-stone-800">{course.rating.toFixed(1)}</span>
                      <span className="text-stone-400">({course.reviewsCount})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-stone-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{course.duration.split(' ')[0]} {course.duration.split(' ')[1]}</span>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100/50">
                    <div className="text-left">
                      <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-mono font-semibold">Tutar</span>
                      <span className="font-display text-sm font-bold text-emerald-800">
                        {typeof course.price === 'number' ? `${course.price} TL` : course.price}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                      id={`catalog-detail-btn-${course.id}`}
                    >
                      Dersi Tahlil Et
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State with Sparkles and polite guide */
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-12 text-center max-w-lg mx-auto space-y-4" id="catalog-empty-state">
          <div className="bg-amber-50 text-amber-700 p-4 rounded-full w-fit mx-auto border border-amber-100">
            <Sparkles className="h-8 w-8" />
          </div>
          <h3 className="font-display text-lg font-bold text-stone-900 tracking-tight">Kürsüde Eğitim Bulunamadı</h3>
          <p className="text-stone-500 text-xs leading-relaxed">
            Seçtiğiniz arama kriterlerine uygun eğitim programı bulunmuyor. Farklı filtreleri deneyebilir veya bültenimize kaydolarak yeni açılacak sınıflardan haberdar olabilirsiniz.
          </p>
          <button
            onClick={clearFilters}
            className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer inline-block"
            id="catalog-empty-reset-btn"
          >
            Tüm Eğitimleri Göster
          </button>
        </div>
      )}

    </div>
  );
}
