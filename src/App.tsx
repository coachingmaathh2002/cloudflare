import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import MockTestApp from './pages/MockTestApp';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen text-white font-sans overflow-x-hidden relative">
        <div className="bg-noise pointer-events-none z-0 mix-blend-overlay"></div>
        {/* Glassmorphism ambient background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-zinc-/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-zinc-/30 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-900/20 rounded-full blur-[150px]"></div>
        </div>
        <Navbar />
        <main className="flex-grow flex flex-col relative w-full z-10">
          {/* Decorative Math Background for the whole app */}
          <div className="hidden lg:block fixed top-0 right-0 p-10 opacity-10 pointer-events-none text-right font-serif italic text-4xl leading-loose z-0 select-none text-zinc-/20">
            ∫ f(x) dx = F(x) + C<br/>
            e^{"iπ"} + 1 = 0<br/>
            Δ = b² - 4ac<br/>
            ∑ n=1 to ∞
          </div>
          <div className="relative z-10 flex-grow flex flex-col items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mock-test" element={<MockTestApp />} />
              <Route path="/mock-test/:testId" element={<MockTestApp />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
