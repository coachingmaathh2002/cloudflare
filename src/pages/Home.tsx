import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useSEO } from "../lib/useSEO";
import { cn } from "../lib/utils";
import Latex, { MixedLatex } from "../components/LatexRenderer";
import {
  BookOpen,
  Award,
  Target,
  ChevronRight,
  ChevronLeft,
  School,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  PlayCircle,
  FileText,
  Star,
  Quote,
  GraduationCap,
  Users,
  HelpCircle,
  Compass,
  Search,
  Sparkles,
  Plus,
  Minus,
  Clock,
  Flame,
  Zap,
  BrainCircuit,
  RefreshCw,
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";

const bannerData = [
  {
    id: 'free_test',
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2000&auto=format&fit=crop",
    badge: "🎁 সম্পূর্ণ বিনামূল্যে মক টেস্ট",
    title: (
      <>
        আপনার SLST Math প্রস্তুতি যাচাই করুন <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-400 to-purple-300 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]">
          প্রতিদিন ফ্রি মক টেস্ট দিয়ে!
        </span>
      </>
    ),
    subtitle:
      "SLST Mathematics-এর সেরা প্রস্তুতির জন্য আজই আমাদের ফ্রি মক টেস্ট দিন। বিস্তারিত সমাধান ও স্কোর চেক করুন সম্পূর্ণ বিনামূল্যে।",
    cta: "এখনই মক টেস্ট দিন",
    gradient: "from-[#1a0c2e] via-[#581c87]/90 to-transparent",
    link: "/free-daily-test",
    iconColor: "text-purple-400",
    tag: "FREE PRACTICE",
    status: "LIVE NOW",
    highlights: [
      "• 100% Free Daily Practice Mocks",
      "• Instant Result & Rank Analysis",
      "• Complete Step-by-Step Solutions"
    ]
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop",
    badge: "🚀 নতুন ব্যাচ শুরু হচ্ছে!",
    title: (
      <>
        টার্গেট <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 drop-shadow-[0_0_25px_rgba(253,224,71,0.6)] font-black">JEE 2027</span>{" "}
        <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200 drop-shadow-sm">ক্র্যাশ কোর্সে ভর্তি শুরু!</span>
      </>
    ),
    subtitle:
      "৫০০+ ভিডিও লেকচার, মক টেস্ট এবং ডাউট ক্লিয়ারিং সেশন নিয়ে এখনই শুরু করো সম্পূর্ণ প্রস্তুতি।",
    cta: "আজই এনরোল করো",
    gradient: "from-[#0c1938] via-[#1e40af]/90 to-transparent",
    link: "/courses",
    tag: "JEE CRASH COURSE",
    status: "ADMISSIONS OPEN",
    highlights: [
      "• 500+ HD Chapter Video Lectures",
      "• Speed Optimization & Short Tricks",
      "• Dedicated Live Doubt Clearing"
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop",
    badge: "🏆 SLST MATHEMATICS",
    title: (
      <>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 drop-shadow-[0_0_25px_rgba(52,211,153,0.6)]">SLST Mathematics</span>-এর{" "}
        <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200 drop-shadow-sm">নতুন লাইভ ব্যাচ</span>
      </>
    ),
    subtitle:
      "সম্পূর্ণ সিলেবাস কভারেজ, চ্যাপ্টার-ভিত্তিক নোটস, এবং ১০০% পরীক্ষার প্রস্তুতির জন্য মক টেস্ট সিরিজ।",
    cta: "জয়েন করো লাইভ কোর্স",
    gradient: "from-[#042f2e] via-[#0d9488]/90 to-transparent",
    link: "/courses",
    tag: "SLST IX-X & XI-XII",
    status: "NEW BATCH",
    highlights: [
      "• Complete Syllabus Coverage",
      "• Raj Sir's Handwritten Note PDFs",
      "• Exam-Oriented Mock Test Series"
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
    badge: "📢 স্পেশাল অফার",
    title: (
      <>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300 drop-shadow-[0_0_25px_rgba(232,121,249,0.6)]">CSIR NET ও GATE</span>:{" "}
        <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-200 drop-shadow-sm">নিশ্চিত সাফল্যের লক্ষ্যে!</span>
      </>
    ),
    subtitle:
      "পিওর এবং অ্যাপ্লায়েড ম্যাথমেটিক্স এর স্পেশাল কোর্স। স্কলারশিপ টেস্টের মাধ্যমে ভর্তি হলে পাও ৫০% পর্যন্ত ছাড়!",
    cta: "টেস্টের জন্য রেজিস্টার করো",
    gradient: "from-[#2e1065] via-[#7e22ce]/90 to-transparent",
    link: "/mock-test",
    tag: "CSIR NET & GATE",
    status: "SPECIAL OFFER",
    highlights: [
      "• Pure & Applied Maths Mastery",
      "• Higher Level Theorem Proofs",
      "• Up to 50% Scholarship Discount"
    ]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    badge: "🎓 বিএসসি ও এমএসসি (B.Sc & M.Sc)",
    title: (
      <>
        অনার্স ও পাসের জন্য <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-red-300 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">স্পেশাল গাইডিং ব্যাচ</span>
      </>
    ),
    subtitle: "WBSU, CU, BU সহ সকল ইউনিভার্সিটির সিলেবাস অনুযায়ী স্পেশাল অফলাইন ও অনলাইন ব্যাচ।",
    cta: "বিস্তারিত জানুন",
    gradient: "from-[#450a0a] via-[#be123c]/90 to-transparent",
    link: "/courses",
    tag: "UNIVERSITY DEGREE",
    status: "ENROLLING NOW",
    highlights: [
      "• CU, WBSU, BU Varsity Syllabus",
      "• Honours & General Streams",
      "• Interactive Online & Offline Classes"
    ]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop",
    badge: "✨ নতুন সেমিস্টার সিস্টেম",
    title: (
      <>
        একাদশ শ্রেণী (<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 drop-shadow-[0_0_20px_rgba(251,146,60,0.6)] font-black">1st & 2nd Sem</span>) <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 drop-shadow-sm">WBCHSE স্পেশাল গাইডেন্স</span>
      </>
    ),
    subtitle: "নতুন প্যাটার্নের সাথে মিল রেখে সম্পূর্ণ স্টাডি মেটেরিয়াল এবং বিষয়ভিত্তিক মক টেস্ট।",
    cta: "সিলেবাস জানুন",
    gradient: "from-[#431407] via-[#c2410c]/90 to-transparent",
    link: "/notes",
    tag: "CLASS 11 (SEM 1 & 2)",
    status: "NEW PATTERN",
    highlights: [
      "• Aligned with WBCHSE Sem Pattern",
      "• Chapter MCQ Practice Sheets",
      "• Strong Conceptual Foundation"
    ]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop",
    badge: "🎯 উচ্চমাধ্যমিক স্পেশাল",
    title: (
      <>
        দ্বাদশ শ্রেণী (<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 drop-shadow-[0_0_20px_rgba(244,114,182,0.6)] font-black">3rd & 4th Sem</span>) <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-pink-200 drop-shadow-sm">মিশন বোর্ড এক্সাম</span>
      </>
    ),
    subtitle: "বোর্ড এক্সাম এবং জয়েন্ট (WBJEE/JEE MAINS) এর জন্য একদম পারফেক্ট ম্যাথমেটিক্স স্ট্র্যাটেজি।",
    cta: "জয়েন করো আজই",
    gradient: "from-[#500724] via-[#be185d]/90 to-transparent",
    link: "/courses",
    tag: "CLASS 12 (SEM 3 & 4)",
    status: "BOARD MISSION",
    highlights: [
      "• Board + Entrance Sync Prep",
      "• Formula Cheat Sheets & Mocks",
      "• High-scoring Exam Techniques"
    ]
  }
];

const dailyChallenges = [
  {
    id: 1,
    subject: "SLST Math - Real Analysis",
    questionLatex: "If \\, f(x) = \\int_{0}^{x} \\frac{\\sin t}{t} \\, dt, \\, x > 0, \\text{ find } f'(x) \\text{ at } x = \\pi/2.",
    options: [
      { id: "A", latex: "2 / \\pi", correct: true },
      { id: "B", latex: "\\pi / 2", correct: false },
      { id: "C", latex: "1", correct: false },
      { id: "D", latex: "0", correct: false },
    ],
    explanationLatex: "By Leibnitz's Rule of Differentiation under integral sign, \\, f'(x) = \\frac{\\sin x}{x}. \\text{ Substituting } x = \\pi/2 \\Rightarrow f'(\\pi/2) = \\frac{\\sin(\\pi/2)}{\\pi/2} = \\frac{1}{\\pi/2} = \\frac{2}{\\pi}.",
  },
  {
    id: 2,
    subject: "JEE Mains - Calculus",
    questionLatex: "\\text{Evaluate the limit: } \\lim_{x \\to 0} \\frac{e^{x^2} - \\cos x}{x^2}.",
    options: [
      { id: "A", latex: "1/2", correct: false },
      { id: "B", latex: "3/2", correct: true },
      { id: "C", latex: "1", correct: false },
      { id: "D", latex: "2", correct: false },
    ],
    explanationLatex: "Using Taylor series expansion: \\, e^{x^2} = 1 + x^2 + O(x^4) \\text{ and } \\cos x = 1 - \\frac{x^2}{2} + O(x^4). \\text{ Thus, } e^{x^2} - \\cos x = x^2 + \\frac{x^2}{2} = \\frac{3}{2}x^2. \\text{ Hence limit = } \\frac{3}{2}.",
  },
  {
    id: 3,
    subject: "Abstract Algebra - Group Theory",
    questionLatex: "\\text{What is the number of generators of a cyclic group } G \\text{ of order } 12?",
    options: [
      { id: "A", latex: "2", correct: false },
      { id: "B", latex: "4", correct: true },
      { id: "C", latex: "6", correct: false },
      { id: "D", latex: "12", correct: false },
    ],
    explanationLatex: "\\text{The number of generators of a cyclic group of order } n \\text{ is given by Euler's totient function } \\phi(n). \\text{ Here } \\phi(12) = 12 \\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right) = 12 \\times \\frac{1}{2} \\times \\frac{2}{3} = 4.",
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
    q: "মক টেস্ট সিরিজে নেগেティブ মার্কিং কি চালু থাকে?",
    a: "হ্যাঁ, SLST ও JEE মেইন মক টেস্ট সিরিজে আসল পরীক্ষার মতই প্রতি ভুল উত্তরের জন্য ২৫% (০.২৫) নেগেটিভ মার্কিং ব্যবস্থা চালু রাখা হয়েছে, যা আপনার টাইম ম্যানেজমেন্ট এবং সঠিকতা বৃদ্ধিতে ব্যাপক সাহায্য করে।"
  }
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeRoadmap, setActiveRoadmap] = useState<string>("slst");
  const [checkedChapters, setCheckedChapters] = useState<string[]>([]);
  const [faqSearch, setFaqSearch] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Daily Challenge State
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useSEO(
    "Best SLST Mathematics & JEE Mains Coaching | Raj Sir Math Classes",
    "Master Mathematics for SLST, JEE Mains, WBJEE, GATE, and CSIR NET with Raj Sir. Access free daily mock tests, handwritten study materials, and premium video lectures."
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const activeChallenge = dailyChallenges[challengeIdx];

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setChallengeIdx((prev) => (prev + 1) % dailyChallenges.length);
  };

  return (
    <div className="w-full flex-1">
      {/* Top Exam Navigation Filter Strip */}
      <section className="bg-slate-950 border-b border-slate-800 py-2.5 px-4 w-full overflow-x-auto no-scrollbar sticky top-[64px] z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 min-w-max text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-2 flex items-center gap-1 shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Target Exams:
          </span>
          <Link
            to="/free-daily-test"
            className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold hover:bg-emerald-500/30 transition-all shrink-0 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Free SLST Mock
          </Link>
          <Link
            to="/courses"
            className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 font-bold hover:text-white hover:border-pink-500/30 transition-all shrink-0"
          >
            SLST IX-X & XI-XII
          </Link>
          <Link
            to="/courses"
            className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 font-bold hover:text-white hover:border-indigo-500/30 transition-all shrink-0"
          >
            JEE Mains & WBJEE
          </Link>
          <Link
            to="/courses"
            className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 font-bold hover:text-white hover:border-purple-500/30 transition-all shrink-0"
          >
            CSIR NET & GATE
          </Link>
          <Link
            to="/upper-primary"
            className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 font-bold hover:text-white hover:border-amber-500/30 transition-all shrink-0"
          >
            Upper Primary TET
          </Link>
          <Link
            to="/notes"
            className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 font-bold hover:text-white hover:border-rose-500/30 transition-all shrink-0"
          >
            Handwritten Notes
          </Link>
        </div>
      </section>

      {/* Banner Hero Carousel Section */}
      <section className="pt-6 pb-4 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[540px] md:h-[620px] rounded-[32px] overflow-hidden border border-white/15 bg-slate-950/90 shadow-[0_25px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] group flex">
          
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
                
                {/* Floating Math Symbols */}
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
                
                {/* Banner Content Overlay Grid */}
                <div className="absolute inset-0 p-6 sm:p-10 md:p-14 lg:p-16 w-full h-full flex items-center z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                    
                    {/* Left Column: Title & Subtitle */}
                    <div className="lg:col-span-7 flex flex-col justify-center text-left">
                      <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 self-start text-white shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{bannerData[currentBanner].badge}</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-50 uppercase tracking-tight leading-[1.1] drop-shadow-2xl mb-4 sm:mb-6">
                        {bannerData[currentBanner].title}
                      </h2>
                      <p className="text-slate-300 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 font-medium leading-relaxed border-l-2 border-pink-500/80 pl-4 max-w-2xl bg-slate-900/90 py-2 rounded-r-xl border-y border-r border-slate-800">
                        {bannerData[currentBanner].subtitle}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 self-start">
                        <Link
                          to={bannerData[currentBanner].link || "/courses"}
                          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm md:text-base uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 border border-white/20"
                        >
                          <span>{bannerData[currentBanner].cta}</span>
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <a
                          href="https://wa.me/918345819377"
                          target="_blank"
                          rel="noreferrer"
                          className="hidden sm:inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all border border-slate-700 hover:border-emerald-500/40"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>WhatsApp Enquiry</span>
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Premium Interactive Slide Preview Frame */}
                    <div className="hidden lg:flex lg:col-span-5 justify-center items-center h-full">
                      <div className="w-full max-w-[380px] p-1 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative group/preview">
                        
                        <div className="bg-slate-950 rounded-[22px] p-6 relative z-10 border border-slate-800 flex flex-col justify-between h-[350px]">
                          <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded border border-purple-500/20">
                              {bannerData[currentBanner].tag || "Active Highlight"}
                            </span>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span>{bannerData[currentBanner].status || "10K+ ASPIRANTS"}</span>
                            </div>
                          </div>

                          <div className="my-3 space-y-2 text-left">
                            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/5 space-y-2">
                              <p className="text-[10px] text-pink-400 uppercase font-black tracking-wider mb-1 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Key Course Features
                              </p>
                              {(bannerData[currentBanner].highlights || [
                                "• Conceptual Theory + Fast MCQ Shortcuts",
                                "• Chapter-wise Handwritten Notes PDFs",
                                "• Live Doubts Portal by Raj Sir"
                              ]).map((item, hIdx) => (
                                <p key={hIdx} className="text-xs text-slate-200 font-bold leading-relaxed">
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-purple-950/40 to-indigo-950/40 p-3 rounded-xl border border-purple-500/20 flex items-center justify-between text-left">
                            <div>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Preparation Standard</p>
                              <p className="text-xs font-black text-purple-300">100% EXAM ORIENTED</p>
                            </div>
                            <Award className="w-5 h-5 text-purple-400" />
                          </div>
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
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-pink-500/60 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20 shadow-2xl hover:scale-110 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentBanner((prev) => (prev + 1) % bannerData.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-pink-500/60 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20 shadow-2xl hover:scale-110 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Banner Navigation Dots & Counter */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20 bg-slate-950 px-4 py-2 rounded-full border border-slate-700 shadow-xl">
            <span className="text-[11px] font-mono font-bold text-slate-300">
              0{currentBanner + 1} / 0{bannerData.length}
            </span>
            <div className="h-3 w-[1px] bg-white/20"></div>
            <div className="flex gap-2 items-center">
              {bannerData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentBanner ? "w-6 bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" : "w-2 bg-white/40 hover:bg-white/80"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Quick Banner Category Selector Bar */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {bannerData.map((b, idx) => {
            const isActive = idx === currentBanner;
            return (
              <button
                key={b.id}
                onClick={() => setCurrentBanner(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-pink-500/50 text-white shadow-[0_0_15px_rgba(236,72,153,0.25)]"
                    : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-pink-400 animate-ping" : "bg-slate-600"}`}></span>
                <span>{b.tag || `Banner ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>
      </section>




      {/* Premium Bento Grid Hero Feature Overview */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-[#020617]">
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
              className="md:col-span-8 row-span-2 relative bg-gradient-to-br from-[#0c0a21] via-[#0f172a] to-[#1e1035] border border-slate-800 rounded-[32px] p-8 lg:p-12 overflow-hidden group shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] group-hover:bg-pink-500/20 transition-colors duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 mb-8">
                <div className="inline-flex gap-2 mb-6">
                  <span className="bg-pink-500/10 text-pink-400 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-pink-500/20 uppercase tracking-[0.2em] shadow-md flex items-center">
                    <Star className="w-3.5 h-3.5 mr-2 fill-pink-400" /> Premium Coaching
                  </span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-6 leading-[1.08] text-white font-black drop-shadow-lg">
                  Master{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    Mathematics
                  </span>{" "}
                  <br />
                  with Confidence
                </h1>
                <p className="text-slate-300 text-sm sm:text-lg max-w-xl leading-relaxed font-medium">
                  Join the elite circle of toppers. Expert coaching for JEE Mains, SLST Mathematics, and Advanced Competitive Exams.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10">
                <Link
                  to="/courses"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black py-3.5 px-7 rounded-2xl transition-all hover:scale-105 shadow-[0_0_25px_rgba(236,72,153,0.4)] flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest border border-pink-400/30"
                >
                  <PlayCircle className="h-5 w-5" /> Start Learning
                </Link>
                <Link
                  to="/mock-test"
                  className="bg-slate-900 border border-slate-700 hover:border-pink-500/50 hover:bg-slate-800 text-white font-bold py-3.5 px-7 rounded-2xl transition-all hover:-translate-y-1 flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest shadow-lg"
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
              className="md:col-span-4 bg-slate-900 border border-slate-800 p-8 rounded-[32px] flex flex-col justify-center items-center text-center shadow-xl group hover:border-slate-700 transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <p className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter leading-none mb-3 drop-shadow-md">
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
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <Link to="/free-daily-test" className="relative h-full bg-[#020617] rounded-[31px] p-8 flex flex-col justify-between overflow-hidden shadow-2xl block">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[40px] group-hover:bg-emerald-500/30 transition-colors pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 border border-red-400/50 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_18px_rgba(239,68,68,0.8)] z-20 flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Live Free</span>
                </div>
                <div className="bg-gradient-to-br from-emerald-400 to-teal-400 w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)] mb-6 z-10 group-hover:scale-110 transition-transform">
                  <Target className="h-7 w-7 text-slate-900" />
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
      <section className="py-8 border-y border-white/5 bg-[#020617] overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 18, repeat: Infinity }}
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
      <section className="py-20 lg:py-28 relative overflow-hidden bg-[#020617] border-t border-white/10">
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-pink-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-pink-500/30 text-pink-300 text-xs font-black uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(219,39,119,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>MEET THE FOUNDER & MENTOR</span>
            </span>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-black uppercase tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 drop-shadow-md">Raj Sir</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-medium leading-relaxed">
              Empowering thousands of mathematics aspirants with conceptual clarity, exam-oriented shortcuts, and unmatchable guidance.
            </p>
          </div>

          <div className="solid-card rounded-[36px] p-2 sm:p-3 border border-slate-800 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#120a2a]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-10 items-center">
              
              {/* Left Column: Portrait & Badge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                {/* Portrait with Glowing Gradient Rings */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 shadow-[0_0_40px_rgba(219,39,119,0.4)] mb-6 z-10 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border-4 border-slate-950">
                    <img
                      src="/src/assets/images/raj_sir_30yo_teacher_1785611994041.jpg"
                      alt="Raj Sir"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 p-2.5 rounded-2xl shadow-xl border-2 border-slate-950">
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="font-display text-3xl font-black text-white uppercase tracking-tight mb-1">
                  Raj Sir
                </h3>
                
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-pink-300 bg-pink-500/10 border border-pink-500/30 mb-6 inline-block">
                  Mentor & Founder
                </span>

                {/* Experience Pills */}
                <div className="grid grid-cols-2 gap-3 w-full z-10">
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex flex-col items-center">
                    <span className="text-xl font-black text-amber-400">9+ Years</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Experience</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex flex-col items-center">
                    <span className="text-xl font-black text-emerald-400">10,000+</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Students Mentored</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Qualifications & Expertise */}
              <div className="lg:col-span-7 flex flex-col justify-between z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg border border-white/20">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-wider font-display">
                      Academic Qualifications & Credentials
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">Certified Excellence in Advanced Higher Mathematics</p>
                  </div>
                </div>

                {/* Qualification Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-colors shadow-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">BSc in Mathematics</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">Bankura Christian College</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/40 hover:border-purple-400 transition-colors shadow-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">MSc in Pure Mathematics</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">The University of Burdwan</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition-colors shadow-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">GATE Examination</p>
                        <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mt-0.5">★ Qualified</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 transition-colors shadow-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">CSIR NET Math Sciences</p>
                        <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-0.5">★ Qualified (LS)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Areas of Expertise */}
                <div>
                  <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> Key Teaching Domains
                  </h5>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { name: "Class 9 to 12 (WB, CBSE, ICSE)", color: "from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-300" },
                      { name: "WBJEE & JEE Mains", color: "from-indigo-500/20 to-blue-500/20 border-indigo-500/40 text-indigo-300" },
                      { name: "UG Math Honours", color: "from-purple-500/20 to-violet-500/20 border-purple-500/40 text-purple-300" },
                      { name: "Engineering Mathematics", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300" },
                      { name: "NSOU UG & PG Courses", color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300" },
                    ].map((subject, idx) => (
                      <span
                        key={idx}
                        className={`bg-gradient-to-r ${subject.color} border px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm backdrop-blur-md`}
                      >
                        {subject.name}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Premium Colour Grid Curriculum Section */}
      <section className="py-16 lg:py-24 bg-[#020617] relative border-t border-white/10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-pink-600/10 via-purple-600/10 to-indigo-600/10 rounded-full blur-[180px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Section Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-pink-500/30 text-pink-300 text-xs font-black uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(236,72,153,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>EXCELLENCE IN MATHEMATICS EDUCATION</span>
            </span>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 drop-shadow-md">Curriculum Grid</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore our structured course modules engineered with chapterwise theory, shortcut tricks, handwritten notes & live test series.
            </p>
          </div>

          {/* 6-Card Colour Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Grid Card 1: SLST Mathematics (Emerald Theme) */}
            <div className="group relative rounded-[28px] border border-emerald-500/30 hover:border-emerald-400 transition-all duration-500 bg-slate-900/90 p-7 flex flex-col justify-between shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <span className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>MOST POPULAR • IX-XII</span>
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl font-serif font-black shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:scale-110 transition-transform">
                    Σ
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors mb-2 font-display">
                  SLST IX-X & XI-XII Math
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-5">
                  Complete syllabus covering Real Analysis, Modern Algebra, Calculus, Mechanics, and Previous Year SLST Papers.
                </p>

                {/* Topics Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Real Analysis", "Abstract Algebra", "Mechanics", "Analytic Geometry", "LPP"].map((tag, idx) => (
                    <span key={idx} className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer / Progress & Action */}
              <div className="pt-5 border-t border-emerald-500/20 relative z-10 mt-auto">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3">
                  <span>35 / 35 Lessons</span>
                  <span className="text-emerald-400 font-black">100% Complete</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-5 border border-emerald-500/20">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full w-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                </div>
                <Link
                  to="/courses"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Explore SLST Modules</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Grid Card 2: JEE Mains & WBJEE (Rose / Violet Theme) */}
            <div className="group relative rounded-[28px] border border-pink-500/30 hover:border-pink-400 transition-all duration-500 bg-slate-900/90 p-7 flex flex-col justify-between shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/15 rounded-full blur-2xl group-hover:bg-pink-500/25 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <span className="bg-pink-500/15 border border-pink-500/40 text-pink-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Star className="w-3 h-3 text-pink-400 fill-pink-400" />
                    <span>HIGH SCORE SHORTCUTS</span>
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center text-xl font-serif font-black shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:scale-110 transition-transform">
                    ∫
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-pink-300 transition-colors mb-2 font-display">
                  JEE Mains & WBJEE Math
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-5">
                  Master Calculus, Vectors, 3D Geometry, and Algebra with Raj Sir's speed-solving techniques and topicwise PYQs.
                </p>

                {/* Topics Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Calculus", "Coordinate Geometry", "Matrices", "Vectors & 3D", "Probability"].map((tag, idx) => (
                    <span key={idx} className="bg-pink-950/80 border border-pink-500/30 text-pink-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer / Progress & Action */}
              <div className="pt-5 border-t border-pink-500/20 relative z-10 mt-auto">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3">
                  <span>28 / 30 Lessons</span>
                  <span className="text-pink-400 font-black">90% Complete</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-5 border border-pink-500/20">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full w-[90%] shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                </div>
                <Link
                  to="/courses"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Start JEE Prep</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Grid Card 3: CSIR NET & GATE (Indigo / Cyan Theme) */}
            <div className="group relative rounded-[28px] border border-indigo-500/30 hover:border-indigo-400 transition-all duration-500 bg-slate-900/90 p-7 flex flex-col justify-between shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <span className="bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Target className="w-3 h-3 text-indigo-400" />
                    <span>ADVANCED HIGHER MATH</span>
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xl font-serif font-black shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform">
                    ⌬
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-indigo-300 transition-colors mb-2 font-display">
                  CSIR NET & GATE Math
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-5">
                  Rigorous proof-based problem solving for NET JRF and GATE. Deep dives into Linear Algebra, Complex Analysis, and Topology.
                </p>

                {/* Topics Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Linear Algebra", "Complex Analysis", "Topology", "Metric Spaces", "ODEs & PDEs"].map((tag, idx) => (
                    <span key={idx} className="bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer / Progress & Action */}
              <div className="pt-5 border-t border-indigo-500/20 relative z-10 mt-auto">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3">
                  <span>22 / 25 Lessons</span>
                  <span className="text-indigo-400 font-black">85% Complete</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-5 border border-indigo-500/20">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[85%] shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                </div>
                <Link
                  to="/courses"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-400 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Enroll Advanced</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Grid Card 4: Upper Primary TET (Amber / Gold Theme) */}
            <div className="group relative rounded-[28px] border border-amber-500/30 hover:border-amber-400 transition-all duration-500 bg-slate-900/90 p-7 flex flex-col justify-between shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <span className="bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>TET SPECIAL BATCH</span>
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl font-serif font-black shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform">
                    π
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors mb-2 font-display">
                  Upper Primary TET Math
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-5">
                  Target Upper Primary TET with structured Arithmetic, Geometry, Pedagogy modules, and previous exam practice sets.
                </p>

                {/* Topics Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Number System", "Arithmetic", "Pedagogy", "Geometry", "Practice Sets"].map((tag, idx) => (
                    <span key={idx} className="bg-amber-950/80 border border-amber-500/30 text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer / Progress & Action */}
              <div className="pt-5 border-t border-amber-500/20 relative z-10 mt-auto">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3">
                  <span>18 / 20 Lessons</span>
                  <span className="text-amber-400 font-black">90% Complete</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-5 border border-amber-500/20">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[90%] shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                </div>
                <Link
                  to="/upper-primary"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Open TET Portal</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Grid Card 5: UG Math Honours (Sky / Blue Theme) */}
            <div className="group relative rounded-[28px] border border-sky-500/30 hover:border-sky-400 transition-all duration-500 bg-slate-900/90 p-7 flex flex-col justify-between shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/15 rounded-full blur-2xl group-hover:bg-sky-500/25 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <span className="bg-sky-500/15 border border-sky-500/40 text-sky-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <BookOpen className="w-3 h-3 text-sky-400" />
                    <span>BSc HONOURS ALL SEMESTERS</span>
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-sm font-mono font-black shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:scale-110 transition-transform">
                    lim
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-sky-300 transition-colors mb-2 font-display">
                  BSc UG Math Honours
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-5">
                  University semester coaching for Bankura, Burdwan, CU, Vidyasagar, and NSOU students with handwritten PDF notes.
                </p>

                {/* Topics Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Group Theory", "Ring Theory", "Multivariate Calculus", "ODEs & PDEs"].map((tag, idx) => (
                    <span key={idx} className="bg-sky-950/80 border border-sky-500/30 text-sky-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer / Progress & Action */}
              <div className="pt-5 border-t border-sky-500/20 relative z-10 mt-auto">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3">
                  <span>40 / 40 Lessons</span>
                  <span className="text-sky-400 font-black">100% Complete</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-5 border border-sky-500/20">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full w-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
                </div>
                <Link
                  to="/notes"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>View BSc Notes</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Grid Card 6: Free Daily Test Series (Red / Crimson Theme) */}
            <div className="group relative rounded-[28px] border border-red-500/40 hover:border-red-400 transition-all duration-500 bg-slate-900/90 p-7 flex flex-col justify-between shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 via-rose-500/5 to-transparent opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/30 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <span className="bg-red-600/20 border border-red-500/50 text-red-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    <span>FREE DAILY LIVE MOCK</span>
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 text-red-400 border border-red-500/40 flex items-center justify-center text-xl font-serif font-black shadow-[0_0_20px_rgba(239,68,68,0.4)] group-hover:scale-110 transition-transform">
                    √
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-red-300 transition-colors mb-2 font-display">
                  SLST Real Analysis Mock
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-5">
                  11 specialized Real Analysis test pools with negative marking, time tracking, instant results & solution breakdown.
                </p>

                {/* Topics Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Topology", "Sequence & Series", "Riemann Integrals", "Bounded Variation"].map((tag, idx) => (
                    <span key={idx} className="bg-red-950/80 border border-red-500/40 text-red-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer / Progress & Action */}
              <div className="pt-5 border-t border-red-500/30 relative z-10 mt-auto">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3">
                  <span>11 Test Pools Available</span>
                  <span className="text-red-400 font-black">100% Free</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-5 border border-red-500/30">
                  <div className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full w-full shadow-[0_0_12px_rgba(239,68,68,0.9)]"></div>
                </div>
                <Link
                  to="/free-daily-test"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all"
                >
                  <span>Attempt Free Mock</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
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
                setOpenFaq(null);
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
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700 shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-base sm:text-lg font-bold text-slate-100 uppercase tracking-tight hover:text-pink-300 transition-colors">
                        {item.q}
                      </span>
                      <div className={`p-1.5 rounded-lg border bg-slate-950 transition-colors duration-300 shrink-0 ${isOpen ? "border-pink-500/50 text-pink-400" : "border-slate-800 text-slate-400"}`}>
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
                          className="border-t border-slate-800 bg-slate-950"
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

      {/* Testimonials & Proud Achievers Hall of Fame */}
      <section className="py-20 lg:py-28 bg-[#020617] w-full border-y border-white/10 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-gradient-to-br from-amber-500/10 via-pink-500/5 to-transparent rounded-full blur-[180px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] bg-gradient-to-tr from-violet-600/10 via-indigo-500/5 to-transparent rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>HALL OF ACADEMIC EXCELLENCE</span>
            </span>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-black uppercase tracking-tight">
              Our Proud <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-md">Achievers</span>
            </h2>

            <p className="text-slate-300 text-sm md:text-base mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore the stellar success stories of students mentored by Raj Sir. Real rankers, real results, and inspiring journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            
            {/* Left Column: Premium Certificate Poster Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-yellow-500/10 to-pink-500/10 rounded-[40px] blur-3xl opacity-70 pointer-events-none"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-[380px] sm:max-w-[410px] aspect-[3/4.2] rounded-[36px] border-2 border-amber-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-amber-950/80 text-center shadow-[0_0_60px_rgba(245,158,11,0.25)] relative overflow-hidden flex flex-col items-center justify-between p-7 select-none"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Top Certificate Header Badge */}
                  <div className="mt-2 flex flex-col items-center z-10 w-full">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/80 border border-amber-500/40 shadow-inner">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px] font-black tracking-[0.2em] text-amber-300 uppercase">
                        OFFICIAL CERTIFICATE
                      </span>
                    </div>
                  </div>

                  {/* Student Portrait Ring */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10 my-3">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    
                    <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 border-2 border-slate-950 flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Ribbon Name Banner */}
                  <div className="w-[95%] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 text-slate-950 font-display font-black text-base sm:text-lg uppercase tracking-wider py-2 px-4 shadow-[0_8px_25px_rgba(0,0,0,0.5)] border-y border-amber-200/60 relative z-10 rounded-xl">
                    <span className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">
                      {testimonials[activeTestimonial].name}
                    </span>
                  </div>

                  {/* Exam & Rank Details */}
                  <div className="flex flex-col items-center z-10 w-full px-2 my-2">
                    <p className="font-display font-black text-white text-xs sm:text-sm tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100">
                      {testimonials[activeTestimonial].exam}
                    </p>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5"></div>
                    <p className="font-mono text-xs font-extrabold tracking-widest text-amber-300 uppercase">
                      {testimonials[activeTestimonial].rank}
                    </p>
                  </div>

                  {/* Motto Footer */}
                  <div className="border-t border-amber-500/20 w-[90%] pt-3 z-10">
                    <p className="text-[9px] font-black tracking-[0.2em] text-amber-300/80 uppercase">
                      {testimonials[activeTestimonial].motto}
                    </p>
                  </div>

                  {/* Academic Icons */}
                  <div className="flex items-center gap-5 text-amber-400/40 pt-1 z-10">
                    <GraduationCap className="w-4 h-4" />
                    <School className="w-4 h-4" />
                    <Award className="w-4 h-4" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Slide dots */}
              <div className="flex gap-2.5 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === idx 
                        ? "w-8 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                        : "w-2 bg-slate-800 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Quote Card & Quick Switch Achiever Grid */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              {/* Premium Quote Card */}
              <div className="solid-card rounded-3xl p-6 sm:p-8 border border-slate-800 relative shadow-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 h-10 w-10 sm:h-12 sm:w-12 text-amber-500/15" />

                <div className="relative z-10">
                  {/* Rating Stars & Badge */}
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                    <div className="flex gap-1.5 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, idx) => (
                        <Star key={idx} className="h-4.5 w-4.5 fill-current" />
                      ))}
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> VERIFIED SUCCESS STORY
                    </span>
                  </div>

                  {/* Quote text */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-semibold italic mb-6">
                        "{testimonials[activeTestimonial].text}"
                      </p>

                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        <img 
                          src={testimonials[activeTestimonial].image} 
                          alt={testimonials[activeTestimonial].name}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
                        />
                        <div>
                          <h4 className="text-white font-extrabold text-base font-display">
                            {testimonials[activeTestimonial].name}
                          </h4>
                          <p className="text-xs font-bold text-amber-400">
                            {testimonials[activeTestimonial].exam} • <span className="text-slate-300">{testimonials[activeTestimonial].rank}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Back / Next Navigation */}
                <div className="flex gap-2 justify-end mt-6 relative z-10">
                  <button
                    onClick={() => {
                      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                    }}
                    className="p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-500/50 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-all duration-300 shadow-md"
                    aria-label="Previous Student"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
                    }}
                    className="p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-500/50 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-all duration-300 shadow-md"
                    aria-label="Next Student"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Switch Achiever Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Achiever To View Story:</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {activeTestimonial + 1} of {testimonials.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {testimonials.map((testi, idx) => {
                    const isActive = activeTestimonial === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={cn(
                          "p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 select-none relative overflow-hidden group",
                          isActive
                            ? "bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-950/30 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)] text-amber-200"
                            : "bg-slate-900/60 border-white/10 hover:border-amber-500/30 text-slate-400 hover:text-white hover:bg-slate-900/90"
                        )}
                      >
                        {isActive && (
                          <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 to-yellow-500"></div>
                        )}

                        <img
                          src={testi.image}
                          alt={testi.name}
                          className={cn(
                            "w-10 h-10 rounded-xl object-cover border transition-all duration-300 shrink-0",
                            isActive ? "border-amber-400 ring-2 ring-amber-500/30 scale-105" : "border-white/10 group-hover:border-amber-400/50"
                          )}
                        />

                        <div className="min-w-0 flex-1">
                          <p className={cn(
                            "text-xs font-extrabold truncate uppercase tracking-tight",
                            isActive ? "text-amber-300" : "text-slate-200 group-hover:text-amber-200"
                          )}>
                            {testi.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold truncate uppercase mt-0.5">
                            {testi.exam.replace("OUTSTANDING", "").replace("MATHEMATICS", "").trim()}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Featured Bottom Banner & Quick Access Cards */}
      <section className="py-12 my-8 border-t border-slate-800 bg-[#0B1120] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 hover:border-yellow-400/50 p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden group transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/30 transition-colors pointer-events-none"></div>

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
              <Link to="/notes" className="flex-1 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-sky-400/40 hover:bg-slate-850 transition-all group shadow-xl hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-2xl bg-sky-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="text-sky-400 h-7 w-7" />
                </div>
                <p className="text-base font-black text-slate-50">PDF Notes</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold group-hover:text-sky-400 transition-colors">
                  Free Library
                </p>
              </Link>
              <Link to="/courses" className="flex-1 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-pink-400/40 hover:bg-slate-850 transition-all group shadow-xl hover:-translate-y-1 relative overflow-hidden">
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
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[32px] relative overflow-hidden group hover:border-pink-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl hover:-translate-y-2">
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
