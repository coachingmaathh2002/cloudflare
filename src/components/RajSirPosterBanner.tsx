import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  FileCheck,
  BarChart3,
  CheckCircle2,
  Phone,
  MessageCircle,
  Users,
  Star,
  Sparkles,
  ArrowRight,
  Youtube,
  Send,
  Facebook,
  Instagram,
  UserCheck,
} from "lucide-react";

export interface BannerItemData {
  id: string | number;
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  cta: string;
  link: string;
  tag?: string;
  status?: string;
  highlights?: string[];
  targetExams?: string;
}

export default function RajSirPosterBanner({ slide }: { slide?: BannerItemData }) {
  const currentBadge = slide?.badge || "🎁 100% Free Practice & Premium Coaching";
  const currentTitle = slide?.title || (
    <>
      <span className="block text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
        RAJ SIR
      </span>
      <span className="block text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mt-1">
        MATH CLASSES
      </span>
    </>
  );
  const currentTargetExams = slide?.targetExams || "JEE MAIN • SLST MATH • WB BOARD (XI & XII) • OTHER COMPETITIVE EXAMS";
  const currentCta = slide?.cta || "START YOUR JOURNEY TODAY!";
  const currentLink = slide?.link || "/free-daily-test";
  const currentTag = slide?.tag || "FEATURED BATCH";

  const defaultHighlights = [
    { title: "Complete Theory", sub: "Simplified Explanation", icon: BookOpen },
    { title: "Topic Wise Practice", sub: "Daily Quizzes & Assignments", icon: FileCheck },
    { title: "Weekly & Full Mocks", sub: "Exam Oriented Prep", icon: BarChart3 },
    { title: "Performance Analysis", sub: "Track Progress & Improve", icon: Award }
  ];

  const highlights = slide?.highlights;

  return (
    <div className="w-full font-sans">
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#020b22] via-[#081b40] to-[#030d2a] border-2 border-amber-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.15)] text-white p-4 sm:p-6 lg:p-8">
        
        {/* Background Math Watermark & Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none"></div>

        {/* TOP HEADER BAR */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
          
          {/* Top Left Tagline */}
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-extrabold text-amber-300 text-xs sm:text-sm lg:text-base tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Learn Mathematics, Excel in Life.
            </span>
          </div>

          {/* Top Middle Feature Badges */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-200">
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
              <Target className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">Concept Clarity</strong> from Basics
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">Exam Focused</strong> Strategy
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">Practice. Mock.</strong> Success.
              </span>
            </div>
          </div>

          {/* Top Right Goal Badge */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <Award className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>{currentTag}</span>
          </div>
        </div>

        {/* MAIN BODY GRID */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT & CENTER COLUMN: Title, Exams, Features & CTAs (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            
            {/* Title Section */}
            <div className="space-y-2 relative">
              
              {/* Badge & Doodle Header */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {currentBadge}
                </span>
                <span className="text-amber-300 font-serif italic text-xs font-bold tracking-wide hidden sm:inline-flex items-center gap-1 bg-blue-900/40 px-2.5 py-1 rounded-full border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Think Smart. Solve Better.
                </span>
              </div>

              <div className="font-display uppercase tracking-tight leading-none text-left">
                {typeof currentTitle === 'string' ? (
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                    {currentTitle}
                  </h2>
                ) : (
                  currentTitle
                )}
              </div>

              {slide?.subtitle && (
                <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed border-l-2 border-amber-400/80 pl-3 bg-slate-950/40 py-1.5 rounded-r-lg border-y border-r border-white/5 mt-2">
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Target Exams Banner Strip */}
            <div className="bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-blue-950/90 border border-blue-400/30 rounded-xl px-4 py-2 shadow-lg flex items-center justify-center sm:justify-start">
              <p className="text-xs sm:text-sm font-black text-amber-300 tracking-wider text-center sm:text-left uppercase">
                {currentTargetExams}
              </p>
            </div>

            {/* 4 Feature Pillar Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {highlights && highlights.length > 0 ? (
                highlights.map((h, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-700 hover:border-amber-400 p-2.5 sm:p-3 rounded-xl transition-all flex items-center gap-2.5 shadow-md">
                    <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0 border border-amber-400/20">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-100 leading-tight">{h}</p>
                    </div>
                  </div>
                ))
              ) : (
                defaultHighlights.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={idx} className="bg-slate-900 border border-slate-700 hover:border-amber-400 p-3 rounded-xl transition-all flex items-start gap-3 shadow-md">
                      <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0 border border-amber-400/20">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs sm:text-sm font-black text-white leading-tight">{pillar.title}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5">{pillar.sub}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* CTAs & Mode Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to={currentLink}
                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 transition-all border border-amber-300"
              >
                <UserCheck className="w-4 h-4 fill-slate-950" />
                <span>{currentCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/918345819377"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 border border-amber-400/40 hover:border-amber-400 text-amber-300 px-4 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ONLINE & OFFLINE CLASSES AVAILABLE</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Math Overlay Diagrams & Raj Sir Teacher Portrait (Span 5) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[320px] sm:min-h-[380px]">
            
            {/* Background Floating Math Formulas & Graphic Overlays */}
            <div className="absolute inset-0 pointer-events-none z-0">
              
              {/* Complex Plane Diagram Graphic */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-300 bg-blue-950 p-2 rounded-lg border border-cyan-500/30">
                <div>Im</div>
                <div className="pl-3 py-1 border-l border-b border-cyan-400/50">z = x + iy</div>
                <div className="text-right">Re</div>
              </div>

              {/* Euler's Formula */}
              <div className="absolute top-4 right-4 text-xs font-serif text-amber-300 bg-amber-950 px-3 py-1.5 rounded-full border border-amber-400/30">
                e<sup>iθ</sup> = cosθ + i sinθ
              </div>

              {/* Glowing Philosophy Box */}
              <div className="absolute bottom-16 left-0 right-0 sm:right-auto sm:left-2 max-w-[200px] z-20 bg-slate-950 border border-amber-400/40 p-2.5 rounded-xl text-center shadow-2xl">
                <p className="text-[11px] font-black text-amber-300 leading-tight">
                  "Mathematics is the language of the Universe."
                </p>
              </div>

              {/* Calculus formula */}
              <div className="absolute bottom-4 right-2 text-xs font-serif text-indigo-300/80 bg-indigo-950/40 px-3 py-1 rounded-lg border border-indigo-500/30">
                d/dx (sin x) = cos x
              </div>
            </div>

            {/* Teacher Image Portrait Card */}
            <div className="relative z-10 w-full max-w-[300px] sm:max-w-[340px]">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-gradient-to-b from-blue-950/80 to-slate-950">
                <img
                  src="/src/assets/images/raj_sir_portrait_1785224254286.jpg"
                  alt="Raj Sir - Mathematics Educator"
                  className="w-full h-[350px] sm:h-[390px] object-cover object-top filter brightness-105 contrast-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop";
                  }}
                />

                {/* Gradient bottom overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b22] via-transparent to-transparent opacity-80"></div>

                {/* Branded Polo Shirt Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-amber-400/40 rounded-xl p-2.5 text-center backdrop-blur-md shadow-2xl">
                  <h3 className="text-xs font-black text-amber-300 uppercase tracking-widest">
                    RAJ SIR
                  </h3>
                  <p className="text-[10px] font-bold text-slate-200">
                    MATH CLASSES
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM STATS & CONTACT FOOTER BAR */}
        <div className="relative z-10 mt-5 pt-4 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Stats Bar (Span 7) */}
          <div className="lg:col-span-7 bg-white/95 text-slate-900 rounded-2xl p-3 sm:p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center shadow-xl">
            <div className="border-r border-slate-200 last:border-0 sm:last:border-r">
              <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-sm sm:text-base">
                <Users className="w-4 h-4 text-blue-600" />
                <span>1000+</span>
              </div>
              <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">Happy Students</p>
            </div>

            <div className="border-r border-slate-200 last:border-0 sm:last:border-r">
              <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-sm sm:text-base">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>5+ Years</span>
              </div>
              <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">Teaching Exp.</p>
            </div>

            <div className="border-r border-slate-200 last:border-0 sm:last:border-r">
              <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-sm sm:text-base">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Expert</span>
              </div>
              <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">Guidance</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Proven</span>
              </div>
              <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">Results</p>
            </div>
          </div>

          {/* Contact & Social Bar (Span 5) */}
          <div className="lg:col-span-5 flex flex-wrap items-center justify-between sm:justify-end gap-3">
            
            {/* Phone/WhatsApp Pill */}
            <a
              href="https://wa.me/918345819377"
              target="_blank"
              rel="noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>83458 19377</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-xl border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Follow:</span>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-all">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all">
                <Send className="w-3.5 h-3.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-pink-600/20 text-pink-400 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

