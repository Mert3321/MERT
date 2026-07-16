import React from 'react';
import { Star, Award, BookOpen, MessageSquare, Linkedin, Mail } from 'lucide-react';
import { Instructor, Course } from '../types';

interface InstructorsViewProps {
  instructors: Instructor[];
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export default function InstructorsView({ instructors, courses, onSelectCourse }: InstructorsViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 text-left" id="instructors-view">
      
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">AKADEMİK KADRO</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1.5">
          Eğitmenlerimiz
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
          İslami ilimlerde derinleşmiş, akademik kariyerini icazet geleneğiyle taçlandırmış seçkin ve liyakat sahibi eğitim kadromuz.
        </p>
      </div>

      {/* Instructors list */}
      <div className="space-y-12">
        {instructors.map((inst) => {
          const instCourses = courses.filter((c) => c.instructorId === inst.id);
          
          return (
            <div
              key={inst.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-sm hover:shadow-md transition-shadow"
              id={`instructor-card-${inst.id}`}
            >
              {/* Image & Stats Panel */}
              <div className="lg:col-span-3 flex flex-col items-center text-center">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-40 h-40 rounded-2xl object-cover shadow-md border-4 border-stone-100"
                  referrerPolicy="no-referrer"
                />
                
                <h3 className="font-display font-bold text-lg text-stone-900 mt-4 leading-tight">
                  {inst.name}
                </h3>
                <p className="text-emerald-700 text-xs font-semibold mt-1 uppercase tracking-wider font-mono">
                  {inst.role.split(' ')[0]} {inst.role.split(' ')[1] || ''}
                </p>

                {/* Rating and counts */}
                <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-5 border-t border-stone-100 text-center">
                  <div className="text-center">
                    <span className="block text-xs text-stone-400 uppercase tracking-widest font-mono font-medium">Rating</span>
                    <span className="font-display font-bold text-sm text-stone-800 flex items-center justify-center space-x-0.5 mt-1">
                      <Star className="h-3.5 w-3.5 fill-current text-amber-500 shrink-0" />
                      <span>{inst.rating.toFixed(1)}</span>
                    </span>
                  </div>
                  <div className="border-x border-stone-100 text-center">
                    <span className="block text-xs text-stone-400 uppercase tracking-widest font-mono font-medium">Kurs</span>
                    <span className="font-display font-bold text-sm text-stone-800 mt-1 block">
                      {inst.coursesCount}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xs text-stone-400 uppercase tracking-widest font-mono font-medium">Yorum</span>
                    <span className="font-display font-bold text-sm text-stone-800 mt-1 block">
                      {inst.reviewsCount}
                    </span>
                  </div>
                </div>

                {/* Micro socials */}
                <div className="flex space-x-3 mt-6">
                  <button className="p-2 bg-stone-50 hover:bg-emerald-50 rounded-lg text-stone-400 hover:text-emerald-700 transition-colors cursor-pointer">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-stone-50 hover:bg-emerald-50 rounded-lg text-stone-400 hover:text-emerald-700 transition-colors cursor-pointer">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Bio & Courses Panel */}
              <div className="lg:col-span-9 space-y-6 lg:border-l lg:border-stone-100 lg:pl-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Eğitmen Özgeçmişi</h4>
                  <p className="text-stone-600 text-sm leading-relaxed mt-2.5 font-light">
                    {inst.bio}
                  </p>

                  {/* Expertise tags */}
                  <div className="mt-5 space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Uzmanlık Alanları</h5>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {inst.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-100"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Courses Taught */}
                <div className="pt-6 border-t border-stone-100 mt-6 lg:mt-0">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono mb-3">Verdiği Eğitimler</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {instCourses.map((course) => (
                      <div
                        key={course.id}
                        className="p-3.5 rounded-xl border border-stone-100 hover:border-emerald-100 bg-stone-50/50 hover:bg-emerald-50/10 transition-colors flex items-center justify-between"
                      >
                        <div className="space-y-0.5 pr-2">
                          <span className="block font-semibold text-xs text-stone-800 line-clamp-1">{course.title}</span>
                          <span className="block text-[10px] text-stone-400 font-mono">{course.duration}</span>
                        </div>
                        <button
                          onClick={() => onSelectCourse(course.id)}
                          className="text-[10px] bg-emerald-800 hover:bg-emerald-950 text-white font-bold px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                        >
                          İncele
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
