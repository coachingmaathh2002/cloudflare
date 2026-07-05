import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MixedLatex } from '../components/LatexRenderer';
import { CheckCircle2, XCircle, Clock, ChevronRight, ChevronLeft, Flag, Award, AlertCircle, BookOpen, Target, ArrowLeft, BrainCircuit, Maximize, Minimize } from 'lucide-react';
import { EXAM_CATEGORIES, TOPICS_BY_CATEGORY, generateMocksForTopic, generateQuestionSet } from '../data/mockTestData';
import { useSEO } from '../lib/useSEO';

type ViewState = 'categories' | 'topics' | 'mocks' | 'test' | 'results';

export default function MockTestApp() {
  const [view, setView] = useState<ViewState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useSEO(
    "Online Math Mock Tests & Series | Raj Sir",
    "Prepare for SLST Mathematics, JEE Mains, and WBJEE with our professional online mock tests. Test your limits, view solutions, and analyze your scores."
  );
  const [selectedMock, setSelectedMock] = useState<any | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);

  const [focusMode, setFocusMode] = useState(false);

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [pendingMock, setPendingMock] = useState<any | null>(null);
  const [testCodeInput, setTestCodeInput] = useState('');
  const [testCodeError, setTestCodeError] = useState('');

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
    setIsSubmitted(false);
    setTimeLeft(mock.duration);
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
      setTestCodeError('Invalid test code');
    }
  };

  const submitTest = () => {
    setIsSubmitted(true);
    setView('results');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(selectedAnswers).forEach(qIndex => {
      const idx = parseInt(qIndex);
      if (selectedAnswers[idx] === selectedMock.questions[idx].correctAnswer) {
        score += 4;
      } else {
        score -= 1;
      }
    });
    return score;
  };

  if (view === 'categories') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col min-h-[calc(100vh-100px)]">
        <div className="mb-12 text-center mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4">
            <Award className="w-4 h-4" /> Raj Sir Math Classes
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-slate-50 mt-4 uppercase tracking-tight drop-shadow-lg">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Exams</span>
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto font-medium text-lg">Choose your target examination to access highly curated mock tests.</p>
        </div>
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
              { borderHover: 'hover:border-yellow-400/50', iconColor: 'text-yellow-400', iconBg: 'bg-yellow-400/10', gradient: 'from-yellow-400/20 to-amber-500/5', bgHover: 'hover:bg-yellow-400/5', iconFill: 'fill-yellow-400/20' },
              { borderHover: 'hover:border-cyan-400/50', iconColor: 'text-cyan-400', iconBg: 'bg-cyan-400/10', gradient: 'from-cyan-400/20 to-blue-500/5', bgHover: 'hover:bg-cyan-400/5', iconFill: 'fill-cyan-400/20' },
              { borderHover: 'hover:border-pink-400/50', iconColor: 'text-pink-400', iconBg: 'bg-pink-400/10', gradient: 'from-pink-400/20 to-rose-500/5', bgHover: 'hover:bg-pink-400/5', iconFill: 'fill-pink-400/20' },
              { borderHover: 'hover:border-emerald-400/50', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-400/10', gradient: 'from-emerald-400/20 to-teal-500/5', bgHover: 'hover:bg-emerald-400/5', iconFill: 'fill-emerald-400/20' },
            ];
            const theme = themes[index % themes.length];
            return (
              <motion.button 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                key={cat.id} 
                onClick={() => handleCategorySelect(cat.id)}
                className={`relative bg-gradient-to-br from-[#0B1120] via-slate-900 to-[#0A0F1D] border border-white/10 shadow-xl ${theme.borderHover} hover:-translate-y-1 ${theme.bgHover} transition-all duration-300 rounded-[32px] p-6 text-left group flex flex-col h-full overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                {/* Background abstract element */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors pointer-events-none"></div>
                <div className="absolute inset-0 overflow-hidden opacity-[0.03] text-white font-serif select-none pointer-events-none">
                  <span className="absolute top-4 left-4 text-3xl">∑</span>
                  <span className="absolute bottom-10 right-4 text-xl">π</span>
                </div>

                <div className={`w-16 h-16 ${theme.iconBg} ${theme.iconColor} ${theme.iconFill} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/10 relative z-10`}>
                  <BrainCircuit className="h-8 w-8 drop-shadow-md" />
                </div>
                <h3 className={`text-2xl font-black mb-2 leading-tight drop-shadow-sm font-display relative z-10 text-white group-hover:${theme.iconColor} transition-colors uppercase tracking-tight`}>{cat.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-8 relative z-10 line-clamp-3 leading-relaxed">{cat.description}</p>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-300 relative z-10">
                  <span className={`bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors`}>{TOPICS_BY_CATEGORY[cat.id]?.length || 0} Topics</span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors ${theme.iconColor}`}>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    );
  }

  if (view === 'topics') {
    const category = EXAM_CATEGORIES.find(c => c.id === selectedCategory);
    const topics = selectedCategory ? TOPICS_BY_CATEGORY[selectedCategory] || [] : [];
    
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col min-h-[calc(100vh-100px)]">
        <button onClick={() => setView('categories')} className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit transition-colors bg-yellow-400/10 px-4 py-2 rounded-xl border border-yellow-400/20 shadow-inner hover:bg-yellow-400/20">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </button>
        <div className="mb-12 block text-center">
          <span className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-400/20 uppercase tracking-widest shadow-inner">
            {category?.name || 'Topics'}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-50 mt-4 uppercase tracking-tight drop-shadow-lg">Select Subject <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Topic</span></h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto font-medium">Access our highly curated mock test series. Full-length mock tests for each topic with detailed solutions.</p>
        </div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {topics.map((topic, idx) => (
            <motion.button 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              key={idx} 
              onClick={() => handleTopicSelect(topic)}
              className="relative bg-gradient-to-br from-[#0B1120] via-slate-900 to-[#0A0F1D] border border-white/10 shadow-xl hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all duration-300 rounded-[24px] p-6 text-left group flex flex-col h-full overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="w-12 h-12 bg-slate-800/80 text-yellow-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-yellow-400/10 transition-all shadow-inner border border-white/10 group-hover:border-yellow-400/30 relative z-10">
                <BookOpen className="h-6 w-6 drop-shadow-md" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight drop-shadow-sm font-display relative z-10 group-hover:text-yellow-400 transition-colors">{topic}</h3>
              <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 relative z-10 border-t border-white/5">
                <span className="bg-white/5 px-3 py-1 rounded-lg border border-white/10 group-hover:text-yellow-400 transition-colors">20 Mocks</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-yellow-400/50 transition-colors">
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    );
  }

  if (view === 'mocks') {
    const mocks = generateMocksForTopic(selectedTopic || 'Unknown', 20);
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 w-full flex flex-col flex-1">
        <button onClick={() => setView('topics')} className="flex items-center gap-2 text-pink-400 hover:text-pink-300 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Back to Topics
        </button>
        <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/[0.08] rounded-[40px] p-8 sm:p-10 mb-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px] pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>
           <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3 relative z-10 drop-shadow-md">{selectedTopic} - Test Series</h1>
           <p className="text-slate-300 relative z-10 font-medium font-sans">Complete all 20 mocks to master this topic. Each test contains 30 MCQs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mocks.map((mock, idx) => (
            <div key={idx} className="relative bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/[0.08] hover:border-pink-500/30 hover:bg-white/[0.06] rounded-[32px] p-6 flex flex-col h-full overflow-hidden group transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="bg-pink-500/10 text-pink-400 w-12 h-12 rounded-xl flex items-center justify-center font-bold font-serif italic border border-pink-500/20 shadow-inner text-lg">
                  #{idx + 1}
                </div>
                <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-500/20 shadow-inner">Live</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-1 drop-shadow-sm relative z-10">Mock Test {idx + 1}</h3>
              <p className="text-sm text-slate-400 mb-8 font-medium relative z-10">{mock.totalQuestions} Questions • {mock.duration / 60} Mins</p>
              
              <button 
                onClick={() => handleMockSelect(mock)}
                className="mt-auto w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/50 text-pink-400 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-inner relative z-10"
              >
                 <Target className="h-4 w-4" /> Start Attempt
              </button>
            </div>
          ))}
        </div>

        {/* Test Code Modal */}
        {showCodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px]"></div>
              <h2 className="text-2xl font-bold text-white mb-2 font-display relative z-10">Enter Test Code</h2>
              <p className="text-slate-400 text-sm mb-6 relative z-10">Please enter the test code provided by Raj Sir to start this mock test.</p>
              
              <form onSubmit={handleCodeSubmit} className="relative z-10">
                <input 
                  type="text" 
                  value={testCodeInput}
                  onChange={(e) => setTestCodeInput(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all font-mono text-center tracking-widest uppercase mb-4"
                  placeholder="CODE"
                  autoFocus
                />
                
                {testCodeError && (
                  <p className="text-red-400 text-xs mb-4 text-center font-bold">{testCodeError}</p>
                )}

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowCodeModal(false)}
                    className="flex-1 py-3 px-4 rounded-xl font-bold uppercase text-xs tracking-widest text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl font-bold uppercase text-xs tracking-widest text-white bg-pink-500 hover:bg-pink-600 transition-colors shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                  >
                    Start Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === 'results') {
    const score = calculateScore();
    const maxScore = selectedMock.questions.length * 4;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <button onClick={() => setView('mocks')} className="flex items-center gap-2 text-pink-400 hover:text-pink-300 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
        <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-[40px] overflow-hidden border border-white/[0.08]">
           <div className="bg-white/[0.03] backdrop-blur-md shadow-inner border-b border-white/[0.08] p-10 text-center text-white relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/20 rounded-full blur-[80px] pointer-events-none"></div>
             <Award className="h-20 w-20 mx-auto mb-6 text-green-400 relative z-10 drop-shadow-md" />
             <h1 className="text-4xl font-extrabold mb-2 relative z-10 font-display drop-shadow-md">Test Completed!</h1>
             <p className="text-green-400 text-sm uppercase tracking-widest font-bold relative z-10 drop-shadow-sm">{selectedMock.title}</p>
           </div>
           
           <div className="p-8 sm:p-10">
             <div className="flex justify-center mb-12">
               <div className="text-center bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/[0.08] p-8 rounded-[32px] min-w-[240px]">
                 <div className="text-6xl font-black text-pink-400 mb-2 drop-shadow-md">{score} <span className="text-2xl text-slate-500 font-bold">/ {maxScore}</span></div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Score</div>
               </div>
             </div>

             <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-[32px] border border-violet-500/30 mb-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-gradient-to-l from-pink-500 to-violet-500 text-white px-4 py-1 rounded-bl-lg text-[10px] font-bold uppercase tracking-widest shadow-lg z-10">
                 Live Leaderboard
               </div>
               <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest flex items-center gap-2">
                 <Award className="h-5 w-5 text-violet-400" /> Global Ranking
               </h3>
               <div className="space-y-3">
                 {[
                   { name: 'Arindam Ghosh', score: 112, me: false },
                   { name: 'Sneha Banerjee', score: 108, me: false },
                   { name: 'You', score: score, me: true },
                   { name: 'Rahul Das', score: score - 5, me: false }
                 ].sort((a, b) => b.score - a.score).map((user, idx) => (
                   <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border ${user.me ? 'bg-pink-500/10 border-pink-500/30 shadow-[0_0_15px_rgba(219,39,119,0.2)]' : 'bg-white/[0.03] border-white/10'}`}>
                     <div className="flex items-center gap-4">
                       <span className={`font-bold font-serif italic text-lg ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-slate-500'}`}>
                         #{idx + 1}
                       </span>
                       <span className={`font-bold ${user.me ? 'text-pink-400' : 'text-slate-200'}`}>
                         {user.name}
                       </span>
                     </div>
                     <span className="font-black text-white">{user.score}</span>
                   </div>
                 ))}
               </div>
             </div>

             <h3 className="text-sm font-bold text-slate-300 mb-8 border-b border-white/10 pb-4 uppercase tracking-widest flex items-center gap-2"><Target className="h-4 w-4 text-pink-400" /> Detailed Review</h3>
             
             <div className="space-y-6">
               {selectedMock.questions.map((q: any, i: number) => {
                 const isAttempted = selectedAnswers[i] !== undefined;
                 const isCorrect = isAttempted && selectedAnswers[i] === q.correctAnswer;
                 
                 return (
                   <div key={i} className={`p-6 sm:p-8 rounded-[32px] border shadow-[0_8px_32px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] ${isCorrect ? 'bg-green-500/10 border-green-500/30' : isAttempted ? 'bg-red-500/10 border-red-500/30' : 'bg-white/[0.03] backdrop-blur-[40px] border-white/[0.08]'}`}>
                     <div className="flex gap-4 mb-6 items-start">
                       <span className={`font-black text-lg pt-1 drop-shadow-sm ${isCorrect ? 'text-green-400' : isAttempted ? 'text-red-400' : 'text-slate-400'}`}>Q{i + 1}.</span>
                       <div className="text-white bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10 w-full overflow-x-auto shadow-inner">
                         <MixedLatex content={q.question} className="text-white" />
                       </div>
                     </div>
                     
                     <div className="ml-12 text-sm font-medium grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                       <div className="flex flex-col gap-2 text-slate-300">
                         <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Your Answer:</span> 
                         {isAttempted ? (
                           <div className={`p-4 rounded-xl border shadow-inner ${isCorrect ? 'border-green-500/40 bg-green-500/10 text-green-300' : 'border-red-500/40 bg-red-500/10 text-red-300'} flex items-center justify-between`}>
                             <div className="overflow-x-auto pr-4">
                               <MixedLatex content={q.options[selectedAnswers[i]]} />
                             </div>
                             {isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
                           </div>
                         ) : (
                           <div className="p-4 text-slate-500 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl italic shadow-inner">Not attempted</div>
                         )}
                       </div>
                       
                       {!isCorrect && (
                         <div className="flex flex-col gap-2">
                           <span className="text-[10px] uppercase font-bold tracking-widest text-green-400">Correct Answer:</span>
                           <div className="p-4 rounded-xl border border-green-500/40 bg-green-500/10 text-green-300 flex items-center justify-between shadow-inner">
                             <div className="overflow-x-auto pr-4">
                               <MixedLatex content={q.options[q.correctAnswer]} />
                             </div>
                             <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                           </div>
                         </div>
                       )}
                     </div>
                     
                     <div className="ml-12 bg-white/5 backdrop-blur-sm p-5 border border-pink-500/30 rounded-xl shadow-inner">
                       <h4 className="text-[10px] font-bold uppercase text-pink-400 tracking-wider mb-3 flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> Explanation</h4>
                       <div className="text-sm text-slate-200">
                         <MixedLatex content={q.explanation} className="text-white" />
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>
      </div>
    );
  }

  const q = selectedMock.questions[currentQuestion];

  return (
    <div className={`w-full py-6 px-4 sm:px-6 flex-1 flex flex-col items-center ${focusMode ? 'fixed inset-0 z-[100] bg-slate-950 overflow-y-auto' : ''}`}>
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-5 flex-1 min-h-0">
        
        {/* Main Test Area */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Header */}
          <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] p-4 sm:p-5 rounded-[32px] border border-white/[0.08] flex justify-between items-center z-10 relative">
            <h2 className="font-bold text-white text-sm sm:text-base font-display whitespace-nowrap overflow-hidden text-ellipsis mr-4">{selectedMock.title}</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFocusMode(!focusMode)} 
                className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                title="Toggle Focus Mode"
              >
                {focusMode ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
              <div className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] text-white font-mono font-bold px-4 py-2 rounded-2xl border border-white/[0.08] text-sm shrink-0">
                <Clock className="h-4 w-4 text-pink-400" />
                <motion.span 
                  animate={timeLeft < 300 ? { 
                    scale: [1, 1.15, 1], 
                    color: ['#f87171', '#ef4444', '#f87171'],
                    textShadow: ['0px 0px 8px rgba(239, 68, 68, 0.4)', '0px 0px 16px rgba(239, 68, 68, 0.8)', '0px 0px 8px rgba(239, 68, 68, 0.4)']
                  } : {}}
                  transition={timeLeft < 300 ? { 
                    duration: 0.8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  } : {}}
                  className={timeLeft < 300 ? 'text-red-400 font-black' : ''}
                >
                  {formatTime(timeLeft)}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Question Area */}
          <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] p-6 sm:p-8 rounded-[40px] border border-white/[0.08] flex-1 flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
               <span className="text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-inner">Question {currentQuestion + 1}</span>
               <div className="flex gap-2 sm:gap-3 text-[10px] font-bold tracking-widest uppercase">
                 <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-inner drop-shadow-sm">+4 Marks</span>
                 <span className="text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-inner drop-shadow-sm">-1 Mark</span>
               </div>
            </div>
            
            <div className="text-base sm:text-lg mb-10 p-6 bg-white/[0.04] backdrop-blur-xl shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] rounded-[24px] border border-white/[0.08] text-white min-h-[120px] overflow-x-auto leading-relaxed drop-shadow-sm">
              <MixedLatex content={q.question} className="text-white" />
            </div>

            <div className="space-y-4 mt-auto">
              {q.options.map((opt: string, i: number) => {
                const isSelected = selectedAnswers[currentQuestion] === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: i }));
                    }}
                    className={`w-full text-left p-4 sm:p-5 rounded-[24px] border transition-all duration-300 flex items-center gap-4 ${
                      isSelected 
                        ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(219,39,119,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] transform scale-[1.01]' 
                        : 'border-white/[0.08] bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:border-white/[0.15] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className={`shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-sm shadow-inner ${
                      isSelected ? 'border-pink-500 text-pink-400 bg-white/10' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    {/* Crucial fix for LaTeX rendering inside options button */}
                    <div className={`flex-1 overflow-x-auto pointer-events-none ${isSelected ? 'text-white drop-shadow-sm' : 'text-slate-200'}`}>
                       <MixedLatex content={opt} className={isSelected ? 'text-white' : 'text-slate-200'} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] p-4 sm:p-5 rounded-[32px] border border-white/[0.08] flex justify-between items-center z-10 relative">
            <button 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-[20px] font-bold bg-white/[0.04] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] disabled:opacity-50 flex items-center gap-2 text-xs uppercase tracking-wider transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button 
              onClick={() => setCurrentQuestion(Math.min(selectedMock.questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === selectedMock.questions.length - 1}
              className="px-6 py-3 rounded-[20px] font-bold bg-pink-500/[0.15] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] text-pink-400 border border-pink-500/30 hover:bg-pink-500/30 hover:text-white disabled:opacity-50 flex items-center gap-2 text-xs uppercase tracking-wider transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Side Panel: Palette */}
        <div className="w-full lg:w-80 flex flex-col gap-5">
          <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] p-6 sm:p-8 rounded-[40px] border border-white/[0.08] lg:sticky top-20">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest font-display drop-shadow-sm">Question Map</h3>
            </div>
            
            <div className="grid grid-cols-5 gap-3 mb-8">
              {selectedMock.questions.map((_: any, i: number) => {
                const isAttempted = selectedAnswers[i] !== undefined;
                const isCurrent = currentQuestion === i;
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestion(i)}
                    className={`h-10 w-10 flex items-center justify-center rounded-xl font-bold text-xs transition-all border shadow-inner ${
                      isCurrent 
                        ? 'border-pink-500 ring-2 ring-pink-500/30 ' + (isAttempted ? 'bg-green-500/30 text-white' : 'bg-white/20 backdrop-blur-md text-white')
                        : isAttempted 
                          ? 'border-green-500/40 bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 text-[10px] font-bold uppercase tracking-wider mb-8 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-inner">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-4 h-4 bg-green-500/30 border border-green-500/50 rounded-md shadow-inner"></div> Answered
              </div>
              <div className="flex items-center gap-3 text-slate-300 mt-3">
                <div className="w-4 h-4 bg-white/5 border border-white/20 rounded-md shadow-inner"></div> Not Answered
              </div>
            </div>

            <button 
              onClick={submitTest}
              className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest border border-pink-400/50"
            >
              <CheckCircle2 className="h-5 w-5" /> Submit Exam
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
