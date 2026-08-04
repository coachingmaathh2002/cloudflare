import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  FileText, 
  PlayCircle, 
  Download, 
  Clock, 
  ChevronDown, 
  GraduationCap, 
  Calculator, 
  TrendingUp, 
  Compass, 
  Award, 
  Target, 
  Star, 
  CheckCircle,
  Search,
  Sparkles,
  Users,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSEO } from '../lib/useSEO';

interface Chapter {
  name: string;
  pdfCount: number;
  mockCount: number;
  topics?: string[];
}

interface Course {
  id: string;
  category: 'board' | 'higher' | 'competitive';
  title: string;
  bengaliTitle: string;
  subtitle: string;
  badge: string;
  rating: string;
  studentsCount: string;
  duration: string;
  price: string;
  originalPrice: string;
  gradient: string;
  glow: string;
  icon: any;
  description: string;
  features: string[];
  chapters: Chapter[];
}

const courseData: Course[] = [
  {
    id: 'slst',
    category: 'competitive',
    title: 'SLST Math (IX-X & XI-XII)',
    bengaliTitle: 'SLST Mathematics Masterclass',
    subtitle: 'Teacher Recruitment Exam 2026',
    badge: 'MOST POPULAR',
    rating: '4.95',
    studentsCount: '1,450+',
    duration: '8 Months Live',
    price: '₹2,499',
    originalPrice: '₹4,999',
    gradient: 'from-pink-600 via-purple-600 to-indigo-600',
    glow: 'rgba(219, 39, 119, 0.4)',
    icon: PlayCircle,
    description: 'এসএলএসটি (SLST) ক্র্যাক করার জন্য চ্যাপ্টারওয়াইজ থিওরি, শর্টকাট ট্রিক্স, প্রিভিয়াস ইয়ার্স কোশ্চেন ও মক টেস্ট।',
    features: ['150+ Live & Recorded Classes', 'Chapterwise Handwritten PDFs', '30+ Online CBT Mock Tests', 'Personal Doubt Resolution'],
    chapters: [
      { name: '1. Abstract Algebra & Group Theory', pdfCount: 8, mockCount: 20, topics: ['Groups & Subgroups', 'Cyclic Groups', 'Permutation Groups', 'Homomorphism'] },
      { name: '2. Real & Complex Analysis', pdfCount: 12, mockCount: 25, topics: ['Real Number System', 'Sequences & Series', 'Continuity & Differentiability', 'Analytic Functions'] },
      { name: '3. Differential Equations & Dynamics', pdfCount: 6, mockCount: 18, topics: ['First Order ODEs', 'Linear DEs with Constant Coefficients', 'Partial Differential Equations'] },
      { name: '4. Linear Algebra & Matrices', pdfCount: 7, mockCount: 15, topics: ['Vector Spaces', 'Eigenvalues & Eigenvectors', 'Linear Transformations'] }
    ]
  },
  {
    id: 'jee',
    category: 'competitive',
    title: 'JEE Mains & WBJEE',
    bengaliTitle: 'জয়েন্ট এন্ট্রান্স (WBJEE / JEE)',
    subtitle: '99+ Percentile Target Strategy',
    badge: 'HIGH DEMAND',
    rating: '4.90',
    studentsCount: '890+',
    duration: '1 Year Program',
    price: '₹2,999',
    originalPrice: '₹5,999',
    gradient: 'from-rose-600 via-amber-600 to-orange-500',
    glow: 'rgba(225, 29, 72, 0.4)',
    icon: Target,
    description: 'Comprehensive syllabus coverage aiming for 99+ percentile with advance problem-solving techniques.',
    features: ['Speed & Accuracy Shortcuts', 'PYQs 2015-2025 Solved', 'Full-length All India Mocks', 'Formula Cheat Sheets'],
    chapters: [
      { name: '1. Calculus (Differential & Integral)', pdfCount: 15, mockCount: 30, topics: ['Limits & Derivatives', 'Definite Integrals', 'Area Under Curves'] },
      { name: '2. Vectors & 3D Geometry', pdfCount: 8, mockCount: 20, topics: ['Dot & Cross Products', 'Lines & Planes in 3D', 'Shortest Distance'] },
      { name: '3. Coordinate Geometry & Conics', pdfCount: 10, mockCount: 22, topics: ['Straight Lines', 'Circles', 'Parabola, Ellipse & Hyperbola'] }
    ]
  },
  {
    id: 'class12',
    category: 'board',
    title: 'Class 12 Board',
    bengaliTitle: 'দ্বাদশ শ্রেণী (Class 12 Math)',
    subtitle: 'HS Board Exam + Entrance Prep',
    badge: 'BOARD SPECIAL',
    rating: '4.92',
    studentsCount: '1,200+',
    duration: 'Full Academic Year',
    price: '₹1,999',
    originalPrice: '₹3,999',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    glow: 'rgba(16, 185, 129, 0.4)',
    icon: GraduationCap,
    description: 'উচ্চ মাধ্যমিক পরীক্ষার জন্য সেরা ডিজিটাল নোটস, লাস্ট ১০ বছরের সমাধান ও শিউর-শট সাজেশন।',
    features: ['Chapter-wise Board Solution', 'Weekly Assessment Tests', '100% Suggestive Questions', 'Formula Quick Revision'],
    chapters: [
      { name: '1. Calculus (কলনবিদ্যা)', pdfCount: 12, mockCount: 20, topics: ['Continuity & Differentiability', 'Integration', 'Differential Equations'] },
      { name: '2. Probability & LPP (সম্ভাবনা ও রৈখিক প্রোগ্রামিং)', pdfCount: 6, mockCount: 10, topics: ['Conditional Probability', 'Bayes Theorem', 'LPP Graphical Method'] },
      { name: '3. Matrices & Determinants', pdfCount: 5, mockCount: 10, topics: ['Matrix Algebra', 'Inverse of Matrix', 'Cramers Rule'] }
    ]
  },
  {
    id: 'class10',
    category: 'board',
    title: 'Class 10 Madhyamik',
    bengaliTitle: 'দশম শ্রেণী (Class 10 Madhyamik)',
    subtitle: '100/100 Target Board Batch',
    badge: 'STARTER BATCH',
    rating: '4.88',
    studentsCount: '950+',
    duration: 'Full Academic Year',
    price: '₹1,499',
    originalPrice: '₹2,999',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    glow: 'rgba(37, 99, 235, 0.4)',
    icon: Compass,
    description: 'মাধ্যমিক গণিতে ১০০-এ ১০০ পাওয়ার জন্য স্পেশাল টিপস, সম্পাদ্য-উপপাদ্য ট্রিক্স এবং মডেল টেস্ট।',
    features: ['Theorem Special Shortcuts', 'Model Test Papers', 'Step-by-Step Marking Guide', 'Chapterwise MCQ Drills'],
    chapters: [
      { name: '1. Quadratic Equations (দ্বিঘাত সমীকরণ)', pdfCount: 5, mockCount: 8, topics: ['Sridhar Acharyas Formula', 'Nature of Roots'] },
      { name: '2. Trigonometry (ত্রিকোণমিতি)', pdfCount: 7, mockCount: 12, topics: ['Trigonometric Ratios', 'Height and Distance'] },
      { name: '3. Geometry & Mensuration (জ্যামিতি ও পরিমিতি)', pdfCount: 8, mockCount: 10, topics: ['Theorems on Circle', 'Cylinder & Sphere'] }
    ]
  },
  {
    id: 'class11',
    category: 'board',
    title: 'Class 11 Foundation',
    bengaliTitle: 'একাদশ শ্রেণী (Class 11 Math)',
    subtitle: 'Science Core Mathematics',
    badge: 'FOUNDATION',
    rating: '4.85',
    studentsCount: '780+',
    duration: 'Full Academic Year',
    price: '₹1,799',
    originalPrice: '₹3,499',
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    glow: 'rgba(245, 158, 11, 0.4)',
    icon: TrendingUp,
    description: 'উচ্চ মাধ্যমিকের মজবুত ভিত গড়ার জন্য বেসিক থেকে অ্যাডভান্সড পর্যন্ত ম্যাথমেটিক্স গাইড।',
    features: ['Concept Building Exercises', 'Classwork & Homework PDFs', 'Chapter Practice Sheets', 'Monthly Progress Evaluation'],
    chapters: [
      { name: '1. Sets, Relations & Functions', pdfCount: 6, mockCount: 10, topics: ['Venn Diagrams', 'Domain & Range', 'Types of Functions'] },
      { name: '2. Trigonometric Functions', pdfCount: 8, mockCount: 12, topics: ['Compound Angles', 'Multiple Angles', 'Trigonometric Equations'] },
      { name: '3. Coordinate Geometry', pdfCount: 7, mockCount: 10, topics: ['Straight Lines', 'Circles', 'Conic Sections'] }
    ]
  },
  {
    id: 'class9',
    category: 'board',
    title: 'Class 9 Foundation',
    bengaliTitle: 'নবম শ্রেণী (Class 9 Math)',
    subtitle: 'Basic Concept Builder',
    badge: 'FOUNDATION',
    rating: '4.82',
    studentsCount: '620+',
    duration: 'Full Academic Year',
    price: '₹1,299',
    originalPrice: '₹2,599',
    gradient: 'from-teal-600 via-emerald-600 to-cyan-600',
    glow: 'rgba(20, 184, 166, 0.4)',
    icon: Calculator,
    description: 'গণিতের ভয় দূর করে ভালো নম্বর পাওয়ার সহজ ও আকর্ষণীয় পদ্ধতি।',
    features: ['Interactive Visual Explanations', 'Basic Problem Drill Sheets', 'Homework Correction Support', 'Friendly Doubts Session'],
    chapters: [
      { name: '1. Real Numbers & Polynomials', pdfCount: 5, mockCount: 8, topics: ['Irrational Numbers', 'Remainder Theorem', 'Factorization'] },
      { name: '2. Linear Equations & Graphs', pdfCount: 4, mockCount: 6, topics: ['Two Variable Equations', 'Graphical Solutions'] }
    ]
  },
  {
    id: 'bsc',
    category: 'higher',
    title: 'BSc Mathematics Honours',
    bengaliTitle: 'স্নাতক স্তর (BSc Math Hons)',
    subtitle: 'University Degree Prep',
    badge: 'DEGREE SPECIAL',
    rating: '4.91',
    studentsCount: '540+',
    duration: 'Semesterwise',
    price: '₹2,299',
    originalPrice: '₹4,599',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
    glow: 'rgba(139, 92, 246, 0.4)',
    icon: BookOpen,
    description: 'ইউনিভার্সিটি সিলেবাস কভার করে অনার্স ও জেনারেল কোর্সের বিস্তারিত লাইভ ও রেকর্ড ক্লাস।',
    features: ['University Exam PYQ Solutions', 'Rigorous Proof Analysis', 'Assignment Corrections', 'Semester Mock Tests'],
    chapters: [
      { name: '1. Real Analysis & Metric Spaces', pdfCount: 10, mockCount: 12, topics: ['Riemann Integration', 'Uniform Convergence', 'Metric Spaces'] },
      { name: '2. Abstract & Linear Algebra', pdfCount: 9, mockCount: 12, topics: ['Rings & Fields', 'Vector Spaces', 'Inner Product Spaces'] }
    ]
  },
  {
    id: 'msc',
    category: 'higher',
    title: 'MSc Math & PG Entrance',
    bengaliTitle: 'স্নাতকোত্তর (MSc Math PG)',
    subtitle: 'Advanced Degree Level',
    badge: 'ADVANCED LEVEL',
    rating: '4.94',
    studentsCount: '310+',
    duration: 'Semesterwise',
    price: '₹2,799',
    originalPrice: '₹5,599',
    gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
    glow: 'rgba(217, 70, 239, 0.4)',
    icon: Award,
    description: 'মাস্টার্স স্তরের অ্যাডভান্সড চ্যাপ্টারস, থিওরেম প্রুফ এবং এসাইনমেন্ট সলিউশন।',
    features: ['Advanced Theorems & Proofs', 'CSIR NET/GATE Orientations', 'Research Paper Insights', 'Doubt Clearing Meetings'],
    chapters: [
      { name: '1. Topology & Functional Analysis', pdfCount: 8, mockCount: 10, topics: ['Topological Spaces', 'Compactness & Connectedness', 'Banach & Hilbert Spaces'] },
      { name: '2. Differential Geometry & Mechanics', pdfCount: 7, mockCount: 8, topics: ['Curves & Surfaces', 'Tensors', 'Classical Mechanics'] }
    ]
  }
];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'board' | 'higher' | 'competitive'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseId, setActiveCourseId] = useState('slst');

  useSEO(
    "Math Masterclass Courses | SLST, JEE Mains, WBJEE & NET",
    "Enroll in Raj Sir's premium math coaching courses from Class 9 to MSc. Specialized batches for SLST Mathematics, JEE Mains, WBJEE, GATE, and CSIR NET with chapter-wise notes and mocks."
  );

  const filteredCourses = useMemo(() => {
    return courseData.filter(course => {
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.bengaliTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCourse = useMemo(() => {
    return courseData.find(c => c.id === activeCourseId) || courseData[0];
  }, [activeCourseId]);

  return (
    <div className="flex-1 w-full relative z-10 pb-20">
      
      {/* Hero Header Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-md"
        >
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>RAJ SIR MATH CLASSES • MASTERCLASS BATCHES</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-50 uppercase tracking-tight leading-tight mb-6"
        >
          Elevate Your Math Journey <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 drop-shadow-lg">
            With Structured Coaching
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-8"
        >
          Class 9 থেকে MSc পর্যন্ত প্রতিটি স্তরের জন্য সেরা ম্যাথমেটিক্স গাইডেন্স। শর্টকাট ট্রিক্স, লাইভ প্র্যাকটিস ও প্রিমিয়াম স্টাডি মেটেরিয়ালসহ সহজ বাংলায় শিখুন।
        </motion.p>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10"
        >
          <div className="solid-card p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-800 bg-slate-900">
            <span className="text-2xl sm:text-3xl font-black text-pink-400">5,000+</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Enrolled Students</span>
          </div>
          <div className="solid-card p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-800 bg-slate-900">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">98%</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Success Rate</span>
          </div>
          <div className="solid-card p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-800 bg-slate-900">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">100+</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Top SLST Ranks</span>
          </div>
          <div className="solid-card p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-800 bg-slate-900">
            <span className="text-2xl sm:text-3xl font-black text-indigo-400">4.9/5</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Average Rating</span>
          </div>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-2xl">
          {/* Search Input */}
          <div className="relative w-full md:w-72 flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search course or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 text-slate-200 placeholder-slate-500 text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-pink-500/60 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 w-full overflow-x-auto pb-1 md:pb-0 scrollbar-none justify-start md:justify-end">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'competitive', label: 'SLST & Competitive' },
              { id: 'board', label: 'Board (9-12)' },
              { id: 'higher', label: 'BSc & MSc Math' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0",
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-pink-400/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-white/10 max-w-xl mx-auto">
            <Search className="h-10 w-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No courses found</h3>
            <p className="text-xs text-slate-400">Try searching for a different keyword or change the filter category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => {
              const Icon = course.icon;
              const isSelected = activeCourseId === course.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={course.id}
                  className={cn(
                    "shimmer-card solid-card-interactive rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border bg-slate-900 transition-all duration-300",
                    isSelected 
                      ? "border-pink-500 shadow-[0_0_35px_rgba(219,39,119,0.35)] ring-1 ring-pink-500/50" 
                      : "border-slate-800 hover:border-pink-500/50 hover:shadow-[0_15px_35px_rgba(219,39,119,0.15)]"
                  )}
                >
                  {/* Subtle Background Glow */}
                  <div className={cn("absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40", course.gradient)}></div>

                  {/* Top Badge & Rating */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="glass-badge-3d animate-float-slow inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-300 shadow-lg border border-white/30 backdrop-blur-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                        <span>{course.badge}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 bg-black/40 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-white font-bold">{course.rating}</span> ({course.studentsCount})
                      </span>
                    </div>

                    {/* Course Header */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-lg bg-gradient-to-br text-white",
                        course.gradient,
                        "border-white/20"
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-black text-white tracking-tight leading-snug">
                          {course.bengaliTitle}
                        </h3>
                        <p className="text-xs font-semibold text-pink-400 mt-0.5">
                          {course.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-medium leading-relaxed mb-5 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="space-y-2 mb-6 border-t border-white/10 pt-4">
                      {course.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-black text-white tracking-tight">{course.price}</span>
                      <span className="text-xs text-slate-500 line-through font-semibold">{course.originalPrice}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded ml-auto">
                        50% OFF
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setActiveCourseId(course.id);
                          const el = document.getElementById('syllabus-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center border flex items-center justify-center gap-1",
                          isSelected
                            ? "bg-slate-800 text-white border-pink-500/60"
                            : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10"
                        )}
                      >
                        <span>Syllabus</span>
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                      </button>

                      <a
                        href={`https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20want%20to%20enroll%20in%20${encodeURIComponent(course.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-center shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-1 border border-white/20"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Syllabus & Chapter Breakdown Drawer / Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24" id="syllabus-section">
        <div className="solid-card rounded-3xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
          
          {/* Header of Syllabus Section */}
          <div className="p-6 sm:p-8 border-b border-slate-800 relative overflow-hidden bg-slate-950">
            <div className={cn("absolute inset-0 opacity-15 bg-gradient-to-r", activeCourse.gradient)}></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full inline-block mb-2">
                  SELECTED COURSE SYLLABUS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                  {activeCourse.bengaliTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium max-w-2xl">
                  {activeCourse.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20have%20questions%20regarding%20${encodeURIComponent(activeCourse.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Ask Raj Sir on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Chapters Accordion List */}
          <div className="divide-y divide-white/10">
            {activeCourse.chapters.map((chapter, index) => (
              <ChapterAccordion key={index} chapter={chapter} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Raj Sir Math Classes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
            THE RAJ SIR ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mt-3">
            Why Students Trust Raj Sir Math Classes?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2 font-medium">
            We focus on clear conceptual foundation, shortcut problem solving, and rigorous practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="solid-card-interactive p-6 rounded-3xl border border-slate-800 bg-slate-900 flex flex-col items-start shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Shortcut Math Tricks</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Solve complex SLST & JEE competitive problems in under 60 seconds with shortcut formulas and tricks.
            </p>
          </div>

          <div className="solid-card-interactive p-6 rounded-3xl border border-slate-800 bg-slate-900 flex flex-col items-start shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Handwritten PDF Notes</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Chapter-wise high quality handwritten theory notes and solved assignment workbooks for quick revision.
            </p>
          </div>

          <div className="solid-card-interactive p-6 rounded-3xl border border-slate-800 bg-slate-900 flex flex-col items-start shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">CBT Mock Test Portal</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Practice on real exam interface timer with instant score evaluation, detailed solutions, and rank list.
            </p>
          </div>

          <div className="solid-card-interactive p-6 rounded-3xl border border-slate-800 bg-slate-900 flex flex-col items-start shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Personal Mentorship</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Direct phone call & WhatsApp support with Raj Sir for doubt clearing and strategic guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="solid-card rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden text-center bg-gradient-to-r from-pink-950/80 via-slate-900 to-indigo-950/80 shadow-2xl">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full inline-block mb-4">
            ADMISSION ASSISTANCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-4">
            Confused About Which Batch To Choose?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium mb-8 leading-relaxed">
            Speak directly with our team or Raj Sir for guidance on batch timings, fees, online classes, and offline coaching centers in West Bengal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20need%20admission%20guidance."
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 border border-emerald-300/40"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:918345819377"
              className="bg-slate-900 hover:bg-slate-800 text-white border border-white/15 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-pink-400" />
              <span>Call +91 83458 19377</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function ChapterAccordion({ chapter, index }: { chapter: Chapter; index: number; key?: React.Key }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div className="group">
      <div 
        className="flex items-center justify-between p-5 sm:p-6 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-pink-400 font-bold text-sm shrink-0">
            0{index + 1}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-pink-300 transition-colors">
              {chapter.name}
            </h3>
            <div className="flex items-center gap-4 mt-1 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-pink-400" /> {chapter.pdfCount} PDFs
              </span>
              <span className="flex items-center gap-1">
                <Target className="h-3.5 w-3.5 text-emerald-400" /> {chapter.mockCount} Practice Mocks
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
            {expanded ? "Hide Module" : "View Topics"}
          </span>
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400">
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded ? "rotate-180 text-pink-400" : "")} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-slate-950/40 border-t border-white/5 px-5 sm:px-6 py-5"
          >
            {/* Covered Topics */}
            {chapter.topics && chapter.topics.length > 0 && (
              <div className="mb-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  COVERED SUB-TOPICS
                </span>
                <div className="flex flex-wrap gap-2">
                  {chapter.topics.map((topic, i) => (
                    <span key={i} className="text-xs font-medium text-slate-300 bg-slate-900 border border-white/10 px-3 py-1 rounded-lg">
                      • {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lecture Notes Card */}
              <div className="solid-card p-4 rounded-2xl border border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                    <FileText className="h-4 w-4" /> Handwritten Study Notes
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400">{chapter.pdfCount} Files Available</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                    <span>Part 1: Concept & Fundamental Theorems</span>
                    <Link to="/notes" className="text-pink-400 hover:text-pink-300 font-bold text-[11px] flex items-center gap-1">
                      <span>View PDF</span>
                      <Download className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                  <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                    <span>Part 2: Worked Examples & Shortcut Sheet</span>
                    <Link to="/notes" className="text-pink-400 hover:text-pink-300 font-bold text-[11px] flex items-center gap-1">
                      <span>View PDF</span>
                      <Download className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Practice Tests Card */}
              <div className="solid-card p-4 rounded-2xl border border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Target className="h-4 w-4" /> Chapter Mock Test
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400">{chapter.mockCount} Tests Included</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white mb-0.5">Chapter Evaluation Test 01</h5>
                    <div className="flex gap-3 text-[10px] font-semibold text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 45 Mins</span>
                      <span className="flex items-center gap-1"><Target className="h-3 w-3" /> 30 Questions</span>
                    </div>
                  </div>
                  <Link
                    to="/free-daily-test"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-lg shadow-md transition-all"
                  >
                    Start Test
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
