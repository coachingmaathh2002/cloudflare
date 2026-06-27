import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import MockTestApp from './pages/MockTestApp';
import UpperPrimaryApp from './pages/UpperPrimaryApp';
import Notes from './pages/Notes';
import Pricing from './pages/Pricing';

import FreeDailyTest from './pages/FreeDailyTest';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen text-slate-50 font-sans overflow-x-hidden relative">
        <div className="bg-noise pointer-events-none z-0 mix-blend-overlay"></div>
        {/* Glassmorphism ambient background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-slate-/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-slate-/30 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-900/20 rounded-full blur-[150px]"></div>
        </div>
        <Navbar />
        <main className="flex-grow flex flex-col relative w-full z-10">
          {/* Decorative Math Background for the whole app */}
          <div className="hidden lg:block fixed top-0 right-0 p-10 opacity-10 pointer-events-none text-right font-serif italic text-4xl leading-loose z-0 select-none text-slate-/20">
            ∫ f(x) dx = F(x) + C<br/>
            e^{"iπ"} + 1 = 0<br/>
            Δ = b² - 4ac<br/>
            ∑ n=1 to ∞
          </div>
          <div className="relative z-10 flex-grow flex flex-col items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mock-test" element={<MockTestApp />} />
              <Route path="/mock-test/:testId" element={<MockTestApp />} />
              <Route path="/upper-primary" element={<UpperPrimaryApp />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/free-daily-test" element={<FreeDailyTest />} />
            </Routes>
          </div>
        </main>
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/91XXXXXXXXXX" 
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="group-hover:scale-110 transition-transform"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </a>
        
        <Footer />
      </div>
    </Router>
  );
}
