import React, { useState } from 'react';
import { BookOpen, Search, Filter, FileText, Maximize2, X } from 'lucide-react';

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
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-4 tracking-tight uppercase">Our Notes Library</h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto">Access high-quality, hand-written PDF notes. The notes open in a secure viewer without download options.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search notes, formulas, or chapters..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 text-slate-50 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500/50 shadow-inner"
          />
        </div>
        <div className="flex bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 overflow-x-auto scrollbar-hide">
          {noteCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedCategory === cat 
                  ? 'bg-gradient-to-r from-pink-600 to-violet-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? filteredNotes.map((note: any) => (
          <div key={note.id} className={`relative p-6 rounded-2xl transition-all group flex flex-col h-full shadow-lg ${note.isNew ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border border-pink-400 overflow-hidden scale-[1.02] hover:scale-[1.05] z-10' : 'bg-slate-800/60 backdrop-blur-xl border border-white/10 hover:border-pink-500/30'}`}>
            {note.isNew && (
              <>
                <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30"></div>
                <div className="absolute top-0 right-0 p-12 bg-pink-400 rounded-full blur-3xl -mr-8 -mt-8 opacity-40 animate-pulse"></div>
              </>
            )}
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl border border-white/5 transition-colors ${note.isNew ? 'bg-white/20 shadow-inner' : 'bg-gradient-to-br from-pink-600/20 to-violet-600/20 group-hover:from-pink-600/40'}`}>
                  <FileText className={`h-6 w-6 ${note.isNew ? 'text-white drop-shadow-md' : 'text-pink-400'}`} />
                </div>
                <div className="flex items-center gap-2">
                  {note.isNew && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#fff] bg-white/20 border border-white/30 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg animate-bounce">
                      New Release
                    </span>
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${note.isNew ? 'text-white/90 bg-white/10 border-white/20' : 'text-slate-400 bg-white/5 border-white/5'}`}>
                    {note.category}
                  </span>
                </div>
              </div>
              
              <h3 className={`text-xl font-bold font-display leading-tight mb-2 ${note.isNew ? 'text-white filter drop-shadow-md' : 'text-slate-50'}`}>{note.title}</h3>
              <p className={`text-sm mb-6 flex-grow ${note.isNew ? 'text-white/80 font-medium' : 'text-slate-400'}`}>By {note.author}</p>
              
              <button 
                onClick={() => setSelectedPdf({ title: note.title, link: getEmbedLink(note.driveLink) })}
                className={`w-full mt-auto font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest border ${note.isNew ? 'bg-white text-purple-700 border-white hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/5 border-white/10 hover:border-pink-500/50 hover:bg-white/10 text-pink-400'}`}
              >
                <BookOpen className="h-4 w-4" /> View PDF
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center text-slate-500">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No notes found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedPdf(null)}></div>
          
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#0f172a] rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-pink-600/20 p-2 rounded-lg"><FileText className="h-5 w-5 text-pink-400" /></div>
                <div>
                  <h3 className="font-bold text-slate-50 font-display">{selectedPdf.title}</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure PDF Viewer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedPdf(null)}
                  className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white p-2 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full relative bg-slate-950">
              <iframe 
                src={selectedPdf.link} 
                className="w-full h-full border-none"
                allow="autoplay"
                title={selectedPdf.title}
              ></iframe>
              
              {/* Optional overlay to prevent right clicks inside the iframe bounding box edge (Google drive preview prevents right click anyway, but it's a good touch) */}
              <div className="absolute top-0 right-0 w-16 h-12 bg-transparent z-10" title="Pop-out disabled"></div>
            </div>
            
            <div className="bg-slate-900 p-3 text-center border-t border-white/10 flex justify-between items-center px-6">
               <span className="text-xs text-slate-500 font-medium">To protect intellectual property, downloads and printing are disabled.</span>
               <span className="text-xs text-pink-400 font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-60">Raj Sir Math Classes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
