import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../lib/useSEO";
import {
  Calculator,
  Target,
  ChevronRight,
  School,
  Star,
  Users,
  Award,
  Zap,
  Flame,
  Plus,
  Minus
} from "lucide-react";

const mockTestCategories = [
  {
    id: "slst",
    title: "SLST Math",
    subtitle: "IX-X & XI-XII Practice",
    gradient: "from-[#ff007f] via-[#ff1493] to-[#ff3399]",
    shadow: "shadow-[0_12px_35px_rgba(255,0,127,0.45)]",
    glow: "group-hover:shadow-[0_16px_45px_rgba(255,0,127,0.7)]",
    icon: Calculator,
    link: "/free-daily-test",
    badge: "Free Daily Test"
  },
  {
    id: "wbjee",
    title: "WBJEE Math",
    subtitle: "State Engineering Entrance",
    gradient: "from-[#ff8800] via-[#ffaa00] to-[#ff5500]",
    shadow: "shadow-[0_12px_35px_rgba(255,136,0,0.45)]",
    glow: "group-hover:shadow-[0_16px_45px_rgba(255,136,0,0.7)]",
    icon: Zap,
    link: "/mock-test",
    badge: "Mock Series"
  },
  {
    id: "jee_mains",
    title: "JEE Mains",
    subtitle: "All India Level Tests",
    gradient: "from-[#00f2fe] via-[#00c6ff] to-[#0072ff]",
    shadow: "shadow-[0_12px_35px_rgba(0,198,255,0.45)]",
    glow: "group-hover:shadow-[0_16px_45px_rgba(0,198,255,0.7)]",
    icon: Target,
    link: "/mock-test",
    badge: "Full Syllabus"
  },
  {
    id: "upper_primary",
    title: "Upper Primary TET",
    subtitle: "Teacher Eligibility Test",
    gradient: "from-[#a855f7] via-[#8b5cf6] to-[#6366f1]",
    shadow: "shadow-[0_12px_35px_rgba(168,85,247,0.45)]",
    glow: "group-hover:shadow-[0_16px_45px_rgba(168,85,247,0.7)]",
    icon: School,
    link: "/upper-primary",
    badge: "Special Mocks"
  },
  {
    id: "jee_advanced",
    title: "JEE Advanced",
    subtitle: "High Difficulty IIT Prep",
    gradient: "from-[#ff0055] via-[#ff2a00] to-[#d90429]",
    shadow: "shadow-[0_12px_35px_rgba(255,0,85,0.45)]",
    glow: "group-hover:shadow-[0_16px_45px_rgba(255,0,85,0.7)]",
    icon: Award,
    link: "/mock-test",
    badge: "Advanced Level"
  }
];

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Class 10 Student",
    quote: "Raj Sir makes complex algebra so easy to understand! My grades improved significantly within just two months.",
    stars: 5,
    initials: "AS",
    color: "bg-amber-500/20 text-amber-300"
  },
  {
    name: "Priya Patel",
    role: "Class 12 Student",
    quote: "The best math coaching I've ever attended. The shortcut methods for calculus are a lifesaver for competitive exams.",
    stars: 5,
    initials: "PP",
    color: "bg-purple-500/20 text-purple-300"
  },
  {
    name: "Rahul Kumar",
    role: "Class 9 Student",
    quote: "I used to be afraid of geometry, but now it's my favorite subject. Thank you Raj Sir for the amazing guidance!",
    stars: 5,
    initials: "RK",
    color: "bg-pink-500/20 text-pink-300"
  },
  {
    name: "Aniket Sen",
    role: "SLST Aspirant",
    quote: "Cracking SLST Mathematics was my goal. The chapter-wise handwritten notes and mock test solutions made it completely straightforward.",
    stars: 5,
    initials: "AS",
    color: "bg-emerald-500/20 text-emerald-300"
  }
];

