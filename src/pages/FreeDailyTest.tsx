import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, XCircle, Clock, ChevronRight, ChevronLeft, ArrowLeft, PlayCircle, Lock, User, Phone, MapPin, Key, Sparkles, Star, BookOpen, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MixedLatex } from '../components/LatexRenderer';
import { useSEO } from '../lib/useSEO';

const DAILY_TEST = {
  id: 'daily_slst_math',
  title: 'SLST Math Free Daily Test - ' + new Date().toLocaleDateString(),
  duration: 2700, // 45 minutes
  totalQuestions: 30,
  questions: [
{ question: "The series $\\sum \\frac{n^2}{2^n}$ converges by the Ratio Test since the limit of $\\frac{a_{n+1}}{a_n}$ equals:", options: ["$1$", "$\\frac{1}{2}$", "$2$", "$0$"], correctAnswer: 1, explanation: "Computing the ratio: $\\frac{(n+1)^2}{2^{n+1}} \\cdot \\frac{2^n}{n^2} = \\frac{1}{2}\\left(\\frac{n+1}{n}\\right)^2 \\to \\frac{1}{2} < 1$, confirming convergence." },
{ question: "The series $\\sum \\frac{3^n}{n^3}$ diverges because the Ratio Test gives a limit of:", options: ["$0$", "$1$", "$3$", "$\\frac{1}{3}$"], correctAnswer: 2, explanation: "The ratio $\\frac{a_{n+1}}{a_n} = 3\\left(\\frac{n}{n+1}\\right)^3 \\to 3 > 1$, confirming divergence." },
{ question: "When the Ratio Test gives limit $L=1$, the test is:", options: ["Conclusive: series converges", "Conclusive: series diverges", "Inconclusive; another test is needed", "Only valid for alternating series"], correctAnswer: 2, explanation: "The Ratio Test fails to give information when $L=1$; other tests like comparison or Raabe's test must be used." },
{ question: "The series $\\sum \\frac{1}{n^2+1}$ converges by comparison with:", options: ["$\\sum \\frac{1}{n}$", "$\\sum \\frac{1}{n^2}$", "$\\sum n$", "$\\sum \\frac{1}{\\sqrt{n}}$"], correctAnswer: 1, explanation: "Since $\\frac{1}{n^2+1} < \\frac{1}{n^2}$ and $\\sum 1/n^2$ converges (p-series, $p=2$), by comparison the given series converges." },
{ question: "The series $\\sum \\frac{1}{\\sqrt{n}}$ diverges by comparison since it behaves like the p-series with:", options: ["$p = 1/2 < 1$", "$p = 2 > 1$", "$p = 1$", "$p = 0$"], correctAnswer: 0, explanation: "Here $p=1/2 < 1$, so by the p-series test the series diverges." },
{ question: "The Limit Comparison Test states that if $a_n, b_n > 0$ and $\\lim \\frac{a_n}{b_n} = L$ where $0 < L < \\infty$, then:", options: ["$\\sum a_n$ and $\\sum b_n$ both converge or both diverge", "$\\sum a_n$ always converges", "No relation can be established", "$\\sum b_n$ diverges always"], correctAnswer: 0, explanation: "This is the precise statement of the Limit Comparison Test: both series share the same convergence behavior when $L$ is finite and positive." },
{ question: "Using Limit Comparison, the series $\\sum \\frac{2n+1}{n^3+3}$ behaves like:", options: ["$\\sum \\frac{1}{n^2}$ (convergent)", "$\\sum \\frac{1}{n}$ (divergent)", "$\\sum n$ (divergent)", "$\\sum \\frac{1}{n^3}$"], correctAnswer: 0, explanation: "For large $n$, $\\frac{2n+1}{n^3+3} \\sim \\frac{2n}{n^3} = \\frac{2}{n^2}$, comparable to convergent p-series with $p=2$." },
{ question: "The series $\\sum \\frac{(-1)^n}{\\sqrt{n}}$ is:", options: ["Absolutely convergent", "Conditionally convergent", "Divergent", "Not a valid alternating series"], correctAnswer: 1, explanation: "By Leibnitz test it converges (terms decrease to $0$), but $\\sum 1/\\sqrt{n}$ diverges, so it is conditionally convergent." },
{ question: "The series $\\sum \\frac{(-1)^n}{n^2}$ is:", options: ["Absolutely convergent", "Conditionally convergent", "Divergent", "Oscillating without convergence"], correctAnswer: 0, explanation: "Since $\\sum 1/n^2$ converges (p-series, $p=2>1$), the original series converges absolutely." },
{ question: "For the series $\\sum \\frac{(-1)^n n}{n+1}$, we can conclude:", options: ["Converges absolutely", "Converges conditionally", "Diverges since terms don't tend to $0$", "Converges by root test"], correctAnswer: 2, explanation: "Since $\\frac{n}{n+1} \\to 1 \\neq 0$, the necessary condition for convergence fails; the series diverges." },
{ question: "The Root Test applied to $\\sum \\left(\\frac{1}{\\ln n}\\right)^n$ (for $n \\geq 2$) gives:", options: ["Convergent since limit is $0$", "Divergent since limit is $\\infty$", "Inconclusive", "Convergent since limit is $1$"], correctAnswer: 0, explanation: "$(a_n)^{1/n} = \\frac{1}{\\ln n} \\to 0$ as $n \\to \\infty$, confirming convergence by the Root Test." },
{ question: "Raabe's Test is typically used when:", options: ["The Ratio Test gives $L=1$ (inconclusive)", "The series has negative terms only", "The Comparison Test fails", "The series is alternating"], correctAnswer: 0, explanation: "Raabe's Test serves as a refinement when the basic Ratio Test is inconclusive due to limit equal to $1$." },
{ question: "Raabe's Test states that for $a_n>0$, if $\\lim n\\left(\\frac{a_n}{a_{n+1}}-1\\right) = L$, the series converges if:", options: ["$L>1$", "$L<1$", "$L=1$", "$L=0$"], correctAnswer: 0, explanation: "Raabe's test confirms convergence when $L>1$ and divergence when $L<1$; inconclusive at $L=1$." },
{ question: "The series $\\sum \\frac{1}{n!}$ converges by the Ratio Test with limit:", options: ["$0$", "$1$", "$e$", "$\\infty$"], correctAnswer: 0, explanation: "$\\frac{a_{n+1}}{a_n} = \\frac{1}{n+1} \\to 0 < 1$, confirming rapid convergence (this series sums to $e-1$ from $n=1$)." },
{ question: "If $\\sum a_n$ converges and $c$ is a nonzero constant, then $\\sum c \\cdot a_n$:", options: ["Diverges", "Converges to $c$ times the original sum", "Converges to $0$", "May diverge depending on $c$"], correctAnswer: 1, explanation: "Scalar multiplication of a convergent series preserves convergence, scaling the sum by the constant." },
{ question: "If $\\sum a_n$ diverges and $\\sum b_n$ converges, then $\\sum(a_n+b_n)$:", options: ["Converges", "Diverges", "May converge or diverge", "Always equals $0$"], correctAnswer: 1, explanation: "If the sum converged, then $\\sum a_n = \\sum(a_n+b_n) - \\sum b_n$ would converge (contradiction), so it must diverge." },
{ question: "If both $\\sum a_n$ and $\\sum b_n$ diverge, then $\\sum(a_n+b_n)$:", options: ["Always converges", "Always diverges", "May converge or diverge", "Equals $\\sum a_n \\cdot \\sum b_n$"], correctAnswer: 2, explanation: "Counter-examples exist both ways: e.g., $a_n=1, b_n=-1$ gives convergent sum $0$, but $a_n=b_n=1/n$ gives divergent sum." },
{ question: "The geometric series $\\sum_{n=0}^{\\infty} r^n$ converges if and only if:", options: ["$|r|<1$", "$|r|>1$", "$r=1$", "$r$ is any real number"], correctAnswer: 0, explanation: "The classical geometric series test: convergence occurs precisely when $|r|<1$, summing to $\\frac{1}{1-r}$." },
{ question: "For $\\sum \\frac{n^n}{(n!)^2}$, applying the Ratio Test yields convergence because the limit equals:", options: ["$0$", "$1$", "$e$", "$\\infty$"], correctAnswer: 0, explanation: "Using Stirling-type analysis or direct ratio computation, this ratio tends to $0$, confirming convergence." },
{ question: "The series $\\sum \\left(1 - \\cos\\frac{1}{n}\\right)$ converges by comparison with:", options: ["$\\sum \\frac{1}{n}$", "$\\sum \\frac{1}{n^2}$", "$\\sum \\frac{1}{n^3}$", "$\\sum n$"], correctAnswer: 1, explanation: "Since $1-\\cos x \\approx x^2/2$ for small $x$, the terms behave like $\\frac{1}{2n^2}$, comparable to convergent p-series." },
{ question: "The series $\\sum \\ln\\left(1+\\frac{1}{n}\\right)$ diverges because it behaves like:", options: ["$\\sum \\frac{1}{n}$ (divergent, by comparison since $\\ln(1+x)\\sim x$)", "$\\sum \\frac{1}{n^2}$", "A convergent telescoping series", "It actually converges"], correctAnswer: 0, explanation: "Since $\\ln(1+1/n) \\sim 1/n$ for large $n$, and $\\sum 1/n$ diverges, this series also diverges by limit comparison." },
{ question: "For the alternating series $\\sum (-1)^n \\left(\\sqrt{n+1}-\\sqrt{n}\\right)$, Leibnitz's test confirms convergence since:", options: ["The terms $\\sqrt{n+1}-\\sqrt{n}$ decrease monotonically to $0$", "The terms increase to infinity", "The series is a p-series", "It fails the necessary condition"], correctAnswer: 0, explanation: "Since $\\sqrt{n+1}-\\sqrt{n} = \\frac{1}{\\sqrt{n+1}+\\sqrt{n}} \\to 0$ and is decreasing, Leibnitz's test applies." },
{ question: "If a series $\\sum a_n$ has all positive terms and converges, then it must converge:", options: ["Conditionally", "Absolutely", "Neither, since positive-term series can't converge", "Only if it's a p-series"], correctAnswer: 1, explanation: "For series with all nonnegative (or all positive) terms, convergence is automatically absolute convergence since $|a_n|=a_n$." },
{ question: "The series $\\sum \\frac{\\cos(n\\pi)}{n^2}$ is:", options: ["Divergent", "Absolutely convergent", "Conditionally convergent only", "Not well-defined"], correctAnswer: 1, explanation: "Since $|\\cos(n\\pi)|=1$, this reduces to $\\sum \\frac{(-1)^n}{n^2}$ in absolute value comparison to $\\sum 1/n^2$, which converges, so absolute convergence holds." },
{ question: "The p-series test is essentially a special case derived from which more general test?", options: ["The Integral Test", "The Ratio Test", "Abel's Test", "Dirichlet's Test"], correctAnswer: 0, explanation: "The p-series convergence criterion follows directly by applying the Integral Test to $f(x)=1/x^p$." },
{ question: "The Integral Test states that for a positive, decreasing, continuous function $f$ with $f(n)=a_n$, $\\sum a_n$ converges if and only if:", options: ["$\\int_1^{\\infty} f(x)\\,dx$ converges", "$f(x) \\to \\infty$", "$f$ is bounded", "$f$ is increasing"], correctAnswer: 0, explanation: "This is the precise statement of the Integral Test, connecting series convergence to improper integral convergence." },
{ question: "Using the Integral Test on $\\sum \\frac{1}{n \\ln n}$ (for $n\\geq 2$), we find the series:", options: ["Converges since the integral converges", "Diverges since $\\int_2^\\infty \\frac{dx}{x\\ln x} = \\infty$", "Cannot be tested this way", "Converges absolutely"], correctAnswer: 1, explanation: "The substitution $u=\\ln x$ gives $\\int \\frac{du}{u} = \\ln(\\ln x)$, which diverges as $x\\to\\infty$, so the series diverges." },
{ question: "If $\\sum a_n^2$ and $\\sum b_n^2$ both converge, then by Cauchy-Schwarz, $\\sum a_n b_n$:", options: ["Diverges", "Converges absolutely", "Converges conditionally only", "Cannot be determined"], correctAnswer: 1, explanation: "By the Cauchy-Schwarz inequality, $\\sum |a_n b_n| \\leq \\sqrt{\\sum a_n^2}\\sqrt{\\sum b_n^2} < \\infty$, so the series converges absolutely." },
{ question: "The series $\\sum \\frac{(-1)^n}{n \\ln n}$ (for $n \\geq 2$) is:", options: ["Absolutely convergent", "Conditionally convergent", "Divergent", "Not defined"], correctAnswer: 1, explanation: "By Leibnitz test it converges since $1/(n\\ln n)$ decreases to $0$, but $\\sum 1/(n\\ln n)$ diverges (shown via integral test), giving conditional convergence." },
{ question: "For $\\sum a_n$ with $a_n = \\frac{(-1)^n}{n^p}$, the series converges absolutely when:", options: ["$p>1$", "$0<p\\leq 1$", "$p\\leq 0$", "Never absolutely convergent"], correctAnswer: 0, explanation: "Absolute convergence requires $\\sum 1/n^p$ to converge, which happens precisely when $p>1$." },

  ]
};

