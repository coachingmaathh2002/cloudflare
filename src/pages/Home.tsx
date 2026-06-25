import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
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
                      to="/courses"
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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-slate-900 to-[#0A0F1D] opacity-100 z-0"></div>
        
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-pink-600/20 via-transparent to-transparent opacity-60 z-0 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-600/15 via-transparent to-transparent opacity-60 z-0 blur-3xl pointer-events-none"></div>
        
        {/* Floating Math Symbols */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.04] text-white font-serif select-none pointer-events-none z-0">
          <span className="absolute top-20 left-[10%] text-5xl font-black">∫f(x)dx</span>
          <span className="absolute bottom-20 right-[15%] text-3xl font-black">sin²θ + cos²θ = 1</span>
          <span className="absolute top-1/3 left-[20%] text-8xl font-black">∑</span>
          <span className="absolute top-10 right-[25%] text-6xl font-black">π</span>
          <span className="absolute bottom-1/4 left-[30%] text-4xl font-black">e^&#123;iπ&#125; + 1 = 0</span>
          <span className="absolute top-1/2 right-[10%] text-7xl font-black">∞</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="lg:col-span-8"
            >
              <div className="inline-flex gap-2 mb-6">
                <span className="bg-pink-600/10 text-pink-400 px-3 flex items-center py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-pink-600/20 uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(219,39,119,0.2)]">
                  <Star className="w-3 h-3 mr-1.5 fill-pink-400" /> Premium Coaching
                </span>
                <span className="bg-slate-800/60 text-slate-300 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-white/10 uppercase tracking-widest backdrop-blur-md">
                  Live Classes
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-4 leading-none text-slate-50 uppercase drop-shadow-2xl font-black">
                Master{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 drop-shadow-[0_0_30px_rgba(219,39,119,0.3)]">
                  Mathematics
                </span>{" "}
                <br />
                with Confidence
              </h1>
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed font-medium">
                Join the elite circle of toppers. Expert coaching for JEE Mains,
                SLST Mathematics, Engineering Mathematics, and Advanced
                Competitive Exams with personalized analytics.
                <span className="block mt-4 text-pink-400 font-bold uppercase tracking-wider text-xs sm:text-sm">EASY TO LEARN, EASY TO SCORE!</span>
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                <Link
                  to="/courses"
                  className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-slate-50 font-black py-3.5 px-8 rounded-xl transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(219,39,119,0.4)] hover:shadow-[0_0_30px_rgba(219,39,119,0.6)] flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/30 w-1/2 -skew-x-12 -ml-16 group-hover:ml-[150%] transition-all duration-700"></div>
                  <PlayCircle className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Start Learning</span>
                </Link>
                <Link
                  to="/mock-test"
                  className="bg-slate-800/80 border border-white/10 hover:border-pink-500/50 hover:bg-slate-800 text-pink-300 font-bold py-3.5 px-8 rounded-xl transition-all hover:-translate-y-1 flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest backdrop-blur-md shadow-lg"
                >
                  <Target className="h-5 w-5" />
                  Mock Tests
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
              }}
              className="lg:col-span-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center shadow-xl hover:shadow-[0_0_30px_rgba(219,39,119,0.15)] hover:border-pink-400/30 transition-all group">
                  <p className="text-4xl sm:text-5xl font-black text-pink-400 tracking-tighter leading-none mb-3 drop-shadow-md group-hover:scale-110 transition-transform">
                    500+
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest font-bold">
                    Video Lectures
                  </p>
                </div>
                <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-400/30 transition-all group">
                  <p className="text-4xl sm:text-5xl font-black text-violet-400 tracking-tighter leading-none mb-3 drop-shadow-md group-hover:scale-110 transition-transform">
                    50+
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest font-bold">
                    Mock Tests
                  </p>
                </div>
                <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl col-span-2 text-center shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/30 transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <p className="text-4xl sm:text-5xl font-black text-slate-50 tracking-tighter leading-none mb-3 drop-shadow-md group-hover:scale-110 transition-transform">
                    10,000+
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest font-bold">
                    Practice Questions
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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
      <section className="py-12 bg-slate-950 w-full border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-1/2 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-2">
              Success Stories
            </h3>
            <h2 className="font-display text-4xl text-slate-50 font-bold uppercase tracking-tight">
              Our Proud Achievers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <div
                key={i}
                className="bg-slate-800/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl relative"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-50/5" />
                <div className="flex gap-1 mb-4 text-violet-400">
                  {[...Array(testi.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  "{testi.text}"
                </p>
                <div className="mt-auto border-t border-white/10 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-600/30 to-violet-600/30 border border-white/10 flex items-center justify-center uppercase font-bold text-pink-300">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-50 uppercase">
                      {testi.name}
                    </p>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-pink-400">
                      {testi.exam}
                    </p>
                  </div>
                </div>
              </div>
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
    <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-pink-600/30 hover:bg-white/10 transition-all flex flex-col h-full shadow-2xl">
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-serif italic border border-white/10 shadow-inner ${active ? "bg-gradient-to-br from-pink-600/20 to-violet-600/20 text-pink-400" : completed ? "bg-green-500/10 text-green-400" : "bg-slate-800/60 text-slate-300"}`}>
          {icon}
        </div>
        {active && (
          <span className="bg-pink-600/20 text-pink-300 text-[10px] font-bold px-2.5 py-1 rounded border border-pink-600/30 uppercase tracking-widest shadow-sm">
            Active
          </span>
        )}
        {completed && (
          <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded border border-green-500/20 uppercase tracking-widest shadow-sm">
            Chapterwise
          </span>
        )}
        {enrolling && (
          <span className="bg-slate-800/60 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded border border-white/10 uppercase tracking-widest shadow-sm">
            Enrolling
          </span>
        )}
      </div>
      <h4 className="font-bold text-base mb-2 relative z-10 text-slate-50 drop-shadow-sm">
        {title}
      </h4>
      <p className="text-xs text-pink-200/70 mb-6 leading-relaxed relative z-10 flex-1">
        {subtitle}
      </p>

      <div className="flex flex-col gap-3 pt-5 border-t border-white/10 mt-auto relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-pink-200/50 uppercase tracking-widest">
            {stats}
          </div>
          <div className="text-[10px] font-bold text-pink-400">
            {progress}%
          </div>
        </div>
        <div className="w-full bg-white/10 h-1 rounded-sm overflow-hidden border border-white/5">
          <div
            className={`h-full rounded-sm ${completed ? "bg-green-400" : "bg-gradient-to-r from-pink-600 to-violet-600"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
