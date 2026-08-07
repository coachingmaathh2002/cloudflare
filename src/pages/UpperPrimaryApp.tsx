import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Target, ChevronRight, ChevronLeft, Award, Star, ArrowLeft, CheckCircle2, XCircle, Clock, Maximize, Minimize, UserCheck, ShieldAlert, Key, LogOut, Layers } from 'lucide-react';
import { MixedLatex } from '../components/LatexRenderer';
import { UPPER_PRIMARY_TOPICS, CDP_MOCKS } from '../data/upperPrimaryData';
import { useSEO } from '../lib/useSEO';

type ViewState = 'landing' | 'verify' | 'topics' | 'mocks' | 'test' | 'results';

// NOTE: Replace this URL with your Google Sheet published CSV URL
// Go to File -> Share -> Publish to web -> Link -> select the sheet and "Comma-separated values (.csv)"
const STUDENT_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRRRSfQqvIjS5rWy6FSjcgvA1swYQWwAs1Ba6W7sxfnCYxd3Kln7zV7Qy_7aoL0K-fUamd5BuIhQjVV/pub?output=csv';

export default function UpperPrimaryApp() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('landing');

  useSEO(
    "Upper Primary TET Math Coaching & Mocks | Raj Sir",
    "Prepare for the West Bengal Upper Primary TET Mathematics examination with Raj Sir's specialized topic tests, free assessments, and structured study modules."
  );

  const [isVerified, setIsVerified] = useState(false);
  const [verifyName, setVerifyName] = useState('');
  const [verifyMobile, setVerifyMobile] = useState('');
  const [verifyStudentId, setVerifyStudentId] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedMock, setSelectedMock] = useState<any>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [focusMode, setFocusMode] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [solutionViewIndex, setSolutionViewIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [view]);

  useEffect(() => {
    if (view === 'test') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [currentQuestion, view]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyName.trim() || !verifyMobile.trim() || !verifyStudentId.trim()) {
      setVerifyError('Please enter Name, Mobile Number, and Student ID');
      return;
    }
    
    setVerifyLoading(true);
    setVerifyError('');

    try {
      const response = await fetch(`${STUDENT_SHEET_CSV_URL}&t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (!response.ok) throw new Error('Failed to fetch verification list');
      
      const csvText = await response.text();
      const rows = csvText.split('\n').map(row => row.split(','));
      
      // Assume CSV format: Name, Mobile, StudentID
      // Skip header row
      const dataRows = rows.slice(1);
      
      const inputName = verifyName.trim().toLowerCase();
      const inputMobile = verifyMobile.trim().toLowerCase();
      const inputStudentId = verifyStudentId.trim().toLowerCase();
      let matched = false;

      for (const row of dataRows) {
        if (row.length >= 3) {
          const name = row[0]?.trim().toLowerCase();
          const mobile = row[1]?.trim().toLowerCase();
          const studentId = row[2]?.trim().toLowerCase();
          
          if (inputName === name && inputMobile === mobile && inputStudentId === studentId) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        setIsVerified(true);
        setView('topics');
      } else {
        setVerifyError('Verification failed. Information does not match our records.');
      }
    } catch (err) {
      console.error(err);
      setVerifyError('Could not connect to the verification database. Please try again later.');
    } finally {
      setVerifyLoading(false);
    }
  };

  const proceedFromLanding = () => {
    if (isVerified) {
      setView('topics');
    } else {
      setView('verify');
    }
  };

  // Auto-submit test
  React.useEffect(() => {
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

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic);
    setView('mocks');
  };

  const handleMockSelect = (mock: any) => {
    setSelectedMock(mock);
    setCurrentQuestion(0);
    setSolutionViewIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(mock.duration);
    setView('test');
  };

  const submitTest = () => {
    setIsSubmitted(true);
    setSolutionViewIndex(0);
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
        score += 1; // 1 mark per correct answer typically
      }
    });
    return score;
  };

  if (view === 'landing') {
    return (
      <div className="w-full flex-1">
        {/* Banner Section */}
        <section className="pt-6 pb-2 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(34,197,94,0.15)] group flex">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 via-emerald-800/80 to-[#0B1120] opacity-90 z-0"></div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

            <div className="absolute inset-0 p-8 md:p-12 lg:p-16 w-full h-full flex flex-col justify-end z-10">
              <div className="max-w-3xl">
                <span className="bg-green-400/10 text-green-400 border border-green-400/30 px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(74,222,128,0.3)] backdrop-blur-md">
                  <Star className="w-4 h-4 fill-green-400" />
                  Upcoming Exam
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-slate-50 uppercase tracking-tight leading-[1.05] drop-shadow-2xl mb-4">
                  West Bengal <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 drop-shadow-lg">Upper Primary</span> TET
                </h2>
                <p className="text-slate-200 text-sm md:text-lg mb-8 font-medium leading-relaxed max-w-2xl border-l-4 border-green-400 pl-4">
                  Complete preparation with Mock Tests, Previous Year Questions, and Detailed Explanations for all subjects including CDP, Bengali, English, Math & Science, and Social Studies.
                </p>
                <button
                  onClick={proceedFromLanding}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 text-slate-900 px-8 py-4 rounded-xl font-black text-sm md:text-base uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] hover:-translate-y-1"
                >
                  View Topics & Mocks <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (view === 'verify') {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-4 min-h-[500px]">
        <button onClick={() => navigate('/')} className="absolute top-8 left-8 flex items-center gap-2 text-green-400 hover:text-green-300 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Back Home
        </button>
        
        <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-inner">
            <UserCheck className="w-8 h-8 drop-shadow-md" />
          </div>
          
          <h2 className="text-2xl font-display font-black text-white text-center mb-2 drop-shadow-md">Student Verification</h2>
          <p className="text-slate-400 text-sm text-center mb-8 font-medium">Please verify your enrollment to access the Upper Primary mock tests.</p>
          
          <form onSubmit={handleVerify} className="space-y-4 relative z-10">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <UserCheck className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  value={verifyName}
                  onChange={(e) => setVerifyName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-12 pr-4 py-4 outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/50 transition-all font-medium placeholder:text-slate-600 shadow-inner"
                  placeholder="Enter your name..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Key className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  value={verifyMobile}
                  onChange={(e) => setVerifyMobile(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-12 pr-4 py-4 outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/50 transition-all font-medium placeholder:text-slate-600 shadow-inner"
                  placeholder="Enter registered mobile..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-2">Student ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Key className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  value={verifyStudentId}
                  onChange={(e) => setVerifyStudentId(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-12 pr-4 py-4 outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/50 transition-all font-medium placeholder:text-slate-600 shadow-inner"
                  placeholder="Enter Student ID..."
                  required
                />
              </div>
            </div>
            
            {verifyError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs font-bold flex items-start gap-3 shadow-inner">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                {verifyError}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={verifyLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest border border-green-400/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {verifyLoading ? 'Verifying...' : 'Verify Identity'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'topics') {
    return (
      <div className="w-full flex-1">
        <section className="py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Upper Primary Modules</h2>
            <button onClick={() => {
              setIsVerified(false);
              setVerifyName('');
              setVerifyMobile('');
              setVerifyStudentId('');
              setView('landing');
              setSelectedTopic(null);
              setSelectedMock(null);
              setSelectedAnswers({});
              setCurrentQuestion(0);
              setIsSubmitted(false);
              navigate('/'); // Leave the specific page
            }} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold uppercase text-xs tracking-widest transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" /> Back / Log Out
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-green-400/10 flex items-center justify-center mb-4 text-green-400">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white">Full Coverage</h3>
              <p className="text-xs text-slate-400 mt-2">100% syllabus coverage as per WBCSSC guidelines.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-4 text-cyan-400">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white">CTET PYQs</h3>
              <p className="text-xs text-slate-400 mt-2">Special focus on CTET previous year questions translated to Bengali.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-pink-400/10 flex items-center justify-center mb-4 text-pink-400">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white">Mock Series</h3>
              <p className="text-xs text-slate-400 mt-2">Sectional and Full-length mocks with detailed analysis.</p>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">Topic-Wise Mock Tests</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPPER_PRIMARY_TOPICS.map((topic, idx) => (
              <motion.button 
                key={idx} 
                onClick={() => handleTopicSelect(topic)}
                className="relative bg-gradient-to-br from-[#0B1120] via-slate-900 to-[#0A0F1D] border border-white/10 shadow-xl hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-300 rounded-[24px] p-6 text-left group flex flex-col h-full overflow-hidden hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="w-12 h-12 bg-slate-800/80 text-green-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-green-400/10 transition-all shadow-inner border border-white/10 group-hover:border-green-400/30 relative z-10">
                  <BookOpen className="h-6 w-6 drop-shadow-md" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight drop-shadow-sm font-display relative z-10 group-hover:text-green-400 transition-colors">{topic.name}</h3>
                <p className="text-xs font-medium text-slate-400 mb-8 relative z-10 line-clamp-2">{topic.description}</p>
                <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 relative z-10 border-t border-white/5">
                  <span className="bg-white/5 px-3 py-1 rounded-lg border border-white/10 group-hover:text-green-400 transition-colors">Start Prep</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-green-400/50 transition-colors">
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (view === 'mocks') {
    // Determine mocks based on topic
    const mocks = selectedTopic?.id === 'cdp' ? CDP_MOCKS : [];

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 w-full flex flex-col flex-1">
        <button onClick={() => setView('topics')} className="flex items-center gap-2 text-green-400 hover:text-green-300 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Back to Topics
        </button>
        <div className="bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/[0.08] rounded-[40px] p-8 sm:p-10 mb-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] pointer-events-none"></div>
           <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3 relative z-10 drop-shadow-md">{selectedTopic?.name}</h1>
           <p className="text-slate-300 relative z-10 font-medium font-sans">Mock tests available for this subject.</p>
        </div>

        {mocks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mocks.map((mock: any, idx: number) => (
              <div key={idx} className="relative bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/[0.08] hover:border-green-500/30 hover:bg-white/[0.06] rounded-[32px] p-6 flex flex-col h-full overflow-hidden group transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="bg-green-500/10 text-green-400 w-12 h-12 rounded-xl flex items-center justify-center font-bold font-serif italic border border-green-500/20 shadow-inner text-lg">
                    #{idx + 1}
                  </div>
                  <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-500/20 shadow-inner">Live</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-1 drop-shadow-sm relative z-10">{mock.title}</h3>
                <p className="text-sm text-slate-400 mb-8 font-medium relative z-10">{mock.totalQuestions} Questions • {mock.duration / 60} Mins</p>
                
                <button 
                  onClick={() => handleMockSelect(mock)}
                  className="mt-auto w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 text-green-400 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-inner relative z-10"
                >
                   <Target className="h-4 w-4" /> Start Attempt
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-12 bg-white/5 rounded-[32px] border border-white/10">
            Mocks coming soon for this subject!
          </div>
        )}
      </div>
    );
  }

  // Reuse results and test view from MockTestApp but with green accents
  if (view === 'results') {
    const score = calculateScore();
    const maxScore = selectedMock.questions.length * 1; // Assuming 1 mark per question
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <button onClick={() => setView('mocks')} className="flex items-center gap-2 text-green-400 hover:text-green-300 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Back to Mocks
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
                 <div className="text-6xl font-black text-green-400 mb-2 drop-shadow-md">{score} <span className="text-2xl text-slate-500 font-bold">/ {maxScore}</span></div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Score</div>
               </div>
             </div>

             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
               <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                 <Target className="h-4 w-4 text-green-400" /> Detailed Review
               </h3>
               <span className="text-xs text-green-400 font-bold bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full w-fit">
                 Question {solutionViewIndex + 1} of {selectedMock.questions.length}
               </span>
             </div>
             
             {/* Question Map Pills */}
             <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 mb-6">
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">Select Question to Review:</p>
               <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
                 {selectedMock.questions.map((q: any, i: number) => {
                   const isAttempted = selectedAnswers[i] !== undefined;
                   const isCorrect = isAttempted && selectedAnswers[i] === q.correctAnswer;
                   const isActive = solutionViewIndex === i;

                   return (
                     <button
                       key={i}
                       onClick={() => setSolutionViewIndex(i)}
                       className={`w-9 h-9 rounded-xl font-black text-xs transition-all border flex items-center justify-center ${
                         isActive ? 'ring-2 ring-green-400 scale-105 shadow-lg z-10' : 'opacity-80 hover:opacity-100'
                       } ${
                         isCorrect ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                         isAttempted ? 'bg-red-500/20 text-red-300 border-red-500/50' :
                         'bg-white/5 text-slate-400 border-white/10'
                       }`}
                     >
                       {i + 1}
                     </button>
                   );
                 })}
               </div>
             </div>

             {/* Top Navigation Control Bar */}
             <div className="flex items-center justify-between bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 mb-6">
               <button
                 onClick={() => setSolutionViewIndex(prev => Math.max(0, prev - 1))}
                 disabled={solutionViewIndex <= 0}
                 className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 transition-all flex items-center gap-1.5"
               >
                 <ChevronLeft className="w-4 h-4" /> Previous Question
               </button>

               <span className="text-xs font-bold text-slate-300">
                 Question {solutionViewIndex + 1} / {selectedMock.questions.length}
               </span>

               <button
                 onClick={() => setSolutionViewIndex(prev => Math.min(selectedMock.questions.length - 1, prev + 1))}
                 disabled={solutionViewIndex >= selectedMock.questions.length - 1}
                 className="px-4 py-2 rounded-xl text-xs font-bold bg-green-500 text-slate-950 hover:bg-green-400 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-md"
               >
                 Next Question <ChevronRight className="w-4 h-4" />
               </button>
             </div>

             {/* Single Question Display Card */}
             {(() => {
               const i = solutionViewIndex;
               const q = selectedMock.questions[i];
               if (!q) return null;

               const isAttempted = selectedAnswers[i] !== undefined;
               const isCorrect = isAttempted && selectedAnswers[i] === q.correctAnswer;

               return (
                 <div className={`p-6 sm:p-8 rounded-[32px] border shadow-[0_8px_32px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] ${isCorrect ? 'bg-green-500/10 border-green-500/30' : isAttempted ? 'bg-red-500/10 border-red-500/30' : 'bg-white/[0.03] backdrop-blur-[40px] border-white/[0.08]'}`}>
                   <div className="flex gap-4 mb-6 items-start">
                     <span className={`font-black text-lg pt-1 drop-shadow-sm ${isCorrect ? 'text-green-400' : isAttempted ? 'text-red-400' : 'text-slate-400'}`}>Q{i + 1}.</span>
                     <div className="text-white bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10 w-full overflow-x-auto shadow-inner">
                       <MixedLatex content={q.question} className="text-white" />
                     </div>
                   </div>
                   
                   <div className="ml-0 sm:ml-12 text-sm font-medium grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
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
                   
                   <div className="ml-0 sm:ml-12 bg-white/5 backdrop-blur-sm p-5 border border-green-500/30 rounded-xl shadow-inner mb-6">
                     <h4 className="text-[10px] font-bold uppercase text-green-400 tracking-wider mb-3 flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> Explanation</h4>
                     <div className="text-sm text-slate-200">
                       <MixedLatex content={q.explanation} className="text-white" />
                     </div>
                   </div>

                   {/* Bottom Navigation Control Bar */}
                   <div className="flex items-center justify-between pt-4 border-t border-white/10">
                     <button
                       onClick={() => setSolutionViewIndex(prev => Math.max(0, prev - 1))}
                       disabled={solutionViewIndex <= 0}
                       className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 disabled:opacity-40 transition-all flex items-center gap-1.5"
                     >
                       <ChevronLeft className="w-4 h-4" /> Previous
                     </button>

                     <span className="text-xs font-bold text-slate-400">
                       {solutionViewIndex + 1} / {selectedMock.questions.length}
                     </span>

                     <button
                       onClick={() => setSolutionViewIndex(prev => Math.min(selectedMock.questions.length - 1, prev + 1))}
                       disabled={solutionViewIndex >= selectedMock.questions.length - 1}
                       className="px-4 py-2 rounded-xl text-xs font-bold bg-green-500 text-slate-950 hover:bg-green-400 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-md"
                     >
                       Next <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               );
             })()}
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
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setShowPalette(!showPalette)} 
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-xs font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl"
                title="Toggle Question Palette"
              >
                <Layers className="h-4 w-4 text-green-400" />
                <span>{showPalette ? "Hide Palette" : "Show Palette"}</span>
              </button>
              <button 
                onClick={() => setFocusMode(!focusMode)} 
                className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                title="Toggle Focus Mode"
              >
                {focusMode ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
              <div className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] text-white font-mono font-bold px-4 py-2 rounded-2xl border border-white/[0.08] text-sm shrink-0">
                <Clock className="h-4 w-4 text-green-400" />
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
               <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-inner">Question {currentQuestion + 1}</span>
               <div className="flex gap-2 sm:gap-3 text-[10px] font-bold tracking-widest uppercase">
                 <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-inner drop-shadow-sm">+1 Mark</span>
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
                        ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] transform scale-[1.01]' 
                        : 'border-white/[0.08] bg-white/[0.03] backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:border-white/[0.15] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className={`shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-sm shadow-inner ${
                      isSelected ? 'border-green-500 text-green-400 bg-white/10' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
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
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentQuestion(Math.min(selectedMock.questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === selectedMock.questions.length - 1}
                className="px-6 py-3 rounded-[20px] font-bold bg-green-500/[0.15] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:text-white disabled:opacity-50 flex items-center gap-2 text-xs uppercase tracking-wider transition-colors"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => submitTest()}
                className="px-5 py-3 rounded-[20px] font-bold bg-green-600 hover:bg-green-500 text-white shadow-md transition-all flex items-center gap-1.5 text-xs uppercase tracking-wider"
              >
                <CheckCircle2 className="h-4 w-4" /> Submit
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel: Palette */}
        {showPalette && (
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
                          ? 'border-green-500 ring-2 ring-green-500/30 ' + (isAttempted ? 'bg-green-500/30 text-white' : 'bg-white/20 backdrop-blur-md text-white')
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
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest border border-green-400/50"
              >
                <CheckCircle2 className="h-5 w-5" /> Submit Exam
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
