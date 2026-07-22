import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useSEO } from "../lib/useSEO";
import {
  BookOpen,
  Award,
  Target,
  ChevronRight,
  ChevronLeft,
  School,
  CheckCircle2,
  PlayCircle,
  FileText,
  Star,
  Quote,
  GraduationCap,
  MapPin,
  Users,
  HelpCircle,
  Compass,
  Search,
  Sparkles,
  Plus,
  Minus,
  Clock,
} from "lucide-react";

const bannerData = [
  {
    id: 'free_test',
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2000&auto=format&fit=crop",
    badge: "🎁 সম্পূর্ণ বিনামূল্যে মক টেস্ট",
    title: (
      <>
        আপনার SLST Math প্রস্তুতি যাচাই করুন <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          প্রতিদিন ফ্রি মক টেস্ট দিয়ে!
        </span>
      </>
    ),
    subtitle:
      "SLST Mathematics-এর সেরা প্রস্তুতির জন্য আজই আমাদের ফ্রি মক টেস্ট দিন। বিস্তারিত সমাধান ও স্কোর চেক করুন সম্পূর্ণ বিনামূল্যে।",
    cta: "এখনই মক টেস্ট দিন",
    gradient: "from-[#1e1b4b] via-[#6d28d9] to-transparent",
    link: "/free-daily-test",
    iconColor: "text-purple-400"
  },
  {
    id: 1,
    image: "/carousel/slide1.webp",
    badge: "🚀 নতুন ব্যাচ শুরু হচ্ছে!",
    title: (
      <>
        টার্গেট <span className="text-yellow-400 drop-shadow-lg">JEE 2027</span>{" "}
        <br className="hidden md:block" /> ক্র্যাশ কোর্সে ভর্তি শুরু!
      </>
    ),
    subtitle:
      "৫০০+ ভিডিও লেকচার, মক টেস্ট এবং ডাউট ক্লিয়ারিং সেশন নিয়ে এখনই শুরু করো সম্পূর্ণ প্রস্তুতি।",
    cta: "আজই এনরোল করো",
    gradient: "from-[#1e1b4b] via-[#4338ca] to-transparent",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop",
    badge: "🏆 SLST MATHEMATICS",
    title: (
      <>
        <span className="text-emerald-400 drop-shadow-lg">SLST Mathematics</span>-এর{" "}
        <br className="hidden md:block" /> নতুন লাইভ ব্যাচ
      </>
    ),
    subtitle:
      "সম্পূর্ণ সিলেবাস কভারেজ, চ্যাপ্টার-ভিত্তিক নোটস, এবং ১০০% পরীক্ষার প্রস্তুতির জন্য মক টেস্ট সিরিজ।",
    cta: "জয়েন করো লাইভ কোর্স",
    gradient: "from-[#064e3b] via-[#059669] to-transparent",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
    badge: "📢 স্পেশাল অফার",
    title: (
      <>
        <span className="text-fuchsia-400 drop-shadow-lg">CSIR NET ও GATE</span>:{" "}
        <br className="hidden md:block" /> নিশ্চিত সাফল্যের লক্ষ্যে!
      </>
    ),
    subtitle:
      "পিওর এবং অ্যাপ্লায়েড ম্যাথমেটিক্স এর স্পেশাল কোর্স। স্কলারশিপ টেস্টের মাধ্যমে ভর্তি হলে পাও ৫০% পর্যন্ত ছাড়!",
    cta: "টেস্টের জন্য রেজিস্টার করো",
    gradient: "from-[#4c1d95] via-[#9333ea] to-transparent",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    badge: "🎓 বিএসসি ও এমএসসি (B.Sc & M.Sc)",
    title: (
      <>
        অনার্স ও পাসের জন্য <br className="hidden md:block" /> <span className="text-rose-400 drop-shadow-lg">স্পেশাল গাইডিং ব্যাচ</span>
      </>
    ),
    subtitle: "WBSU, CU, BU সহ সকল ইউনিভার্সিটির সিলেবাস অনুযায়ী স্পেশাল অফলাইন ও অনলাইন ব্যাচ।",
    cta: "বিস্তারিত জানুন",
    gradient: "from-[#7f1d1d] via-[#dc2626] to-transparent",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1427504494785-319ce83d506c?q=80&w=2000&auto=format&fit=crop",
    badge: "📚 মাধ্যমিক প্রস্তুতি",
    title: (
      <>
        নবম ও দশম শ্রেণীর <br className="hidden md:block" /> <span className="text-cyan-400 drop-shadow-lg">গণিতের ফাউন্ডেশন ব্যাচ</span>
      </>
    ),
    subtitle: "WBBSE স্পেশাল: বেসিক থেকে অ্যাডভান্স কনসেপ্ট, শর্টকাট ট্রিক্স এবং পরীক্ষার সেরা প্রস্তুতি।",
    cta: "অ্যাডমিশন শুরু হয়েছে",
    gradient: "from-[#083344] via-[#0891b2] to-transparent",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop",
    badge: "✨ নতুন সেমিস্টার সিস্টেম",
    title: (
      <>
        একাদশ শ্রেণী (<span className="text-orange-400 drop-shadow-lg">1st & 2nd Sem</span>) <br className="hidden md:block" /> WBCHSE স্পেশাল গাইডেন্স
      </>
    ),
    subtitle: "নতুন প্যাটার্নের সাথে মিল রেখে সম্পূর্ণ স্টাডি মেটেরিয়াল এবং বিষয়ভিত্তিক মক টেস্ট।",
    cta: "সিলেবাস জানুন",
    gradient: "from-[#7c2d12] via-[#ea580c] to-transparent",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop",
    badge: "🎯 উচ্চমাধ্যমিক স্পেশাল",
    title: (
      <>
        দ্বাদশ শ্রেণী (<span className="text-pink-400 drop-shadow-lg">3rd & 4th Sem</span>) <br className="hidden md:block" /> মিশন বোর্ড এক্সাম
      </>
    ),
    subtitle: "বোর্ড এক্সাম এবং জয়েন্ট (WBJEE/JEE MAINS) এর জন্য একদম পারফেক্ট ম্যাথমেটিক্স স্ট্র্যাটেজি।",
    cta: "জয়েন করো আজই",
    gradient: "from-[#831843] via-[#db2777] to-transparent",
  }
];