type ViewState = 'registration' | 'details' | 'test' | 'results';

export default function FreeDailyTest() {
  const [viewState, setViewState] = useState<ViewState>('registration');
  const [selectedPool, setSelectedPool] = useState<string>('slst_mock');
  const loginFormRef = useRef<HTMLDivElement>(null);

  const testPools = [
    {
      id: 'slst_mock',
      title: 'SLST Real Analysis Mock',
      subtitle: 'Topology, Sequences, Series, Riemann Integral & SLST PYQs.',
      theme: 'emerald',
      badge: 'SLST IX-XII • 30 MCQs',
      icon: 'Σ',
      duration: '45 Mins',
      tag: '100% Free',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      activeBorder: 'ring-2 ring-emerald-400 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.35)]',
      bgGradient: 'from-emerald-500/15 via-teal-500/5 to-transparent',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
      iconColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      textColor: 'text-emerald-400',
      btnGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950'
    },
    {
      id: 'jee_mock',
      title: 'JEE Mains & WBJEE Calculus',
      subtitle: 'Limits, Continuity, Differentiation, Vectors & 3D Geometry speed tests.',
      theme: 'pink',
      badge: 'JEE & WBJEE • CALCULUS',
      icon: '∫',
      duration: '45 Mins',
      tag: 'Percentile Rank',
      borderColor: 'border-pink-500/40 hover:border-pink-400',
      activeBorder: 'ring-2 ring-pink-400 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.35)]',
      bgGradient: 'from-pink-500/15 via-purple-500/5 to-transparent',
      badgeColor: 'bg-pink-500/15 text-pink-300 border-pink-500/40',
      iconColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      textColor: 'text-pink-400',
      btnGradient: 'from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white'
    },
    {
      id: 'net_mock',
      title: 'CSIR NET JRF Advanced',
      subtitle: 'Linear Algebra, Complex Variables, Metric Spaces & PDEs for NET.',
      theme: 'indigo',
      badge: 'NET JRF & GATE • ADVANCED',
      icon: '⌬',
      duration: '60 Mins',
      tag: 'Standard CBT',
      borderColor: 'border-indigo-500/40 hover:border-indigo-400',
      activeBorder: 'ring-2 ring-indigo-400 border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.35)]',
      bgGradient: 'from-indigo-500/15 via-cyan-500/5 to-transparent',
      badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40',
      iconColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      textColor: 'text-indigo-400',
      btnGradient: 'from-indigo-500 to-cyan-600 hover:from-indigo-400 hover:to-cyan-500 text-white'
    },
    {
      id: 'tet_mock',
      title: 'Upper Primary TET Math',
      subtitle: 'Number System, Arithmetic, Pedagogy & Geometry targeted sets.',
      theme: 'amber',
      badge: 'TET SPECIAL BATCH',
      icon: 'π',
      duration: '30 Mins',
      tag: 'Instant Keys',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      activeBorder: 'ring-2 ring-amber-400 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)]',
      bgGradient: 'from-amber-500/15 via-yellow-500/5 to-transparent',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
      iconColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      textColor: 'text-amber-400',
      btnGradient: 'from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950'
    },
    {
      id: 'bsc_mock',
      title: 'BSc Math Honours Drill',
      subtitle: 'Group Theory, Ring Theory, Multivariate Calculus & ODE modules.',
      theme: 'sky',
      badge: 'BSc HONOURS SEMESTER',
      icon: 'lim',
      duration: '60 Mins',
      tag: 'PDF Solutions',
      borderColor: 'border-sky-500/40 hover:border-sky-400',
      activeBorder: 'ring-2 ring-sky-400 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.35)]',
      bgGradient: 'from-sky-500/15 via-blue-500/5 to-transparent',
      badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
      iconColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      textColor: 'text-sky-400',
      btnGradient: 'from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white'
    },
    {
      id: 'live_mock',
      title: "Today's Live Featured Mock",
      subtitle: '30 Mixed Real Analysis equations with timed NTA CBT interface.',
      theme: 'red',
      badge: 'LIVE NOW • CODE test@547',
      icon: '√',
      duration: '45 Mins',
      tag: 'Featured',
      borderColor: 'border-red-500/50 hover:border-red-400',
      activeBorder: 'ring-2 ring-red-400 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.4)]',
      bgGradient: 'from-red-500/20 via-rose-500/5 to-transparent',
      badgeColor: 'bg-red-600/20 text-red-300 border-red-500/50 animate-pulse',
      iconColor: 'bg-red-500/20 text-red-400 border-red-500/40',
      textColor: 'text-red-400',
      btnGradient: 'from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white'
    }
  ];

  const handleSelectPoolCard = (poolId: string) => {
    setSelectedPool(poolId);
    setFormData(prev => ({ ...prev, code: 'test@547' }));
    if (loginFormRef.current) {
      loginFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useSEO(
    "Free Daily Math Mock Test | SLST, JEE & WBJEE",
    "Participate in our free daily mathematics mock tests for SLST and JEE Mains. Solve 30 challenging equations, view instant score reports, and access detailed explanation guides."
  );
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('dailyTestRegistration');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { name: parsed.name || '', mobile: parsed.mobile || '', district: parsed.district || '', code: '' };
      } catch (e) {
        return { name: '', mobile: '', district: '', code: '' };
      }
    }
    return { name: '', mobile: '', district: '', code: '' };
  });
  const [error, setError] = useState('');
  
  // Test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(DAILY_TEST.duration);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (viewState === 'test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewState, timeLeft]);

  useEffect(() => {
    if (viewState === 'test' && timeLeft <= 0) {
      handleFinishTest();
    }
  }, [timeLeft, viewState]);

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.mobile || !formData.district || !formData.code) {
      setError('Please fill all fields');
      return;
    }
    
    if (formData.code !== 'test@547') {
      setError('Invalid test code. Please check your spelling.');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('dailyTestRegistration', JSON.stringify({
      name: formData.name,
      mobile: formData.mobile,
      district: formData.district
    }));
    
    // We will save to Google Sheets only when the test is finished to avoid two rows per student
    
    setViewState('details');
  };

  const handleStartTest = () => {
    setViewState('test');
    setTimeLeft(DAILY_TEST.duration);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitting(false);
    hasSubmittedRef.current = false;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < DAILY_TEST.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishTest = () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setIsSubmitting(true);
    
    let newScore = 0;
    DAILY_TEST.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    
    // Save score to Google Sheets
    const GOOGLE_SHEET_URL = (import.meta as any).env?.VITE_GOOGLE_SHEET_URL || "https://script.google.com/macros/s/AKfycbx2MAFZ0nlbrNjYcaG-hhaV8k6pdkPFVC_VFhJKy7efKu9G7OvWY2f2nWPJC3GnFiyooQ/exec";
    if (GOOGLE_SHEET_URL) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('mobile', formData.mobile);
      data.append('district', formData.district);
      data.append('score', newScore.toString());
      data.append('totalQuestions', DAILY_TEST.totalQuestions.toString());
      data.append('timestamp', new Date().toLocaleString());
      data.append('status', 'Completed Test');
      
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      }).catch(err => console.error('Failed to sync score with Google Sheets', err));
    }

    setViewState('results');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex-1 flex flex-col py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#090706] text-slate-100 min-h-screen">
      {/* Warm Ambient Background Glows & Abstract Waves like in the design */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-amber-600/20 via-orange-600/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-orange-700/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-red-950/20 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Decorative Wavy Lines SVG Background Overlay */}
      <svg className="absolute inset-0 w-full h-full stroke-amber-500/10 fill-none pointer-events-none stroke-[1.2]" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100,200 C300,50 800,400 1400,100 C1800,-100 2200,300 2600,200" />
        <path d="M-200,500 C400,300 900,600 1500,400 C1900,250 2300,550 2700,450" />
        <path d="M-100,800 C500,650 1000,900 1600,700 C2000,550 2400,800 2800,750" />
      </svg>

      {/* Floating Starburst Accent Elements */}
      <div className="absolute top-1/4 left-10 hidden lg:flex text-amber-400/30 animate-pulse pointer-events-none">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="absolute bottom-1/3 right-12 hidden lg:flex text-orange-400/30 animate-pulse pointer-events-none">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {viewState !== 'test' && (
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 font-bold uppercase text-xs tracking-widest mb-6 transition-all bg-amber-950/40 px-4 py-2.5 rounded-full border border-amber-500/20 shadow-xl hover:border-amber-500/50 hover:bg-amber-900/40 backdrop-blur-md">
            <ArrowLeft className="h-4 w-4 text-amber-400" /> Back to Portal
          </Link>
        )}

        <AnimatePresence mode="wait">
          {viewState === 'registration' && (
            <motion.div
              key="registration"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto w-full py-4 sm:py-6"
            >
              {/* Glassmorphic Card Container matching the user UI image */}
              <div className="bg-[#1c1412]/80 border border-amber-500/20 rounded-[40px] p-6 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-2xl">
                
                {/* Top Glowing Ambient Highlight */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-amber-500/30 via-orange-500/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                {/* Top Decorative Artwork Badge (Organic Shape Illustration Container) */}
                <div className="relative mb-6">
                  <div className="w-full h-44 sm:h-48 rounded-[30px] bg-gradient-to-br from-amber-950/60 via-orange-950/40 to-stone-900/90 border border-amber-500/30 flex items-center justify-center relative overflow-hidden shadow-inner group">
                    {/* Background Graphic Lines inside badge */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0,transparent_70%)] pointer-events-none"></div>
                    
                    {/* Floating Math & Exam Illustration Elements */}
                    <div className="relative z-10 flex flex-col items-center text-center p-4">
                      <div className="relative mb-2">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl shadow-amber-950/60 transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          Σ
                        </div>
                        <div className="absolute -top-2 -right-3 w-8 h-8 rounded-xl bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-lg transform -rotate-6">
                          ∫
                        </div>
                        <div className="absolute -bottom-1 -left-3 w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                          ✓
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase tracking-widest mt-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> SLST & WBJEE CBT MOCK
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Card Title */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-1">
                    Candidate Login
                  </h1>
                  <p className="text-slate-400 text-xs font-medium">
                    Enter details & passcode <span className="text-amber-400 font-mono font-bold">test@547</span> to launch
                  </p>
                </div>

                {/* Registration Form with Top Labels and Capsule Inputs */}
                <form onSubmit={handleRegistrationSubmit} className="space-y-4 relative z-10">
                  
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="text-slate-300 text-xs font-medium ml-2 mb-1.5 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-full py-3.5 px-5 text-slate-100 placeholder-slate-500 outline-none transition-all font-medium text-sm shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Field 2: Mobile Number */}
                  <div>
                    <label className="text-slate-300 text-xs font-medium ml-2 mb-1.5 block">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Your 10-digit mobile"
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-full py-3.5 px-5 text-slate-100 placeholder-slate-500 outline-none transition-all font-medium text-sm shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Field 3: District Name */}
                  <div>
                    <label className="text-slate-300 text-xs font-medium ml-2 mb-1.5 block">
                      District Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your district name"
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-full py-3.5 px-5 text-slate-100 placeholder-slate-500 outline-none transition-all font-medium text-sm shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Field 4: Test Passcode */}
                  <div>
                    <div className="flex items-center justify-between ml-2 mb-1.5">
                      <label className="text-slate-300 text-xs font-medium">
                        Secret Test Code
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, code: 'test@547'})}
                        className="text-amber-400 hover:text-amber-300 text-[11px] font-bold underline transition-colors"
                      >
                        Auto-fill test@547
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. test@547"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                        className="w-full bg-white/5 border border-amber-500/40 focus:border-amber-400 focus:bg-white/10 rounded-full py-3.5 px-5 text-slate-100 placeholder-slate-500 outline-none transition-all font-mono font-bold tracking-wide text-sm shadow-inner"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-300 text-xs text-center bg-rose-950/70 py-2.5 px-4 rounded-full border border-rose-800/60 font-bold"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Start Button matching the fiery glowing pill style in screenshot */}
                  <button
                    type="submit"
                    className="w-full mt-6 py-4 px-6 rounded-full font-bold text-base uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 shadow-[0_10px_35px_rgba(245,158,11,0.45)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Start <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    <span>Live standard CBT examination portal</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-[32px] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"></div>

              <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-slate-800/90">
                <Target className="h-9 w-9 text-emerald-400 stroke-[2.25]" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight font-display">
                {DAILY_TEST.title}
              </h2>
              
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 mb-8 shadow-sm">
                Candidate: {formData.name} ({formData.district})
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <Target className="h-5 w-5 text-cyan-400 mb-1" />
                  <span className="text-2xl font-black text-cyan-300">{DAILY_TEST.totalQuestions}</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Questions</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <Clock className="h-5 w-5 text-purple-400 mb-1" />
                  <span className="text-2xl font-black text-purple-300">{DAILY_TEST.duration / 60}m</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Duration</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mb-1" />
                  <span className="text-2xl font-black text-emerald-300">+1 / 0</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Marking Scheme</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <Lock className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="text-2xl font-black text-amber-300">CBT</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Format</span>
                </div>
              </div>

              {/* Rules List */}
              <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-6 mb-8 text-left max-w-2xl mx-auto">
                <h3 className="text-white font-black mb-4 uppercase tracking-wider text-xs border-b border-slate-800 pb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Exam Instructions & Guidelines
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    <span>Each question carries 1 mark. There is no negative marking for incorrect choices.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    <span>The timer starts automatically upon launch. Test auto-submits when time expires.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    <span>You can navigate back and forth between questions using the Question Palette.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleStartTest}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-black py-4 px-10 rounded-xl text-base sm:text-lg uppercase tracking-widest transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 hover:-translate-y-0.5 inline-flex items-center gap-3"
              >
                <PlayCircle className="h-6 w-6 stroke-[2.25]" /> Launch Test Portal
              </button>
            </motion.div>
          )}

          {viewState === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-5"
            >
              {/* Sticky Exam Top Bar */}
              <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-30">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-emerald-950 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-800/80 mr-2">
                      Question {currentQuestionIndex + 1} / {DAILY_TEST.totalQuestions}
                    </span>
                    <span className="text-xs text-slate-400 font-bold hidden sm:inline">
                      ({Object.keys(answers).length} Answered)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full sm:w-48 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 hidden md:block">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / DAILY_TEST.totalQuestions) * 100}%` }}
                  ></div>
                </div>

                <div className={`flex items-center gap-2.5 px-5 py-2 rounded-xl border font-mono text-lg font-black transition-all ${
                  timeLeft < 300 
                    ? 'bg-rose-950/90 border-rose-600 text-rose-200 animate-pulse shadow-md' 
                    : timeLeft < 600
                      ? 'bg-amber-950/80 border-amber-600/80 text-amber-300'
                      : 'bg-slate-950 border-emerald-800/60 text-emerald-400'
                }`}>
                  <Clock className="h-5 w-5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Question Navigation Drawer Palette */}
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3 flex flex-wrap gap-1.5 justify-center max-h-28 overflow-y-auto custom-scrollbar">
                {DAILY_TEST.questions.map((_, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = answers[idx] !== undefined;

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-black transition-all border ${
                        isCurrent
                          ? 'bg-emerald-400 text-slate-950 border-emerald-300 ring-2 ring-emerald-400/40 shadow-md scale-110'
                          : isAnswered
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Main Question Card */}
              <div className="bg-slate-900/95 border border-slate-800/90 rounded-[28px] p-6 sm:p-10 shadow-2xl relative">
                
                {/* Question Text */}
                <div className="mb-8">
                  <div className="text-lg sm:text-2xl text-white font-medium leading-relaxed bg-slate-950/90 p-5 rounded-2xl border border-slate-800">
                    <span className="font-black text-emerald-400 mr-2">Q{currentQuestionIndex + 1}.</span>
                    <MixedLatex content={DAILY_TEST.questions[currentQuestionIndex].question} />
                  </div>
                </div>

                {/* Option Cards */}
                <div className="space-y-3.5 mb-10">
                  {DAILY_TEST.questions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = answers[currentQuestionIndex] === idx;
                    const optionLabels = ["A", "B", "C", "D"];

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/30 shadow-md' 
                            : 'bg-slate-950/70 border-slate-800/80 text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 text-xs font-black transition-colors ${
                          isSelected ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-400'
                        }`}>
                          {optionLabels[idx]}
                        </div>
                        <div className="text-base sm:text-lg pt-0.5 font-medium"><MixedLatex content={option} /></div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Footer Action Bar */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  
                  {currentQuestionIndex === DAILY_TEST.questions.length - 1 ? (
                    <button
                      onClick={handleFinishTest}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-amber-950/40 hover:scale-105"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Test Now'}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800/80"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-[32px] p-6 sm:p-12 shadow-2xl max-w-4xl mx-auto w-full relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"></div>

              <div className="w-20 h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-slate-800/90">
                <Target className="h-10 w-10 text-emerald-400 stroke-[2.25]" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight font-display">
                Test Completed!
              </h2>
              <p className="text-slate-300 font-medium mb-8">
                Great job, <span className="text-emerald-300 font-black">{formData.name}</span>! Here is your performance evaluation.
              </p>
              
              {/* Score Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col items-center shadow-md">
                  <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-2">Total Score</p>
                  <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    {score} <span className="text-xl text-slate-400 font-normal">/ {DAILY_TEST.totalQuestions}</span>
                  </p>
                </div>

                <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col items-center shadow-md">
                  <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-2">Accuracy Rate</p>
                  <p className="text-4xl sm:text-5xl font-black text-cyan-300">
                    {Math.round((score / DAILY_TEST.totalQuestions) * 100)}%
                  </p>
                </div>

                <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col items-center shadow-md">
                  <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-2">Time Consumed</p>
                  <p className="text-4xl sm:text-5xl font-black text-purple-300">
                    {formatTime(DAILY_TEST.duration - timeLeft)}
                  </p>
                </div>
              </div>

              {/* Detailed Solutions Section */}
              <div className="space-y-6 text-left border-t border-slate-800 pt-10">
                <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Detailed Question Solutions
                </h3>

                {DAILY_TEST.questions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isUnanswered = userAnswer === undefined;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`p-6 rounded-2xl border transition-all ${
                        isCorrect 
                          ? 'bg-emerald-950/20 border-emerald-800/60' 
                          : isUnanswered 
                            ? 'bg-slate-950/60 border-slate-800' 
                            : 'bg-rose-950/20 border-rose-800/60'
                      }`}
                    >
                      <div className="flex gap-4 items-start">
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                        ) : isUnanswered ? (
                          <div className="h-6 w-6 rounded-full border-2 border-amber-400/80 text-amber-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-1">?</div>
                        ) : (
                          <XCircle className="h-6 w-6 text-rose-400 shrink-0 mt-1" />
                        )}

                        <div className="w-full">
                          <div className="text-white font-medium text-base sm:text-lg mb-4 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
                            <span className="font-bold text-emerald-400 mr-2">Q{idx + 1}.</span>
                            <MixedLatex content={q.question} />
                          </div>

                          <div className="space-y-2 mb-4">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className={`p-3.5 rounded-xl border text-sm font-medium ${
                                optIdx === q.correctAnswer 
                                  ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200 font-bold'
                                  : optIdx === userAnswer
                                    ? 'bg-rose-950/80 border-rose-500/80 text-rose-200'
                                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                              }`}>
                                <MixedLatex content={opt} />
                              </div>
                            ))}
                          </div>

                          <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800">
                            <p className="text-[11px] text-emerald-400 font-black uppercase tracking-widest mb-1.5">Explanation & Method</p>
                            <div className="text-sm text-slate-300 leading-relaxed font-medium"><MixedLatex content={q.explanation} /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-800 flex justify-center">
                <Link
                  to="/"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black py-4 px-10 rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg hover:scale-105"
                >
                  Return to Portal Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
