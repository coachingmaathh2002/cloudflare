import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MixedLatex } from '../components/LatexRenderer';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  Award, 
  AlertCircle, 
  BookOpen, 
  Target, 
  ArrowLeft, 
  BrainCircuit, 
  Maximize, 
  Minimize,
  Sparkles,
  Lock,
  RotateCcw,
  Search,
  BarChart3,
  HelpCircle,
  FileText,
  Zap,
  Check,
  Flame,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';
import { EXAM_CATEGORIES, TOPICS_BY_CATEGORY, generateMocksForTopic } from '../data/mockTestData';
import { useSEO } from '../lib/useSEO';
import { cn } from '../lib/utils';

type ViewState = 'categories' | 'topics' | 'mocks' | 'test' | 'results';

export default function MockTestApp() {
  const [view, setView] = useState<ViewState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedMock, setSelectedMock] = useState<any | null>(null);
  const [topicSearchQuery, setTopicSearchQuery] = useState('');

  useSEO(
    "Online Math Mock Tests & Series | Raj Sir Math Classes",
    "Prepare for SLST Mathematics, JEE Mains, WBJEE, and BSc Math with our professional online CBT mock tests. Test your limits, view step-by-step solutions, and analyze your scores."
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);

  const [focusMode, setFocusMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [pendingMock, setPendingMock] = useState<any | null>(null);
  const [testCodeInput, setTestCodeInput] = useState('');
  const [testCodeError, setTestCodeError] = useState('');

  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Auto-submit test when time is up
  useEffect(() => {
    if (view !== 'test' || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          setView('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [view, isSubmitted]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setTopicSearchQuery('');
    setView('topics');
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setView('mocks');
  };

  const startMockTest = (mock: any) => {
    setSelectedMock(mock);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setIsSubmitted(false);
    setTimeLeft(mock.duration || 3600);
    setView('test');
  };

  const handleMockSelect = (mock: any) => {
    if (selectedCategory === 'slst') {
      setPendingMock(mock);
      setShowCodeModal(true);
      setTestCodeInput('');
      setTestCodeError('');
    } else {
      startMockTest(mock);
    }
  };

  const handleCodeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (testCodeInput.trim() === 'raj@9167') {
      setShowCodeModal(false);
      if (pendingMock) startMockTest(pendingMock);
    } else {
      setTestCodeError('Invalid passcode! Please enter the correct test code.');
    }
  };

  const submitTest = () => {
    setShowConfirmSubmit(false);
    setIsSubmitted(true);
    setView('results');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    if (!selectedMock || !selectedMock.questions) return { score: 0, correct: 0, incorrect: 0, unattempted: 0, maxScore: 0, percentage: 0 };
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    selectedMock.questions.forEach((q: any, idx: number) => {
      if (selectedAnswers[idx] === undefined) {
        unattempted++;
      } else if (selectedAnswers[idx] === q.correctAnswer) {
        score += 4;
        correct++;
      } else {
        score -= 1;
        incorrect++;
      }
    });

    const maxScore = selectedMock.questions.length * 4;
    const percentage = Math.max(0, Math.round((score / maxScore) * 100));

    return { score, correct, incorrect, unattempted, maxScore, percentage };
  };

  const filteredTopics = useMemo(() => {
    if (!selectedCategory) return [];
    const topics = TOPICS_BY_CATEGORY[selectedCategory] || [];
    if (!topicSearchQuery.trim()) return topics;
    return topics.filter(t => t.toLowerCase().includes(topicSearchQuery.toLowerCase()));
  }, [selectedCategory, topicSearchQuery]);

  // Breadcrumbs component
  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-6 flex-wrap">
      <button 
        onClick={() => setView('categories')}
        className="hover:text-pink-400 transition-colors flex items-center gap-1"
      >
        <BrainCircuit className="w-3.5 h-3.5 text-pink-400" />
        <span>Exams</span>
      </button>

      {selectedCategory && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <button 
            onClick={() => setView('topics')}
            className={cn("hover:text-pink-400 transition-colors", view === 'topics' ? 'text-pink-400 font-bold' : '')}
          >
            {EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}
          </button>
        </>
      )}

      {selectedTopic && view !== 'topics' && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <button 
            onClick={() => setView('mocks')}
            className={cn("hover:text-pink-400 transition-colors truncate max-w-[150px]", view === 'mocks' ? 'text-pink-400 font-bold' : '')}
          >
            {selectedTopic}
          </button>
        </>
      )}

      {selectedMock && (view === 'test' || view === 'results') && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold">{view === 'test' ? 'Live Exam' : 'Scorecard'}</span>
        </>
      )}
    </div>
  );

  // VIEW 1: CATEGORIES
  if (view === 'categories') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col min-h-[calc(100vh-100px)] relative z-10">
        
        {/* Header Banner */}
        <div className="text-center max-w-5xl mx-auto mb-14 relative">
          {/* Ambient Multi-Color Glow Orbs */}
          <div className="absolute -top-16 left-1/4 -translate-x-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute -top-16 right-1/4 translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="rounded-[40px] p-8 sm:p-12 border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-950/98 to-indigo-950/60 backdrop-blur-3xl group">
            
            {/* Top Multi-Color Gradient Beam */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-400 to-amber-400"></div>

            {/* Glowing Accent Corner Patterns */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Badge Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/40 text-pink-300 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_25px_rgba(219,39,119,0.25)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>RAJ SIR MATH CLASSES • ONLINE CBT EXAMINATION PORTAL</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-5"
            >
              ACCELERATE EXAM ACCURACY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 via-cyan-300 to-amber-300 drop-shadow-md">
                WITH CBT MOCK TESTS
              </span>
            </motion.h1>

            {/* English Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-amber-300/90 text-xs sm:text-sm font-black uppercase tracking-widest mb-3"
            >
              WB SLST • WBJEE • CSIR NET • UG & PG MATHEMATICS
            </motion.p>

            {/* Bengali Guidance Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              নিয়মিত সময়বদ্ধ মক টেস্ট দিন, ইনস্ট্যান্ট স্কোরকার্ড ও অল ইন্ডিয়া র‍্যাঙ্ক পান এবং বিস্তারিত সমাধান সহ নিজের প্রস্তুতিকে সেরা উচ্চতায় নিয়ে যান।
            </motion.p>

            {/* Key Stats Pill Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              <div className="bg-slate-900/90 border border-pink-500/30 p-4 rounded-2xl flex flex-col items-center justify-center hover:border-pink-500/70 hover:scale-[1.03] transition-all duration-300 group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/40 flex items-center justify-center text-pink-400 mb-2 group-hover:rotate-6 transition-transform shadow-md">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-pink-400">150+</span>
                <span className="text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-wider mt-1">CBT MOCK TESTS</span>
              </div>

              <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-2xl flex flex-col items-center justify-center hover:border-emerald-500/70 hover:scale-[1.03] transition-all duration-300 group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2 group-hover:rotate-6 transition-transform shadow-md">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400">REAL CBT</span>
                <span className="text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-wider mt-1">NTA EXAM PATTERN</span>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl flex flex-col items-center justify-center hover:border-amber-500/70 hover:scale-[1.03] transition-all duration-300 group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2 group-hover:rotate-6 transition-transform shadow-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">DETAILED</span>
                <span className="text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-wider mt-1">LaTeX SOLUTIONS</span>
              </div>

              <div className="bg-slate-900/90 border border-cyan-500/30 p-4 rounded-2xl flex flex-col items-center justify-center hover:border-cyan-500/70 hover:scale-[1.03] transition-all duration-300 group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-2 group-hover:rotate-6 transition-transform shadow-md">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">RANK LIST</span>
                <span className="text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-wider mt-1">SPEED ANALYTICS</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Exam Categories Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {EXAM_CATEGORIES.map((cat, index) => {
            const themes = [
              { gradient: 'from-pink-600/30 via-purple-600/20 to-indigo-600/10', badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30', hoverBorder: 'hover:border-pink-500/60', glow: 'rgba(219, 39, 119, 0.3)' },
              { gradient: 'from-amber-600/30 via-orange-600/20 to-rose-600/10', badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30', hoverBorder: 'hover:border-amber-500/60', glow: 'rgba(245, 158, 11, 0.3)' },
              { gradient: 'from-emerald-600/30 via-teal-600/20 to-cyan-600/10', badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', hoverBorder: 'hover:border-emerald-500/60', glow: 'rgba(16, 185, 129, 0.3)' },
              { gradient: 'from-indigo-600/30 via-purple-600/20 to-violet-600/10', badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30', hoverBorder: 'hover:border-indigo-500/60', glow: 'rgba(99, 102, 241, 0.3)' },
            ];
            const theme = themes[index % themes.length];
            const topicCount = TOPICS_BY_CATEGORY[cat.id]?.length || 0;

            return (
              <motion.button 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                key={cat.id} 
                onClick={() => handleCategorySelect(cat.id)}
                className={cn(
                  "glass-card-interactive rounded-3xl p-6 text-left group flex flex-col justify-between relative overflow-hidden border border-white/10 transition-all duration-300",
                  theme.hoverBorder
                )}
              >
                {/* Background glow */}
                <div className={cn("absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-60 bg-gradient-to-br", theme.gradient)}></div>

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={cn("text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border", theme.badgeColor)}>
                      {cat.id === 'slst' ? 'MOST POPULAR' : 'FEATURED SERIES'}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-pink-400" /> {topicCount} Topics
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/15 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 group-hover:border-pink-500/40 transition-all shadow-lg">
                    <BrainCircuit className="h-6 w-6" />
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-white mb-2 leading-tight group-hover:text-pink-300 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6 line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                    <BookOpen className="w-3.5 h-3.5 text-pink-400" /> Explore Tests
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-pink-500 group-hover:border-pink-400 transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    );
  }

  // VIEW 2: TOPICS
  if (view === 'topics') {
    const category = EXAM_CATEGORIES.find(c => c.id === selectedCategory);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col min-h-[calc(100vh-100px)] relative z-10">
        {renderBreadcrumbs()}

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 mb-8 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950/50 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full inline-block mb-2">
                EXAM CATEGORY
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
                {category?.name || 'Subject Topics'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium max-w-xl">
                {category?.description} Select a topic below to view all 20 chapterwise CBT mock tests.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input 
                type="text"
                placeholder="Search topic name..."
                value={topicSearchQuery}
                onChange={(e) => setTopicSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:border-pink-500/60 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-white/10 max-w-md mx-auto">
            <Search className="h-10 w-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No topic matches your search</h3>
            <p className="text-xs text-slate-400">Try searching for another topic name or clear the search filter.</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredTopics.map((topic, idx) => (
              <motion.button 
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                key={idx} 
                onClick={() => handleTopicSelect(topic)}
                className="glass-card-interactive rounded-2xl p-5 text-left group flex flex-col justify-between border border-white/10 hover:border-pink-500/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-pink-400">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      20 Mocks
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-pink-300 transition-colors font-display">
                    {topic}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                  <span>Start Test Series</span>
                  <ChevronRight className="h-4 w-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  // VIEW 3: MOCKS LIST
  if (view === 'mocks') {
    const mocks = generateMocksForTopic(selectedTopic || 'Unknown', 20);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col min-h-[calc(100vh-100px)] relative z-10">
        {renderBreadcrumbs()}

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 mb-8 relative overflow-hidden bg-gradient-to-r from-pink-950/30 via-slate-900 to-indigo-950/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full inline-block mb-2">
                TEST SERIES BATCH
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                {selectedTopic}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                20 Full-Length Practice Mock Tests • 30 Multiple Choice Questions each • Real-time Timer
              </p>
            </div>

            <button 
              onClick={() => setView('topics')}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/15 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <ArrowLeft className="h-4 w-4" /> Switch Topic
            </button>
          </div>
        </div>

        {/* Mock Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {mocks.map((mock, idx) => (
            <div 
              key={idx} 
              className="glass-card-interactive rounded-3xl p-5 flex flex-col justify-between border border-white/10 hover:border-pink-500/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                    #{idx + 1}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active Test
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mb-1 font-display group-hover:text-pink-300 transition-colors">
                  Mock Test {idx + 1}
                </h3>

                <p className="text-xs text-slate-400 font-medium mb-5">
                  {mock.totalQuestions} MCQs • {mock.duration / 60} Minutes
                </p>
              </div>

              <button 
                onClick={() => handleMockSelect(mock)}
                className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 border border-white/20"
              >
                <Target className="h-4 w-4" />
                <span>Start CBT Test</span>
              </button>
            </div>
          ))}
        </div>

        {/* Test Code Passcode Modal */}
        <AnimatePresence>
          {showCodeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
                onClick={() => setShowCodeModal(false)}
              ></motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-3xl p-8 max-w-sm w-full border border-white/20 shadow-2xl relative z-10 bg-slate-950 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-bold text-white font-display mb-1">
                  Enter Test Passcode
                </h2>
                <p className="text-xs text-slate-400 mb-6 font-medium">
                  Please enter the access passcode provided by Raj Sir to unlock this test.
                </p>

                <form onSubmit={handleCodeSubmit}>
                  <input 
                    type="text" 
                    value={testCodeInput}
                    onChange={(e) => setTestCodeInput(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 text-white rounded-xl px-4 py-3 text-center font-mono font-bold text-sm tracking-widest uppercase focus:outline-none focus:border-pink-500/60 mb-3"
                    placeholder="PASSCODE"
                    autoFocus
                  />

                  {testCodeError ? (
                    <p className="text-rose-400 text-xs font-bold mb-4">{testCodeError}</p>
                  ) : (
                    <div className="mb-4"></div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setShowCodeModal(false)}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white bg-slate-900 border border-white/10"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-md border border-white/20"
                    >
                      Unlock & Start
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // VIEW 4: LIVE CBT TEST
  if (view === 'test') {
    const q = selectedMock.questions[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== undefined;

    return (
      <div className={cn(
        "w-full py-6 px-4 sm:px-6 flex-1 flex flex-col items-center relative z-20",
        focusMode ? "fixed inset-0 bg-slate-950 overflow-y-auto z-[100]" : ""
      )}>
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 flex-1">
          
          {/* Main Test Body */}
          <div className="flex-1 flex flex-col gap-5">
            
            {/* Test Header */}
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/15 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  {currentQuestion + 1}
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-white text-sm sm:text-base font-display truncate">
                    {selectedMock.title}
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Question {currentQuestion + 1} of {selectedMock.questions.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => setFocusMode(!focusMode)} 
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-white/10 px-3 py-2 rounded-xl transition-colors"
                  title="Toggle Fullscreen Focus Mode"
                >
                  {focusMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  <span>{focusMode ? "Exit Focus" : "Focus Mode"}</span>
                </button>

                <div className={cn(
                  "flex items-center gap-2 font-mono font-bold px-3.5 py-2 rounded-xl border text-xs shadow-inner",
                  timeLeft < 300 
                    ? "bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse" 
                    : "bg-slate-900 border-white/15 text-pink-400"
                )}>
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Question Box */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 flex-1 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full">
                    QUESTION {currentQuestion + 1}
                  </span>
                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                      +4 Marks
                    </span>
                    <span className="text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-lg">
                      -1 Mark
                    </span>
                  </div>
                </div>

                {/* LaTeX Question Content */}
                <div className="text-base sm:text-lg mb-8 p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-white leading-relaxed font-medium">
                  <MixedLatex content={q.question} className="text-white" />
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {q.options.map((opt: string, i: number) => {
                    const isSelected = selectedAnswers[currentQuestion] === i;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: i }));
                        }}
                        className={cn(
                          "w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-center gap-4 group",
                          isSelected
                            ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)] text-white"
                            : "bg-slate-900/80 border-white/10 hover:border-white/30 text-slate-200 hover:bg-slate-800/80"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-xl border font-black text-xs flex items-center justify-center shrink-0 transition-all",
                          isSelected 
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-white/30" 
                            : "bg-slate-950 border-white/15 text-slate-400 group-hover:text-white"
                        )}>
                          {String.fromCharCode(65 + i)}
                        </div>

                        <div className="flex-1 overflow-x-auto text-xs sm:text-sm font-semibold">
                          <MixedLatex content={opt} className={isSelected ? 'text-white' : 'text-slate-200'} />
                        </div>

                        {isSelected && <Check className="h-4 w-4 text-pink-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next / Clear Footer Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-8 gap-3">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>

                {isAnswered && (
                  <button
                    onClick={() => {
                      const updated = { ...selectedAnswers };
                      delete updated[currentQuestion];
                      setSelectedAnswers(updated);
                    }}
                    className="text-xs text-slate-400 hover:text-rose-400 font-semibold transition-colors"
                  >
                    Clear Response
                  </button>
                )}

                <button
                  onClick={() => setCurrentQuestion(Math.min(selectedMock.questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === selectedMock.questions.length - 1}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-md border border-white/20 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Question Map & Submit Panel */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="glass-card p-6 rounded-3xl border border-white/15 lg:sticky top-20 shadow-2xl">
              <h3 className="font-bold text-white text-xs uppercase tracking-widest font-display mb-4 border-b border-white/10 pb-3">
                Question Palette
              </h3>

              {/* Grid of 30 question buttons */}
              <div className="grid grid-cols-5 gap-2.5 mb-6">
                {selectedMock.questions.map((_: any, i: number) => {
                  const isCurrent = currentQuestion === i;
                  const isAnswered = selectedAnswers[i] !== undefined;

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestion(i)}
                      className={cn(
                        "h-9 w-full rounded-xl font-bold text-xs transition-all border flex items-center justify-center",
                        isCurrent 
                          ? "border-pink-400 ring-2 ring-pink-500/50 bg-pink-500 text-white font-black" 
                          : isAnswered
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30"
                            : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-[11px] font-semibold text-slate-400 mb-6 bg-slate-950/60 p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-emerald-500/30 border border-emerald-500/60"></div>
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-white/20"></div>
                  <span>Unanswered ({selectedMock.questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 border border-emerald-300/40"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Exam Now</span>
              </button>
            </div>
          </div>

        </div>

        {/* Submit Confirmation Modal */}
        <AnimatePresence>
          {showConfirmSubmit && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
                onClick={() => setShowConfirmSubmit(false)}
              ></motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl relative z-10 bg-slate-950 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-2">
                  Are You Sure You Want To Submit?
                </h3>
                <p className="text-xs text-slate-300 mb-6 font-medium leading-relaxed">
                  You have answered <strong className="text-emerald-400 font-bold">{Object.keys(selectedAnswers).length}</strong> out of <strong className="text-white font-bold">{selectedMock.questions.length}</strong> questions.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-900 border border-white/10 hover:bg-slate-800"
                  >
                    Resume Test
                  </button>

                  <button
                    onClick={submitTest}
                    className="py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg border border-emerald-300/40"
                  >
                    Yes, Submit
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // VIEW 5: RESULTS & SCORECARD
  if (view === 'results') {
    const stats = calculateScore();

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col min-h-[calc(100vh-100px)] relative z-10">
        {renderBreadcrumbs()}

        {/* Scorecard Hero Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-slate-900 to-pink-950/40 shadow-2xl mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Award className="h-8 w-8" />
          </div>

          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full inline-block mb-3">
            TEST EVALUATION COMPLETE
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-white font-display mb-2">
            Performance Scorecard
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium mb-8 max-w-lg mx-auto">
            {selectedMock.title} • Instant Evaluation & Rank Position
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-pink-400">{stats.score}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                Score / {stats.maxScore}
              </span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.correct}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                Correct Answers
              </span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-rose-400">{stats.incorrect}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                Incorrect
              </span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-amber-400">{stats.unattempted}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                Unattempted
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => startMockTest(selectedMock)}
              className="bg-slate-900 hover:bg-slate-800 text-white border border-white/15 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4 text-pink-400" /> Re-attempt Mock Test
            </button>

            <button
              onClick={() => setView('mocks')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <span>Back to Mocks List</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Live Leaderboard */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl mb-10">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base font-display">
                Top Performers Leaderboard
              </h3>
            </div>
            <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              LIVE RANKINGS
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Arindam Ghosh', score: 112, me: false },
              { name: 'Sneha Banerjee', score: 108, me: false },
              { name: 'You (Your Score)', score: stats.score, me: true },
              { name: 'Rahul Das', score: Math.max(0, stats.score - 4), me: false }
            ].sort((a, b) => b.score - a.score).map((user, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center justify-between p-3.5 rounded-2xl border transition-all text-xs font-bold",
                  user.me 
                    ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-pink-500/60 text-white shadow-md" 
                    : "bg-slate-900/80 border-white/10 text-slate-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs",
                    idx === 0 ? "bg-amber-400 text-slate-950" : idx === 1 ? "bg-slate-300 text-slate-950" : idx === 2 ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-400"
                  )}>
                    #{idx + 1}
                  </span>
                  <span>{user.name}</span>
                </div>
                <span className="text-white font-black">{user.score} Marks</span>
              </div>
            ))}
          </div>
        </div>

        {/* Question Review Section */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Detailed Solutions & Explanation
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Review step-by-step mathematical proofs and shortcut tricks for each question.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-white/10 overflow-x-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'correct', label: 'Correct' },
                { id: 'incorrect', label: 'Incorrect' },
                { id: 'unattempted', label: 'Unattempted' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setReviewFilter(f.id as any)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                    reviewFilter === f.id
                      ? "bg-pink-500 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {selectedMock.questions.map((q: any, i: number) => {
              const isAttempted = selectedAnswers[i] !== undefined;
              const isCorrect = isAttempted && selectedAnswers[i] === q.correctAnswer;
              const isIncorrect = isAttempted && !isCorrect;

              if (reviewFilter === 'correct' && !isCorrect) return null;
              if (reviewFilter === 'incorrect' && !isIncorrect) return null;
              if (reviewFilter === 'unattempted' && isAttempted) return null;

              return (
                <div 
                  key={i} 
                  className={cn(
                    "p-6 rounded-2xl border transition-all bg-slate-950/80",
                    isCorrect ? "border-emerald-500/40" : isIncorrect ? "border-rose-500/40" : "border-white/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full">
                      QUESTION {i + 1}
                    </span>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+4)
                      </span>
                    ) : isIncorrect ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect (-1)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-900 border border-white/10 px-2.5 py-1 rounded-full">
                        Unattempted (0)
                      </span>
                    )}
                  </div>

                  {/* Question text */}
                  <div className="text-sm font-semibold text-slate-100 p-4 rounded-xl bg-slate-900 border border-white/10 mb-4 overflow-x-auto">
                    <MixedLatex content={q.question} className="text-white" />
                  </div>

                  {/* User answer vs correct answer comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs font-medium">
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Your Selected Option:
                      </span>
                      {isAttempted ? (
                        <div className={cn("font-semibold overflow-x-auto", isCorrect ? "text-emerald-400" : "text-rose-400")}>
                          <MixedLatex content={q.options[selectedAnswers[i]]} />
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">No option selected</span>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                        Correct Option:
                      </span>
                      <div className="font-semibold text-emerald-300 overflow-x-auto">
                        <MixedLatex content={q.options[q.correctAnswer]} />
                      </div>
                    </div>
                  </div>

                  {/* Mathematical Explanation Box */}
                  <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 text-xs">
                    <span className="font-bold text-pink-400 uppercase tracking-widest text-[10px] block mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Step-by-Step Explanation
                    </span>
                    <div className="text-slate-200 leading-relaxed overflow-x-auto">
                      <MixedLatex content={q.explanation} className="text-slate-200" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  return null;
}
