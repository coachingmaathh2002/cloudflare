import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  FileText, 
  X, 
  Star, 
  Sparkles, 
  Eye, 
  MessageSquare, 
  Flame, 
  Clock, 
  Share2, 
  Filter,
  Bookmark,
  BookmarkCheck,
  ArrowUpDown,
  ChevronDown,
  Check,
  ShieldCheck,
  Zap,
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useSEO } from '../lib/useSEO';

const noteCategories = [
  'All', 
  'SLST Math', 
  'Class 12', 
  'Class 11', 
  'Class 10', 
  'Class 9', 
  'JEE / WBJEE', 
  'BSc Math', 
  'MSc Math PG', 
  'TET Math',
  'Engineering Mathematics'
];

const materialTypes = [
  'All Formats',
  'Handwritten Notes',
  'Formula Sheet',
  'Theory & Proofs',
  'Shortcut Tricks'
];

export interface NoteItem {
  id: number;
  title: string;
  bengaliTitle?: string;
  category: string;
  type: string;
  author: string;
  pages: string;
  fileSize: string;
  views: string;
  rating: number;
  driveLink: string;
  isNew?: boolean;
  isFeatured?: boolean;
  description: string;
  gradient: string;
}

const initialNotes: NoteItem[] = [
  { 
    id: 1, 
    title: 'SLST Math: Abstract Algebra & Group Theory Notes', 
    bengaliTitle: 'অ্যাবস্ট্রাক্ট অ্যালজেব্রা ও গ্রুপ থিওরি নোটস',
    category: 'SLST Math', 
    type: 'Handwritten Notes',
    author: 'Raj Sir', 
    pages: '68 Pages', 
    fileSize: '4.2 MB',
    views: '14.8K',
    rating: 4.9,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview', 
    isNew: true,
    isFeatured: true,
    description: 'এসএলএসটি (SLST) গণিত পরীক্ষার জন্য স্পেশাল হ্যান্ডরিটেন নোটস, ডেফিনিশন, থিওরেম ও শর্টকাট প্রবলেম সলিউশন।',
    gradient: 'from-pink-600 via-purple-600 to-indigo-600'
  },
  { 
    id: 2, 
    title: 'SLST & BSc: Linear Algebra & Matrix Theory Master Notes', 
    bengaliTitle: 'লিনিয়ার অ্যালজেব্রা ও ম্যাট্রিক্স থিওরি স্পেশাল নোটস',
    category: 'SLST Math', 
    type: 'Theory & Proofs',
    author: 'Raj Sir', 
    pages: '76 Pages', 
    fileSize: '5.1 MB',
    views: '11.2K',
    rating: 4.8,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview', 
    isNew: true,
    isFeatured: true,
    description: 'ভেক্টর স্পেস, সাবস্পেস, আইগেন ভ্যালু, আইগেন ভেক্টর ও কেলি-হ্যামিল্টন থিওরেম সংক্ষিপ্ত ব্যাখ্যাসহ।',
    gradient: 'from-indigo-600 to-cyan-600'
  },
  { 
    id: 3, 
    title: 'Real Analysis Complete Hand-written PDF', 
    bengaliTitle: 'রিয়েল অ্যানালিসিস কমপ্লিট নোটস',
    category: 'BSc Math', 
    type: 'Handwritten Notes',
    author: 'Raj Sir', 
    pages: '94 Pages', 
    fileSize: '6.8 MB',
    views: '10.5K',
    rating: 4.9,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    isNew: true,
    description: 'বিএসসি অনার্স গণিতের সিকোয়েন্স, সিরিজ, কন্টিনিউইটি ও রিম্যান ইন্টিগ্রেশন স্পেশাল নোটস।',
    gradient: 'from-violet-600 to-indigo-700'
  },
  { 
    id: 4, 
    title: 'Class 12 Calculus Master Formula Sheet', 
    bengaliTitle: 'কলনবিদ্যা (Calculus) মাস্টার ফর্মুলা শীট',
    category: 'Class 12', 
    type: 'Formula Sheet',
    author: 'Raj Sir', 
    pages: '24 Pages', 
    fileSize: '2.1 MB',
    views: '21.4K',
    rating: 5.0,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    isFeatured: true,
    description: 'উচ্চ মাধ্যমিক পরীক্ষার জন্য ইন্টিগ্রেশন, ডিফারেনসিয়েশন ও ডিফারেনশিয়াল ইকুয়েশন অল ফর্মুলা।',
    gradient: 'from-emerald-600 to-teal-700'
  },
  { 
    id: 5, 
    title: 'Class 12 Vector Algebra & 3D Geometry Concise Notes', 
    bengaliTitle: 'ভেক্টর বীজগণিত ও ত্রিমাত্রিক স্থান জ্যামিতি',
    category: 'Class 12', 
    type: 'Shortcut Tricks',
    author: 'Raj Sir', 
    pages: '32 Pages', 
    fileSize: '2.8 MB',
    views: '16.1K',
    rating: 4.8,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'ডট প্রডাক্ট, ক্রস প্রডাক্ট, সরলরেখা ও সমতলের সমীকরণ শর্টকাট পদ্ধতিতে সমাধানের গাইড।',
    gradient: 'from-purple-600 to-pink-600'
  },
  { 
    id: 6, 
    title: 'WBJEE & JEE Mains Coordinate Geometry Secrets', 
    bengaliTitle: 'কর্ডিনেট জিওমেট্রি অ্যান্ড কনিক সেকশন',
    category: 'JEE / WBJEE', 
    type: 'Shortcut Tricks',
    author: 'Raj Sir', 
    pages: '52 Pages', 
    fileSize: '3.9 MB',
    views: '17.3K',
    rating: 4.9,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    isFeatured: true,
    description: 'স্ট্রেট লাইন, সার্কেল, প্যারাবোলা ও এলিপসের ৩০ সেকেন্ডে সমাধান করার শর্টকাট ট্রিক্স।',
    gradient: 'from-rose-600 to-amber-600'
  },
  { 
    id: 7, 
    title: 'Class 10 Madhyamik Theorem & Geometry Tricks', 
    bengaliTitle: 'মাধ্যমিক জ্যামিতি ও উপপাদ্য নোটস',
    category: 'Class 10', 
    type: 'Theory & Proofs',
    author: 'Raj Sir', 
    pages: '36 Pages', 
    fileSize: '3.1 MB',
    views: '25.9K',
    rating: 5.0,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'মাধ্যমিক ১০০% কমন উপপাদ্য, সম্পাদ্য ও বৃত্ত সংক্রান্ত জ্যামিতির নিখুঁত চিত্রসহ উত্তর।',
    gradient: 'from-blue-600 to-indigo-600'
  },
  { 
    id: 8, 
    title: 'Class 10 Trigonometry & Height & Distance Formulas', 
    bengaliTitle: 'ত্রিকোণমিতিক অনুপাত ও উচ্চতা-দূরত্ব সূত্রাবলী',
    category: 'Class 10', 
    type: 'Formula Sheet',
    author: 'Raj Sir', 
    pages: '16 Pages', 
    fileSize: '1.8 MB',
    views: '19.8K',
    rating: 4.9,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'মাধ্যমিক পরীক্ষার ত্রিকোণমিতি অভেদাবলী, পরিপূরক কোণ ও উন্নতি-অবনতি কোণের সহজ ট্রিক্স।',
    gradient: 'from-amber-500 to-rose-600'
  },
  { 
    id: 9, 
    title: 'Probability & Applied Statistics Master Notes', 
    bengaliTitle: 'প্রোবাবিলিটি ও স্ট্যাটিস্টিক্স নোটস',
    category: 'Engineering Mathematics', 
    type: 'Handwritten Notes',
    author: 'Raj Sir', 
    pages: '45 Pages', 
    fileSize: '3.7 MB',
    views: '10.9K',
    rating: 4.7,
    driveLink: 'https://drive.google.com/file/d/1aLRCtfgkzm209YI00eEwZN5jLuOo_Vs8/view?usp=drivesdk', 
    isNew: true,
    description: 'ইঞ্জিনিয়ারিং ও ডিগ্রি লেভেলের র্যান্ডম ভ্যারিয়েবল, বাইনমিয়াল ও পয়সন ডিস্ট্রিবিউশন নোটস।',
    gradient: 'from-teal-600 to-cyan-700'
  },
  { 
    id: 10, 
    title: 'Class 11 Trigonometry All Compound Formulas', 
    bengaliTitle: 'একাদশ শ্রেণী ত্রিকোণমিতি অল ফর্মুলা',
    category: 'Class 11', 
    type: 'Formula Sheet',
    author: 'Raj Sir', 
    pages: '18 Pages', 
    fileSize: '1.9 MB',
    views: '13.4K',
    rating: 4.8,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'যৌগিক কোণ, গুণিতক কোণ ও ত্রিকোণমিতিক সমীকরণের সহজ মনে রাখার ট্রিক্স।',
    gradient: 'from-orange-500 to-amber-600'
  },
  { 
    id: 11, 
    title: 'Class 11 Limits, Derivatives & Functions Quick Guide', 
    bengaliTitle: 'সীমা, কলনবিদ্যা ও সম্বন্ধ-চিত্রণ স্পেশাল নোটস',
    category: 'Class 11', 
    type: 'Handwritten Notes',
    author: 'Raj Sir', 
    pages: '30 Pages', 
    fileSize: '2.6 MB',
    views: '14.2K',
    rating: 4.8,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'একাদশ শ্রেণীর লিমিট, ফাস্ট অর্ডার ডেরিভেটিভ ও রিলেশন ফাংশন শেখার সহজ পিডিএফ।',
    gradient: 'from-fuchsia-600 to-purple-700'
  },
  { 
    id: 12, 
    title: 'Upper Primary TET Math Pedagogy & Solved Notes', 
    bengaliTitle: 'আপার প্রাইমারি টেট গণিত ও পেডাগোজি নোটস',
    category: 'TET Math', 
    type: 'Theory & Proofs',
    author: 'Raj Sir', 
    pages: '40 Pages', 
    fileSize: '3.4 MB',
    views: '15.7K',
    rating: 4.9,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    isNew: true,
    isFeatured: true,
    description: 'টেট গণিত শিক্ষা পদ্ধতি, নম্বর সিস্টেম, সরলীকরণ ও জ্যামিতিক ধারণার সংক্ষিপ্ত গাইড।',
    gradient: 'from-emerald-600 to-teal-800'
  },
  { 
    id: 13, 
    title: 'Number System & Algebra Basic Foundation', 
    bengaliTitle: 'নবম শ্রেণী বাস্তব সংখ্যা ও বীজগাণিতিক সূত্রাবলি',
    category: 'Class 9', 
    type: 'Handwritten Notes',
    author: 'Raj Sir', 
    pages: '28 Pages', 
    fileSize: '2.3 MB',
    views: '8.9K',
    rating: 4.7,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'নবম শ্রেণীর শিক্ষার্থীদের গণিতের মৌলিক ধারণা ও বহুপদী রাশির উৎপাদক বিশ্লেষণ।',
    gradient: 'from-emerald-600 to-green-700'
  },
  { 
    id: 14, 
    title: 'MSc Math: Topology & Functional Analysis', 
    bengaliTitle: 'টপোলজি ও ফাংশনাল অ্যানালিসিস',
    category: 'MSc Math PG', 
    type: 'Theory & Proofs',
    author: 'Raj Sir', 
    pages: '82 Pages', 
    fileSize: '5.9 MB',
    views: '5.4K',
    rating: 4.9,
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'মাস্টার্স স্তরের টপোলজিক্যাল স্পেস, কম্প্যাক্টনেস, বানাক ও হিলবার্ট স্পেসের নোটস।',
    gradient: 'from-fuchsia-600 to-rose-600'
  }
];

