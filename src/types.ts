export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  coursesCount: number;
  rating: number;
  reviewsCount: number;
  expertise: string[];
}

export interface SyllabusWeek {
  week: number;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  instructorId: string;
  category: 'quran' | 'islamic-sciences' | 'arabic' | 'history';
  duration: string;
  level: 'Baslangic' | 'Orta' | 'Ileri';
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  price: number | 'Ucretsiz';
  image: string;
  syllabus: SyllabusWeek[];
  benefits: string[];
  audience: string[];
  isLive: boolean;
  upcomingLiveDate?: string;
  videos?: { id: string; title: string; duration: string; url: string }[];
}

export interface CanliDers {
  id: string;
  courseTitle: string;
  instructorName: string;
  date: string;
  time: string;
  topic: string;
  meetingLink: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface Enrollment {
  courseId: string;
  progress: number; // percentage
  completedLessons: string[]; // lesson ids
}

export interface StudentProfile {
  name: string;
  email: string;
  enrolledCourses: Enrollment[];
  activeCourses: number;
  completedCourses: number;
  studyHoursThisWeek: number;
  badges: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
