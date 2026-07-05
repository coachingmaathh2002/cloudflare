import React from 'react';
import { CheckCircle2, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useSEO } from '../lib/useSEO';

export default function Pricing() {
  useSEO(
    "Premium Coaching Plans & Fees | Raj Sir",
    "Compare and select the best premium math coaching plans with Raj Sir. Access advanced test analytics, personal guidance, live problem solving sessions, and exclusive materials."
  );

  return (
    <div className="w-full flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="font-display text-4xl lg:text-5xl tracking-tight mb-4 text-slate-50 uppercase drop-shadow-lg">
          Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">Premium</span> Access
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Elevate your mathematical journey with advanced analytics, 24/7 AI doubt solving, and exclusive mock tests designed by Raj Sir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Basic Plan */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8 shadow-xl flex flex-col hover:border-slate-700 transition-colors">
          <h3 className="text-xl font-bold text-slate-50 uppercase tracking-widest mb-2">Foundation</h3>
          <p className="text-sm text-slate-400 mb-6 border-b border-white/5 pb-6">Perfect for self-paced learners.</p>
          <div className="mb-6">
            <span className="text-4xl font-display font-bold text-slate-50">Free</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <Feature text="Access to Free Notes" />
            <Feature text="1 Mock Test / Month" />
            <Feature text="Community Support" />
          </ul>
          <Link to="/courses" className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-50 rounded-xl text-center font-bold text-sm transition-colors border border-white/10">
            Start Free
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(219,39,119,0.15)] flex flex-col relative transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            Most Popular
          </div>
          <h3 className="text-xl font-bold text-pink-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            Pro Scholar <Star className="h-5 w-5 fill-current" />
          </h3>
          <p className="text-sm text-slate-300 mb-6 border-b border-white/10 pb-6">For serious JEE & SLST aspirants.</p>
          <div className="mb-6 flex items-end gap-1">
            <span className="text-4xl font-display font-bold text-slate-50">₹999</span>
            <span className="text-slate-400 text-sm mb-1">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <Feature text="All Premium Video Lectures" />
            <Feature text="Unlimited Mock Tests" />
            <Feature text="Advanced Analytics Dashboard" />
            <Feature text="Live Leaderboard Access" />
            <Feature text="Chapter-wise PDF Notes" />
          </ul>
          <Link to="/dashboard" className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-slate-50 rounded-xl text-center font-bold text-sm transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] border border-white/20">
            Upgrade to Pro
          </Link>
        </div>

        {/* Ultra Plan */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8 shadow-xl flex flex-col hover:border-violet-500/30 transition-colors">
          <h3 className="text-xl font-bold text-violet-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            Ultra Elite <Zap className="h-5 w-5 fill-current text-violet-400" />
          </h3>
          <p className="text-sm text-slate-400 mb-6 border-b border-white/5 pb-6">Personalized 1-on-1 mentorship.</p>
          <div className="mb-6 flex items-end gap-1">
            <span className="text-4xl font-display font-bold text-slate-50">₹2499</span>
            <span className="text-slate-400 text-sm mb-1">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <Feature text="Everything in Pro Scholar" />
            <Feature text="24/7 AI Doubt Solver" />
            <Feature text="1-on-1 Video Mentoring" />
            <Feature text="Physical Study Material" />
          </ul>
          <Link to="/dashboard" className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-50 rounded-xl text-center font-bold text-sm transition-colors border border-violet-500/20 hover:border-violet-400/50">
            Go Ultra
          </Link>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
      <span className="text-sm text-slate-200">{text}</span>
    </li>
  );
}
