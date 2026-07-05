import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useSEO } from "../lib/useSEO";
import {
  BookOpen,
  Award,
  Target,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  FileText,
  Star,
  Quote,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";

const bannerData = [
  {
    id: 'free_test',
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2000&auto=format&fit=crop",
    badge: "🎁 সম্পূর্ণ বিনামূল্যে মক টেস্ট",
    title: (
      <>
        আপনার SLST Math প্রস্তুতি যাচাই করুন <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          প্রতিদিন ফ্রি মক টেস্ট দিয়ে!
        </span>
      </>
    ),
    subtitle:
      "SLST Mathematics-এর সেরা প্রস্তুতির জন্য আজই আমাদের ফ্রি মক টেস্ট দিন। বিস্তারিত সমাধান ও স্কোর চেক করুন সম্পূর্ণ বিনামূল্যে।",
    cta: "এখনই মক টেস্ট দিন",
    gradient: "from-[#1e1b4b] via-[#6d28d9] to-transparent",
    link: "/free-daily-test",
    iconColor: "text-purple-400"
  },
  {
    id: 1,
    image: "/carousel/slide1.webp",
    badge: "🚀 নতুন ব্যাচ শুরু হচ্ছে!",
    title: (
      <>
        টার্গেট <span className="text-yellow-400 drop-shadow-lg">JEE 2027</span>{" "}
        <br className="hidden md:block" /> ক্র্যাশ কোর্সে ভর্তি শুরু!
      </>
    ),
    subtitle:
      "৫০০+ ভিডিও লেকচার, মক টেস্ট এবং ডাউট ক্লিয়ারিং সেশন নিয়ে এখনই শুরু করো সম্পূর্ণ প্রস্তুতি।",
    cta: "আজই এনরোল করো",
    gradient: "from-[#1e1b4b] via-[#4338ca] to-transparent",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop",
    badge: "🏆 SLST MATHEMATICS",
    title: (
      <>
        <span className="text-emerald-400 drop-shadow-lg">SLST Mathematics</span>-এর{" "}
        <br className="hidden md:block" /> নতুন লাইভ ব্যাচ
      </>
    ),
    subtitle:
      "সম্পূর্ণ সিলেবাস কভারেজ, চ্যাপ্টার-ভিত্তিক নোটস, এবং ১০০% পরীক্ষার প্রস্তুতির জন্য মক টেস্ট সিরিজ।",
    cta: "জয়েন করো লাইভ কোর্স",
    gradient: "from-[#064e3b] via-[#059669] to-transparent",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
    badge: "📢 স্পেশাল অফার",
    title: (
      <>
        <span className="text-fuchsia-400 drop-shadow-lg">CSIR NET ও GATE</span>:{" "}
        <br className="hidden md:block" /> নিশ্চিত সাফল্যের লক্ষ্যে!
      </>
    ),
    subtitle:
      "পিওর এবং অ্যাপ্লায়েড ম্যাথমেটিক্স এর স্পেশাল কোর্স। স্কলারশিপ টেস্টের মাধ্যমে ভর্তি হলে পাও ৫০% পর্যন্ত ছাড়!",
    cta: "টেস্টের জন্য রেজিস্টার করো",
    gradient: "from-[#4c1d95] via-[#9333ea] to-transparent",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    badge: "🎓 বিএসসি ও এমএসসি (B.Sc & M.Sc)",
    title: (
      <>
        অনার্স ও পাসের জন্য <br className="hidden md:block" /> <span className="text-rose-400 drop-shadow-lg">স্পেশাল গাইডিং ব্যাচ</span>
      </>
    ),
    subtitle: "WBSU, CU, BU সহ সকল ইউনিভার্সিটির সিলেবাস অনুযায়ী স্পেশাল অফলাইন ও অনলাইন ব্যাচ।",
    cta: "বিস্তারিত জানুন",
    gradient: "from-[#7f1d1d] via-[#dc2626] to-transparent",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1427504494785-319ce83d506c?q=80&w=2000&auto=format&fit=crop",
    badge: "📚 মাধ্যমিক প্রস্তুতি",
    title: (
      <>
        নবম ও দশম শ্রেণীর <br className="hidden md:block" /> <span className="text-cyan-400 drop-shadow-lg">গণিতের ফাউন্ডেশন ব্যাচ</span>
      </>
    ),
    subtitle: "WBBSE স্পেশাল: বেসিক থেকে অ্যাডভান্স কনসেপ্ট, শর্টকাট ট্রিক্স এবং পরীক্ষার সেরা প্রস্তুতি।",
    cta: "অ্যাডমিশন শুরু হয়েছে",
    gradient: "from-[#083344] via-[#0891b2] to-transparent",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop",
    badge: "✨ নতুন সেমিস্টার সিস্টেম",
    title: (
      <>
        একাদশ শ্রেণী (<span className="text-orange-400 drop-shadow-lg">1st & 2nd Sem</span>) <br className="hidden md:block" /> WBCHSE স্পেশাল গাইডেন্স
      </>
    ),
    subtitle: "নতুন প্যাটার্নের সাথে মিল রেখে সম্পূর্ণ স্টাডি মেটেরিয়াল এবং বিষয়ভিত্তিক মক টেস্ট।",
    cta: "সিলেবাস জানুন",
    gradient: "from-[#7c2d12] via-[#ea580c] to-transparent",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop",
    badge: "🎯 উচ্চমাধ্যমিক স্পেশাল",
    title: (
      <>
        দ্বাদশ শ্রেণী (<span className="text-pink-400 drop-shadow-lg">3rd & 4th Sem</span>) <br className="hidden md:block" /> মিশন বোর্ড এক্সাম
      </>
    ),
    subtitle: "বোর্ড এক্সাম এবং জয়েন্ট (WBJEE/JEE MAINS) এর জন্য একদম পারফেক্ট ম্যাথমেটিক্স স্ট্র্যাটেজি।",
    cta: "জয়েন করো আজই",
    gradient: "from-[#831843] via-[#db2777] to-transparent",
  }
];

const testimonials = [
  {
    name: "Arijit Das",
    exam: "Cracked JEE Advanced (AIR 2530)",
    text: "Raj sir's approach to calculus entirely changed how I view mathematics. The chapter-wise mock tests match our actual exam level perfectly.",
    rating: 5,
  },
  {
    name: "Sneha Roy",
    exam: "UGC CSIR NET JRF",
    text: "The abstract algebra and real analysis live classes were a lifesaver. Sir explains the most complex theorems with such ease and clarity.",
    rating: 5,
  },
  {
    name: "Soumya Banerjee",
    exam: "WBJEE Rank 102",
    text: "I was extremely weak in Coordinate Geometry before joining. Thanks to Sir's unique problem-solving techniques, it became my strongest area.",
    rating: 5,
  },
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useSEO(
    "Best SLST Mathematics & JEE Mains Coaching",
    "Master Mathematics for SLST, JEE Mains, WBJEE, GATE, and CSIR NET with Raj Sir. Access free daily mock tests, study materials, and premium video lectures."
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex-1">
      {/* Banner Section */}
      <section className="pt-6 pb-2 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[500px] md:h-[600px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(250,204,21,0.15)] group flex">
          
          <div className="relative flex-1 h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={bannerData[currentBanner].image}
                  alt="Coaching Banner"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop";
                  }}
                  className="w-full h-full object-cover mix-blend-luminosity opacity-40 transition-opacity duration-1000"
                />
                
                {/* Math Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                {/* Overlay mask */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${bannerData[currentBanner].gradient} opacity-95 transition-all duration-1000`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent"></div>
                
                {/* Banner Text Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 lg:p-16 w-full h-full flex flex-col justify-end pb-16 md:pb-20 z-10">
                  <div className="max-w-3xl">
                    <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.3)] backdrop-blur-md">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      {bannerData[currentBanner].badge}
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-slate-50 uppercase tracking-tight leading-[1.05] drop-shadow-2xl mb-6">
                      {bannerData[currentBanner].title}
                    </h2>
                    <p className="text-slate-300 text-sm md:text-lg mb-8 md:mb-10 font-medium leading-relaxed max-w-2xl border-l-4 border-yellow-400 pl-4">
                      {bannerData[currentBanner].subtitle}
                    </p>
                    <Link
                      to={(bannerData[currentBanner] as any).link || "/courses"}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 px-8 py-4 rounded-xl font-black text-sm md:text-base uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:-translate-y-1"
                    >
                      {bannerData[currentBanner].cta}{" "}
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Banner Navigation Dots */}
          <div className="absolute bottom-8 right-8 flex gap-3 z-20">
            {bannerData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentBanner ? "w-10 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" : "w-2.5 bg-white/30 hover:bg-white/60"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Bento Grid Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[#020617]">
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Main Hero Card (Large, Span 8) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-8 row-span-2 relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 lg:p-12 overflow-hidden group shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] group-hover:bg-pink-500/20 transition-colors duration-700"></div>
              
              <div className="relative z-10 mb-8">
                <div className="inline-flex gap-2 mb-6">
                  <span className="bg-pink-500/10 text-pink-400 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-pink-500/20 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(236,72,153,0.15)] flex items-center">
                    <Star className="w-3.5 h-3.5 mr-2 fill-pink-400" /> Premium Coaching
                  </span>
                </div>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tighter mb-6 leading-[1.05] text-white font-black drop-shadow-lg">
                  Master{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    Mathematics
                  </span>{" "}
                  <br />
                  with Confidence
                </h1>
                <p className="text-slate-300 text-base sm:text-xl max-w-xl leading-relaxed font-medium">
                  Join the elite circle of toppers. Expert coaching for JEE Mains, SLST Mathematics, and Advanced Competitive Exams.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10">
                <Link
                  to="/courses"
                  className="bg-white hover:bg-slate-100 text-slate-900 font-black py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest"
                >
                  <PlayCircle className="h-5 w-5" /> Start Learning
                </Link>
                <Link
                  to="/mock-test"
                  className="bg-slate-800/50 border border-white/10 hover:border-pink-500/30 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:-translate-y-1 flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest backdrop-blur-md shadow-lg"
                >
                  <Target className="h-5 w-5 text-pink-400" /> Mock Tests
                </Link>
              </div>
            </motion.div>

            {/* Stats Card 1 (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-4 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] flex flex-col justify-center items-center text-center shadow-xl group hover:border-white/20 transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter leading-none mb-3 drop-shadow-md">
                500+
              </p>
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
                Video Lectures
              </p>
            </motion.div>

            {/* Free Test Card (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-4 relative group rounded-[32px] p-[1px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Link to="/free-daily-test" className="relative h-full bg-[#020617] backdrop-blur-xl rounded-[31px] p-8 flex flex-col justify-between overflow-hidden shadow-2xl block">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[40px] group-hover:bg-emerald-500/30 transition-colors"></div>
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.6)] z-20 animate-pulse rotate-12">
                  Live Free
                </div>
                <div className="bg-gradient-to-br from-emerald-400 to-teal-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)] mb-6 z-10 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-slate-900" />
                </div>
                <div className="z-10">
                  <h3 className="font-display font-black text-2xl text-white tracking-tight mb-2">
                    Free Daily Test
                  </h3>
                  <p className="text-emerald-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2">
                    SLST Math Exam <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                  </p>
                </div>
              </Link>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-10 border-y border-white/5 bg-[#020617] overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex gap-16 px-8 items-center justify-around shrink-0">
                <MarqueeItem text="JEE MAINS" />
                <MarqueeItem text="SLST MATH" />
                <MarqueeItem text="GATE 2025" />
                <MarqueeItem text="CSIR NET" />
                <MarqueeItem text="WBJEE" />
             </div>
          ))}
        </motion.div>
      </section>

      {/* About Raj Sir Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 p-1 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl bg-slate-950/60">
              <div className="md:col-span-5 relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-600 to-violet-600 p-1 mb-6 shadow-[0_0_30px_rgba(219,39,119,0.3)]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-[#090014] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
                      alt="Raj Sir"
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                    />
                  </div>
                </div>
                <h3 className="font-display text-3xl text-slate-50 font-bold tracking-tight mb-2 uppercase">
                  Raj Sir
                </h3>
                <p className="text-pink-400 font-bold text-xs uppercase tracking-widest mb-4">
                  Mentor & Founder
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Award className="h-4 w-4 text-violet-400" /> 9+ Years Experience
                </div>
              </div>
              <div className="md:col-span-7 p-8 md:p-12 relative z-10">
                <h4 className="flex items-center gap-3 text-lg font-bold text-slate-50 mb-6 uppercase tracking-wider">
                  <GraduationCap className="h-6 w-6 text-pink-400" />
                  Credentials & Qualifications
                </h4>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-white/10 p-1.5 rounded text-pink-300">
                      <BookOpen className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        BSc in Mathematics
                      </p>
                      <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Bankura Christian College
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-white/10 p-1.5 rounded text-pink-300">
                      <BookOpen className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        MSc in Pure Mathematics
                      </p>
                      <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        The University of Burdwan
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-pink-600/20 p-1.5 rounded text-pink-400">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        GATE
                      </p>
                      <p className="text-[11px] text-pink-400/80 uppercase tracking-wider font-bold">
                        Qualified
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 bg-pink-600/20 p-1.5 rounded text-pink-400">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        CSIR NET Mathematical Sciences (LS)
                      </p>
                      <p className="text-[11px] text-pink-400/80 uppercase tracking-wider font-bold">
                        Qualified
                      </p>
                    </div>
                  </li>
                </ul>

                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Class 9 to 12 (WB, CBSE, ICSE)",
                    "WBJEE & JEE Mains",
                    "UG Math Honours",
                    "Engineering Mathematics",
                    "NSOU UG & PG Courses",
                  ].map((subject, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-800/60 border border-white/10 text-slate-300 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-pink-200/60 uppercase tracking-widest">
              Premium Curriculum
            </h3>
            <Link
              to="/courses"
              className="text-pink-400 text-xs font-bold hover:text-pink-300"
            >
              View All Courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-50">
            <CourseCard
              title="JEE Mains Mathematics"
              subtitle="Limit, Continuity, Differentiability, Algebra & Coordinate Geometry modules."
              icon="∫"
              stats="12/20 Lessons"
              progress={60}
              active
            />
            <CourseCard
              title="SLST Mathematics"
              subtitle="Real Analysis, Abstract Algebra, Mechanics and Previous Year Questions."
              icon="Σ"
              stats="15/15 Lessons"
              progress={100}
              completed
            />
            <CourseCard
              title="Advanced Mathematics"
              subtitle="Higher Math Foundations, Application based problems for GATE/NET."
              icon="⌬"
              stats="0/15 Lessons"
              progress={0}
              enrolling
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-[#020617] w-full border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 uppercase tracking-[0.2em] mb-3">
              Success Stories
            </h3>
            <h2 className="font-display text-4xl md:text-5xl text-slate-50 font-black uppercase tracking-tight">
              Our Proud Achievers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[32px] relative group hover:border-pink-500/30 transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(236,72,153,0.1)] flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]"></div>
                <Quote className="absolute top-8 right-8 h-10 w-10 text-white/5 group-hover:text-pink-500/10 transition-colors duration-500" />
                
                <div className="relative z-10">
                  <div className="flex gap-1.5 mb-6 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    "{testi.text}"
                  </p>
                </div>
                
                <div className="mt-auto pt-6 flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-600/20 to-violet-600/20 border border-pink-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                    <span className="uppercase font-black text-pink-300 text-lg">
                      {testi.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-black text-white uppercase tracking-wider">
                      {testi.name}
                    </p>
                    <p className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.1em] text-pink-400 mt-0.5">
                      {testi.exam}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bottom Banner */}
      <section className="py-12 my-8 border-t border-white/10 bg-[#0B1120] w-full backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden group transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Background Accent */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/30 transition-colors"></div>

              <div className="relative z-10">
                <p className="text-yellow-400 font-bold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-yellow-400" /> New Exam Live
                </p>
                <h4 className="text-2xl font-black mb-2 text-slate-50 drop-shadow-md">
                  SLST Sunday Mock Marathon
                </h4>
                <p className="text-xs text-slate-300 font-bold tracking-wider uppercase">
                  30 Questions • 60 Minutes • Negative Marking
                </p>
              </div>
              <Link
                to="/mock-test"
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] shrink-0 whitespace-nowrap transition-all group-hover:-translate-y-1 relative z-10 flex items-center gap-2"
              >
                Attempt Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex gap-4">
              <Link to="/notes" className="flex-1 bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-sky-400/30 hover:bg-slate-800 transition-all group shadow-xl hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-2xl bg-sky-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="text-sky-400 h-7 w-7" />
                </div>
                <p className="text-base font-black text-slate-50">PDF Notes</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold group-hover:text-sky-400 transition-colors">
                  Premium Library
                </p>
              </Link>
              <Link to="/courses" className="flex-1 bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-pink-400/30 hover:bg-slate-800 transition-all group shadow-xl hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-2xl bg-pink-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="text-pink-400 h-7 w-7" />
                </div>
                <p className="text-base font-black text-slate-50">Video Lectures</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold group-hover:text-pink-400 transition-colors">
                  24/7 Access
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({
  title,
  subtitle,
  icon,
  stats,
  progress,
  active,
  completed,
  enrolling,
}: any) {
  return (
    <div className="bg-gradient-to-b from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] relative overflow-hidden group hover:border-pink-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-serif italic border shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 ${active ? "bg-gradient-to-br from-pink-600/20 to-violet-600/20 text-pink-400 border-pink-500/20" : completed ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-800/60 text-slate-300 border-white/10"}`}>
          {icon}
        </div>
        {active && (
          <span className="bg-pink-600/20 text-pink-300 text-[10px] font-bold px-3 py-1.5 rounded border border-pink-600/30 uppercase tracking-widest shadow-sm">
            Active
          </span>
        )}
        {completed && (
          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded border border-emerald-500/20 uppercase tracking-widest shadow-sm">
            Chapterwise
          </span>
        )}
        {enrolling && (
          <span className="bg-slate-800/60 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded border border-white/10 uppercase tracking-widest shadow-sm">
            Enrolling
          </span>
        )}
      </div>
      <h4 className="font-display font-bold text-xl mb-3 relative z-10 text-white drop-shadow-sm group-hover:text-pink-100 transition-colors">
        {title}
      </h4>
      <p className="text-sm text-slate-400 mb-8 leading-relaxed relative z-10 flex-1 font-medium">
        {subtitle}
      </p>

      <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-auto relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {stats}
          </div>
          <div className="text-[10px] font-black text-pink-400">
            {progress}%
          </div>
        </div>
        <div className="w-full bg-slate-950/50 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-inner">
          <div
            className={`h-full rounded-full relative overflow-hidden ${completed ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" : "bg-gradient-to-r from-pink-600 to-violet-600 shadow-[0_0_10px_rgba(219,39,119,0.8)]"}`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat animate-shine"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 text-slate-400/60 uppercase font-display font-black tracking-widest text-xl sm:text-2xl hover:text-white transition-colors duration-300">
      <Star className="w-6 h-6 fill-slate-800 text-slate-800" />
      {text}
    </div>
  );
}
