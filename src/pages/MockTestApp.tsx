import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MixedLatex } from '../components/LatexRenderer';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
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
  FileText,
  Zap,
  Check,
  TrendingUp,
  Bell,
  Settings,
  User,
  Home,
  GraduationCap,
  Layers,
  Star
} from 'lucide-react';
import { EXAM_CATEGORIES, TOPICS_BY_CATEGORY, generateMocksForTopic } from '../data/mockTestData';
import { useSEO } from '../lib/useSEO';
import { cn } from '../lib/utils';

type ViewState = 'categories' | 'topics' | 'mocks' | 'test' | 'results';

// Card Gradient Themes strictly aligned with the attached design prompt
const EXAM_THEMES: Record<string, {
  gradient: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  students: string;
  ratingDots: string;
}> = {
  slst: {
    gradient: 'from-[#ff1b8d] via-[#e013a7] to-[#7c11f7]',
    textColor: 'text-white',
    badgeBg: 'bg-black/70',
    badgeText: 'text-pink-300',
    students: '12,450 students',
    ratingDots: '•••••'
  },
  jee: {
    gradient: 'from-[#00d2ff] via-[#00f2fe] to-[#38ef7d]',
    textColor: 'text-slate-950',
    badgeBg: 'bg-black/80',
    badgeText: 'text-cyan-300',
    students: '8,920 students',
    ratingDots: '•••••'
  },
  jeemains: {
    gradient: 'from-[#00c6ff] to-[#0072ff]',
    textColor: 'text-white',
    badgeBg: 'bg-black/70',
    badgeText: 'text-sky-300',
    students: '14,800 students',
    ratingDots: '•••••'
  },
  wbjee: {
    gradient: 'from-[#ff9966] via-[#ff7e5f] to-[#ff5e62]',
    textColor: 'text-slate-950',
    badgeBg: 'bg-black/80',
    badgeText: 'text-amber-300',
    students: '9,600 students',
    ratingDots: '•••••'
  },
  btech: {
    gradient: 'from-[#8A2387] via-[#E94057] to-[#F27121]',
    textColor: 'text-white',
    badgeBg: 'bg-black/70',
    badgeText: 'text-purple-300',
    students: '6,470 students',
    ratingDots: '•••••'
  },
  upperprimary: {
    gradient: 'from-[#11998e] to-[#38ef7d]',
    textColor: 'text-slate-950',
    badgeBg: 'bg-black/80',
    badgeText: 'text-emerald-300',
    students: '7,120 students',
    ratingDots: '•••••'
  }
};

