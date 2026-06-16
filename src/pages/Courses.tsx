import React, { useState } from 'react';
import { BookOpen, FileText, PlayCircle, Download, Clock, ChevronDown, GraduationCap, Calculator, TrendingUp, Compass, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const courseData = [
  {
    id: 'class9',
    title: 'Class 9',
    bengaliTitle: 'নবম শ্রেণী (Class 9)',
    subtitle: 'Foundation Mathematics',
    gradient: 'from-blue-600 to-cyan-500',
    glow: 'rgba(6, 182, 212, 0.4)',
    icon: Calculator,
    description: 'Build a strong mathematical foundation. বেসিক কনসেপ্ট্লিয়ারেন্সের জন্য স্পেশাল ফোকাস।',
    chapters: [
      { name: '1. Number System (সংখ্যা পদ্ধতি)', pdfCount: 3, mockCount: 5 },
      { name: '2. Polynomials (বহুপদী সংখ্যামালা)', pdfCount: 4, mockCount: 5 },
    ]
  },
  {
    id: 'class10',
    title: 'Class 10',
    bengaliTitle: 'দশম শ্রেণী (Class 10)',
    subtitle: 'Board Exam Preparation',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'rgba(52, 211, 153, 0.4)',
    icon: Compass,
    description: 'মাধ্যমিক পরীক্ষার জন্য সেরা প্রস্তুতি, মক টেস্ট এবং সাজেশন। Complete Board Prep.',
    chapters: [
      { name: '1. Quadratic Equations (দ্বিঘাত সমীকরণ)', pdfCount: 4, mockCount: 5 },
      { name: '2. Trigonometry (ত্রিকোণমিতি)', pdfCount: 5, mockCount: 7 },
    ]
  },
  {
    id: 'class11',
    title: 'Class 11',
    bengaliTitle: 'একাদশ শ্রেণী (Class 11)',
    subtitle: 'Core Mathematics',
    gradient: 'from-orange-500 to-amber-400',
    glow: 'rgba(245, 158, 11, 0.4)',
    icon: TrendingUp,
    description: 'উচ্চ মাধ্যমিকের বেস তৈরি। Advanced concepts for science stream.',
    chapters: [
      { name: '1. Sets & Functions (সেট ও অপেক্ষক)', pdfCount: 5, mockCount: 10 },
      { name: '2. Conic Section (কণিক ছেদ)', pdfCount: 6, mockCount: 10 },
    ]
  },
  {
    id: 'class12',
    title: 'Class 12',
    bengaliTitle: 'দ্বাদশ শ্রেণী (Class 12)',
    subtitle: 'Board + JEE Prep',
    gradient: 'from-rose-500 to-pink-500',
    glow: 'rgba(244, 63, 94, 0.4)',
    icon: GraduationCap,
    description: 'বোর্ড এক্সাম এবং জয়েন্ট (WBJEE/JEE) এর জন্য একদম পারফেক্ট ম্যাথমেটিক্স স্ট্র্যাটেজি।',
    chapters: [
      { name: '1. Calculus (কলনবিদ্যা)', pdfCount: 10, mockCount: 15 },
      { name: '2. Probability (সম্ভাবনা)', pdfCount: 5, mockCount: 10 },
    ]
  },
  {
    id: 'bsc',
    title: 'BSc Math',
    bengaliTitle: 'স্নাতক স্তর (BSc Math)',
    subtitle: 'Honours & General',
    gradient: 'from-violet-600 to-purple-500',
    glow: 'rgba(139, 92, 246, 0.4)',
    icon: BookOpen,
    description: 'ইউনিভার্সিটি সিলেবাস কভার করে অনার্স ও পাস কোর্সের ডিটেইল ক্লাস।',
    chapters: [
      { name: '1. Real Analysis', pdfCount: 8, mockCount: 10 },
      { name: '2. Abstract Algebra', pdfCount: 6, mockCount: 10 },
    ]
  },
  {
    id: 'msc',
    title: 'MSc Math',
    bengaliTitle: 'স্নাতকোত্তর (MSc Math PG)',
    subtitle: 'Post Graduation Level',
    gradient: 'from-fuchsia-600 to-pink-600',
    glow: 'rgba(217, 70, 239, 0.4)',
    icon: Award,
    description: 'মাস্টার্স স্তরের অ্যাডভান্সড চ্যাপ্টারস এবং অ্যাসাইনমেন্ট।',
    chapters: [
      { name: '1. Topology', pdfCount: 5, mockCount: 5 },
      { name: '2. Functional Analysis', pdfCount: 5, mockCount: 5 },
    ]
  },
  {
    id: 'slst',
    title: 'SLST Math',
    bengaliTitle: 'SLST Mathematics',
    subtitle: 'Targeted Preparation',
    gradient: 'from-indigo-600 to-blue-500',
    glow: 'rgba(79, 70, 229, 0.4)',
    icon: PlayCircle,
    description: 'এসএলএসটি (SLST) ক্র্যাক করার জন্য শর্টকাট ট্রিক্স এবং চ্যাপ্টার ধরে ক্লাস।',
    chapters: [
      { name: '1. Abstract Algebra', pdfCount: 6, mockCount: 20 },
      { name: '2. Real & Complex Analysis', pdfCount: 8, mockCount: 20 },
      { name: '3. Differential Equations', pdfCount: 4, mockCount: 20 },
    ]
  },
  {
    id: 'jee',
    title: 'JEE Mains',
    bengaliTitle: 'জয়েন্ট এন্ট্রান্স (JEE)',
    subtitle: '99+ Percentile Strategy',
    gradient: 'from-red-600 to-orange-500',
    glow: 'rgba(220, 38, 38, 0.4)',
    icon: Target,
    description: 'Comprehensive syllabus coverage aiming for 99+ percentile in JEE.',
    chapters: [
      { name: '1. Calculus & Real Analysis', pdfCount: 5, mockCount: 20 },
      { name: '2. Vectors and 3D Geometry', pdfCount: 3, mockCount: 20 },
      { name: '3. Matrices & Determinants', pdfCount: 4, mockCount: 20 },
    ]
  }
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState('class12');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-4 tracking-tight uppercase">Our Premium Courses</h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto">Class 9 থেকে MSc পর্যন্ত প্রতিটি স্তরের জন্য সেরা ম্যাথমেটিক্স গাইডেন্স। Choose your goal and start learning.</p>
      </div>

      {/* Colourful Posters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {courseData.map(course => {
          const Icon = course.icon;
          const isActive = activeTab === course.id;
          return (
            <div
              key={course.id}
              onClick={() => setActiveTab(course.id)}
              className={cn(
                "relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform group",
                isActive ? "scale-105 shadow-2xl ring-2 ring-white/50 z-10" : "hover:scale-105 hover:shadow-xl opacity-80 hover:opacity-100"
              )}
              style={{ boxShadow: isActive ? `0 20px 40px ${course.glow}` : undefined }}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", course.gradient)}></div>
              <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
              
              <div className="relative z-10 p-6 flex flex-col h-full min-h-[220px] justify-between">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shadow-inner">
                    <Icon className="h-7 w-7 text-white drop-shadow-md" />
                  </div>
                  {isActive && <div className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg animate-pulse">Selected</div>}
                </div>
                
                <div className="mt-6 filter drop-shadow-md">
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">{course.bengaliTitle}</h3>
                  <p className="text-white/90 text-xs font-bold uppercase tracking-wider mt-2 mix-blend-overlay">{course.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Content */}
      <div className="bg-slate-800/60 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 overflow-hidden shadow-lg" id="course-content">
        {courseData.map(course => (
          course.id === activeTab && (
            <div key={course.id} className="p-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-white/10 relative overflow-hidden">
                <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-r", course.gradient)}></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-slate-50 font-display">{course.bengaliTitle} Modules</h2>
                  <p className="text-sm text-slate-300 mt-2 font-medium">{course.description}</p>
                </div>
              </div>
              
              <div className="divide-y divide-white/10">
                {course.chapters.map((chapter, index) => (
                  <ChapterRow key={index} chapter={chapter} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function ChapterRow({ chapter }: { chapter: any; key?: React.Key }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group">
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-slate-800/60 backdrop-blur-md shadow-xl border border-white/10 p-3 rounded-lg text-pink-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-50">{chapter.name}</h3>
            <div className="flex gap-4 mt-1.5 text-xs text-slate-400 font-medium tracking-wide">
              <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-pink-400" /> {chapter.pdfCount} Notes</span>
              <span className="flex items-center gap-1.5 text-slate-400"><Target className="h-3.5 w-3.5 text-pink-400" /> {chapter.mockCount} Tests</span>
            </div>
          </div>
        </div>
        <div>
          <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform duration-300", expanded ? "rotate-180" : "")} />
        </div>
      </div>
      
      {expanded && (
        <div className="px-6 pb-6 pt-2 bg-black/20 backdrop-blur-sm shadow-inner border-t border-white/5 flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-slate-800/60 backdrop-blur-md shadow-xl p-5 rounded-xl border border-white/10">
            <h4 className="font-bold text-slate-50 text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><FileText className="h-4 w-4 text-pink-400" /> Study Materials</h4>
            <ul className="space-y-2">
              {[1, 2].map(i => (
                <li key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                  <span className="text-sm font-medium text-slate-300">Detailed Lecture Notes Part {i}</span>
                  <div className="flex gap-2">
                     <button className="bg-white/5 hover:bg-white/20 text-pink-400 hover:text-pink-300 p-2 rounded-lg transition-colors border border-white/10 hover:border-pink-500/50"><BookOpen className="h-4 w-4" /></button>
                     <button className="bg-white/5 hover:bg-white/20 text-slate-400 hover:text-slate-300 p-2 rounded-lg transition-colors border border-white/10 hover:border-slate-500/50"><Download className="h-4 w-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
             <button className="mt-5 text-xs font-bold text-pink-400 hover:text-pink-300 w-full text-center hover:underline uppercase tracking-widest">View All {chapter.pdfCount} PDFs</button>
          </div>
          
          <div className="flex-1 bg-gradient-to-br from-[#111827] to-[#111827] p-5 rounded-xl border border-pink-600/20 relative overflow-hidden shadow-lg">
             <div className="absolute top-0 right-0 p-12 bg-pink-600/10 rounded-full blur-3xl -mr-8 -mt-8"></div>
            <h4 className="font-bold text-slate-50 text-xs uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10"><Target className="h-4 w-4 text-pink-400" /> Practice Tests</h4>
            <div className="space-y-3 relative z-10">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg flex items-center justify-between border-l-2 border-l-amber-500 shadow-md hover:bg-white/10 transition-colors">
                <div>
                   <div className="font-bold text-slate-50 text-sm mb-1">Chapter Test 1</div>
                   <div className="flex gap-4 text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-slate-500" /> 45 Min</span>
                      <span className="flex items-center gap-1.5"><Target className="h-3 w-3 text-slate-500" /> 30 Qs</span>
                   </div>
                </div>
                <Link to="/mock-test/t1" className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors shadow-[0_0_15px_rgba(219,39,119,0.3)] border border-pink-500/50">
                  Start
                </Link>
              </div>
               <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg flex items-center justify-between opacity-60 grayscale hover:grayscale-0 transition-all">
                <div>
                   <div className="font-bold text-slate-50 text-sm mb-1">Chapter Test 2</div>
                   <div className="flex gap-4 text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-slate-500" /> 45 Min</span>
                      <span className="flex items-center gap-1.5"><Target className="h-3 w-3 text-slate-500" /> 30 Qs</span>
                   </div>
                </div>
                <button className="bg-slate-800/60 backdrop-blur-md shadow-xl border border-white/10 text-slate-500 font-bold py-2 px-4 rounded-lg text-xs cursor-not-allowed">
                  Locked
                </button>
              </div>
            </div>
             <button className="mt-5 text-xs font-bold text-pink-400 hover:text-pink-300 w-full text-center hover:underline relative z-10 uppercase tracking-widest">View All {chapter.mockCount} Tests</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple fallback Target icon if not imported above
function Target({ className }: { className?: string }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}

