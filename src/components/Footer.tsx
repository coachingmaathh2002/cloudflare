import React from 'react';
import { MapPin, Phone, Mail, Facebook, Youtube, Send, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#111317] border-t border-white/10 text-slate-400 text-xs w-full relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-1 pr-4">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-9 h-9 bg-gradient-glow rounded-lg flex items-center justify-center font-black text-lg italic border border-white/20 text-[#111317] shadow-[0_0_15px_rgba(240,144,56,0.35)]">
                Σ
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight uppercase text-white group-hover:text-[#ffb77e] transition-colors">
                  RAJ SIR MATH CLASSES
                </span>
                <span className="text-[10px] text-[#f09038] font-bold tracking-widest uppercase">
                  WEST BENGAL'S NO. 1
                </span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed text-xs">
              Bengal's premier online & offline coaching platform for SLST Mathematics, Upper Primary, JEE, CSIR NET, and Honours Mathematics.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1e2024] border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#111317] hover:bg-[#f09038] hover:border-[#f09038] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1e2024] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-500 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/918345819377"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1e2024] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                aria-label="Telegram / WhatsApp"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#f09038] font-extrabold mb-4 uppercase tracking-wider text-xs border-b border-white/10 pb-2">
              Explore Programs
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/free-daily-test" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Free Daily Test Series
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#ffb77e] transition-colors">
                  SLST Mathematics Batch
                </Link>
              </li>
              <li>
                <Link to="/upper-primary" className="hover:text-[#ffb77e] transition-colors">
                  Upper Primary TET Prep
                </Link>
              </li>
              <li>
                <Link to="/notes" className="hover:text-[#ffb77e] transition-colors">
                  Free PDF Study Materials
                </Link>
              </li>
              <li>
                <Link to="/mock-test" className="hover:text-[#ffb77e] transition-colors">
                  Full Mock Test Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#f09038] font-extrabold mb-4 uppercase tracking-wider text-xs border-b border-white/10 pb-2">
              Student Support
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/pricing" className="hover:text-[#ffb77e] transition-colors">
                  Course Fee & Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#ffb77e] transition-colors">
                  Student Login Portal
                </Link>
              </li>
              <li>
                <a href="https://wa.me/918345819377" className="hover:text-[#ffb77e] transition-colors">
                  Admission Guidance
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#ffb77e] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#f09038] font-extrabold mb-4 uppercase tracking-wider text-xs border-b border-white/10 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 text-xs font-medium">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#f09038] shrink-0" />
                <a href="tel:918345819377" className="hover:text-white transition-colors">
                  +91 83458 19377
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#f09038] shrink-0" />
                <a href="mailto:info@rajsirmathclasses.com" className="hover:text-white transition-colors">
                  info@rajsirmathclasses.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#f09038] shrink-0 mt-0.5" />
                <span>Kolkata & Midnapore, West Bengal</span>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  100% Verified Coaching Center
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/10 gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} RAJ SIR MATH CLASSES. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Live Exam Server Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
