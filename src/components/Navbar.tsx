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
    <nav className="bg-[#111317]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shrink-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-glow rounded-xl flex items-center justify-center font-black text-xl italic border border-white/20 text-[#111317] shadow-[0_0_20px_rgba(240,144,56,0.35)] group-hover:scale-105 transition-transform duration-300">
              Σ
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none uppercase bg-gradient-to-r from-[#ffb77e] to-[#f09038] bg-clip-text text-transparent">
                RAJ SIR
              </span>
              <span className="text-[10px] text-[#ffb77e]/80 font-bold tracking-widest uppercase mt-0.5">
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
                      ? "text-white bg-[#1e2024] border border-white/10 shadow-inner"
                      : "text-slate-300 hover:text-white hover:bg-[#1e2024]/60"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gradient-to-r from-[#f09038] to-[#ffb77e] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/free-daily-test"
              className="relative group overflow-hidden bg-gradient-glow text-[#111317] hover:brightness-110 font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-[0_0_20px_rgba(240,144,56,0.35)] hover:-translate-y-0.5 flex items-center gap-1.5 border border-amber-300/40"
            >
              <Flame className="h-3.5 w-3.5 text-[#111317] animate-bounce" />
              <span>FREE DAILY TEST</span>
              <span className="bg-[#111317]/20 text-[#111317] text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ml-1">LIVE</span>
            </Link>

            <Link
              to="/dashboard"
              className="bg-[#1e2024] hover:bg-white/10 border border-white/10 hover:border-[#f09038]/50 text-slate-200 hover:text-white font-bold py-1.5 px-3.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 text-xs"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-[#f09038]" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/free-daily-test"
              className="bg-gradient-glow text-[#111317] font-black text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md"
            >
              <Flame className="h-3 w-3" />
              <span>Free Test</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg bg-[#1e2024] border border-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5 text-[#f09038]" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#111317] border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-200">
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
                      ? "bg-[#1e2024] border border-[#f09038]/40 text-white font-bold"
                      : "text-slate-300 hover:text-white hover:bg-[#1e2024]/60"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="h-4 w-4 text-[#f09038]" />}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/10 grid grid-cols-2 gap-2">
              <Link
                to="/free-daily-test"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-glow text-[#111317] font-black text-xs py-2.5 px-3 rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <Flame className="h-4 w-4" />
                Free Daily Test
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="bg-[#1e2024] border border-white/10 text-white font-bold text-xs py-2.5 px-3 rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <LayoutDashboard className="h-4 w-4 text-[#f09038]" />
                Student Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
