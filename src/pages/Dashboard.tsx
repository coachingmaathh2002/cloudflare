import React, { useState } from 'react';
import { 
  BookOpen, Award, Target, FileText, 
  TrendingUp, Clock, Calendar, CheckCircle2 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const performanceData = [
  { name: 'Test 1', score: 65, avg: 55 },
  { name: 'Test 2', score: 72, avg: 58 },
  { name: 'Test 3', score: 85, avg: 60 },
  { name: 'Test 4', score: 78, avg: 62 },
  { name: 'Test 5', score: 92, avg: 65 },
];

const subjectData = [
  { name: 'Algebra', value: 85 },
  { name: 'Calculus', value: 70 },
  { name: '3D Geo', value: 95 },
  { name: 'Trigo', value: 60 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header Profile */}
      <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl shadow-lg border border-white/10 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="flex items-center justify-center p-1 bg-white/5 backdrop-blur-md shadow-xl rounded-xl border border-white/10">
             <div className="h-16 w-16 rounded-lg bg-purple-500 text-black flex items-center justify-center text-2xl font-bold shadow-inner">
               JD
             </div>
           </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white uppercase tracking-tight">John Doe</h1>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mt-1">JEE Aspirant</p>
            <div className="flex gap-3 mt-2.5">
               <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded border border-purple-500/20 uppercase tracking-wider">
                 <Award className="h-3 w-3" /> Rank: #420
               </span>
               <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 bg-green-500/10 text-green-400 rounded border border-green-500/20 uppercase tracking-wider">
                 <Target className="h-3 w-3" /> 82% Avg Accuracy
               </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 backdrop-blur-md shadow-xl border border-white/10 hover:border-purple-500/50 text-white font-bold py-2 px-5 text-xs rounded-lg transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-56 shrink-0">
           <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-xl border border-white/10 overflow-hidden sticky top-24">
             <div className="p-3 bg-blue-900/10 border-b border-white/10">
               <h3 className="font-bold text-gray-500 text-[10px] uppercase tracking-widest pl-2">Main Menu</h3>
             </div>
             <div className="p-2 space-y-1">
                <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<span className="text-lg leading-none">⌂</span>} label="Dashboard" />
                <NavButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<span className="text-lg leading-none">⌘</span>} label="My Courses" />
                <NavButton active={activeTab === 'tests'} onClick={() => setActiveTab('tests')} icon={<span className="text-lg leading-none">⌨</span>} label="Mock Tests" />
                <NavButton active={activeTab === 'downloads'} onClick={() => setActiveTab('downloads')} icon={<span className="text-lg leading-none">⌬</span>} label="PDF Library" />
             </div>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Tests Attempted" value="24" textColor="text-purple-400" />
                <StatCard title="Study Hours" value="142h" textColor="text-purple-400" />
                <StatCard title="PDFs Read" value="86" textColor="text-green-400" />
                <StatCard title="Current Streak" value="12" textColor="text-purple-400" subtitle="Days" />
              </div>

              {/* Performance Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Progress Graph */}
                <div className="bg-white/5 backdrop-blur-xl shadow-2xl p-5 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                      Mock Test Performance
                    </h3>
                  </div>
                  <div className="h-56 w-full -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e11d4830" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#fecdd380', fontSize: 10}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#fecdd380', fontSize: 10}} width={40} />
                        <Tooltip 
                          contentStyle={{backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff'}} 
                          itemStyle={{color: '#fff'}}
                        />
                        <Line type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#090014'}} activeDot={{r: 6}} name="Your Score" />
                        <Line type="monotone" dataKey="avg" stroke="#f472b6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Class Average" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Subject Strength */}
                <div className="bg-white/5 backdrop-blur-xl shadow-2xl p-5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-400" />
                    Chapter Wise Strength
                  </h3>
                   <div className="mt-auto flex items-end gap-1.5 h-32 w-full pt-4 border-b border-white/10 pb-1">
                      <div className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-white/10 backdrop-blur-md px-2 py-0.5 rounded transition-opacity pointer-events-none shadow-xl border border-white/20">85%</div>
                         <div className="w-full bg-gradient-to-t from-purple-/80 to-violet-600 rounded-t-sm transition-all group-hover:from-purple-500 group-hover:to-violet-600" style={{height: '85%'}}></div>
                         <div className="text-[9px] text-center mt-2 text-purple-400/50 font-bold uppercase truncate px-1">Algebra</div>
                      </div>
                      <div className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-white/10 backdrop-blur-md px-2 py-0.5 rounded transition-opacity pointer-events-none shadow-xl border border-white/20">70%</div>
                         <div className="w-full bg-white/10 rounded-t-sm transition-all group-hover:bg-white/20" style={{height: '70%'}}></div>
                         <div className="text-[9px] text-center mt-2 text-purple-400/50 font-bold uppercase truncate px-1">Calculus</div>
                      </div>
                      <div className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-white/10 backdrop-blur-md px-2 py-0.5 rounded transition-opacity pointer-events-none shadow-xl border border-white/20">95%</div>
                         <div className="w-full bg-purple-500 rounded-t-sm transition-all group-hover:bg-purple-500 shadow-[0_0_10px_rgba(192,132,252,0.3)]" style={{height: '95%'}}></div>
                         <div className="text-[9px] text-center mt-2 text-purple-400/50 font-bold uppercase truncate px-1">3D Geo</div>
                      </div>
                      <div className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-white/10 backdrop-blur-md px-2 py-0.5 rounded transition-opacity pointer-events-none shadow-xl border border-white/20">60%</div>
                         <div className="w-full bg-white/5 rounded-t-sm transition-all group-hover:bg-white/10" style={{height: '60%'}}></div>
                         <div className="text-[9px] text-center mt-2 text-purple-400/50 font-bold uppercase truncate px-1">Trigo</div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-xl shadow-2xl p-5 rounded-2xl border border-white/10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-center p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl hover:border-white/10 transition-colors">
                      <div className="bg-green-500/10 text-green-500 p-2 rounded-lg shrink-0 border border-green-500/20">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">Completed "Calculus Mock Test #{i}"</h4>
                        <p className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-wider font-semibold border-l border-white/10 pl-2">2 hours ago</p>
                      </div>
                      <div className="text-right">
                         <span className="text-purple-400 font-bold text-sm block">85/100</span>
                         <span className="text-[10px] text-gray-500 uppercase tracking-widest">Score</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'overview' && (
             <div className="bg-white/5 backdrop-blur-xl shadow-2xl p-12 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center h-64">
                <span className="text-4xl text-gray-600 mb-4 font-serif italic">∫</span>
                <h2 className="text-lg font-bold text-white mb-1">Section Under Construction</h2>
                <p className="text-xs text-gray-500 max-w-sm">This section is being populated with your personal data.</p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, textColor, subtitle = "" }: { title: string, value: string, textColor: string, subtitle?: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-md shadow-xl p-4 rounded-xl border border-white/10">
      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2 truncate">{title}</p>
      <p className={`text-2xl font-bold italic font-serif tracking-tighter leading-none ${textColor}`}>
        {value} <span className="text-[10px] text-gray-500 font-sans tracking-normal not-italic uppercase ml-1">{subtitle}</span>
      </p>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all ${
        active 
        ? 'bg-purple-500/10 text-purple-400 border-l-2 border-purple-' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
      }`}
    >
      <span className={active ? 'text-purple-' : 'text-gray-500'}>
        {icon}
      </span>
      {label}
    </button>
  );
}
