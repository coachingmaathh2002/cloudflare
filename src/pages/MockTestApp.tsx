import React, { useState, useEffect } from 'react';
import { MixedLatex } from '../components/LatexRenderer';
import { CheckCircle2, XCircle, Clock, ChevronRight, ChevronLeft, Flag, Award, AlertCircle, BookOpen, Target, ArrowLeft } from 'lucide-react';
import { SLST_TOPICS, generateMocksForTopic, generateQuestionSet } from '../data/mockTestData';

type ViewState = 'topics' | 'mocks' | 'test' | 'results';

export default function MockTestApp() {
  const [view, setView] = useState<ViewState>('topics');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedMock, setSelectedMock] = useState<any | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);

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

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setView('mocks');
  };

  const handleMockSelect = (mock: any) => {
    setSelectedMock(mock);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(mock.duration);
    setView('test');
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

  if (view === 'topics') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="mb-8 block text-center">
          <span className="bg-pink-600/10 text-pink-400 px-3 py-1 rounded-full text-xs font-bold border border-pink-600/20 uppercase tracking-widest">
            SLST Mathematics
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-50 mt-4 uppercase tracking-tight">Select Subject Topic</h1>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">Access our highly curated mock test series. 20 Full-length mock tests for each topic with detailed solutions.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SLST_TOPICS.map((topic, idx) => (
            <button 
              key={idx} 
              onClick={() => handleTopicSelect(topic)}
              className="bg-slate-800/60 backdrop-blur-md border border-white/10 hover:border-pink-600/50 hover:bg-white/10 transition-all rounded-2xl p-6 text-left group shadow-xl flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-pink-600/10 text-pink-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-50 mb-2 line-clamp-2 leading-tight">{topic}</h3>
              <div className="mt-auto pt-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>20 Mocks</span>
                <ChevronRight className="h-4 w-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'mocks') {
    const mocks = generateMocksForTopic(selectedTopic || 'Unknown', 20);
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 w-full flex flex-col flex-1">
        <button onClick={() => setView('topics')} className="flex items-center gap-2 text-pink-400 hover:text-pink-400 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Topics
        </button>
        <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
           <h1 className="text-3xl font-display font-bold text-slate-50 mb-2">{selectedTopic} - Test Series</h1>
           <p className="text-slate-400">Complete all 20 mocks to master this topic. Each test contains 30 MCQs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mocks.map((mock, idx) => (
            <div key={idx} className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-pink-600/30 text-pink-400 w-10 h-10 rounded-lg flex items-center justify-center font-bold font-serif italic border border-pink-600/20">
                  #{idx + 1}
                </div>
                <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-green-500/20">Live</span>
              </div>
              <h3 className="font-bold text-slate-50 mb-1">Mock Test {idx + 1}</h3>
              <p className="text-xs text-slate-400 mb-6">{mock.totalQuestions} Questions • {mock.duration / 60} Mins</p>
              
              <button 
                onClick={() => handleMockSelect(mock)}
                className="mt-auto w-full bg-slate-800/60 hover:bg-pink-600 border border-white/10 hover:border-pink-600 text-pink-400 hover:text-slate-50 font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
              >
                 <Target className="h-4 w-4" /> Start Attempt
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'results') {
    const score = calculateScore();
    const maxScore = selectedMock.questions.length * 4;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <button onClick={() => setView('mocks')} className="flex items-center gap-2 text-pink-400 hover:text-pink-400 font-bold uppercase text-xs tracking-widest mb-6 w-fit h-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
        <div className="bg-slate-800/60 backdrop-blur-xl shadow-2xl rounded-2xl shadow-xl overflow-hidden border border-white/10">
           <div className="bg-slate-800/60 backdrop-blur-md shadow-xl border-b border-white/10 p-8 text-center text-slate-50 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
             <Award className="h-16 w-16 mx-auto mb-4 text-green-400 relative z-10" />
             <h1 className="text-3xl font-extrabold mb-1 relative z-10">Test Completed!</h1>
             <p className="text-green-400 text-sm uppercase tracking-widest font-bold relative z-10">{selectedMock.title}</p>
           </div>
           
           <div className="p-8">
             <div className="flex justify-center mb-10">
               <div className="text-center bg-slate-800/60 backdrop-blur-md shadow-xl border border-white/10 p-6 rounded-2xl shadow-inner min-w-[200px]">
                 <div className="text-5xl font-black text-pink-400 mb-1">{score} <span className="text-xl text-slate-500">/ {maxScore}</span></div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Score</div>
               </div>
             </div>

             <h3 className="text-sm font-bold text-slate-400 mb-6 border-b border-white/10 pb-3 uppercase tracking-widest">Detailed Review</h3>
             
             <div className="space-y-6">
               {selectedMock.questions.map((q: any, i: number) => {
                 const isAttempted = selectedAnswers[i] !== undefined;
                 const isCorrect = isAttempted && selectedAnswers[i] === q.correctAnswer;
                 
                 return (
                   <div key={i} className={`p-6 rounded-xl border ${isCorrect ? 'bg-green-900/10 border-green-500/30' : isAttempted ? 'bg-red-900/10 border-red-500/30' : 'bg-slate-800/60 backdrop-blur-md shadow-xl border-white/10'}`}>
                     <div className="flex gap-4 mb-4 items-start">
                       <span className="font-bold text-slate-400 pt-1">Q{i + 1}.</span>
                       <div className="text-slate-50 bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10 w-full overflow-x-auto">
                         <MixedLatex content={q.question} className="text-slate-50" />
                       </div>
                     </div>
                     
                     <div className="ml-8 text-sm font-medium grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                       <div className="flex flex-col gap-1 text-slate-400">
                         <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Your Answer:</span> 
                         {isAttempted ? (
                           <div className={`p-3 rounded-lg border ${isCorrect ? 'border-green-500/30 bg-green-500/5 text-green-400' : 'border-red-500/30 bg-red-500/5 text-red-400'} flex items-center justify-between`}>
                             <MixedLatex content={q.options[selectedAnswers[i]]} />
                             {isCorrect ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
                           </div>
                         ) : (
                           <div className="p-3 text-slate-500 bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-lg italic">Not attempted</div>
                         )}
                       </div>
                       
                       {!isCorrect && (
                         <div className="flex flex-col gap-1">
                           <span className="text-[10px] uppercase font-bold tracking-widest text-green-500/80">Correct Answer:</span>
                           <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/5 text-green-400 flex items-center justify-between">
                             <MixedLatex content={q.options[q.correctAnswer]} />
                             <CheckCircle2 className="h-4 w-4 shrink-0" />
                           </div>
                         </div>
                       )}
                     </div>
                     
                     <div className="ml-8 bg-pink-600 p-4 border border-pink-600/20 rounded-lg shadow-inner">
                       <h4 className="text-[10px] font-bold uppercase text-pink-400 tracking-wider mb-2">Explanation</h4>
                       <MixedLatex content={q.explanation} className="text-sm text-slate-300" />
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
    <div className="w-full py-6 px-4 sm:px-6 flex-1 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-5 flex-1 min-h-0">
        
        {/* Main Test Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header */}
          <div className="bg-slate-800/60 backdrop-blur-xl shadow-2xl p-4 rounded-xl border border-white/10 flex justify-between items-center z-10 relative">
            <h2 className="font-bold text-slate-50 text-sm whitespace-nowrap overflow-hidden text-ellipsis mr-4">{selectedMock.title}</h2>
            <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-md shadow-xl text-slate-50 font-mono font-bold px-3 py-1.5 rounded-lg border border-white/10 text-sm shrink-0">
              <Clock className="h-4 w-4 text-pink-400" />
              <span className={timeLeft < 300 ? 'text-red-400' : ''}>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Area */}
          <div className="bg-slate-800/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8 rounded-xl border border-white/10 flex-1 flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
               <span className="text-xs font-bold text-pink-400 bg-pink-600/10 border border-pink-600/20 px-3 py-1 rounded-md uppercase tracking-widest">Question {currentQuestion + 1}</span>
               <div className="flex gap-2 sm:gap-3 text-[10px] font-bold tracking-widest uppercase">
                 <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded flex items-center gap-1">+4 Marks</span>
                 <span className="text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-1">-1 Mark</span>
               </div>
            </div>
            
            <div className="text-base sm:text-lg mb-8 p-5 bg-slate-800/60 backdrop-blur-md shadow-inner rounded-xl border border-white/10 text-slate-50 min-h-[100px] overflow-x-auto">
              <MixedLatex content={q.question} className="text-slate-50" />
            </div>

            <div className="space-y-3 mt-auto">
              {q.options.map((opt: string, i: number) => {
                const isSelected = selectedAnswers[currentQuestion] === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: i }));
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                      isSelected 
                        ? 'border-pink-600 bg-pink-600/10 shadow-[0_0_15px_rgba(219,39,119,0.15)] glow' 
                        : 'border-white/10 bg-slate-800/60 backdrop-blur-md shadow-sm hover:border-pink-600/50 hover:bg-white/10'
                    }`}
                  >
                    <div className={`shrink-0 w-7 h-7 rounded border flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'border-pink-600 text-pink-400 bg-pink-600/20' : 'bg-slate-800/60 backdrop-blur-sm border-white/10 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    {/* Crucial fix for LaTeX rendering inside options button */}
                    <div className="flex-1 overflow-x-auto text-slate-50 pointer-events-none">
                       <MixedLatex content={opt} className="text-slate-50" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-800/60 backdrop-blur-xl shadow-2xl p-4 rounded-xl border border-white/10 flex justify-between items-center z-10 relative">
            <button 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-5 py-2.5 rounded-lg font-bold bg-slate-800/60 backdrop-blur-md text-slate-300 border border-white/10 hover:bg-white/10 disabled:opacity-50 flex items-center gap-2 text-xs uppercase tracking-wider transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button 
              onClick={() => setCurrentQuestion(Math.min(selectedMock.questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === selectedMock.questions.length - 1}
              className="px-5 py-2.5 rounded-lg font-bold bg-pink-600/20 text-pink-400 border border-pink-600/30 hover:bg-pink-600/30 hover:text-slate-50 disabled:opacity-50 flex items-center gap-2 text-xs uppercase tracking-wider transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Side Panel: Palette */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="bg-slate-800/60 backdrop-blur-xl shadow-2xl p-5 rounded-xl border border-white/10 lg:sticky top-20">
            <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
              <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Question Map</h3>
            </div>
            
            <div className="grid grid-cols-5 gap-2.5 mb-6">
              {selectedMock.questions.map((_: any, i: number) => {
                const isAttempted = selectedAnswers[i] !== undefined;
                const isCurrent = currentQuestion === i;
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestion(i)}
                    className={`h-9 w-9 flex items-center justify-center rounded-lg font-bold text-xs transition-all border ${
                      isCurrent 
                        ? 'border-pink-600 ring-2 ring-pink-600/30 ' + (isAttempted ? 'bg-green-500/20 text-green-400' : 'bg-white/10 backdrop-blur-md text-slate-50')
                        : isAttempted 
                          ? 'border-green-500/30 bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                          : 'border-white/10 bg-slate-800/60 text-slate-500 hover:bg-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 text-[10px] font-bold uppercase tracking-wider mb-6 bg-slate-800/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-3 h-3 bg-green-500/20 border border-green-500/40 rounded-sm"></div> Answered
              </div>
              <div className="flex items-center gap-3 text-slate-400 mt-2">
                <div className="w-3 h-3 bg-slate-800/60 border border-white/10 rounded-sm"></div> Not Answered
              </div>
            </div>

            <button 
              onClick={submitTest}
              className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-600 hover:to-violet-600 text-slate-50 font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(219,39,119,0.3)] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
            >
              <CheckCircle2 className="h-4 w-4" /> Submit Exam
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