const testimonials = [
  {
    name: "Priya Sharma",
    exam: "IIT JAM 2024",
    rank: "AIR 25 | MATHEMATICS",
    text: "Raj Sir's conceptual guidelines, structured mock tests, and intense doubt sessions completely reshaped my foundation. Highly recommended for elite level national entrance exams!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    motto: "DEDICATION • PERSEVERANCE • ACHIEVEMENT"
  },
  {
    name: "Aniket Sen",
    exam: "WB SLST MATHEMATICS",
    rank: "RANK 5 | IX-X & XI-XII BATCH",
    text: "Cracking SLST Mathematics was my dream. The complete syllabus coverage, handwritten notes, and rigorous mock test analysis made it possible.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?q=80&w=800&auto=format&fit=crop",
    motto: "BELIEVE • PRACTICE • CONQUER"
  },
  {
    name: "Sneha Roy",
    exam: "UGC CSIR NET JRF",
    rank: "AIR 42 | PURE MATHS",
    text: "The abstract algebra and real analysis live classes were a lifesaver. Sir explains the most complex theorems with such ease and clarity.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    motto: "HARD WORK • FOCUS • TRIUMPH"
  },
  {
    name: "Arijit Das",
    exam: "JEE ADVANCED",
    rank: "AIR 2530 | MATHEMATICS",
    text: "Raj sir's approach to calculus entirely changed how I view mathematics. The chapter-wise mock tests match our actual exam level perfectly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    motto: "DISCIPLINE • RESOLVE • SUCCESS"
  },
  {
    name: "Soumya Banerjee",
    exam: "WBJEE OUTSTANDING",
    rank: "RANK 102 | WBJEE BATCH",
    text: "I was extremely weak in Coordinate Geometry before joining. Thanks to Sir's unique problem-solving techniques, it became my strongest area.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    motto: "STRATEGY • ACCURACY • SPEED"
  },
  {
    name: "Sayani Mondal",
    exam: "BOARD SEMESTER TOPPER",
    rank: "98.4% MARKS | WBCHSE",
    text: "Raj sir's video lectures and step-by-step descriptive solutions helped me master the new semester patterns with complete ease.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    motto: "CURIOSITY • REVISION • EXCELLENCE"
  }
];

interface RoadmapChapter {
  name: string;
  weightage: string;
  difficulty: "High" | "Medium" | "Very High" | "Medium-High";
}

interface RoadmapExam {
  title: string;
  badge: string;
  description: string;
  chapters: RoadmapChapter[];
}

const roadmapData: Record<string, RoadmapExam> = {
  slst: {
    title: "SLST Mathematics",
    badge: "West Bengal School Service Commission (IX-X & XI-XII)",
    description: "Highly structured syllabus mapped exactly with SSC requirements, previous papers analysis, and focused theorems.",
    chapters: [
      { name: "Real Analysis (Limits, Sequence, Infinite Series, Riemann Integration)", weightage: "25% Weightage", difficulty: "Very High" },
      { name: "Abstract Algebra (Group Theory, Ring, Field, Vector Spaces)", weightage: "20% Weightage", difficulty: "High" },
      { name: "Analytical Geometry (2D, 3D Coordinate System & Vectors)", weightage: "18% Weightage", difficulty: "Medium" },
      { name: "Classical Mechanics & Statics (Dynamics, Forces, Motion)", weightage: "15% Weightage", difficulty: "Very High" },
      { name: "Differential Equations & Numerical Methods", weightage: "12% Weightage", difficulty: "Medium-High" },
      { name: "Linear Programming Problem (LPP Simplex, Duality)", weightage: "10% Weightage", difficulty: "Medium" },
    ]
  },
  jee: {
    title: "JEE Mains & WBJEE",
    badge: "Engineering Joint Entrance Examinations",
    description: "Intense conceptual clarity with fast-solving shortcut tricks, graphic visualizations, and previous year JEE archives.",
    chapters: [
      { name: "Differential & Integral Calculus (Limits, Continuity, Area, Definite)", weightage: "30% Weightage", difficulty: "Very High" },
      { name: "Coordinate Geometry (Parabola, Ellipse, Hyperbola, Straight Lines)", weightage: "22% Weightage", difficulty: "High" },
      { name: "Algebra (Complex Numbers, Matrices, Determinants, Permutations)", weightage: "20% Weightage", difficulty: "High" },
      { name: "Vectors & 3D Geometry", weightage: "15% Weightage", difficulty: "Medium-High" },
      { name: "Probability & Statistics", weightage: "13% Weightage", difficulty: "Medium" },
    ]
  },
  net: {
    title: "CSIR NET & GATE Math",
    badge: "Higher National & Eligibility Fellowship Prep",
    description: "Rigorous academic proofing, advanced pure math methodology, and modern application of theorems.",
    chapters: [
      { name: "Linear Algebra (Jordan Canonic, Bilinear Form, Inner Product)", weightage: "35 Marks", difficulty: "High" },
      { name: "Real & Complex Analysis (Metric Spaces, Cauchy Integral, Analytic)", weightage: "40 Marks", difficulty: "Very High" },
      { name: "Modern Algebra (Sylow Theorems, Galois Field, Ideal Rings)", weightage: "25 Marks", difficulty: "Very High" },
      { name: "Ordinary & Partial Differential Equations", weightage: "20 Marks", difficulty: "Medium-High" },
      { name: "Numerical & Functional Analysis", weightage: "15 Marks", difficulty: "High" },
    ]
  },
  boards: {
    title: "Class 11 & 12 Boards (WBCHSE / CBSE)",
    badge: "Board Semester & High School Foundation",
    description: "Deep fundamental learning, step-by-step descriptive solutions, board pattern mocks, and thorough revisions.",
    chapters: [
      { name: "Calculus (First Principles, Derivatives, Integration Applications)", weightage: "35% Marks", difficulty: "High" },
      { name: "Relations, Functions & Inverse Trigonometric Functions", weightage: "15% Marks", difficulty: "Medium" },
      { name: "Vectors, 3D Geometry & Coordinates", weightage: "18% Marks", difficulty: "Medium-High" },
      { name: "Matrices, Determinants & System of Linear Equations", weightage: "17% Marks", difficulty: "Medium" },
      { name: "Probability & Linear Programming", weightage: "15% Marks", difficulty: "Medium" },
    ]
  }
};