// Vibrant Colorful Themes for Exam Module & Mock Test Cards Grid
const MODULE_THEMES = [
  // Theme 0: Pink/Magenta (Mock Test 1, 9, 17...)
  {
    id: 'pink',
    name: 'Pink Theme',
    gradient: 'from-[#ff1b8d] via-[#e013a7] to-[#7c11f7]',
    textColor: 'text-white',
    badgeBg: 'bg-black/60 border border-white/20',
    badgeText: 'text-pink-300',
    btnBg: 'bg-white text-slate-950 hover:bg-slate-100',
    // Dynamic Test View Deep Color Styles
    accentName: 'pink',
    cardBg: 'bg-[#140616]/90 border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-pink-950/80 via-purple-950/60 to-slate-950/80 border-pink-500/40',
    questionBoxBg: 'bg-[#1b0820]/90 border-pink-500/30 text-white',
    ambientGlow: 'from-pink-600/20 via-purple-600/10 to-transparent',
    headerBadgeBg: 'bg-pink-500/20',
    headerBadgeText: 'text-pink-400',
    headerBadgeBorder: 'border-pink-500/40',
    timerColor: 'text-pink-400',
    qBadgeBg: 'bg-pink-500/10',
    qBadgeText: 'text-pink-400',
    qBadgeBorder: 'border-pink-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-pink-500/25 via-purple-600/25 to-pink-500/25',
    optionSelectedBorder: 'border-pink-500',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(236,72,153,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-white/30',
    checkColor: 'text-pink-400',
    nextBtnBg: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-md border border-white/20',
    paletteCurrent: 'border-pink-400 ring-2 ring-pink-500/50 bg-pink-500 text-white font-black',
    submitBtnBg: 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 hover:from-pink-400 hover:to-purple-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.35)] border border-pink-300/40'
  },
  // Theme 1: Emerald/Green (Mock Test 2, 10, 18...)
  {
    id: 'green',
    name: 'Green Theme',
    gradient: 'from-[#11998e] via-[#10b981] to-[#38ef7d]',
    textColor: 'text-slate-950',
    badgeBg: 'bg-black/80 border border-white/20',
    badgeText: 'text-emerald-300',
    btnBg: 'bg-slate-950 text-white hover:bg-slate-900',
    // Dynamic Test View Deep Color Styles
    accentName: 'emerald',
    cardBg: 'bg-[#041612]/90 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-emerald-950/80 via-teal-950/60 to-slate-950/80 border-emerald-500/40',
    questionBoxBg: 'bg-[#07201a]/90 border-emerald-500/30 text-white',
    ambientGlow: 'from-emerald-600/20 via-teal-600/10 to-transparent',
    headerBadgeBg: 'bg-emerald-500/20',
    headerBadgeText: 'text-emerald-400',
    headerBadgeBorder: 'border-emerald-500/40',
    timerColor: 'text-emerald-400',
    qBadgeBg: 'bg-emerald-500/10',
    qBadgeText: 'text-emerald-400',
    qBadgeBorder: 'border-emerald-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-emerald-500/25 via-teal-600/25 to-emerald-500/25',
    optionSelectedBorder: 'border-emerald-500',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black border-white/30',
    checkColor: 'text-emerald-400',
    nextBtnBg: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black shadow-md border border-emerald-300/40',
    paletteCurrent: 'border-emerald-400 ring-2 ring-emerald-500/50 bg-emerald-500 text-slate-950 font-black',
    submitBtnBg: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.35)] border border-emerald-300/40'
  },
  // Theme 2: Cyan/Sky (Mock Test 3, 11, 19...)
  {
    id: 'cyan',
    name: 'Cyan Theme',
    gradient: 'from-[#00c6ff] via-[#0072ff] to-[#4f46e5]',
    textColor: 'text-white',
    badgeBg: 'bg-black/60 border border-white/20',
    badgeText: 'text-cyan-300',
    btnBg: 'bg-white text-slate-950 hover:bg-slate-100',
    // Dynamic Test View Deep Color Styles
    accentName: 'cyan',
    cardBg: 'bg-[#041422]/90 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-slate-950/80 border-cyan-500/40',
    questionBoxBg: 'bg-[#071f33]/90 border-cyan-500/30 text-white',
    ambientGlow: 'from-cyan-600/20 via-blue-600/10 to-transparent',
    headerBadgeBg: 'bg-cyan-500/20',
    headerBadgeText: 'text-cyan-400',
    headerBadgeBorder: 'border-cyan-500/40',
    timerColor: 'text-cyan-400',
    qBadgeBg: 'bg-cyan-500/10',
    qBadgeText: 'text-cyan-400',
    qBadgeBorder: 'border-cyan-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-cyan-500/25 via-blue-600/25 to-cyan-500/25',
    optionSelectedBorder: 'border-cyan-400',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black border-white/30',
    checkColor: 'text-cyan-400',
    nextBtnBg: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black shadow-md border border-white/20',
    paletteCurrent: 'border-cyan-400 ring-2 ring-cyan-500/50 bg-cyan-500 text-slate-950 font-black',
    submitBtnBg: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-white font-black shadow-[0_0_20px_rgba(6,182,212,0.35)] border border-cyan-300/40'
  },
  // Theme 3: Amber/Orange (Mock Test 4, 12, 20...)
  {
    id: 'amber',
    name: 'Amber Theme',
    gradient: 'from-[#ff9966] via-[#ff7e5f] to-[#ff5e62]',
    textColor: 'text-slate-950',
    badgeBg: 'bg-black/80 border border-white/20',
    badgeText: 'text-amber-300',
    btnBg: 'bg-slate-950 text-white hover:bg-slate-900',
    // Dynamic Test View Deep Color Styles
    accentName: 'amber',
    cardBg: 'bg-[#1c0f05]/90 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-amber-950/80 via-orange-950/60 to-slate-950/80 border-amber-500/40',
    questionBoxBg: 'bg-[#261508]/90 border-amber-500/30 text-white',
    ambientGlow: 'from-amber-600/20 via-orange-600/10 to-transparent',
    headerBadgeBg: 'bg-amber-500/20',
    headerBadgeText: 'text-amber-400',
    headerBadgeBorder: 'border-amber-500/40',
    timerColor: 'text-amber-400',
    qBadgeBg: 'bg-amber-500/10',
    qBadgeText: 'text-amber-400',
    qBadgeBorder: 'border-amber-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-amber-500/25 via-orange-600/25 to-amber-500/25',
    optionSelectedBorder: 'border-amber-400',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black border-white/30',
    checkColor: 'text-amber-400',
    nextBtnBg: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black shadow-md border border-amber-300/40',
    paletteCurrent: 'border-amber-400 ring-2 ring-amber-500/50 bg-amber-500 text-slate-950 font-black',
    submitBtnBg: 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.35)] border border-amber-300/40'
  },
  // Theme 4: Purple/Violet (Mock Test 5, 13...)
  {
    id: 'purple',
    name: 'Purple Theme',
    gradient: 'from-[#8A2387] via-[#E94057] to-[#F27121]',
    textColor: 'text-white',
    badgeBg: 'bg-black/60 border border-white/20',
    badgeText: 'text-purple-300',
    btnBg: 'bg-white text-slate-950 hover:bg-slate-100',
    // Dynamic Test View Deep Color Styles
    accentName: 'purple',
    cardBg: 'bg-[#13061d]/90 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-purple-950/80 via-fuchsia-950/60 to-slate-950/80 border-purple-500/40',
    questionBoxBg: 'bg-[#1e082e]/90 border-purple-500/30 text-white',
    ambientGlow: 'from-purple-600/20 via-fuchsia-600/10 to-transparent',
    headerBadgeBg: 'bg-purple-500/20',
    headerBadgeText: 'text-purple-400',
    headerBadgeBorder: 'border-purple-500/40',
    timerColor: 'text-purple-400',
    qBadgeBg: 'bg-purple-500/10',
    qBadgeText: 'text-purple-400',
    qBadgeBorder: 'border-purple-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-purple-500/25 via-pink-600/25 to-purple-500/25',
    optionSelectedBorder: 'border-purple-400',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black border-white/30',
    checkColor: 'text-purple-400',
    nextBtnBg: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-black shadow-md border border-white/20',
    paletteCurrent: 'border-purple-400 ring-2 ring-purple-500/50 bg-purple-500 text-white font-black',
    submitBtnBg: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-600 hover:from-purple-400 hover:to-fuchsia-400 text-white font-black shadow-[0_0_20px_rgba(168,85,247,0.35)] border border-purple-300/40'
  },
  // Theme 5: Rose/Red (Mock Test 6, 14...)
  {
    id: 'rose',
    name: 'Rose Theme',
    gradient: 'from-[#f43f5e] via-[#e11d48] to-[#9f1239]',
    textColor: 'text-white',
    badgeBg: 'bg-black/60 border border-white/20',
    badgeText: 'text-rose-300',
    btnBg: 'bg-white text-slate-950 hover:bg-slate-100',
    // Dynamic Test View Deep Color Styles
    accentName: 'rose',
    cardBg: 'bg-[#1c050b]/90 border-rose-500/30 shadow-[0_0_40px_rgba(244,63,94,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-rose-950/80 via-red-950/60 to-slate-950/80 border-rose-500/40',
    questionBoxBg: 'bg-[#280710]/90 border-rose-500/30 text-white',
    ambientGlow: 'from-rose-600/20 via-red-600/10 to-transparent',
    headerBadgeBg: 'bg-rose-500/20',
    headerBadgeText: 'text-rose-400',
    headerBadgeBorder: 'border-rose-500/40',
    timerColor: 'text-rose-400',
    qBadgeBg: 'bg-rose-500/10',
    qBadgeText: 'text-rose-400',
    qBadgeBorder: 'border-rose-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-rose-500/25 via-red-600/25 to-rose-500/25',
    optionSelectedBorder: 'border-rose-400',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-rose-500 to-red-600 text-white font-black border-white/30',
    checkColor: 'text-rose-400',
    nextBtnBg: 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-black shadow-md border border-white/20',
    paletteCurrent: 'border-rose-400 ring-2 ring-rose-500/50 bg-rose-500 text-white font-black',
    submitBtnBg: 'bg-gradient-to-r from-rose-500 via-pink-600 to-red-600 hover:from-rose-400 hover:to-pink-500 text-white font-black shadow-[0_0_20px_rgba(244,63,94,0.35)] border border-rose-300/40'
  },
  // Theme 6: Indigo/Fuchsia (Mock Test 7, 15...)
  {
    id: 'indigo',
    name: 'Indigo Theme',
    gradient: 'from-[#6366f1] via-[#8b5cf6] to-[#d946ef]',
    textColor: 'text-white',
    badgeBg: 'bg-black/60 border border-white/20',
    badgeText: 'text-indigo-300',
    btnBg: 'bg-white text-slate-950 hover:bg-slate-100',
    // Dynamic Test View Deep Color Styles
    accentName: 'indigo',
    cardBg: 'bg-[#0a0822]/90 border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950/80 border-indigo-500/40',
    questionBoxBg: 'bg-[#0f0c33]/90 border-indigo-500/30 text-white',
    ambientGlow: 'from-indigo-600/20 via-fuchsia-600/10 to-transparent',
    headerBadgeBg: 'bg-indigo-500/20',
    headerBadgeText: 'text-indigo-400',
    headerBadgeBorder: 'border-indigo-500/40',
    timerColor: 'text-indigo-400',
    qBadgeBg: 'bg-indigo-500/10',
    qBadgeText: 'text-indigo-400',
    qBadgeBorder: 'border-indigo-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-indigo-500/25 via-fuchsia-600/25 to-indigo-500/25',
    optionSelectedBorder: 'border-indigo-400',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(99,102,241,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-black border-white/30',
    checkColor: 'text-indigo-400',
    nextBtnBg: 'bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white font-black shadow-md border border-white/20',
    paletteCurrent: 'border-indigo-400 ring-2 ring-indigo-500/50 bg-indigo-500 text-white font-black',
    submitBtnBg: 'bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black shadow-[0_0_20px_rgba(99,102,241,0.35)] border border-indigo-300/40'
  },
  // Theme 7: Teal/Lime (Mock Test 8, 16...)
  {
    id: 'teal',
    name: 'Teal Theme',
    gradient: 'from-[#00d2ff] via-[#00f2fe] to-[#38ef7d]',
    textColor: 'text-slate-950',
    badgeBg: 'bg-black/80 border border-white/20',
    badgeText: 'text-teal-300',
    btnBg: 'bg-slate-950 text-white hover:bg-slate-900',
    // Dynamic Test View Deep Color Styles
    accentName: 'teal',
    cardBg: 'bg-[#031818]/90 border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.15)]',
    cardHeaderBg: 'bg-gradient-to-r from-teal-950/80 via-emerald-950/60 to-slate-950/80 border-teal-500/40',
    questionBoxBg: 'bg-[#042425]/90 border-teal-500/30 text-white',
    ambientGlow: 'from-teal-600/20 via-emerald-600/10 to-transparent',
    headerBadgeBg: 'bg-teal-500/20',
    headerBadgeText: 'text-teal-400',
    headerBadgeBorder: 'border-teal-500/40',
    timerColor: 'text-teal-400',
    qBadgeBg: 'bg-teal-500/10',
    qBadgeText: 'text-teal-400',
    qBadgeBorder: 'border-teal-500/30',
    optionSelectedBg: 'bg-gradient-to-r from-teal-500/25 via-emerald-600/25 to-teal-500/25',
    optionSelectedBorder: 'border-teal-400',
    optionSelectedShadow: 'shadow-[0_0_20px_rgba(20,184,166,0.35)]',
    optionLetterBg: 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black border-white/30',
    checkColor: 'text-teal-400',
    nextBtnBg: 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black shadow-md border border-teal-300/40',
    paletteCurrent: 'border-teal-400 ring-2 ring-teal-500/50 bg-teal-500 text-slate-950 font-black',
    submitBtnBg: 'bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black shadow-[0_0_20px_rgba(20,184,166,0.35)] border border-teal-300/40'
  }
];

