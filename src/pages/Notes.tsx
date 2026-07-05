import React, { useState } from 'react';
import { BookOpen, Search, Filter, FileText, Maximize2, X, Star, Target, CheckCircle, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useSEO } from '../lib/useSEO';

const noteCategories = ['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'JEE Mains', 'BSc Math', 'MSc Math PG', 'SLST Math', 'Engineering Mathematics'];

// Example notes data
const initialNotes = [
  { id: 7, title: 'Probability', category: 'Engineering Mathematics', author: 'Raj Sir', driveLink: 'https://drive.google.com/file/d/1aLRCtfgkzm209YI00eEwZN5jLuOo_Vs8/view?usp=drivesdk', isNew: true },
  { id: 1, title: 'Real Analysis Complete PDF', category: 'BSc Math', author: 'Raj Sir', driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview' },
  { id: 2, title: 'Calculus Hand-written Notes', category: 'Class 12', author: 'Raj Sir', driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview' },
  { id: 3, title: 'Number System Formula Sheet', category: 'Class 9', author: 'Raj Sir', driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview' },
  { id: 4, title: 'Abstract Algebra Basics', category: 'BSc Math', author: 'Raj Sir', driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview' },
  { id: 5, title: 'Vector 3D Geometry Notes', category: 'JEE Mains', author: 'Raj Sir', driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview' },
  { id: 6, title: 'Trigonometry Super Tricks', category: 'Class 10', author: 'Raj Sir', driveLink: 'https://drive.google.com/file/d/1X2o7mOq93_fAxyPqM2u2jP8k-_sNQKpY/preview' },
];

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPdf, setSelectedPdf] = useState<{ title: string, link: string } | null>(null);

  useSEO(
    "Free Math Study Notes & Formula PDFs | Raj Sir",
    "Download free hand-written mathematics study notes, formula sheets, and solved solutions for Class 9 to 12, JEE Mains, BSc Math, Engineering Maths, and SLST Mathematics."
  );

  const filteredNotes = initialNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getEmbedLink = (url: string) => {
    // If it's already a preview link, return it.
    if (url.includes('/preview')) return url;
    // Replace view options with preview
    return url.replace(/\/view.*$/, '/preview').replace(/\?usp=sharing$/, '/preview').replace(/\/edit.*$/, '/preview');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4">
          <Star className="w-4 h-4" /> Raj Sir Math Classes
        </div>
        <h1 className="font-display text-4xl lg:text-5xl font-black text-slate-50 mb-4 tracking-tight uppercase drop-shadow-lg">
          Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Free Notes</span>
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto font-medium">Access high-quality, hand-written PDF notes. The notes open in a secure viewer without download options.
        <span className="block mt-2 text-yellow-400 font-bold uppercase tracking-wider text-sm">EASY TO LEARN, EASY TO SCORE!</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-yellow-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search notes, formulas, or chapters..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B1120] border border-white/10 text-slate-50 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 shadow-inner transition-all"
          />
        </div>
        <div className="flex bg-[#0B1120] border border-white/10 rounded-2xl p-2 overflow-x-auto scrollbar-hide shadow-inner">
          {noteCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all uppercase tracking-wider",
                selectedCategory === cat 
                  ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {filteredNotes.length > 0 ? filteredNotes.map((note: any, index: number) => (
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            key={note.id} 
            className="break-inside-avoid relative p-6 rounded-2xl transition-all group flex flex-col h-full shadow-xl bg-gradient-to-br from-[#0B1120] via-slate-900 to-[#0A0F1D] border border-white/10 hover:border-yellow-400/50 hover:-translate-y-1 overflow-hidden cursor-pointer"
            onClick={() => setSelectedPdf({ title: note.title, link: getEmbedLink(note.driveLink) })}
          >
            {/* Glowing Accents */}
            <div className={cn(
              "absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-600/20 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-80"
            )} />
            <div className={cn(
              "absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-500/10 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-80"
            )} />

            {note.isNew && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg shadow-lg z-20 flex items-center gap-1 animate-pulse">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> New Release
              </div>
            )}

            {/* Background Math Symbols */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.03] text-white font-serif select-none pointer-events-none">
              {index % 3 === 0 && <span className="absolute top-4 right-8 text-2xl">∫f(x)dx</span>}
              {index % 3 === 1 && <span className="absolute bottom-6 right-4 text-xl">sin²θ+cos²θ=1</span>}
              {index % 3 === 2 && <span className="absolute top-1/2 left-8 text-5xl">∑</span>}
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm border bg-slate-800/80 text-yellow-400 border-white/10 group-hover:bg-slate-700/80 transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md text-slate-300 bg-white/5 border border-white/10 shadow-inner">
                    {note.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold font-display leading-tight mb-2 text-slate-50 group-hover:text-yellow-400/90 transition-colors">
                {note.title}
              </h3>
              <p className="text-xs mb-6 flex-grow font-semibold uppercase tracking-wider text-slate-400">
                By {note.author}
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <CheckCircle className="w-3 h-3 text-green-400" /> Free Access
                </div>
                <button 
                  className="font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-slate-900 shadow-[0_0_15px_rgba(250,204,21,0)] group-hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                >
                  <BookOpen className="h-4 w-4" /> Read
                </button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center text-slate-500">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No notes found matching your criteria.</p>
          </div>
        )}
      </motion.div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-md" onClick={() => setSelectedPdf(null)}></div>
          
          <div className="relative w-full max-w-6xl h-[90vh] bg-[#0A0F1D] rounded-2xl shadow-2xl border border-yellow-400/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 bg-slate-900/80 border-b border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400/10 p-2 rounded-lg border border-yellow-400/20">
                  <FileText className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-50 font-display">{selectedPdf.title}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <p className="text-[10px] text-yellow-400/80 uppercase tracking-widest font-bold">Premium Secure Viewer</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedPdf(null)}
                  className="bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 p-2 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full relative bg-slate-950 overflow-hidden">
              <iframe 
                src={selectedPdf.link} 
                className="w-full h-full border-none pointer-events-auto"
                allow="autoplay"
                title={selectedPdf.title}
              ></iframe>
              
              {/* Overlay to block the pop-out button on Google Drive */}
              <div 
                className="absolute top-0 right-0 w-24 sm:w-32 h-14 bg-slate-950/40 backdrop-blur-md z-10 cursor-not-allowed flex items-center justify-center border-l border-b border-white/5 rounded-bl-xl" 
                title="Pop-out disabled"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                <div className="flex flex-col items-center opacity-70 text-yellow-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">Secured</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/80 p-3 text-center border-t border-white/10 flex justify-between items-center px-6 backdrop-blur-md">
               <span className="text-xs text-slate-400 font-medium flex items-center gap-2">
                 <Target className="w-4 h-4 text-slate-500" /> To protect intellectual property, downloads and printing are disabled.
               </span>
               <span className="text-xs text-yellow-400 font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-80">
                 <Award className="w-4 h-4" /> Raj Sir Math Classes
               </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

