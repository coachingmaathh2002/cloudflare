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
  Search,
  Users,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Check,
  Play,
  FileQuestion,
  Sparkles,
  BarChart3,
  Clock3,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  icon: React.ElementType;
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
    gradient: 'from-violet-600 via-purple-600 to-indigo-600',
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
    gradient: 'from-rose-600 via-orange-600 to-amber-600',
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
    gradient: 'from-blue-600 via-indigo-600 to-violet-600',
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
    icon: Award,
    description: 'মাস্টার্স স্তরের অ্যাডভান্সড চ্যাপ্টারস, থিওরেম প্রুফ এবং এসাইনমেন্ট সলিউশন।',
    features: ['Advanced Theorems & Proofs', 'CSIR NET/GATE Orientations', 'Research Paper Insights', 'Doubt Clearing Meetings'],
    chapters: [
      { name: '1. Topology & Functional Analysis', pdfCount: 8, mockCount: 10, topics: ['Topological Spaces', 'Compactness & Connectedness', 'Banach & Hilbert Spaces'] },
      { name: '2. Differential Geometry & Mechanics', pdfCount: 7, mockCount: 8, topics: ['Curves & Surfaces', 'Tensors', 'Classical Mechanics'] }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'board' | 'higher' | 'competitive'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseId, setActiveCourseId] = useState('slst');

  useSEO(
    "Premium Math Courses | SLST, JEE Mains, WBJEE & NET",
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

  const stats = [
    { label: 'Active Students', value: '5,000+', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Success Rate', value: '98%', icon: BarChart3, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Top Ranks', value: '100+', icon: Award, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Rating', value: '4.9/5', icon: Star, color: 'text-purple-400', bg: 'bg-purple-400/10' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-300 text-xs font-medium mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Raj Sir Math Classes • Premium Coaching</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
          >
            Master Mathematics with
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Expert Guidance
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From Class 9 foundation to MSc level advanced mathematics. Structured curriculum, 
            shortcut techniques, and personalized mentorship for competitive and board exams.
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm hover:border-slate-700 transition-colors"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} ${stat.color} mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-2 backdrop-blur-xl shadow-2xl shadow-black/50"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search courses, topics, or exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 placeholder-slate-500 text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                {[
                  { id: 'all', label: 'All Courses' },
                  { id: 'competitive', label: 'Competitive' },
                  { id: 'board', label: 'Board Exams' },
                  { id: 'higher', label: 'Higher Studies' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                      selectedCategory === cat.id
                        ? "bg-slate-100 text-slate-900 shadow-lg"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl max-w-xl mx-auto">
            <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No courses found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course) => {
              const Icon = course.icon;
              const isActive = activeCourseId === course.id;

              return (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  className={cn(
                    "group relative bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300",
                    isActive 
                      ? "border-purple-500/50 shadow-lg shadow-purple-500/10" 
                      : "border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20"
                  )}
                >
                  {/* Card Header with Gradient */}
                  <div className={cn(
                    "h-32 bg-gradient-to-br relative p-6 flex flex-col justify-between",
                    course.gradient
                  )}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative flex justify-between items-start">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        <Star className="w-3 h-3 fill-white" />
                        {course.badge}
                      </span>
                      <div className="flex items-center gap-1 text-white/90 text-xs font-medium bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="relative">
                      <Icon className="w-8 h-8 text-white/90" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {course.bengaliTitle}
                      </h3>
                      <p className="text-sm text-slate-400">{course.subtitle}</p>
                    </div>

                    <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 pb-6 border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Clock3 className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.studentsCount} students</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">{course.price}</span>
                          <span className="text-sm text-slate-500 line-through">{course.originalPrice}</span>
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">50% early bird discount</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button
                        onClick={() => {
                          setActiveCourseId(course.id);
                          document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-sm font-medium transition-all border",
                          isActive
                            ? "bg-slate-800 text-white border-purple-500/30"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                        )}
                      >
                        View Syllabus
                      </button>
                      <a
                        href={`https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20want%20to%20enroll%20in%20${encodeURIComponent(course.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-white text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        Enroll Now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

      {/* Detailed Syllabus Section */}
      <section id="syllabus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          {/* Section Header */}
          <div className="relative p-8 sm:p-10 border-b border-slate-800 bg-slate-950/50">
            <div className={cn(
              "absolute inset-0 opacity-10 bg-gradient-to-r",
              activeCourse.gradient
            )} />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
                  Detailed Curriculum
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {activeCourse.bengaliTitle}
                </h2>
                <p className="text-slate-400 max-w-2xl">
                  {activeCourse.description}
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20have%20questions%20about%20${encodeURIComponent(activeCourse.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-white transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask Doubt
                </a>
                <a
                  href={`https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20want%20to%20enroll%20in%20${encodeURIComponent(activeCourse.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20"
                >
                  Enroll Now
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Chapters List */}
          <div className="divide-y divide-slate-800/50">
            {activeCourse.chapters.map((chapter, index) => (
              <ChapterAccordion 
                key={index} 
                chapter={chapter} 
                index={index} 
                gradient={activeCourse.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Raj Sir Math Classes?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive learning ecosystem designed for mathematical excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Zap,
              title: 'Shortcut Techniques',
              desc: 'Proven methods to solve complex problems within seconds for competitive exams',
              color: 'text-amber-400',
              bg: 'bg-amber-400/10',
              border: 'border-amber-400/20'
            },
            {
              icon: BookOpen,
              title: 'Premium Study Material',
              desc: 'Handwritten notes, formula sheets, and curated practice problems',
              color: 'text-blue-400',
              bg: 'bg-blue-400/10',
              border: 'border-blue-400/20'
            },
            {
              icon: Target,
              title: 'Mock Test Portal',
              desc: 'Computer-based testing interface with detailed analytics and ranking',
              color: 'text-emerald-400',
              bg: 'bg-emerald-400/10',
              border: 'border-emerald-400/20'
            },
            {
              icon: ShieldCheck,
              title: '1-on-1 Mentorship',
              desc: 'Direct access to Raj Sir for doubt clearing and strategic guidance',
              color: 'text-purple-400',
              bg: 'bg-purple-400/10',
              border: 'border-purple-400/20'
            }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className={cn(
                "group p-6 rounded-2xl border bg-slate-900/50 backdrop-blur-sm transition-all hover:scale-[1.02]",
                feature.border
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                feature.bg
              )}>
                <feature.icon className={cn("w-6 h-6", feature.color)} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Math Journey?
            </h2>
            <p className="text-indigo-100 max-w-xl mx-auto mb-8 text-base">
              Join 5,000+ successful students. Get personalized guidance and premium resources 
              to ace your mathematics exams.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20want%20to%20enroll."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-purple-600 font-semibold hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Enroll via WhatsApp
              </a>
              <a
                href="tel:918345819377"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                Call Now
              </a>
            </div>
            
            <p className="mt-6 text-xs text-indigo-200/80">
              Admission assistance available • Demo classes offered • EMI options available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ChapterAccordion({ 
  chapter, 
  index, 
  gradient 
}: { 
  key?: React.Key;
  chapter: Chapter; 
  index: number; 
  gradient: string;
}) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-800/30 transition-colors text-left"
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 border",
            "bg-slate-950 border-slate-800 text-slate-400 group-hover:border-slate-700 transition-colors"
          )}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
              {chapter.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                {chapter.pdfCount} Study Materials
              </span>
              <span className="flex items-center gap-1.5">
                <FileQuestion className="w-3.5 h-3.5" />
                {chapter.mockCount} Practice Tests
              </span>
            </div>
          </div>
        </div>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0",
            isOpen && "rotate-180 text-purple-400"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-slate-950/30"
          >
            <div className="p-6 pt-0 border-t border-slate-800/50">
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Topics */}
                {chapter.topics && chapter.topics.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Covered Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {chapter.topics.map((topic, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-slate-700 transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Available Resources
                  </h4>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Chapter Notes</div>
                        <div className="text-xs text-slate-500">{chapter.pdfCount} PDFs</div>
                      </div>
                    </div>
                    <Link 
                      to="/notes" 
                      className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                    >
                      View <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Play className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Video Lectures</div>
                        <div className="text-xs text-slate-500">Recorded sessions</div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">Included</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Practice Tests</div>
                        <div className="text-xs text-slate-500">{chapter.mockCount} Mock tests</div>
                      </div>
                    </div>
                    <Link 
                      to="/free-daily-test" 
                      className="px-3 py-1 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-500 transition-colors"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}