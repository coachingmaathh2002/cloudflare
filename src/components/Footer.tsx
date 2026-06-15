import React from 'react';
import { Calculator, MapPin, Phone, Mail, Facebook, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#050810] border-t border-blue-900/20 text-gray-500 text-[10px] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1 border-r border-blue-900/20 pr-4">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg italic border border-blue-400 text-white">Σ</div>
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-tight leading-none uppercase text-blue-400">RAJ SIR</span>
                <span className="text-[9px] text-gray-400 font-medium tracking-widest uppercase mt-0.5">MATH CLASSES</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Expert coaching for JEE Mains, SLST, and advanced competitive exams.
            </p>
            <div className="flex space-x-3 text-lg">
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Youtube className="h-4 w-4" /></a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Send className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-blue-400 text-[10px]">Quick Links</h3>
            <ul className="space-y-2 font-medium">
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">All Courses</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">Study Materials</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">Mock Tests</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-blue-400 text-[10px]">Legal</h3>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-blue-400 text-[10px]">Contact</h3>
            <ul className="space-y-3 font-medium">
               <li className="flex items-center gap-2">
                 <Phone className="h-3 w-3 text-blue-500" /> +91 83458 19377
               </li>
               <li className="flex items-center gap-2">
                 <Mail className="h-3 w-3 text-blue-500" /> info@rajsirmathclasses.com
               </li>
               <li className="flex items-center gap-2">
                 <MapPin className="h-3 w-3 text-blue-500" /> Kolkata, West Bengal
               </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-blue-900/20 gap-4">
           <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} RAJ SIR MATH CLASSES</p>
            <p className="text-blue-900 hidden md:block">|</p>
            <a href="#" className="hover:text-blue-400 transition-colors hidden md:block">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors hidden md:block">Terms of Service</a>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Server: Kolkata-01</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Latency: 24ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