export default function MockTestApp() {
  const [view, setView] = useState<ViewState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedMock, setSelectedMock] = useState<any | null>(null);
  const [topicSearchQuery, setTopicSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useSEO(
    "Online Math Mock Tests & Series | Raj Sir Math Classes",
    "Prepare for SLST Mathematics, JEE Mains, WBJEE, B.Tech Math and Upper Primary TET with our professional online CBT mock tests."
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);

  const [focusMode, setFocusMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [pendingMock, setPendingMock] = useState<any | null>(null);
  const [testCodeInput, setTestCodeInput] = useState('');
  const [testCodeError, setTestCodeError] = useState('');

  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Timer effect
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

  const startMockTest = (mock: any, theme?: any) => {
    const chosenTheme = theme || mock.theme || MODULE_THEMES[0];
    setSelectedMock({ ...mock, theme: chosenTheme });
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(mock.duration || 3600);
    setView('test');
  };

  const handleMockSelect = (mock: any, theme?: any) => {
    const chosenTheme = theme || mock.theme || MODULE_THEMES[0];
    if (selectedCategory === 'slst') {
      setPendingMock({ ...mock, theme: chosenTheme });
      setShowCodeModal(true);
      setTestCodeInput('');
      setTestCodeError('');
    } else {
      startMockTest(mock, chosenTheme);
    }
  };

  const handleCodeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (testCodeInput.trim() === 'raj@9167') {
      setShowCodeModal(false);
      if (pendingMock) startMockTest(pendingMock, pendingMock.theme);
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

  const filteredCategories = useMemo(() => {
    if (activeFilter === 'all') return EXAM_CATEGORIES;
    return EXAM_CATEGORIES.filter(c => c.id === activeFilter);
  }, [activeFilter]);

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
            className="hover:text-pink-400 transition-colors"
          >
            {EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}
          </button>
        </>
      )}

      {selectedTopic && (view === 'mocks' || view === 'test' || view === 'results') && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <button 
            onClick={() => setView('mocks')}
            className="hover:text-pink-400 transition-colors truncate max-w-[150px]"
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

  // Layout Helpers
  const renderLeftSidebar = () => (
    <aside className="hidden md:flex flex-col items-center gap-6 bg-[#12131a] border border-white/10 rounded-full py-6 px-3.5 shadow-2xl shrink-0 sticky top-8 z-30">
      <button 
        onClick={() => { setView('categories'); setSelectedCategory(null); setSelectedTopic(null); }}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg",
          view === 'categories' 
            ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105" 
            : "bg-slate-900 text-slate-400 hover:text-white border border-white/10"
        )}
        title="Home / All Exams"
      >
        <Home className="w-5 h-5 fill-current" />
      </button>

      <button 
        onClick={() => { setView('categories'); setActiveFilter('all'); }}
        className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-emerald-400 flex items-center justify-center hover:text-white hover:border-emerald-500/50 transition-all"
        title="Exams Calendar"
      >
        <Clock className="w-4 h-4" />
      </button>

      <button 
        onClick={() => { setSelectedCategory('slst'); setView('topics'); }}
        className={cn(
          "w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-pink-400 flex items-center justify-center hover:text-white hover:border-pink-500/50 transition-all",
          selectedCategory === 'slst' && "ring-2 ring-pink-500 bg-pink-500/20"
        )}
        title="SLST Mathematics"
      >
        <BookOpen className="w-4 h-4" />
      </button>

      <button 
        onClick={() => { setSelectedCategory('jee'); setView('topics'); }}
        className={cn(
          "w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-cyan-400 flex items-center justify-center hover:text-white hover:border-cyan-500/50 transition-all",
          selectedCategory === 'jee' && "ring-2 ring-cyan-500 bg-cyan-500/20"
        )}
        title="JEE Advanced"
      >
        <Target className="w-4 h-4" />
      </button>

      <button 
        onClick={() => { setSelectedCategory('jeemains'); setView('topics'); }}
        className={cn(
          "w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-sky-400 flex items-center justify-center hover:text-white hover:border-sky-500/50 transition-all",
          selectedCategory === 'jeemains' && "ring-2 ring-sky-500 bg-sky-500/20"
        )}
        title="JEE Mains"
      >
        <Zap className="w-4 h-4" />
      </button>

      <button 
        onClick={() => { setSelectedCategory('wbjee'); setView('topics'); }}
        className={cn(
          "w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-amber-400 flex items-center justify-center hover:text-white hover:border-amber-500/50 transition-all",
          selectedCategory === 'wbjee' && "ring-2 ring-amber-500 bg-amber-500/20"
        )}
        title="WBJEE"
      >
        <Layers className="w-4 h-4" />
      </button>

      <button 
        onClick={() => { setSelectedCategory('btech'); setView('topics'); }}
        className={cn(
          "w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-purple-400 flex items-center justify-center hover:text-white hover:border-purple-500/50 transition-all",
          selectedCategory === 'btech' && "ring-2 ring-purple-500 bg-purple-500/20"
        )}
        title="B.Tech Math"
      >
        <GraduationCap className="w-4 h-4" />
      </button>
    </aside>
  );

  const renderRightSidebar = () => (
    <aside className="hidden lg:flex flex-col w-80 xl:w-96 bg-[#111218] border border-white/10 rounded-[32px] p-6 shadow-2xl shrink-0 space-y-6 sticky top-8 z-20">
      {/* Top User Profile Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="relative">
          <button className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-pink-400 flex items-center justify-center hover:bg-slate-800 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-[#111218]"></span>
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#111218] flex items-center justify-center text-white">
              <User className="w-5 h-5 text-pink-300" />
            </div>
          </div>
        </div>

        <button className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 text-slate-400 flex items-center justify-center hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Candidate Identity Greeting */}
      <div className="text-center">
        <h4 className="text-base font-bold text-white font-display">Raj Sir Student</h4>
        <p className="text-xs text-slate-400 font-medium mt-0.5">CBT Practice Portal Candidate</p>
      </div>

      {/* Recent Attempted Tests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Recent CBT Tests
          </span>
          <span className="text-[10px] font-extrabold text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2.5 py-0.5 rounded-full">
            LIVE
          </span>
        </div>

        {/* Mini Card 1 */}
        {/* Mini Card 1 */}
        <div 
          onClick={() => { setSelectedCategory('slst'); setSelectedTopic('Real Analysis'); setView('mocks'); }}
          className="bg-gradient-to-br from-[#ff1b8d]/20 via-[#e013a7]/15 to-[#7c11f7]/20 border border-pink-500/30 rounded-2xl p-4 hover:border-pink-400/60 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-xl bg-pink-500/30 text-pink-300 flex items-center justify-center border border-pink-400/30">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-pink-300 bg-black/60 px-2 py-0.5 rounded-full border border-pink-500/30">5,284 students</span>
          </div>
          <h5 className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
            SLST Real Analysis CBT 01
          </h5>
          <div className="flex items-center justify-between mt-2 text-[10px] font-semibold text-slate-300">
            <span>60 Mins • 30 MCQs</span>
            <span className="text-pink-400 font-black">•••••</span>
          </div>
        </div>

        {/* Mini Card 2 */}
        <div 
          onClick={() => { setSelectedCategory('jee'); setSelectedTopic('Complex Numbers'); setView('mocks'); }}
          className="bg-gradient-to-br from-[#00d2ff]/20 via-[#00f2fe]/15 to-[#38ef7d]/20 border border-cyan-500/30 rounded-2xl p-4 hover:border-cyan-400/60 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/30 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-cyan-300 bg-black/60 px-2 py-0.5 rounded-full border border-cyan-500/30">3,616 students</span>
          </div>
          <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
            JEE Advanced Complex Numbers
          </h5>
          <div className="flex items-center justify-between mt-2 text-[10px] font-semibold text-slate-300">
            <span>90 Mins • 25 MCQs</span>
            <span className="text-cyan-400 font-black">•••••</span>
          </div>
        </div>

        {/* Mini Card 3 */}
        <div 
          onClick={() => { setSelectedCategory('wbjee'); setSelectedTopic('Differential Calculus'); setView('mocks'); }}
          className="bg-gradient-to-br from-[#ff9966]/20 via-[#ff7e5f]/15 to-[#ff5e62]/20 border border-amber-500/30 rounded-2xl p-4 hover:border-amber-400/60 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/30 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/30">4,190 students</span>
          </div>
          <h5 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
            WBJEE Differential Calculus
          </h5>
          <div className="flex items-center justify-between mt-2 text-[10px] font-semibold text-slate-300">
            <span>60 Mins • 30 MCQs</span>
            <span className="text-amber-400 font-black">•••••</span>
          </div>
        </div>
      </div>

      {/* Practice Banner Widget */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-600/25 via-purple-600/20 to-indigo-600/25 border border-pink-500/40 rounded-[24px] p-5 text-center shadow-xl backdrop-blur-md group hover:border-pink-400/60 transition-all">
        {/* Glow ambient circle */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-pink-500/20 rounded-full blur-xl pointer-events-none"></div>
        
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-pink-300 uppercase tracking-widest bg-pink-500/20 border border-pink-400/40 px-3 py-1 rounded-full mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" /> Daily Speed Drill
        </span>

        <h5 className="text-sm font-black text-white font-display mb-1">
          10-Min Rapid Math Drills
        </h5>
        
        <p className="text-[11px] text-slate-300 font-medium leading-relaxed mb-4">
          Boost calculation speed & accuracy with instant timed quizzes.
        </p>

        <button 
          onClick={() => { setSelectedCategory('slst'); setSelectedTopic('Real Analysis'); setView('mocks'); }}
          className="w-full py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white transition-all shadow-lg border border-white/20 flex items-center justify-center gap-1.5"
        >
          <span>Start Speed Quiz</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );

  const renderPageLayout = (mainContent: React.ReactNode, customRightSidebar?: React.ReactNode) => (
    <div className="w-full min-h-screen bg-[#050508] text-slate-100 flex justify-center py-4 sm:py-6 px-3 sm:px-6 font-sans overflow-x-hidden">
      <div className="w-full max-w-[1440px] flex gap-5 items-start">
        {renderLeftSidebar()}
        <main className="flex-1 min-w-0 w-full">
          {mainContent}
        </main>
        {customRightSidebar !== undefined ? customRightSidebar : renderRightSidebar()}
      </div>
    </div>
  );

  // VIEW 1: MAIN CATEGORIES DASHBOARD (Matching Mockup Image Design)
  if (view === 'categories') {
    return renderPageLayout(
      <>
        {/* Hero Banner Header Card */}
        <div className="relative bg-gradient-to-r from-[#121324] via-[#1c1635] to-[#0f142a] rounded-[32px] p-6 sm:p-10 border-t border-t-pink-500/40 border-x border-x-white/20 border-b border-b-white/10 overflow-hidden shadow-2xl mb-6 sm:mb-8 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]">
          {/* Ambient Glowing Blobs */}
          <div className="absolute -right-16 -top-16 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-1/4 top-1/2 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/25 via-purple-500/25 to-indigo-500/25 border border-pink-400/50 px-4 py-1.5 rounded-full mb-4 shadow-xl backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#ec4899]"></span>
              <span className="text-[11px] font-black text-pink-200 uppercase tracking-widest drop-shadow">
                NTA & STATE CBT TEST SERIES 2026
              </span>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-3 drop-shadow-md"
            >
              Explore <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-cyan-300 drop-shadow-[0_2px_12px_rgba(236,72,153,0.3)]">
                Our CBT Mock Tests
              </span>
            </motion.h1>

            <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed mb-6 max-w-2xl drop-shadow-sm">
              Experience authentic NTA Computer-Based Test (CBT) interface with instant scorecards, speed analytics, rank percentiles, and step-by-step LaTeX solution keys.
            </p>

            {/* Quick Feature Chips */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-black text-slate-200">
              <span className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-md hover:border-emerald-400/50 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real CBT Timer & Palette
              </span>
              <span className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-md hover:border-amber-400/50 transition-colors">
                <Award className="w-4 h-4 text-amber-400" /> Live Percentile Ranks
              </span>
              <span className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-md hover:border-cyan-400/50 transition-colors">
                <FileText className="w-4 h-4 text-cyan-400" /> Step-by-Step LaTeX Answers
              </span>
            </div>
          </div>

          {/* Sub-navigation Filters Pill Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 sm:mt-8 pt-6 border-t border-white/15 relative z-10">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
              Most Popular Target Exams
            </span>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
              {[
                { id: 'all', label: 'All Exams' },
                { id: 'slst', label: 'SLST Math' },
                { id: 'jee', label: 'JEE Adv' },
                { id: 'jeemains', label: 'JEE Mains' },
                { id: 'wbjee', label: 'WBJEE' },
                { id: 'btech', label: 'B.Tech' },
                { id: 'upperprimary', label: 'Upper Primary' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap shrink-0",
                    activeFilter === tab.id
                      ? "bg-gradient-to-r from-white to-slate-100 text-slate-950 shadow-xl font-black scale-105 border border-white"
                      : "bg-slate-900/90 text-slate-300 hover:text-white border border-white/15 font-bold hover:bg-slate-800"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vibrant Colorful Exam Cards Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {filteredCategories.map((cat) => {
            const theme = EXAM_THEMES[cat.id] || EXAM_THEMES.slst;
            const topicCount = TOPICS_BY_CATEGORY[cat.id]?.length || 0;

            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={cn(
                  "group relative rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-2xl bg-gradient-to-br",
                  theme.gradient
                )}
              >
                {/* Top Row: Icon Badge & Student Count */}
                <div className="flex items-center justify-between gap-2 mb-6 sm:mb-8 z-10">
                  <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-xl border border-white/20 shrink-0", theme.badgeBg)}>
                    {cat.id === 'slst' && <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />}
                    {cat.id === 'jee' && <Target className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />}
                    {cat.id === 'jeemains' && <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />}
                    {cat.id === 'wbjee' && <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />}
                    {cat.id === 'btech' && <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />}
                    {cat.id === 'upperprimary' && <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />}
                  </div>

                  <span className={cn("text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md border border-white/20 uppercase tracking-wider shrink-0", theme.badgeBg, theme.badgeText)}>
                    {topicCount} Topics
                  </span>
                </div>

                {/* Middle Title & Description */}
                <div className="z-10 mb-4 sm:mb-6">
                  <h3 className={cn("font-display text-xl sm:text-3xl font-black leading-tight tracking-tight mb-1.5 drop-shadow-sm", theme.textColor)}>
                    {cat.name}
                  </h3>
                  <p className={cn("text-xs font-medium line-clamp-2 opacity-90 leading-relaxed max-w-sm", theme.textColor)}>
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Row: Enrolled count & Rating dots */}
                <div className="flex items-center justify-between z-10 pt-2 border-t border-white/20">
                  <span className={cn("text-xs font-extrabold tracking-wide", theme.textColor)}>
                    {theme.students}
                  </span>

                  <div className={cn("flex items-center gap-1 font-black text-xs sm:text-sm tracking-widest", theme.textColor)}>
                    {theme.ratingDots}
                  </div>
                </div>

                {/* Subtle Glass Glow Overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </>
    );
  }

  // VIEW 2: TOPICS LIST
  if (view === 'topics') {
    const activeCategoryObj = EXAM_CATEGORIES.find(c => c.id === selectedCategory);

    return renderPageLayout(
      <>
        {renderBreadcrumbs()}

        {/* Category Header Banner */}
        <div className="bg-gradient-to-r from-[#151628] via-[#1d1b33] to-[#121428] rounded-[32px] p-6 sm:p-9 border border-white/15 mb-6 sm:mb-8 relative overflow-hidden shadow-2xl">
          {/* Ambient Light Blob */}
          <div className="absolute -right-12 -top-12 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-500/15 border border-pink-500/35 px-3.5 py-1 rounded-full mb-3 shadow-md backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-black text-pink-300 uppercase tracking-widest">
                  EXAM MODULES DASHBOARD
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight mb-2">
                {activeCategoryObj?.name || 'Selected Exam'}
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed mb-4">
                {activeCategoryObj?.description} Select a module below to launch standard NTA CBT mock tests.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-300">
                <span className="bg-black/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" /> 20 CBT Mocks per Topic
                </span>
                <span className="bg-black/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> 60-Min Timer
                </span>
                <span className="bg-black/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> LaTeX Answers
                </span>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-pink-400" />
              <input 
                type="text" 
                placeholder="Search topic module..."
                value={topicSearchQuery}
                onChange={(e) => setTopicSearchQuery(e.target.value)}
                className="w-full bg-[#181928]/90 text-slate-100 placeholder-slate-400 text-xs font-semibold pl-11 pr-4 py-3.5 rounded-2xl border border-white/15 focus:outline-none focus:border-pink-500/70 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-xl backdrop-blur-md"
              />
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-[#111218] rounded-3xl border border-white/10 max-w-md mx-auto px-4">
            <Search className="h-10 w-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">No topic matches your search</h3>
            <p className="text-xs text-slate-400">Try searching for another topic name or clear the search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredTopics.map((topic, idx) => {
              const mTheme = MODULE_THEMES[idx % MODULE_THEMES.length];
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  key={idx} 
                  onClick={() => handleTopicSelect(topic)}
                  className={cn(
                    "group relative rounded-[28px] p-6 text-left flex flex-col justify-between min-h-[220px] cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-2xl bg-gradient-to-br",
                    mTheme.gradient
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5 z-10 relative">
                      <span className={cn("text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md", mTheme.badgeBg, mTheme.badgeText)}>
                        MODULE #{idx + 1}
                      </span>
                      <span className={cn("text-xs font-bold flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md shadow-md", mTheme.badgeBg, mTheme.textColor)}>
                        <FileText className="w-3.5 h-3.5" /> 20 CBT Mocks
                      </span>
                    </div>

                    <h3 className={cn("font-display text-xl sm:text-2xl font-black leading-tight tracking-tight mb-2 drop-shadow-sm z-10 relative", mTheme.textColor)}>
                      {topic}
                    </h3>

                    <p className={cn("text-xs font-medium opacity-90 leading-relaxed mb-6 z-10 relative max-w-sm", mTheme.textColor)}>
                      Comprehensive CBT test series with step-by-step LaTeX answers, speed analytics, and rank performance.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20 z-10 relative">
                    <span className={cn("text-xs font-black uppercase tracking-wider flex items-center gap-1.5", mTheme.textColor)}>
                      <span>Launch CBT Tests</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className={cn("text-xs font-black tracking-widest opacity-80", mTheme.textColor)}>
                      •••••
                    </span>
                  </div>

                  {/* Glass Hover Overlay */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </motion.div>
              );
            })}
          </div>
        )}
      </>
    );
  }

  // VIEW 3: MOCKS LIST FOR SELECTED TOPIC
  if (view === 'mocks') {
    const mocks = generateMocksForTopic(selectedTopic || 'Mathematics');

    return renderPageLayout(
      <>
        {renderBreadcrumbs()}

        {/* Topic Test Series Banner */}
        <div className="bg-gradient-to-r from-[#18132b] via-[#22183c] to-[#111428] rounded-[32px] p-6 sm:p-9 border border-white/15 mb-6 sm:mb-8 relative overflow-hidden shadow-2xl">
          {/* Ambient Light Blob */}
          <div className="absolute -right-12 -top-12 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/35 px-3.5 py-1 rounded-full mb-3 shadow-md backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-black text-cyan-300 uppercase tracking-widest">
                  TOPIC TEST SERIES
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight mb-2">
                {selectedTopic}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-300 mt-3">
                <span className="bg-black/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-pink-400" /> 20 CBT Mocks
                </span>
                <span className="bg-black/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-cyan-400" /> 30 MCQs Each
                </span>
                <span className="bg-black/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> 60 Mins Timer
                </span>
                <span className="bg-black/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> LaTeX Explanations
                </span>
              </div>
            </div>

            <button 
              onClick={() => setView('topics')}
              className="bg-[#181928] hover:bg-slate-800 text-slate-200 hover:text-white border border-white/20 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-xl hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400" /> Switch Topic
            </button>
          </div>
        </div>

        {/* Mock Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {mocks.map((mock, idx) => {
            const mockTheme = MODULE_THEMES[idx % MODULE_THEMES.length];
            return (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                key={idx} 
                className={cn(
                  "group relative rounded-[28px] p-6 flex flex-col justify-between min-h-[210px] cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-2xl bg-gradient-to-br",
                  mockTheme.gradient
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 z-10 relative">
                    <span className={cn("w-10 h-10 rounded-2xl font-black text-sm flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md", mockTheme.badgeBg, mockTheme.textColor)}>
                      #{idx + 1}
                    </span>
                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md", mockTheme.badgeBg, mockTheme.badgeText)}>
                      <CheckCircle2 className="w-3 h-3" /> CBT Ready
                    </span>
                  </div>

                  <h3 className={cn("font-black text-xl mb-1 font-display leading-snug drop-shadow-sm z-10 relative", mockTheme.textColor)}>
                    Mock Test {idx + 1}
                  </h3>

                  <p className={cn("text-xs font-semibold opacity-90 mb-5 z-10 relative", mockTheme.textColor)}>
                    {mock.totalQuestions} MCQs • {mock.duration / 60} Minutes
                  </p>
                </div>

                <button 
                  onClick={() => handleMockSelect(mock, mockTheme)}
                  className={cn(
                    "w-full py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 border border-white/20 z-10 relative group-hover:scale-[1.02]",
                    mockTheme.btnBg
                  )}
                >
                  <Target className="h-4 w-4" />
                  <span>Start CBT Test</span>
                </button>

                {/* Glass Hover Overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Passcode Modal for SLST */}
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
                className="bg-[#111218] rounded-3xl p-8 max-w-sm w-full border border-white/20 shadow-2xl relative z-10 text-center"
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
      </>
    );
  }

  // VIEW 4: LIVE CBT EXAMINATION
  if (view === 'test') {
    const activeTheme = selectedMock?.theme || MODULE_THEMES[0];
    const q = selectedMock.questions[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== undefined;

    return (
      <div className={cn(
        "w-full py-4 sm:py-6 px-3 sm:px-6 flex-1 flex flex-col items-center relative z-20 min-h-screen bg-[#050508] overflow-x-hidden",
        focusMode ? "fixed inset-0 overflow-y-auto z-[100]" : ""
      )}>
        {/* Deep Color Backdrop Ambient Radial Glow */}
        <div className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b opacity-40 blur-3xl pointer-events-none -z-10",
          activeTheme.ambientGlow || 'from-pink-600/20 via-purple-600/10 to-transparent'
        )} />

        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-5 sm:gap-6 flex-1 relative z-10">
          
          {/* Main Question Body */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-5 min-w-0">
            
            {/* Test Top Header */}
            <div className={cn("p-3.5 sm:p-5 rounded-3xl border flex items-center justify-between shadow-2xl backdrop-blur-md transition-all", activeTheme.cardHeaderBg || "bg-[#111218] border-white/15")}>
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className={cn("w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm", activeTheme.headerBadgeBg, activeTheme.headerBadgeText, activeTheme.headerBadgeBorder)}>
                  {currentQuestion + 1}
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-white text-xs sm:text-base font-display truncate">
                    {selectedMock.title}
                  </h2>
                  <p className="text-[10px] font-bold text-slate-300/80 uppercase tracking-widest">
                    Question {currentQuestion + 1} of {selectedMock.questions.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button 
                  onClick={() => setFocusMode(!focusMode)} 
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-black/40 border border-white/15 px-3 py-2 rounded-xl transition-colors backdrop-blur-sm"
                  title="Toggle Focus Mode"
                >
                  {focusMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  <span>{focusMode ? "Exit Focus" : "Focus Mode"}</span>
                </button>

                <div className={cn(
                  "flex items-center gap-1.5 sm:gap-2 font-mono font-bold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl border text-xs shadow-inner backdrop-blur-md",
                  timeLeft < 300 
                    ? "bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse" 
                    : cn("bg-black/40 border-white/20", activeTheme.timerColor)
                )}>
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Question Display Card */}
            <div className={cn("p-4 sm:p-8 rounded-3xl border flex-1 flex flex-col justify-between shadow-2xl min-w-0 backdrop-blur-md transition-all", activeTheme.cardBg || "bg-[#111218] border-white/15")}>
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-white/10 pb-3 sm:pb-4">
                  <span className={cn("text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full border", activeTheme.qBadgeBg, activeTheme.qBadgeText, activeTheme.qBadgeBorder)}>
                    QUESTION {currentQuestion + 1}
                  </span>
                  <div className="flex gap-1.5 sm:gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg">
                      +4 Marks
                    </span>
                    <span className="text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg">
                      -1 Mark
                    </span>
                  </div>
                </div>

                {/* Question Latex */}
                <div className={cn("text-sm sm:text-lg mb-6 sm:mb-8 p-3.5 sm:p-5 rounded-2xl border leading-relaxed font-medium overflow-x-auto shadow-inner", activeTheme.questionBoxBg || "bg-slate-950 border-white/10 text-white")}>
                  <MixedLatex content={q.question} className="text-white" />
                </div>

                {/* Options */}
                <div className="space-y-2.5 sm:space-y-3">
                  {q.options.map((opt: string, i: number) => {
                    const isSelected = selectedAnswers[currentQuestion] === i;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: i }));
                        }}
                        className={cn(
                          "w-full text-left p-3.5 sm:p-4.5 rounded-2xl border transition-all flex items-center gap-3 sm:gap-4 group min-w-0 backdrop-blur-sm",
                          isSelected
                            ? cn(activeTheme.optionSelectedBg, activeTheme.optionSelectedBorder, activeTheme.optionSelectedShadow, "text-white font-bold")
                            : "bg-black/40 border-white/10 hover:border-white/30 text-slate-200 hover:bg-black/60"
                        )}
                      >
                        <div className={cn(
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-xl border font-black text-xs flex items-center justify-center shrink-0 transition-all",
                          isSelected 
                            ? activeTheme.optionLetterBg 
                            : "bg-black/60 border-white/15 text-slate-400 group-hover:text-white"
                        )}>
                          {String.fromCharCode(65 + i)}
                        </div>

                        <div className="flex-1 overflow-x-auto text-xs sm:text-sm font-semibold">
                          <MixedLatex content={opt} className={isSelected ? 'text-white' : 'text-slate-200'} />
                        </div>

                        {isSelected && <Check className={cn("h-4 w-4 shrink-0", activeTheme.checkColor)} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-white/10 mt-6 sm:mt-8 gap-2 sm:gap-3 flex-wrap">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white border border-white/15 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>

                {isAnswered && (
                  <button
                    onClick={() => {
                      const updated = { ...selectedAnswers };
                      delete updated[currentQuestion];
                      setSelectedAnswers(updated);
                    }}
                    className="text-[11px] sm:text-xs text-slate-400 hover:text-rose-400 font-semibold transition-colors"
                  >
                    Clear Response
                  </button>
                )}

                <button
                  onClick={() => setCurrentQuestion(Math.min(selectedMock.questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === selectedMock.questions.length - 1}
                  className={cn(
                    "px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all flex items-center gap-1",
                    activeTheme.nextBtnBg
                  )}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Question Index Map */}
          <div className="w-full lg:w-80 shrink-0">
            <div className={cn("p-4 sm:p-6 rounded-3xl border lg:sticky top-8 shadow-2xl backdrop-blur-md transition-all", activeTheme.cardBg || "bg-[#111218] border-white/15")}>
              <h3 className="font-bold text-white text-xs uppercase tracking-widest font-display mb-3 sm:mb-4 border-b border-white/10 pb-2.5 sm:pb-3">
                Question Palette
              </h3>

              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 sm:gap-2.5 mb-5 sm:mb-6">
                {selectedMock.questions.map((_: any, i: number) => {
                  const isCurrent = currentQuestion === i;
                  const isAns = selectedAnswers[i] !== undefined;

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestion(i)}
                      className={cn(
                        "h-8 sm:h-9 w-full rounded-xl font-bold text-xs transition-all border flex items-center justify-center",
                        isCurrent 
                          ? activeTheme.paletteCurrent 
                          : isAns
                            ? "bg-emerald-500/25 border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/40"
                            : "bg-black/40 border-white/15 text-slate-400 hover:text-white hover:border-white/30"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 text-[11px] font-semibold text-slate-300 mb-5 sm:mb-6 bg-black/40 p-3 sm:p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-emerald-500/30 border border-emerald-500/60"></div>
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-black/60 border border-white/20"></div>
                  <span>Unanswered ({selectedMock.questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmSubmit(true)}
                className={cn(
                  "w-full py-3 sm:py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border shadow-lg",
                  activeTheme.submitBtnBg
                )}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Exam Now</span>
              </button>
            </div>
          </div>

        </div>

        {/* Submit Modal */}
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
                className="bg-[#111218] rounded-3xl p-5 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl relative z-10 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-2">
                  Submit Mock Examination?
                </h3>
                <p className="text-xs text-slate-300 mb-6 font-medium leading-relaxed">
                  You have answered <strong className="text-emerald-400 font-bold">{Object.keys(selectedAnswers).length}</strong> out of <strong className="text-white font-bold">{selectedMock.questions.length}</strong> questions.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-900 border border-white/10 hover:bg-slate-800"
                  >
                    Resume Test
                  </button>

                  <button
                    onClick={submitTest}
                    className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg border border-emerald-300/40"
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

    return renderPageLayout(
      <>
        {renderBreadcrumbs()}

        {/* Scorecard Hero Banner */}
        <div className="bg-gradient-to-br from-[#1d122b] via-[#26173a] to-[#0f1224] rounded-[32px] p-6 sm:p-10 border border-pink-500/35 relative overflow-hidden shadow-2xl mb-6 sm:mb-10 text-center">
          {/* Ambient Glowing Spot */}
          <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-pink-400/50 text-pink-300 flex items-center justify-center mx-auto mb-4 shadow-2xl backdrop-blur-md">
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-amber-300 animate-pulse" />
            </div>

            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] sm:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-md backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> EVALUATION COMPLETE
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-2 drop-shadow-md">
              Performance Scorecard
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-semibold mb-6 sm:mb-8 max-w-lg mx-auto">
              {selectedMock.title} • Instant Speed & Percentile Evaluation Report
            </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-[#ff1b8d]/20 via-[#e013a7]/20 to-[#7c11f7]/20 p-4 sm:p-5 rounded-2xl border border-pink-500/40 shadow-xl backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-black text-pink-300 drop-shadow">{stats.score}</span>
              <span className="text-[10px] sm:text-xs font-black text-pink-200/80 uppercase tracking-widest block mt-1">
                Score / {stats.maxScore}
              </span>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 p-4 sm:p-5 rounded-2xl border border-emerald-500/40 shadow-xl backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-black text-emerald-300 drop-shadow">{stats.correct}</span>
              <span className="text-[10px] sm:text-xs font-black text-emerald-200/80 uppercase tracking-widest block mt-1">
                Correct
              </span>
            </div>

            <div className="bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-red-600/20 p-4 sm:p-5 rounded-2xl border border-rose-500/40 shadow-xl backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-black text-rose-300 drop-shadow">{stats.incorrect}</span>
              <span className="text-[10px] sm:text-xs font-black text-rose-200/80 uppercase tracking-widest block mt-1">
                Incorrect
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-yellow-500/20 p-4 sm:p-5 rounded-2xl border border-amber-500/40 shadow-xl backdrop-blur-md">
              <span className="text-2xl sm:text-4xl font-black text-amber-300 drop-shadow">{stats.unattempted}</span>
              <span className="text-[10px] sm:text-xs font-black text-amber-200/80 uppercase tracking-widest block mt-1">
                Unattempted
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              onClick={() => startMockTest(selectedMock)}
              className="bg-slate-900 hover:bg-slate-800 text-white border border-white/15 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4 text-pink-400" /> Re-attempt Mock
            </button>

            <button
              onClick={() => setView('mocks')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-white/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <span>Back to Mocks</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

        {/* Live Leaderboard */}
        <div className="bg-[#111218] rounded-3xl p-4 sm:p-8 border border-white/15 shadow-xl mb-6 sm:mb-10">
          <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-white/10 pb-3 sm:pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" />
              <h3 className="font-bold text-white text-sm sm:text-base font-display">
                Top Performers Leaderboard
              </h3>
            </div>
            <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
              LIVE RANKINGS
            </span>
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {[
              { name: 'Arindam Ghosh', score: 112, me: false },
              { name: 'Sneha Banerjee', score: 108, me: false },
              { name: 'You (Your Score)', score: stats.score, me: true },
              { name: 'Rahul Das', score: Math.max(0, stats.score - 4), me: false }
            ].sort((a, b) => b.score - a.score).map((user, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all text-xs font-bold",
                  user.me 
                    ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-pink-500/60 text-white shadow-md" 
                    : "bg-slate-900 border-white/10 text-slate-300"
                )}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className={cn(
                    "w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-black text-xs",
                    idx === 0 ? "bg-amber-400 text-slate-950" : idx === 1 ? "bg-slate-300 text-slate-950" : idx === 2 ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-400"
                  )}>
                    #{idx + 1}
                  </span>
                  <span className="truncate max-w-[140px] sm:max-w-none">{user.name}</span>
                </div>
                <span className="text-white font-black shrink-0">{user.score} Marks</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="bg-[#111218] rounded-3xl p-4 sm:p-8 border border-white/15 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Step-by-Step Solutions & LaTeX Explanations
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Review detailed mathematical steps for every question in this mock test.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-white/10 overflow-x-auto w-full sm:w-auto">
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
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0",
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

          <div className="space-y-4 sm:space-y-6">
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
                    "p-4 sm:p-6 rounded-2xl border transition-all bg-slate-950",
                    isCorrect ? "border-emerald-500/40" : isIncorrect ? "border-rose-500/40" : "border-white/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-[10px] sm:text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 px-2.5 sm:px-3 py-1 rounded-full">
                      QUESTION {i + 1}
                    </span>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 sm:px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+4)
                      </span>
                    ) : isIncorrect ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 sm:px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect (-1)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-900 border border-white/10 px-2 sm:px-2.5 py-1 rounded-full">
                        Unattempted (0)
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-slate-100 p-3 sm:p-4 rounded-xl bg-slate-900 border border-white/10 mb-4 overflow-x-auto">
                    <MixedLatex content={q.question} className="text-white" />
                  </div>

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

                  <div className="p-3.5 sm:p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 text-xs">
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

      </>
    );
  }

  return null;
}