const faqData = [
  {
    q: "Raj Sir-এর ম্যাথ ক্লাসে কীভাবে জয়েন করব?",
    a: "আমাদের লাইভ ক্লাস বা মক টেস্টে জয়েন করার জন্য সরাসরি 'Enroll Now' বাটনে ক্লিক করতে পারেন অথবা সরাসরি আমাদের নম্বর +91 83458 19377 এ WhatsApp করতে পারেন।"
  },
  {
    q: "SLST Mathematics-এর জন্য কি মক টেস্ট ও নোটস পাওয়া যায়?",
    a: "হ্যাঁ! SLST Mathematics (IX-X এবং XI-XII) পরীক্ষার জন্য সম্পূর্ণ সিলেবাস অনুযায়ী রাজ স্যারের তৈরি হ্যান্ড-রিটেন নোটস ও ফ্রি ডেলি মক টেস্ট পাওয়া যাচ্ছে।"
  },
  {
    q: "ওয়েবসাইটের ফ্রি মক টেস্ট দেওয়ার নিয়ম কী?",
    a: "আমাদের 'Free Daily Test' পেইজে গিয়ে নাম ও ফোন নম্বর দিয়ে সরাসরি সম্পূর্ণ বিনামূল্যে প্রতিদিনের লাইভ মক টেস্টে অংশ নিতে পারবেন।"
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO(
    "Raj Sir Math Classes | SLST, WBJEE & JEE Mains Mathematics Coaching",
    "Master Mathematics for SLST, WBJEE, JEE Mains, Upper Primary TET, and JEE Advanced with Raj Sir. Practice free daily mock tests and access handwritten notes."
  );

  return (
    <div className="w-full min-h-screen bg-[#111317] text-[#e2e2e8] pb-24 md:pb-12">
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        
        {/* Top Target Exam Banner Strip */}
        <div className="mb-10 overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-2.5 min-w-max">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mr-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Flame className="w-4 h-4 text-amber-400" /> Target Exams:
            </span>
            <Link
              to="/free-daily-test"
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Free SLST Daily Test
            </Link>
            <Link
              to="/mock-test"
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 font-bold text-xs hover:bg-white/10 transition-all"
            >
              WBJEE Math
            </Link>
            <Link
              to="/mock-test"
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 font-bold text-xs hover:bg-white/10 transition-all"
            >
              JEE Mains &amp; Advanced
            </Link>
            <Link
              to="/upper-primary"
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 font-bold text-xs hover:bg-white/10 transition-all"
            >
              Upper Primary TET
            </Link>
            <Link
              to="/notes"
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 font-bold text-xs hover:bg-white/10 transition-all"
            >
              Free Notes PDF
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20 relative">
          {/* Background ambient glow */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f09038]/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Master <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f09038] via-[#ffb77e] to-[#c5c0ff]">
                Mathematics
              </span> <br />
              &amp; Secure Your Future
            </h1>
            <p className="text-slate-300 text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0 font-normal leading-relaxed">
              High-quality math coaching designed to simplify complex concepts. Build a strong foundation and excel in your academic journey with expert guidance.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-10">
              <Link
                to="/courses"
                className="bg-gradient-glow text-[#111317] font-bold px-8 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all text-lg shadow-[0_8px_32px_rgba(240,144,56,0.35)] flex items-center gap-2"
              >
                Enroll Now <ChevronRight className="w-5 h-5" />
              </Link>

              <div className="flex gap-8">
                <div className="text-left">
                  <p className="text-2xl font-black text-white">10K+</p>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Students</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-black text-white">50+</p>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Courses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-md mx-auto md:max-w-none mt-4 md:mt-0">
            {/* Hero Image Container */}
            <div className="relative w-full aspect-square rounded-[3rem] bg-[#1e2024] overflow-hidden border border-white/10 shadow-2xl">
              {/* Decorational background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f09038]/20 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#f09038] rounded-full opacity-70 blur-md"></div>
              <img
                className="absolute inset-0 w-full h-full object-cover object-top drop-shadow-2xl z-10"
                alt="Raj Sir Math Student"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGE5XUoMktB2Q7bTljhSDLBgs2N0aDB_UKufnPN73u4JsUl9FUWk-DUB7Dsh_5QcJtA9siLsc-JAgF_PYiwjcWOrW-fvE4QcryD2zkiaIxGXFkWIh-8zQfskSpnbH9BL-Hg99CDx9daaTL1naNIDMc4q5D1sk9vt2c5nfZ3n66Dx9ktUUdN2pcItcsyiMa6igwsHClp9vmZQ9mPCOJsWJNK142EUtTF_SOWkdPu7L5nSBNUvW5FDAXMA"
              />

              {/* Floating Widgets */}
              <div className="absolute top-12 -left-4 md:left-4 z-20 glass-panel p-3.5 pr-6 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#ff7ea1]/20 flex items-center justify-center text-[#ff7ea1]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white leading-tight">10K+</p>
                  <p className="text-[10px] text-slate-300 font-medium">Assisted Students</p>
                </div>
              </div>

              <div className="absolute bottom-8 -right-2 md:right-8 z-20 glass-panel p-4 rounded-2xl w-48 shadow-2xl border border-white/10">
                <p className="text-xs font-bold text-white mb-3">Performance Chart</p>
                <div className="flex items-end gap-2 h-16 w-full">
                  <div className="w-full bg-white/20 rounded-t-sm h-[30%]"></div>
                  <div className="w-full bg-[#ff7ea1] rounded-t-sm h-[50%]"></div>
                  <div className="w-full bg-white/20 rounded-t-sm h-[40%]"></div>
                  <div className="w-full bg-white/20 rounded-t-sm h-[70%]"></div>
                  <div className="w-full bg-[#f09038] rounded-t-sm h-[90%]"></div>
                  <div className="w-full bg-[#4034ae] rounded-t-sm h-[60%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mock Tests Section (Updated as requested) */}
        <section className="mt-20 mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-black text-[#f09038] uppercase tracking-widest bg-[#f09038]/10 px-3 py-1 rounded-full border border-[#f09038]/20">
                Online Practice Portal
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                Our Mock Tests
              </h2>
            </div>
            <Link
              to="/mock-test"
              className="text-xs font-extrabold text-[#f09038] hover:text-[#ffb77e] flex items-center gap-1 group transition-all"
            >
              <span>View All Practice Series</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {mockTestCategories.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className={`bg-gradient-to-br ${item.gradient} rounded-[28px] p-6 sm:p-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:-translate-y-2 transition-all duration-300 ${item.shadow} ${item.glow} group relative overflow-hidden border border-white/30`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform shadow-md border border-white/30 shrink-0">
                      <IconComp className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                    <span className="text-[10px] sm:text-xs uppercase font-black tracking-wider bg-black/35 text-white px-3 py-1 rounded-full backdrop-blur-md border border-white/30 shadow-sm shrink-0 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-white text-xl sm:text-2xl font-black mb-1.5 leading-tight drop-shadow-sm tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/95 text-xs sm:text-sm font-semibold leading-snug drop-shadow-sm">
                      {item.subtitle}
                    </p>
                    <div className="w-12 h-1.5 bg-white/70 rounded-full mt-3.5 group-hover:w-24 transition-all"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Free Daily Mock Test Highlight Banner */}
        <section className="mb-20 bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 p-8 md:p-12 rounded-[32px] border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                FREE SLST MATH DAILY MOCK TEST
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                সম্পূর্ণ বিনামূল্যে প্রতিদিনের SLST Math মক টেস্ট দিন!
              </h3>
              <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed mb-6">
                আপনার পরীক্ষার সময় ধরে প্রতিটি প্রশ্নের বিস্তারিত স্টেপ-বাই-স্টেপ সমাধান, ইনস্ট্যান্ট স্কোর এবং সঠিক পারফরম্যান্স ট্র্যাকিং পান সম্পূর্ণ ফ্রিতে।
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/free-daily-test"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-105 flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 fill-slate-950" /> এখনই মক টেস্ট শুরু করুন
                </Link>
                <Link
                  to="/courses"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all border border-white/10"
                >
                  ফুল কোর্স ডাউনলোড করুন
                </Link>
              </div>
            </div>

            <div className="bg-slate-950/90 p-6 rounded-2xl border border-white/10 shadow-2xl w-full max-w-sm text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" /> Daily Test Stats
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LIVE NOW</span>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="font-semibold">মোট মক সেট:</span>
                  <span className="font-extrabold text-white">50+ Tests</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="font-semibold">নেগেティブ মার্কিং:</span>
                  <span className="font-extrabold text-red-400">0.25 Active</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="font-semibold">সল্যুশন গাইড:</span>
                  <span className="font-extrabold text-emerald-400">Step-by-Step</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              What Our Students Say
            </h2>
            <p className="text-sm text-slate-400 font-medium">
              Real feedback from aspirants who transformed their mathematics performance
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar pb-4">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[85%] md:w-[380px] snap-center bg-[#1a1c20] p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-extrabold text-sm border border-white/10`}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-white">{t.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(t.stars)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 bg-[#1a1c20] p-8 md:p-12 rounded-[32px] border border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-[#f09038] uppercase tracking-widest">
                Support &amp; Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#111317] border border-white/10 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex justify-between items-center text-sm sm:text-base font-bold text-white hover:text-[#f09038] transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <Minus className="w-4 h-4 shrink-0 text-[#f09038]" /> : <Plus className="w-4 h-4 shrink-0 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-white/5 pt-3 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