const faqData = [
  {
    q: "Raj Sir-এর লাইভ ম্যাথ ক্লাস কীভাবে জয়েন করব?",
    a: "আমাদের লাইভ ক্লাসে জয়েন করার জন্য সরাসরি উপরের 'Start Learning' বা 'আজই এনরোল করো' বাটনে ক্লিক করতে পারেন অথবা সরাসরি আমাদের হেল্পলাইন নম্বর +91 83458 19377 এ WhatsApp বা কল করতে পারেন। ভর্তি প্রক্রিয়া ও ব্যাচের সময়সূচী বিস্তারিত জানিয়ে দেওয়া হবে।"
  },
  {
    q: "SLST Mathematics-এর জন্য কি আলাদা স্টাডি মেটেরিয়াল বা সাজেস্টিভ নোট দেওয়া হয়?",
    a: "হ্যাঁ, SLST Mathematics (IX-X এবং XI-XII) পরীক্ষার জন্য সম্পূর্ণ সিলেবাস অনুযায়ী রাজ স্যারের নিজের তৈরি স্পেশাল হ্যান্ড-রিটেন ক্লাস নোটস, চ্যাপ্টার-ভিত্তিক সাজেস্টিভ কোয়েশ্চেন ব্যাঙ্ক এবং সলভড পিডিএফ ফাইলস কোর্সে দেওয়া হয়ে থাকে।"
  },
  {
    q: "আমি যদি লাইভ ক্লাস মিস করি, তাহলে কি রেকর্ডেড ব্যাকআপ পাবো?",
    a: "হ্যাঁ! প্রতিটি লাইভ ক্লাসের পর আমাদের বিশেষ অ্যাপের মাধ্যমে প্রতিটি ভিডিও রেকর্ডিং আজীবন বা নির্দিষ্ট মেয়াদ পর্যন্ত আনলিমিটেড বার রিভিশন করার জন্য ব্যাকআপ দেওয়া হয়। ফলে ক্লাস মিস করলেও কোনো ক্ষতি নেই।"
  },
  {
    q: "ওয়েবসাইটের ফ্রি মক টেস্ট দেওয়ার নিয়ম কী?",
    a: "আমাদের ওয়েবসাইটে 'Free Daily Test' পেইজে গিয়ে আপনার নাম, ফোন নম্বর ও জেলা সিলেক্ট করে সরাসরি সম্পূর্ণ বিনামূল্যে প্রতিদিনের লাইভ মক টেস্টে অংশ নিতে পারবেন। টেস্ট শেষে সঠিক উত্তর ও বিস্তারিত ব্যাখ্যাসহ সল্যুশন গাইডও দেখতে পাবেন।"
  },
  {
    q: "উচ্চমাধ্যমিক (Sem 1, 2, 3 & 4) নতুন সেমিস্টার প্যাটার্নে কেমন প্রিপারেশন করানো হয়?",
    a: "নতুন সেমিস্টার প্যাটার্ন অনুযায়ী CBSE ও WBCHSE বোর্ডের প্রতিটি চ্যাপ্টারের বেসিক থিয়োরি খুঁটিনাটি ক্লিয়ার করার সাথে সাথে প্রচুর MCQ ও শর্টকাট মেথডে সমাধান করার জন্য বিশেষ প্র্যাকটিস শীট ও রেগুলার ক্লাস টেস্ট নেওয়া হয়।"
  },
  {
    q: "অনলাইন ক্লাস নাকি অফলাইন—কোন মোডে ক্লাস নেওয়া হয় এবং লোকেশন কী?",
    a: "রাজ স্যার অনলাইন ও অফলাইন দুটি মোডেই পড়িয়ে থাকেন। অনলাইন লাইভ ক্লাস আমাদের ডেডিকেটেড পোর্টালে হয়, এবং অফলাইন ক্লাস সংক্রান্ত লোকেশন, ব্যাচ টাইমিং বা স্পেশাল ডিসকাউন্ট সম্পর্কে বিস্তারিত জানার জন্য আমাদের সরাসরি ফোন বা WhatsApp করতে পারেন।"
  },
  {
    q: "মক টেস্ট সিরিজে নেগেটিভ মার্কিং কি চালু থাকে?",
    a: "হ্যাঁ, SLST ও JEE মেইন মক টেস্ট সিরিজে আসল পরীক্ষার মতই প্রতি ভুল উত্তরের জন্য ২৫% (০.২৫) নেগেটিভ মার্কিং ব্যবস্থা চালু রাখা হয়েছে, যা আপনার টাইম ম্যানেজমেন্ট এবং সঠিকতা বৃদ্ধিতে ব্যাপক সাহায্য করে।"
  }
];