const faqs = [
  {
    q: "Are all notes on this page completely free?",
    a: "Yes! 100% of the handwritten notes, formula sheets, and chapter summaries on Raj Sir Math Classes are completely free to read online."
  },
  {
    q: "Can I view these study notes on my mobile phone or tablet?",
    a: "Absolutely! Our secure PDF viewer is fully responsive and optimized for mobile screens, laptops, and tablets with zero lag."
  },
  {
    q: "How can I request specific chapter notes if they are not listed?",
    a: "You can click the 'Request Notes on WhatsApp' button at the bottom of the page and message Raj Sir directly with your topic or exam requirements."
  },
  {
    q: "Who prepares these study notes?",
    a: "All notes and formula sheets are prepared and verified personally by Raj Sir, specializing in SLST Mathematics, BSc/MSc, and Higher Secondary Board exams."
  }
];

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All Formats');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating' | 'pages'>('popular');
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; link: string } | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bookmarked_notes_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [onlySaved, setOnlySaved] = useState(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO(
    "Free Math Study Notes & Formula PDFs | Raj Sir Math Classes",
    "Download free hand-written mathematics study notes, formula sheets, and solved solutions for Class 9 to 12, JEE Mains, BSc Math, Engineering Maths, and SLST Mathematics."
  );

  useEffect(() => {
    try {
      localStorage.setItem('bookmarked_notes_ids', JSON.stringify(bookmarkedIds));
    } catch (e) {
      // Ignore storage errors
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleShare = (note: NoteItem) => {
    const text = `📚 *${note.title}*\n${note.description}\nRead for Free on Raj Sir Math Classes!`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: text,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      setCopiedToast(`Copied share link for "${note.title}"!`);
      setTimeout(() => setCopiedToast(null), 3000);
    }
  };

  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All') return initialNotes.length;
    return initialNotes.filter(n => n.category === categoryName).length;
  };

  const filteredNotes = useMemo(() => {
    let result = initialNotes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.bengaliTitle && note.bengaliTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
      const matchesType = selectedType === 'All Formats' || note.type === selectedType;
      const matchesSaved = !onlySaved || bookmarkedIds.includes(note.id);

      return matchesSearch && matchesCategory && matchesType && matchesSaved;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'popular') {
        const parseFloatViews = (v: string) => parseFloat(v) * (v.includes('K') ? 1000 : 1);
        return parseFloatViews(b.views) - parseFloatViews(a.views);
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'pages') {
        return parseInt(b.pages) - parseInt(a.pages);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedType, sortBy, onlySaved, bookmarkedIds]);

  const getEmbedLink = (url: string) => {
    if (url.includes('/preview')) return url;
    return url.replace(/\/view.*$/, '/preview').replace(/\?usp=sharing$/, '/preview').replace(/\/edit.*$/, '/preview');
  };

  return (
    <div className="flex-1 w-full relative z-10 pb-20 select-none">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[120] bg-slate-900 border border-emerald-500/40 text-emerald-300 font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs backdrop-blur-xl"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{copiedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <section className="relative pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-pink-500/15 to-purple-500/15 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
          <span>RAJ SIR MATH CLASSES • FREE DIGITAL VAULT</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight mb-4"
        >
          Free Study Material <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-300 drop-shadow-md">
            & Handwritten Notes
          </span>
        </motion.h1>

        {/* Subtitle Bengali / English */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-8"
        >
          হাতে লেখা থিওরি নোটস, অধ্যায়ভিত্তিক সূত্রাবলী ও শর্টকাট সাজেশনের ফ্রি ডিজিটাল লাইব্রেরি। কোনো ফি বা সাইন-আপ ছাড়াই ফ্রিতে পড়ুন।
        </motion.p>

        {/* Feature Counters */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10"
        >
          <div className="bg-[#111218]/80 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg group hover:border-amber-400/30 transition-all">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display">100% Free</span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Open Digital Access</span>
          </div>
          <div className="bg-[#111218]/80 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg group hover:border-pink-400/30 transition-all">
            <span className="text-2xl sm:text-3xl font-black text-pink-400 font-display">HD Handwritten</span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Raj Sir Notes</span>
          </div>
          <div className="bg-[#111218]/80 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg group hover:border-emerald-400/30 transition-all">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">Class 9 - MSc</span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">All Subjects Covered</span>
          </div>
          <div className="bg-[#111218]/80 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg group hover:border-indigo-400/30 transition-all">
            <span className="text-2xl sm:text-3xl font-black text-indigo-400 font-display">Anti-Piracy</span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Protected Viewer</span>
          </div>
        </motion.div>

        {/* Search & Filter Control Bar */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Main Search Input */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-pink-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by topic, chapter or exam (e.g., Real Analysis, Calculus, SLST, Class 12)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111218]/90 border border-white/15 text-slate-100 placeholder-slate-400 rounded-2xl pl-12 pr-10 py-4 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/50 shadow-2xl transition-all text-xs sm:text-sm font-medium backdrop-blur-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Horizontal Pills */}
          <div className="flex bg-[#111218]/80 border border-white/10 rounded-2xl p-2 overflow-x-auto scrollbar-none shadow-xl gap-1.5 items-center">
            {noteCategories.map(cat => {
              const count = getCategoryCount(cat);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setOnlySaved(false); }}
                  className={cn(
                    "whitespace-nowrap px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all uppercase tracking-wider shrink-0 flex items-center gap-1.5",
                    isActive 
                      ? "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)] border border-pink-400/40"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <span>{cat}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-md font-mono",
                    isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Controls Bar (Format, Sort, Saved) */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
            
            {/* Format filter buttons */}
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-pink-400" /> Format:
              </span>
              {materialTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border",
                    selectedType === type
                      ? "bg-pink-500/20 text-pink-300 border-pink-500/50 shadow-sm"
                      : "bg-[#111218]/80 text-slate-400 border-white/10 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Saved Tab & Sort By */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={cn(
                  "px-3 py-1 rounded-lg text-[11px] font-bold transition-all border flex items-center gap-1.5",
                  onlySaved 
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50" 
                    : "bg-[#111218]/80 text-slate-400 border-white/10 hover:text-white"
                )}
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Saved ({bookmarkedIds.length})</span>
              </button>

              <div className="flex items-center gap-1 bg-[#111218]/80 border border-white/10 px-2.5 py-1 rounded-lg">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-300 text-[11px] font-bold focus:outline-none cursor-pointer"
                >
                  <option value="popular" className="bg-slate-900 text-white">Most Popular</option>
                  <option value="newest" className="bg-slate-900 text-white">Newest First</option>
                  <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
                  <option value="pages" className="bg-slate-900 text-white">Most Pages</option>
                </select>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Note Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        {/* Results Header Info */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
              {onlySaved ? 'Saved Bookmarked Notes' : `${selectedCategory} Notes`}
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
              {filteredNotes.length} Items
            </span>
          </div>

          {(searchQuery || selectedCategory !== 'All' || selectedType !== 'All Formats' || onlySaved) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedType('All Formats');
                setOnlySaved(false);
              }}
              className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 uppercase tracking-wider"
            >
              <X className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-16 bg-[#111218]/90 rounded-3xl border border-white/10 max-w-lg mx-auto p-8 backdrop-blur-xl">
            <BookOpen className="h-12 w-12 text-slate-500 mx-auto mb-3 opacity-60 animate-bounce" />
            <h3 className="text-base font-bold text-white mb-1">No study notes match your filters</h3>
            <p className="text-xs text-slate-400 mb-6">Try clearing your search query or switching category filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedType('All Formats');
                setOnlySaved(false);
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider"
            >
              Show All Notes
            </button>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNotes.map((note) => {
              const isBookmarked = bookmarkedIds.includes(note.id);
              return (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  key={note.id} 
                  className="bg-[#111218]/90 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-white/10 hover:border-pink-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 backdrop-blur-xl"
                >
                  {/* Subtle Background Glow */}
                  <div className={cn("absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40 bg-gradient-to-br", note.gradient)}></div>

                  <div>
                    {/* Top Badges & Bookmark */}
                    <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-slate-200 bg-white/10 border border-white/15 shadow-md">
                          {note.category}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-pink-300 bg-pink-500/10 border border-pink-500/30">
                          {note.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {note.isNew && (
                          <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                            <Flame className="w-3 h-3 text-rose-400 fill-rose-400" /> New
                          </span>
                        )}
                        {note.isFeatured && (
                          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Top
                          </span>
                        )}
                        <button
                          onClick={() => toggleBookmark(note.id)}
                          className={cn(
                            "p-1.5 rounded-full border transition-all",
                            isBookmarked 
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/50" 
                              : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
                          )}
                          title={isBookmarked ? "Remove Bookmark" : "Save Note"}
                        >
                          <Bookmark className={cn("w-3.5 h-3.5", isBookmarked ? "fill-amber-400 text-amber-400" : "")} />
                        </button>
                      </div>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className={cn(
                        "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-lg bg-gradient-to-br text-white",
                        note.gradient,
                        "border-white/20"
                      )}>
                        <FileText className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-snug group-hover:text-pink-300 transition-colors">
                          {note.title}
                        </h3>
                        {note.bengaliTitle && (
                          <p className="text-xs font-medium text-pink-400/90 mt-0.5">
                            {note.bengaliTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-medium leading-relaxed mb-5 line-clamp-2">
                      {note.description}
                    </p>
                  </div>

                  {/* Footer Metadata & CTA */}
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-4 flex-wrap gap-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-500" /> {note.pages}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 text-pink-400" /> {note.views} Views
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-amber-400" /> {note.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedPdf({ title: note.title, link: getEmbedLink(note.driveLink) })}
                        className="flex-1 py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider bg-white/5 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 text-slate-200 hover:text-white border border-white/15 hover:border-pink-400/50 shadow-md group-hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]"
                      >
                        <BookOpen className="h-4 w-4 text-pink-400 group-hover:text-white" />
                        <span>Open & Read</span>
                      </button>

                      <button
                        onClick={() => handleShare(note)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/15 transition-all"
                        title="Share Note"
                      >
                        <Share2 className="w-4 h-4 text-cyan-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" 
              onClick={() => setSelectedPdf(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-6xl h-[94vh] bg-[#0a0b0e] rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden z-10"
            >
              {/* Modal Topbar */}
              <div className="flex items-center justify-between p-4 bg-[#111218] border-b border-white/10">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="bg-pink-500/20 p-2 rounded-xl border border-pink-500/30 text-pink-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white font-display text-xs sm:text-base truncate">{selectedPdf.title}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Raj Sir Math Classes • Protected Reader</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => setSelectedPdf(null)}
                    className="bg-white/10 hover:bg-rose-600/30 text-slate-300 hover:text-rose-400 p-2.5 rounded-xl transition-all border border-white/10 hover:border-rose-500/40"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* PDF Viewer Frame */}
              <div className="flex-1 w-full relative bg-[#050508] overflow-hidden">
                <iframe 
                  src={selectedPdf.link} 
                  className="w-full h-full border-none"
                  allow="autoplay"
                  title={selectedPdf.title}
                ></iframe>
                
                {/* Security Overlay to mask Google Drive pop-out icon */}
                <div 
                  className="absolute top-0 right-0 w-28 sm:w-36 h-14 bg-[#0a0b0e] border-l border-b border-white/10 z-10 cursor-not-allowed flex items-center justify-center rounded-bl-2xl shadow-xl" 
                  title="PDF Protected by Raj Sir Math Classes"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                  <div className="flex flex-col items-center text-pink-400 font-bold">
                    <span className="text-[10px] uppercase tracking-widest leading-none flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-pink-400" /> Protected
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="bg-[#111218] p-3.5 text-center border-t border-white/10 flex flex-col sm:flex-row justify-between items-center px-6 gap-2">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Anti-Piracy Protection Active • Read freely online anytime.
                </span>
                <a 
                  href="https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20have%20a%20question%20about%20the%20notes."
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl"
                >
                  <MessageSquare className="w-4 h-4" /> Ask Raj Sir on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-12">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full inline-block mb-3">
            HELP & INFORMATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-[#111218]/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-100 hover:text-pink-300 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0", isExpanded ? "rotate-180 text-pink-400" : "")} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community WhatsApp Request Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden bg-gradient-to-r from-purple-950/90 via-[#111218] to-indigo-950/90 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div className="text-left max-w-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full inline-block mb-3">
              STUDENT REQUEST DESK
            </span>
            <h3 className="text-2xl font-black text-white font-display mb-2">
              Didn't Find Your Subject Notes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Message Raj Sir directly on WhatsApp with your specific chapter notes or formula PDF requests. We release new notes every week!
            </p>
          </div>

          <a
            href="https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20would%20like%20to%20request%20notes%20for..."
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all shrink-0 flex items-center gap-2 border border-white/20 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="h-4 w-4 text-white" />
            <span>Request Notes on WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
}
