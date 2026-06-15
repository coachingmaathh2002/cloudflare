import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap, LayoutDashboard, Calculator } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Mock Tests', path: '/mock-test' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="bg-[#090014]/60 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shrink-0 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16 w-full">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center font-bold text-xl italic border border-white/20 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]">Σ</div>
              <div className="flex flex-col">
                <span className="font-display font-medium text-base tracking-tight leading-none uppercase bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">RAJ SIR</span>
                <span className="text-[10px] text-purple-200/50 font-medium tracking-widest uppercase mt-0.5">MATH CLASSES</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="mr-6 flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-md transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link 
              to="/dashboard"
              className="bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 text-white font-bold py-1.5 px-4 rounded-lg transition-all shadow-lg backdrop-blur-md flex items-center gap-2 text-xs"
            >
              <LayoutDashboard className="h-4 w-4 text-purple-400" />
              Student Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:flex hidden md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#090014]/95 backdrop-blur-xl border-b border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2.5 rounded-md text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