const renderBannerPreview = (id: string | number) => {
  switch (id) {
    case 'free_test':
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded border border-purple-500/20">
              Live Mock Test
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              1.4K+ PARTICIPANTS
            </div>
          </div>
          
          <div className="my-4 bg-slate-900/60 p-4 rounded-xl border border-white/5 font-mono text-xs text-left">
            <p className="text-slate-400 mb-1 text-[10px] uppercase tracking-wider">// Question of the Day</p>
            <p className="text-slate-100 font-bold leading-relaxed mb-3">
              If f(x) = sin²(x), find the value of the integral:
            </p>
            <div className="text-pink-300 font-black text-sm my-2 text-center p-2.5 bg-slate-950/60 rounded border border-pink-500/15">
              ∫₀^(π/2) f(x) dx = ?
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-[10px]">
              <div className="bg-slate-950/80 p-2 rounded border border-white/5 text-slate-300 text-center hover:border-pink-500/30 transition-all cursor-pointer">
                (A) π / 2
              </div>
              <div className="bg-slate-950/80 p-2 rounded border border-emerald-500/30 text-emerald-400 text-center font-extrabold">
                (B) π / 4 ✓
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Time Limit</p>
                <p className="text-xs text-slate-200 font-black uppercase tracking-wider">30 Mins</p>
              </div>
            </div>
            <div className="bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(250,204,21,0.3)]">
              FREE PASS
            </div>
          </div>
        </div>
      );

    case 1: // JEE 2027 Crash Course
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded border border-yellow-500/20">
              JEE Mains & WBJEE
            </span>
            <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">
              BATCH ACTIVE
            </span>
          </div>

          <div className="my-3 space-y-2.5">
            <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-left">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <PlayCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-100 font-extrabold uppercase">500+ Video Lectures</p>
                <p className="text-[10px] text-slate-500 font-medium">Chapter-wise crystal clear explanations</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-left">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-100 font-extrabold uppercase">Doubt Portal access</p>
                <p className="text-[10px] text-slate-500 font-medium">Direct solutions from Raj Sir</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/10 flex items-center justify-between text-left">
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Target Rank Goal</p>
              <p className="text-sm font-black text-indigo-300">UNDER AIR 1000</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></div>
          </div>
        </div>
      );

    case 2: // SLST Mathematics Live Batch
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-500/20">
              SLST IX-X / XI-XII
            </span>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">
              NEW BATCH
            </span>
          </div>

          <div className="my-3 space-y-2.5">
            <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-left">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-100 font-extrabold uppercase">Handwritten Notes</p>
                <p className="text-[10px] text-slate-500 font-medium">Comprehensive theorem proof PDFs</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-left">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-100 font-extrabold uppercase">100% Syllabus Coverage</p>
                <p className="text-[10px] text-slate-500 font-medium">Rigorous previous year analysis</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/10 flex items-center justify-between text-left">
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Coaching History</p>
              <p className="text-sm font-black text-emerald-300">92% SUCCESS RATE</p>
            </div>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      );

    case 3: // CSIR NET & GATE Math
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-fuchsia-400 bg-fuchsia-400/10 px-2.5 py-1 rounded border border-fuchsia-500/20">
              CSIR NET / GATE
            </span>
            <span className="text-[11px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/10">
              HIGHER MATHS
            </span>
          </div>

          <div className="my-3 space-y-2 text-left">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Advanced Focus Areas:</p>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-200">
              <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                ✦ Linear Algebra
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                ✦ Real Analysis
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                ✦ Abstract Algebra
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                ✦ Complex Numbers
              </div>
            </div>
          </div>

          <div className="bg-pink-950/40 p-3 rounded-xl border border-pink-500/10 flex items-center justify-between text-left">
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Limited Offer</p>
              <p className="text-xs font-black text-pink-300">SCHOLARSHIP UP TO 50% OFF</p>
            </div>
            <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>
        </div>
      );

    case 4: // B.Sc & M.Sc Honours
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded border border-rose-500/20">
              B.Sc & M.Sc BATCH
            </span>
            <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/10">
              UNIVERSITY PREP
            </span>
          </div>

          <div className="my-3 space-y-2.5 text-left">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Curriculum Mapped For:</p>
            <div className="flex flex-wrap gap-1.5">
              {['WBSU', 'CU', 'BU', 'Kalyani'].map((uni, idx) => (
                <span key={idx} className="bg-slate-900 border border-white/5 text-[9px] font-extrabold text-slate-300 px-2 py-1 rounded">
                  {uni}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              Rigorous descriptive proof writing, step-by-step calculus, and previous year solutions.
            </p>
          </div>

          <div className="bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/10 flex items-center justify-between text-[10px] font-bold text-rose-300 uppercase text-left">
            <span>Descriptive Guides active</span>
            <School className="w-4 h-4 text-rose-400" />
          </div>
        </div>
      );

    case 5: // Class 9 & 10 Foundation
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded border border-cyan-500/20">
              CLASS 9 & 10 CORES
            </span>
            <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/10">
              WBBSE / CBSE
            </span>
          </div>

          <div className="my-3 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-200 font-extrabold">Concept-to-Shortcut Practice</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-200 font-extrabold">Regular Parent Updates</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-200 font-extrabold">Weekly feedback tests</p>
            </div>
          </div>

          <div className="bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-500/10 text-center text-[10px] font-black text-cyan-300 uppercase tracking-widest">
            ADMISSION OPEN FOR 2026-27
          </div>
        </div>
      );

    case 6: // Class 11 Semester System
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400 bg-orange-400/10 px-2.5 py-1 rounded border border-orange-500/20">
              WBCHSE CLASS 11
            </span>
            <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/10">
              SEM 1 & 2 FOCUS
            </span>
          </div>

          <div className="my-3 space-y-2.5 text-left">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">New MCQ Guidelines Covered:</p>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5 text-[11px] text-slate-200 font-medium leading-relaxed">
              We provide chapter-wise MCQ sheets, short trick videos, and board mock environments.
            </div>
          </div>

          <div className="bg-orange-950/40 p-2.5 rounded-xl border border-orange-500/10 flex items-center justify-between text-xs font-bold text-orange-300 text-left">
            <span>Free PDF Syllabus Guide</span>
            <BookOpen className="w-4 h-4 text-orange-400" />
          </div>
        </div>
      );

    case 7: // Class 12 Semester System
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 bg-pink-400/10 px-2.5 py-1 rounded border border-pink-500/20">
              WBCHSE CLASS 12
            </span>
            <span className="text-[11px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/10">
              SEM 3 & 4 BOARD
            </span>
          </div>

          <div className="my-3 space-y-2 text-left">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-200">
              <span>BOARD PATTERN REVISION</span>
              <span className="text-pink-400">100%</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-pink-500" style={{ width: '100%' }}></div>
            </div>
            
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-200">
              <span>JEE MAINS & WBJEE PREP</span>
              <span className="text-pink-400">100%</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-pink-500" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="bg-pink-950/40 p-2.5 rounded-xl border border-pink-500/10 flex items-center justify-between text-xs font-black text-pink-300 uppercase tracking-widest text-left">
            <span>MISSION BOARD ACTIVE</span>
            <Target className="w-4 h-4 text-pink-400" />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeRoadmap, setActiveRoadmap] = useState<string>("slst");
  const [checkedChapters, setCheckedChapters] = useState<string[]>([]);
  const [faqSearch, setFaqSearch] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useSEO(
    "Best SLST Mathematics & JEE Mains Coaching",
    "Master Mathematics for SLST, JEE Mains, WBJEE, GATE, and CSIR NET with Raj Sir. Access free daily mock tests, study materials, and premium video lectures."
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex-1">
      {/* Banner Section */}
      <section className="pt-6 pb-2 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[540px] md:h-[620px] rounded-[32px] overflow-hidden border border-white/15 bg-slate-950/80 shadow-[0_25px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] group flex">
          
          <div className="relative flex-1 h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={bannerData[currentBanner].image}
                  alt="Coaching Banner"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop";
                  }}
                  className="w-full h-full object-cover mix-blend-luminosity opacity-35 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                
                {/* Subtle Ambient Light Leak inside slide */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Math Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15 mix-blend-overlay"></div>
                
                {/* Decorative Floating Math Symbols */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 z-10">
                  <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 left-[15%] text-2xl font-serif text-yellow-300/50 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                  >
                    ∫ f(x) dx
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 left-[25%] text-3xl font-serif text-pink-400/40"
                  >
                    ∑ x_i
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-24 right-[40%] text-4xl font-serif text-purple-400/40"
                  >
                    π
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute top-1/3 left-[45%] text-2xl font-mono text-cyan-400/50"
                  >
                    dy/dx
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-28 right-[35%] text-3xl font-serif text-amber-300/40"
                  >
                    √x² + y²
                  </motion.div>
                </div>

                {/* Overlay mask */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${bannerData[currentBanner].gradient} opacity-95 transition-all duration-1000`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent"></div>
                
                {/* Banner Content Overlay with Grid */}
                <div className="absolute inset-0 p-6 sm:p-10 md:p-14 lg:p-16 w-full h-full flex items-center z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                    
                    {/* Left Column: Title & Subtitle */}
                    <div className="lg:col-span-7 flex flex-col justify-center text-left">
                      <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 self-start text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{bannerData[currentBanner].badge}</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-50 uppercase tracking-tight leading-[1.1] drop-shadow-2xl mb-4 sm:mb-6">
                        {bannerData[currentBanner].title}
                      </h2>
                      <p className="text-slate-300 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 font-medium leading-relaxed border-l-2 border-pink-500/80 pl-4 max-w-2xl bg-slate-950/30 py-2 rounded-r-xl backdrop-blur-sm border-y border-r border-white/5">
                        {bannerData[currentBanner].subtitle}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 self-start">
                        <Link
                          to={(bannerData[currentBanner] as any).link || "/courses"}
                          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm md:text-base uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(219,39,119,0.5)] hover:shadow-[0_0_35px_rgba(219,39,119,0.7)] hover:-translate-y-1 active:translate-y-0 border border-white/20"
                        >
                          <span>{bannerData[currentBanner].cta}</span>
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <a
                          href="https://wa.me/918345819377"
                          target="_blank"
                          rel="noreferrer"
                          className="hidden sm:inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all border border-white/10 backdrop-blur-md hover:border-emerald-500/40"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>Quick Enquiry</span>
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Premium Visual Interactive Display */}
                    <div className="hidden lg:flex lg:col-span-5 justify-center items-center h-full">
                      <div className="w-full max-w-[380px] p-1 rounded-3xl bg-gradient-to-tr from-pink-500/30 via-purple-500/20 to-indigo-500/30 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden relative group/preview">
                        {/* Glow effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-2xl opacity-75 group-hover/preview:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        
                        {/* Frame Wrapper */}
                        <div className="bg-slate-950/90 rounded-[22px] p-6 relative z-10 border border-white/10 flex flex-col justify-between h-[350px]">
                          {renderBannerPreview(bannerData[currentBanner].id)}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow Controls */}
          <button
            onClick={() => setCurrentBanner((prev) => (prev - 1 + bannerData.length) % bannerData.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 border border-white/15 text-white/80 hover:text-white hover:bg-slate-900 hover:border-pink-500/50 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-xl hover:scale-110 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentBanner((prev) => (prev + 1) % bannerData.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 border border-white/15 text-white/80 hover:text-white hover:bg-slate-900 hover:border-pink-500/50 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-xl hover:scale-110 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Banner Navigation Dots & Counter */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20 bg-slate-950/70 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
            <span className="text-[11px] font-mono font-bold text-slate-400">
              0{currentBanner + 1} / 0{bannerData.length}
            </span>
            <div className="h-3 w-[1px] bg-white/10"></div>
            <div className="flex gap-2 items-center">
              {bannerData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentBanner ? "w-6 bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" : "w-2 bg-white/30 hover:bg-white/60"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Bento Grid Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[#020617]">
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Main Hero Card (Large, Span 8) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-8 row-span-2 relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 lg:p-12 overflow-hidden group shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] group-hover:bg-pink-500/20 transition-colors duration-700"></div>
              
              <div className="relative z-10 mb-8">
                <div className="inline-flex gap-2 mb-6">
                  <span className="bg-pink-500/10 text-pink-400 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-pink-500/20 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(236,72,153,0.15)] flex items-center">
                    <Star className="w-3.5 h-3.5 mr-2 fill-pink-400" /> Premium Coaching
                  </span>
                </div>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tighter mb-6 leading-[1.05] text-white font-black drop-shadow-lg">
                  Master{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    Mathematics
                  </span>{" "}
                  <br />
                  with Confidence
                </h1>
                <p className="text-slate-300 text-base sm:text-xl max-w-xl leading-relaxed font-medium">
                  Join the elite circle of toppers. Expert coaching for JEE Mains, SLST Mathematics, and Advanced Competitive Exams.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10">
                <Link
                  to="/courses"
                  className="bg-white hover:bg-slate-100 text-slate-900 font-black py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest"
                >
                  <PlayCircle className="h-5 w-5" /> Start Learning
                </Link>
                <Link
                  to="/mock-test"
                  className="bg-slate-800/50 border border-white/10 hover:border-pink-500/30 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:-translate-y-1 flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest backdrop-blur-md shadow-lg"
                >
                  <Target className="h-5 w-5 text-pink-400" /> Mock Tests
                </Link>
              </div>
            </motion.div>

            {/* Stats Card 1 (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-4 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] flex flex-col justify-center items-center text-center shadow-xl group hover:border-white/20 transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter leading-none mb-3 drop-shadow-md">
                500+
              </p>
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
                Video Lectures
              </p>
            </motion.div>

            {/* Free Test Card (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-4 relative group rounded-[32px] p-[1px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Link to="/free-daily-test" className="relative h-full bg-[#020617] backdrop-blur-xl rounded-[31px] p-8 flex flex-col justify-between overflow-hidden shadow-2xl block">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[40px] group-hover:bg-emerald-500/30 transition-colors"></div>
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.6)] z-20 animate-pulse rotate-12">
                  Live Free
                </div>
                <div className="bg-gradient-to-br from-emerald-400 to-teal-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)] mb-6 z-10 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-slate-900" />
                </div>
                <div className="z-10">
                  <h3 className="font-display font-black text-2xl text-white tracking-tight mb-2">
                    Free Daily Test
                  </h3>
                  <p className="text-emerald-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2">
                    SLST Math Exam <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                  </p>
                </div>
              </Link>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-10 border-y border-white/5 bg-[#020617] overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex gap-16 px-8 items-center justify-around shrink-0">
                <MarqueeItem text="JEE MAINS" />
                <MarqueeItem text="SLST MATH" />
                <MarqueeItem text="GATE 2025" />
                <MarqueeItem text="CSIR NET" />
                <MarqueeItem text="WBJEE" />
             </div>
          ))}
        </motion.div>
      </section>

      {/* About Raj Sir Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 p-1 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl bg-slate-950/60">
              <div className="md:col-span-5 relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-600 to-violet-600 p-1 mb-6 shadow-[0_0_30px_rgba(219,39,119,0.3)]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-[#090014] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
                      alt="Raj Sir"
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                    />
                  </div>
                </div>
                <h3 className="font-display text-3xl text-slate-50 font-bold tracking-tight mb-2 uppercase">
                  Raj Sir
                </h3>
                <p className="text-pink-400 font-bold text-xs uppercase tracking-widest mb-4">
                  Mentor & Founder
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Award className="h-4 w-4 text-violet-400" /> 9+ Years Experience
                </div>
              </div>
              <div className="md:col-span-7 p-8 md:p-12 relative z-10">
                <h4 className="flex items-center gap-3 text-lg font-bold text-slate-50 mb-6 uppercase tracking-wider">
                  <GraduationCap className="h-6 w-6 text-pink-400" />
                  Credentials & Qualifications
                </h4>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-white/10 p-1.5 rounded text-pink-300">
                      <BookOpen className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        BSc in Mathematics
                      </p>
                      <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Bankura Christian College
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-white/10 p-1.5 rounded text-pink-300">
                      <BookOpen className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        MSc in Pure Mathematics
                      </p>
                      <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        The University of Burdwan
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-pink-600/20 p-1.5 rounded text-pink-400">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        GATE
                      </p>
                      <p className="text-[11px] text-pink-400/80 uppercase tracking-wider font-bold">
                        Qualified
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-pink-600/20 p-1.5 rounded text-pink-400">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        CSIR NET Mathematical Sciences (LS)
                      </p>
                      <p className="text-[11px] text-pink-400/80 uppercase tracking-wider font-bold">
                        Qualified
                      </p>
                    </div>
                  </li>
                </ul>

                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Class 9 to 12 (WB, CBSE, ICSE)",
                    "WBJEE & JEE Mains",
                    "UG Math Honours",
                    "Engineering Mathematics",
                    "NSOU UG & PG Courses",
                  ].map((subject, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-800/60 border border-white/10 text-slate-300 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-pink-200/60 uppercase tracking-widest">
              Premium Curriculum
            </h3>
            <Link
              to="/courses"
              className="text-pink-400 text-xs font-bold hover:text-pink-300"
            >
              View All Courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-50">
            <CourseCard
              title="JEE Mains Mathematics"
              subtitle="Limit, Continuity, Differentiability, Algebra & Coordinate Geometry modules."
              icon="∫"
              stats="12/20 Lessons"
              progress={60}
              active
            />
            <CourseCard
              title="SLST Mathematics"
              subtitle="Real Analysis, Abstract Algebra, Mechanics and Previous Year Questions."
              icon="Σ"
              stats="15/15 Lessons"
              progress={100}
              completed
            />
            <CourseCard
              title="Advanced Mathematics"
              subtitle="Higher Math Foundations, Application based problems for GATE/NET."
              icon="⌬"
              stats="0/15 Lessons"
              progress={0}
              enrolling
            />
          </div>
        </div>
      </section>

      {/* Interactive Concept Syllabus Roadmap Tracker */}
      <section className="py-16 bg-[#020617] relative overflow-hidden border-t border-white/5">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-12">
            <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Compass className="w-4 h-4 text-pink-400" /> Interactive Syllabus Explorer
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-slate-50 font-black uppercase tracking-tight">
              Syllabus Roadmap & Weightage
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Select your target exam, see the chapter-wise weightage and difficulty levels. Interactive checkmarks help you track your preparation progress on the fly!
            </p>
          </div>

          {/* Exam Toggles */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(roadmapData).map(([key, exam]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveRoadmap(key);
                }}
                className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 border ${
                  activeRoadmap === key
                    ? "bg-gradient-to-r from-pink-600 to-violet-600 text-white border-pink-500 shadow-[0_0_20px_rgba(219,39,119,0.3)]"
                    : "bg-slate-900/60 text-slate-400 border-white/10 hover:border-slate-700 hover:text-white"
                }`}
              >
                {exam.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Exam Meta & Live Interactive Progress */}
            <div className="lg:col-span-4 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] pointer-events-none"></div>
              
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full inline-block mb-4">
                Active Category
              </span>
              <h3 className="font-display font-black text-2xl text-white mb-2 uppercase leading-tight">
                {roadmapData[activeRoadmap].title}
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">
                {roadmapData[activeRoadmap].badge}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                {roadmapData[activeRoadmap].description}
              </p>

              {/* Progress Tracker Card */}
              <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Your Tracked Progress
                  </span>
                  <span className="text-sm font-black text-emerald-400">
                    {Math.round(
                      (roadmapData[activeRoadmap].chapters.filter(ch => checkedChapters.includes(ch.name)).length /
                        roadmapData[activeRoadmap].chapters.length) *
                        100
                    )}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5 mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                    style={{
                      width: `${
                        (roadmapData[activeRoadmap].chapters.filter(ch => checkedChapters.includes(ch.name)).length /
                          roadmapData[activeRoadmap].chapters.length) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Toggle the checkmarks of the chapters on the right that you have studied to track your syllabus completion rate!
                </p>
              </div>
            </div>

            {/* Right Side: Chapter Roadmap list */}
            <div className="lg:col-span-8 space-y-4">
              {roadmapData[activeRoadmap].chapters.map((chapter, idx) => {
                const isChecked = checkedChapters.includes(chapter.name);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isChecked) {
                        setCheckedChapters(checkedChapters.filter(c => c !== chapter.name));
                      } else {
                        setCheckedChapters([...checkedChapters, chapter.name]);
                      }
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer select-none ${
                      isChecked
                        ? "bg-slate-900/80 border-emerald-500/30 hover:border-emerald-500/50"
                        : "bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Interactive check button */}
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                          isChecked
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                            : "bg-slate-950/50 border-white/10 text-transparent"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <p className={`text-sm sm:text-base font-bold transition-colors duration-300 ${isChecked ? "text-emerald-300 line-through opacity-85" : "text-slate-100"}`}>
                          {chapter.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950/60 border border-white/5 text-pink-400">
                            {chapter.weightage}
                          </span>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            chapter.difficulty === 'Very High' || chapter.difficulty === 'High'
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          }`}>
                            Difficulty: {chapter.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#0B1120] relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-12">
            <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-violet-400" /> FAQ
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-slate-50 font-black uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              ভর্তি সংক্রান্ত, ক্লাস মডিউল বা মক টেস্ট নিয়ে আপনার মনের যাবতীয় সাধারণ প্রশ্নের উত্তর এখানে পেয়ে যাবেন।
            </p>
          </div>

          {/* Search Box */}
          <div className="relative mb-10 max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => {
                setFaqSearch(e.target.value);
                setOpenFaq(null); // Close active ones on search changes
              }}
              placeholder="প্রশ্ন খুঁজুন (যেমন: মক টেস্ট, ভিডিও...)"
              className="w-full bg-slate-900/80 border border-white/10 hover:border-white/20 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all rounded-2xl py-4 pl-12 pr-6 text-slate-200 text-sm sm:text-base font-medium placeholder-slate-500 shadow-inner outline-none"
            />
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {faqData
              .filter(item =>
                item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                item.a.toLowerCase().includes(faqSearch.toLowerCase())
              )
              .map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-base sm:text-lg font-bold text-slate-100 uppercase tracking-tight hover:text-pink-300 transition-colors">
                        {item.q}
                      </span>
                      <div className={`p-1.5 rounded-lg border bg-slate-950/60 transition-colors duration-300 shrink-0 ${isOpen ? "border-pink-500/30 text-pink-400" : "border-white/10 text-slate-400"}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/5 bg-slate-950/20"
                        >
                          <div className="p-6 text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

            {faqData.filter(item =>
              item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
              item.a.toLowerCase().includes(faqSearch.toLowerCase())
            ).length === 0 && (
              <div className="text-center py-12 bg-slate-900/20 border border-white/5 rounded-2xl">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-400 font-bold">দুঃখিত, কোনো মিল পাওয়া যায়নি!</p>
                <p className="text-slate-500 text-xs mt-1">অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে খুঁজুন।</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials & Proud Achievers Oval Posters */}
      <section className="py-20 lg:py-28 bg-[#020617] w-full border-y border-white/5 relative overflow-hidden">
        {/* Decorative Background Lighting */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[180px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-16">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> HALL OF FAME
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-slate-50 font-black uppercase tracking-tight">
              Our Proud Achievers
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Explore the stellar success stories of students mentored by Raj Sir. Auto-rotating certificate posters designed with academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Interactive Success Story Carousel Poster (Oval Poster just like image) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              
              {/* Outer Decorative Glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-violet-500/10 rounded-full blur-3xl opacity-80 pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.93, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.93, rotate: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-[390px] sm:max-w-[420px] aspect-[3/4.2] rounded-[50%_50%_50%_50%_/_35%_35%_35%_35%] border-[10px] border-double border-amber-500/90 bg-gradient-to-b from-[#060b1e] via-[#10162f] to-[#2a1320] text-center shadow-[0_0_50px_rgba(245,158,11,0.3)] relative overflow-hidden flex flex-col items-center justify-between p-7 select-none"
                >
                  {/* Subtle Poster Glass Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none"></div>

                  {/* Top Hanging Ring / Crown Ornament */}
                  <div className="absolute top-2 w-8 h-8 rounded-full border-2 border-amber-500/60 flex items-center justify-center bg-transparent">
                    <div className="w-4 h-4 rounded-full border border-amber-500/50"></div>
                  </div>

                  {/* Arched Certificate Ribbon Text */}
                  <div className="mt-5 flex flex-col items-center z-10">
                    <span className="text-amber-400 font-black tracking-[0.15em] text-[10px] sm:text-xs uppercase bg-amber-950/90 border border-amber-500/40 px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                      ★ CONGRATULATIONS! ★
                    </span>
                    <h4 className="font-display font-black text-amber-200/50 text-[9px] tracking-[0.25em] uppercase mt-2.5">
                      SUCCESS STUDENT
                    </h4>
                  </div>

                  {/* Central Student Photo Circle with Laurel/Gold Ring */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 shadow-[0_8px_25px_rgba(0,0,0,0.6)] z-10">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    {/* Golden Medal Badge at Bottom Right of Portrait */}
                    <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 border border-amber-100 flex items-center justify-center shadow-lg">
                      <Award className="w-4.5 h-4.5 text-slate-950 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Horizontal Ribbony Name Banner */}
                  <div className="w-[90%] bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 text-slate-950 font-display font-extrabold text-base sm:text-lg uppercase tracking-wider py-1.5 px-3 shadow-[0_6px_20px_rgba(0,0,0,0.5)] border-y border-amber-300/40 relative z-10 rounded-md">
                    <div className="absolute -left-1 top-1.5 w-1 h-full bg-amber-800 -z-10 rounded-l"></div>
                    <div className="absolute -right-1 top-1.5 w-1 h-full bg-amber-800 -z-10 rounded-r"></div>
                    <span className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                      {testimonials[activeTestimonial].name}
                    </span>
                  </div>

                  {/* Exam details & Ranks */}
                  <div className="flex flex-col items-center z-10 w-full px-2">
                    <p className="font-display font-black text-white text-xs sm:text-sm tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-300">
                      {testimonials[activeTestimonial].exam}
                    </p>
                    {/* Gold Divider Line */}
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent my-1.5"></div>
                    <p className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-amber-300 uppercase">
                      {testimonials[activeTestimonial].rank}
                    </p>
                  </div>

                  {/* Motivational Motto footer */}
                  <div className="border-t border-amber-500/20 w-[85%] pt-2.5 z-10">
                    <p className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] text-amber-400/80 uppercase">
                      {testimonials[activeTestimonial].motto}
                    </p>
                  </div>

                  {/* Triple Academic Symbol icons */}
                  <div className="flex items-center gap-4 text-amber-500/30 pb-1 z-10">
                    <GraduationCap className="w-4 h-4" />
                    <School className="w-4 h-4" />
                    <Award className="w-4 h-4" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Slide dots inside Poster Card footer */}
              <div className="flex gap-2.5 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === idx ? "w-6 bg-amber-400" : "w-2 bg-slate-700 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Detailed Comment Cards & Navigation & Thumbnail Bar */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
              
              {/* Core Student Testimonial Text with Speech Bubble Quote Look */}
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-[32px] relative shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-[32px]"></div>
                
                <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 h-8 w-8 sm:h-10 sm:w-10 text-amber-500/10 group-hover:text-amber-500/15 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1.5 mb-4 sm:mb-5 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed font-semibold italic mb-5 sm:mb-6">
                        "{testimonials[activeTestimonial].text}"
                      </p>
                      
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-400"></div>
                        <p className="text-[10px] sm:text-xs text-amber-400/95 font-bold uppercase tracking-widest">
                          Certified Achiever • Verified Success Story
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Back/Next manual navigation triggers */}
                <div className="flex gap-2 sm:gap-3 justify-end mt-6 sm:mt-8 relative z-10 border-t border-white/5 pt-4 sm:pt-6">
                  <button
                    onClick={() => {
                      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                    }}
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-950 border border-white/10 hover:border-amber-500/50 hover:bg-slate-900 text-slate-400 hover:text-amber-400 transition-all duration-300"
                    aria-label="Previous Student"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
                    }}
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-950 border border-white/10 hover:border-amber-500/50 hover:bg-slate-900 text-slate-400 hover:text-amber-400 transition-all duration-300"
                    aria-label="Next Student"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Clickable Student Thumbnails Bar (Fast switcher) */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Quick Switch Achiever List:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {testimonials.map((testi, idx) => {
                    const isActive = activeTestimonial === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer select-none ${
                          isActive
                            ? "bg-slate-900/90 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                            : "bg-slate-900/30 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                        }`}
                      >
                        <img
                          src={testi.image}
                          alt={testi.name}
                          className={`w-9 h-9 rounded-full object-cover border transition-all duration-300 ${
                            isActive ? "border-amber-400 scale-105" : "border-white/10"
                          }`}
                        />
                        <div className="truncate">
                          <p className={`text-xs font-black truncate uppercase tracking-tight ${isActive ? "text-amber-300" : "text-slate-300"}`}>
                            {testi.name}
                          </p>
                          <p className="text-[9px] text-slate-500 font-bold truncate tracking-tighter uppercase mt-0.5">
                            {testi.exam.replace("TOPPER", "").replace("OUTSTANDING", "").trim()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Bottom Banner */}
      <section className="py-12 my-8 border-t border-white/10 bg-[#0B1120] w-full backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden group transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Background Accent */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/30 transition-colors"></div>

              <div className="relative z-10">
                <p className="text-yellow-400 font-bold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-yellow-400" /> New Exam Live
                </p>
                <h4 className="text-2xl font-black mb-2 text-slate-50 drop-shadow-md">
                  SLST Sunday Mock Marathon
                </h4>
                <p className="text-xs text-slate-300 font-bold tracking-wider uppercase">
                  30 Questions • 60 Minutes • Negative Marking
                </p>
              </div>
              <Link
                to="/mock-test"
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] shrink-0 whitespace-nowrap transition-all group-hover:-translate-y-1 relative z-10 flex items-center gap-2"
              >
                Attempt Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex gap-4">
              <Link to="/notes" className="flex-1 bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-sky-400/30 hover:bg-slate-800 transition-all group shadow-xl hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-2xl bg-sky-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="text-sky-400 h-7 w-7" />
                </div>
                <p className="text-base font-black text-slate-50">PDF Notes</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold group-hover:text-sky-400 transition-colors">
                  Premium Library
                </p>
              </Link>
              <Link to="/courses" className="flex-1 bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-pink-400/30 hover:bg-slate-800 transition-all group shadow-xl hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-2xl bg-pink-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="text-pink-400 h-7 w-7" />
                </div>
                <p className="text-base font-black text-slate-50">Video Lectures</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold group-hover:text-pink-400 transition-colors">
                  24/7 Access
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({
  title,
  subtitle,
  icon,
  stats,
  progress,
  active,
  completed,
  enrolling,
}: any) {
  return (
    <div className="bg-gradient-to-b from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] relative overflow-hidden group hover:border-pink-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-serif italic border shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 ${active ? "bg-gradient-to-br from-pink-600/20 to-violet-600/20 text-pink-400 border-pink-500/20" : completed ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-800/60 text-slate-300 border-white/10"}`}>
          {icon}
        </div>
        {active && (
          <span className="bg-pink-600/20 text-pink-300 text-[10px] font-bold px-3 py-1.5 rounded border border-pink-600/30 uppercase tracking-widest shadow-sm">
            Active
          </span>
        )}
        {completed && (
          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded border border-emerald-500/20 uppercase tracking-widest shadow-sm">
            Chapterwise
          </span>
        )}
        {enrolling && (
          <span className="bg-slate-800/60 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded border border-white/10 uppercase tracking-widest shadow-sm">
            Enrolling
          </span>
        )}
      </div>
      <h4 className="font-display font-bold text-xl mb-3 relative z-10 text-white drop-shadow-sm group-hover:text-pink-100 transition-colors">
        {title}
      </h4>
      <p className="text-sm text-slate-400 mb-8 leading-relaxed relative z-10 flex-1 font-medium">
        {subtitle}
      </p>

      <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-auto relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {stats}
          </div>
          <div className="text-[10px] font-black text-pink-400">
            {progress}%
          </div>
        </div>
        <div className="w-full bg-slate-950/50 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-inner">
          <div
            className={`h-full rounded-full relative overflow-hidden ${completed ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" : "bg-gradient-to-r from-pink-600 to-violet-600 shadow-[0_0_10px_rgba(219,39,119,0.8)]"}`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat animate-shine"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 text-slate-400/60 uppercase font-display font-black tracking-widest text-xl sm:text-2xl hover:text-white transition-colors duration-300">
      <Star className="w-6 h-6 fill-slate-800 text-slate-800" />
      {text}
    </div>
  );
}
