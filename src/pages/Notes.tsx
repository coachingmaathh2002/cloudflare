import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  FileText, 
  X, 
  Star, 
  Target, 
  Sparkles, 
  CheckCircle, 
  Eye, 
  MessageSquare, 
  Flame, 
  ChevronRight, 
  Clock, 
  Award,
  Share2,
  Zap,
  Download,
  Filter
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
  'Engineering Mathematics'
];

export interface NoteItem {
  id: number;
  title: string;
  bengaliTitle?: string;
  category: string;
  author: string;
  pages: string;
  views: string;
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
    author: 'Raj Sir', 
    pages: '68 Pages', 
    views: '12.4K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview', 
    isNew: true,
    isFeatured: true,
    description: 'এসএলএসটি (SLST) গণিত পরীক্ষার জন্য স্পেশাল হ্যান্ডরিটেন নোটস, ডেফিনিশন, থিওরেম ও শর্টকাট প্রবলেম সলিউশন।',
    gradient: 'from-pink-600 via-purple-600 to-indigo-600'
  },
  { 
    id: 2, 
    title: 'Real Analysis Complete Hand-written PDF', 
    bengaliTitle: 'রিয়েল অ্যানালিসিস কমপ্লিট নোটস',
    category: 'BSc Math', 
    author: 'Raj Sir', 
    pages: '94 Pages', 
    views: '8.9K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    isNew: true,
    description: 'বিএসসি অনার্স গণিতের সিকোয়েন্স, সিরিজ, কন্টিনিউইটি ও রিম্যান ইন্টিগ্রেশন স্পেশাল নোটস।',
    gradient: 'from-violet-600 to-indigo-700'
  },
  { 
    id: 3, 
    title: 'Class 12 Calculus Master Formula Sheet', 
    bengaliTitle: 'কলনবিদ্যা (Calculus) মাস্টার ফর্মুলা শীট',
    category: 'Class 12', 
    author: 'Raj Sir', 
    pages: '24 Pages', 
    views: '18.2K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    isFeatured: true,
    description: 'উচ্চ মাধ্যমিক পরীক্ষার জন্য ইন্টিগ্রেশন, ডিফারেনসিয়েশন ও ডিফারেনশিয়াল ইকুয়েশন অল ফর্মুলা।',
    gradient: 'from-emerald-600 to-teal-700'
  },
  { 
    id: 4, 
    title: 'WBJEE & JEE Mains Coordinate Geometry Secrets', 
    bengaliTitle: 'কর্ডিনেট জিওমেট্রি অ্যান্ড কনিক সেকশন',
    category: 'JEE / WBJEE', 
    author: 'Raj Sir', 
    pages: '52 Pages', 
    views: '14.1K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'স্ট্রেট লাইন, সার্কেল, প্যারাবোলা ও এলিপসের ৩০ সেকেন্ডে সমাধান করার শর্টকাট ট্রিক্স।',
    gradient: 'from-rose-600 to-amber-600'
  },
  { 
    id: 5, 
    title: 'Class 10 Madhyamik Theorem & Geometry Tricks', 
    bengaliTitle: 'মাধ্যমিক জ্যামিতি ও উপপাদ্য নোটস',
    category: 'Class 10', 
    author: 'Raj Sir', 
    pages: '36 Pages', 
    views: '22.5K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'মাধ্যমিক ১০০% কমন উপপাদ্য, সম্পাদ্য ও বৃত্ত সংক্রান্ত জ্যামিতির নিখুঁত চিত্রসহ উত্তর।',
    gradient: 'from-blue-600 to-indigo-600'
  },
  { 
    id: 6, 
    title: 'Probability & Applied Statistics Master Notes', 
    bengaliTitle: 'প্রোবাবিলিটি ও স্ট্যাটিস্টিক্স নোটস',
    category: 'Engineering Mathematics', 
    author: 'Raj Sir', 
    pages: '45 Pages', 
    views: '9.3K',
    driveLink: 'https://drive.google.com/file/d/1aLRCtfgkzm209YI00eEwZN5jLuOo_Vs8/view?usp=drivesdk', 
    isNew: true,
    description: 'ইঞ্জিনিয়ারিং ও ডিগ্রি লেভেলের র্যান্ডম ভ্যারিয়েবল, বাইনমিয়াল ও পয়সন ডিস্ট্রিবিউশন নোটস।',
    gradient: 'from-teal-600 to-cyan-700'
  },
  { 
    id: 7, 
    title: 'Class 11 Trigonometry All Compound Formulas', 
    bengaliTitle: 'একাদশ শ্রেণী ত্রিকোণমিতি অল ফর্মুলা',
    category: 'Class 11', 
    author: 'Raj Sir', 
    pages: '18 Pages', 
    views: '11.8K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'যৌগিক কোণ, গুণিতক কোণ ও ত্রিকোণমিতিক সমীকরণের সহজ মনে রাখার ট্রিক্স।',
    gradient: 'from-orange-500 to-amber-600'
  },
  { 
    id: 8, 
    title: 'Number System & Algebra Basic Foundation', 
    bengaliTitle: 'নবম শ্রেণী বাস্তব সংখ্যা ও বীজগাণিতিক সূত্রাবলি',
    category: 'Class 9', 
    author: 'Raj Sir', 
    pages: '28 Pages', 
    views: '7.6K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'নবম শ্রেণীর শিক্ষার্থীদের গণিতের মৌলিক ধারণা ও বহুপদী রাশির উৎপাদক বিশ্লেষণ।',
    gradient: 'from-emerald-600 to-green-700'
  },
  { 
    id: 9, 
    title: 'MSc Math: Topology & Functional Analysis', 
    bengaliTitle: 'টপোলজি ও ফাংশনাল অ্যানালিসিস',
    category: 'MSc Math PG', 
    author: 'Raj Sir', 
    pages: '82 Pages', 
    views: '4.2K',
    driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview',
    description: 'মাস্টার্স স্তরের টপোলজিক্যাল স্পেস, কম্প্যাক্টনেস, বানাক ও হিলবার্ট স্পেসের নোটস।',
    gradient: 'from-fuchsia-600 to-rose-600'
  }
];

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; link: string } | null>(null);

  useSEO(
    "Free Math Study Notes & Formula PDFs | Raj Sir Math Classes",
    "Download free hand-written mathematics study notes, formula sheets, and solved solutions for Class 9 to 12, JEE Mains, BSc Math, Engineering Maths, and SLST Mathematics."
  );

  const filteredNotes = useMemo(() => {
    return initialNotes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.bengaliTitle && note.bengaliTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getEmbedLink = (url: string) => {
    if (url.includes('/preview')) return url;
    return url.replace(/\/view.*$/, '/preview').replace(/\?usp=sharing$/, '/preview').replace(/\/edit.*$/, '/preview');
  };

  return (
    <div className="flex-1 w-full relative z-10 pb-20">
      
      {/* Hero Header Section */}
      <section className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>RAJ SIR MATH CLASSES • FREE DIGITAL VAULT</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-50 uppercase tracking-tight leading-tight mb-5"
        >
          Free Study Material <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-300 drop-shadow-lg">
            & Handwritten Notes
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-8"
        >
          হাতে লেখা থিওরি নোটস, অধ্যায়ভিত্তিক সূত্রাবলী ও শর্টকাট সাজেশনের ফ্রি ডিজিটাল লাইব্রেরি। যেকোনো চ্যাপ্টার এখনই কোনো ঝামেলা ছাড়াই পড়ুন।
        </motion.p>

        {/* Features highlight bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10"
        >
          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">100% Free</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Open Access</span>
          </div>
          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-pink-400">HD Quality</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Handwritten PDFs</span>
          </div>
          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">Class 9 to MSc</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">All Levels</span>
          </div>
          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-indigo-400">Secured Reader</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Instant View</span>
          </div>
        </motion.div>

        {/* Search & Category Filter */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-pink-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search notes by subject, chapter, or exam (e.g., SLST, Real Analysis, Class 12 Calculus)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-white/15 text-slate-100 placeholder-slate-400 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/50 shadow-2xl backdrop-blur-xl transition-all text-sm font-medium"
            />
          </div>

          <div className="flex bg-slate-900/80 border border-white/10 rounded-2xl p-2 overflow-x-auto scrollbar-none shadow-xl backdrop-blur-xl gap-1.5">
            {noteCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider shrink-0",
                  selectedCategory === cat 
                    ? "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)] border border-white/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Note Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-3xl border border-white/10 max-w-lg mx-auto">
            <BookOpen className="h-12 w-12 text-slate-500 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">No notes match your search</h3>
            <p className="text-xs text-slate-400">Try searching for a different topic or select "All" from the category filter.</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNotes.map((note) => (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                key={note.id} 
                className="glass-card-interactive rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-white/10 hover:border-pink-500/50 transition-all duration-300"
              >
                {/* Background glow */}
                <div className={cn("absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40 bg-gradient-to-br", note.gradient)}></div>

                <div>
                  {/* Category & Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-slate-200 bg-slate-900/90 border border-white/15 shadow-md">
                      {note.category}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {note.isNew && (
                        <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          <Flame className="w-3 h-3 text-rose-400 fill-rose-400" /> New
                        </span>
                      )}
                      {note.isFeatured && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Top Choice
                        </span>
                      )}
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
                      <h3 className="font-display text-base font-bold text-white tracking-tight leading-snug group-hover:text-pink-300 transition-colors">
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
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-500" /> {note.pages}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 text-pink-400" /> {note.views} Views
                    </span>
                    <span className="text-slate-500">By {note.author}</span>
                  </div>

                  <button 
                    onClick={() => setSelectedPdf({ title: note.title, link: getEmbedLink(note.driveLink) })}
                    className="w-full py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider bg-slate-900 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 text-slate-200 hover:text-white border border-white/15 hover:border-pink-400/50 shadow-md group-hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]"
                  >
                    <BookOpen className="h-4 w-4 text-pink-400 group-hover:text-white" />
                    <span>Open & Read Note</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" 
              onClick={() => setSelectedPdf(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-6xl h-[92vh] bg-slate-950 rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden z-10"
            >
              {/* Modal Topbar */}
              <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="bg-pink-500/20 p-2 rounded-xl border border-pink-500/30 text-pink-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-50 font-display text-sm sm:text-base truncate">{selectedPdf.title}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Raj Sir Math Classes • Secure PDF Reader</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => setSelectedPdf(null)}
                    className="bg-slate-800 hover:bg-rose-600/30 text-slate-300 hover:text-rose-400 p-2.5 rounded-xl transition-all border border-white/10 hover:border-rose-500/40"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* PDF Viewer Frame */}
              <div className="flex-1 w-full relative bg-slate-950 overflow-hidden">
                <iframe 
                  src={selectedPdf.link} 
                  className="w-full h-full border-none"
                  allow="autoplay"
                  title={selectedPdf.title}
                ></iframe>
                
                {/* Security Overlay to mask Google Drive pop-out icon */}
                <div 
                  className="absolute top-0 right-0 w-28 sm:w-36 h-14 bg-slate-950/80 backdrop-blur-md z-10 cursor-not-allowed flex items-center justify-center border-l border-b border-white/10 rounded-bl-2xl" 
                  title="PDF Downloads are protected"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                  <div className="flex flex-col items-center text-pink-400 font-bold">
                    <span className="text-[10px] uppercase tracking-widest leading-none">Protected</span>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="bg-slate-900/90 p-3.5 text-center border-t border-white/10 flex flex-col sm:flex-row justify-between items-center px-6 gap-2 backdrop-blur-md">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-pink-400 shrink-0" /> Note: Downloads are disabled to safeguard proprietary teaching material.
                </span>
                <a 
                  href="https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20have%20a%20question%20about%20the%20notes."
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-4 h-4" /> Need More Notes? Ask on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Community Request Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full inline-block mb-3">
              STUDENT COMMUNITY
            </span>
            <h3 className="text-2xl font-black text-white font-display mb-2">
              Didn't Find Your Subject Notes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Message Raj Sir directly on WhatsApp with your request for specific chapter notes or formula PDFs. We release new notes every week!
            </p>
          </div>

          <a
            href="https://wa.me/918345819377?text=Hello%20Raj%20Sir,%20I%20would%20like%20to%20request%20notes%20for..."
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all shrink-0 flex items-center gap-2 border border-white/20"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Request Notes on WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
}
