import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Sparkles, Flame, GraduationCap, FileText, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Free Notes', path: '/notes' },
    { name: 'Mock Tests', path: '/mock-test' },
    { name: 'Upper Primary', path: '/upper-primary' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl italic border border-white/20 text-slate-50 shadow-[0_0_20px_rgba(219,39,119,0.4)] group-hover:scale-105 transition-transform duration-300">
              Σ
            </div>
            <div className="flex flex-col">
              <span className="font-display font-medium text-base tracking-tight leading-none uppercase bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                RAJ SIR
              </span>
              <span className="text-[10px] text-pink-300/70 font-bold tracking-widest uppercase mt-0.5">
                MATH CLASSES
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 relative",
                    isActive
                      ? "text-white bg-slate-800/80 border border-white/10 shadow-inner"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/free-daily-test"
              className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 flex items-center gap-1.5 border border-emerald-300/40"
            >
              <Flame className="h-3.5 w-3.5 text-slate-950 animate-bounce" />
              <span>FREE DAILY TEST</span>
              <span className="bg-slate-950/20 text-slate-950 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">LIVE</span>
            </Link>

            <Link
              to="/dashboard"
              className="bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-pink-500/50 text-slate-200 hover:text-white font-bold py-1.5 px-3.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 text-xs"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-pink-400" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/free-daily-test"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md"
            >
              <Flame className="h-3 w-3" />
              <span>Free Test</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900 border border-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5 text-pink-400" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between",
                    isActive
                      ? "bg-gradient-to-r from-pink-950/40 to-purple-950/40 border border-pink-500/30 text-white font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="h-4 w-4 text-pink-400" />}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/10 grid grid-cols-2 gap-2">
              <Link
                to="/free-daily-test"
                onClick={() => setIsOpen(false)}
                className="bg-emerald-500 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <Flame className="h-4 w-4" />
                Free Daily Test
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="bg-slate-900 border border-white/10 text-white font-bold text-xs py-2.5 px-3 rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <LayoutDashboard className="h-4 w-4 text-pink-400" />
                Student Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
