import React, { useState } from 'react';
import { BookOpen, FileText, PlayCircle, Download, Clock, Plus, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const courseData = [
  {
    id: 'jee',
    title: 'JEE Mains Mathematics',
    description: 'Comprehensive syllabus coverage aiming for 99+ percentile.',
    chapters: [
      { name: '1. Calculus & Real Analysis', pdfCount: 5, mockCount: 20 },
      { name: '2. Vectors and 3D Geometry', pdfCount: 3, mockCount: 20 },
      { name: '3. Algebra (Matrices, Determinants)', pdfCount: 4, mockCount: 20 },
    ]
  },
  {
    id: 'slst',
    title: 'SLST Mathematics',
    description: 'Targeted preparation for West Bengal SLST covering the entire syllabus.',
    chapters: [
      { name: '1. Abstract Algebra', pdfCount: 6, mockCount: 20 },
      { name: '2. Real & Complex Analysis', pdfCount: 8, mockCount: 20 },
      { name: '3. Differential Equations', pdfCount: 4, mockCount: 20 },
    ]
  }
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState('jee');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2 tracking-tight uppercase">Structured Curriculum</h1>
        <p className="text-sm text-gray-400 max-w-2xl">Access premium study materials, categorized chapter-wise with detailed notes, formula sheets, and mock tests.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-px">
        {courseData.map(course => (
          <button
            key={course.id}
            onClick={() => setActiveTab(course.id)}
            className={cn(
              "px-5 py-3 font-bold text-sm transition-all rounded-t-lg border-b-2 flex items-center gap-2",
              activeTab === course.id 
                ? "text-purple-400 border-purple-500 bg-purple-500/10" 
                : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
            )}
          >
            {activeTab === course.id && <span className="text-lg leading-none">⌘</span>}
            {course.title}
          </button>
        ))}
      </div>

      {/* Course Content */}
      <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 overflow-hidden shadow-lg">
        {courseData.map(course => (
          course.id === activeTab && (
            <div key={course.id} className="p-0">
              <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                <h2 className="text-lg font-bold text-white">{course.title} Modules</h2>
                <p className="text-xs text-gray-400 mt-1">{course.description}</p>
              </div>
              
              <div className="divide-y divide-white/10">
                {course.chapters.map((chapter, index) => (
                  <ChapterRow key={index} chapter={chapter} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function ChapterRow({ chapter }: { chapter: any; key?: React.Key }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group">
      <div 
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/5 backdrop-blur-md shadow-xl border border-white/10 p-2.5 rounded-lg text-purple-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{chapter.name}</h3>
            <div className="flex gap-4 mt-1.5 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><FileText className="h-3 w-3 text-purple-400" /> {chapter.pdfCount} Notes</span>
              <span className="flex items-center gap-1.5 text-gray-500"><Target className="h-3 w-3 text-purple-400" /> {chapter.mockCount} Tests</span>
            </div>
          </div>
        </div>
        <div>
          <ChevronDown className={cn("h-5 w-5 text-gray-500 transition-transform duration-300", expanded ? "rotate-180" : "")} />
        </div>
      </div>
      
      {expanded && (
        <div className="px-5 pb-5 pt-2 bg-white/5 backdrop-blur-sm shadow-md border-t border-white/10 flex flex-col md:flex-row gap-5">
          <div className="flex-1 bg-white/5 backdrop-blur-md shadow-xl p-5 rounded-xl border border-white/10">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><FileText className="h-4 w-4 text-purple-400" /> Study Materials</h4>
            <ul className="space-y-2">
              {[1, 2].map(i => (
                <li key={i} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                  <span className="text-xs font-medium text-gray-300">Detailed Lecture Notes Part {i}</span>
                  <div className="flex gap-1.5">
                     <button className="text-purple-400 hover:text-white p-1.5 rounded transition-colors"><BookOpen className="h-3.5 w-3.5" /></button>
                     <button className="text-gray-400 hover:text-white p-1.5 rounded transition-colors"><Download className="h-3.5 w-3.5" /></button>
                  </div>
                </li>
              ))}
            </ul>
             <button className="mt-4 text-xs font-bold text-purple-400 hover:text-purple-400 w-full text-center hover:underline">View All {chapter.pdfCount} PDFs</button>
          </div>
          
          <div className="flex-1 bg-gradient-to-br from-[#111827] to-[#111827] p-5 rounded-xl border border-purple-500/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 bg-purple-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10"><Target className="h-4 w-4 text-purple-400" /> Practice Tests</h4>
            <div className="space-y-2.5 relative z-10">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg flex items-center justify-between border-l-2 border-l-yellow-500">
                <div>
                   <div className="font-bold text-white text-xs mb-1">Chapter Test 1</div>
                   <div className="flex gap-3 text-[10px] text-gray-400 font-medium tracking-wide">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-gray-500" /> 45 Min</span>
                      <span className="flex items-center gap-1"><Target className="h-3 w-3 text-gray-500" /> 30 Qs</span>
                   </div>
                </div>
                <Link to="/mock-test/t1" className="bg-purple-500 hover:bg-purple-500 text-black font-bold py-1.5 px-3 rounded text-xs transition-colors shadow">
                  Start
                </Link>
              </div>
               <div className="bg-white/5 backdrop-blur-md shadow-lg border border-white/10 p-3 rounded-lg flex items-center justify-between opacity-60">
                <div>
                   <div className="font-bold text-white text-xs mb-1">Chapter Test 2</div>
                   <div className="flex gap-3 text-[10px] text-gray-400 font-medium tracking-wide">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-gray-500" /> 45 Min</span>
                      <span className="flex items-center gap-1"><Target className="h-3 w-3 text-gray-500" /> 30 Qs</span>
                   </div>
                </div>
                <button className="bg-white/5 backdrop-blur-md shadow-xl border border-white/10 text-gray-500 font-bold py-1.5 px-3 rounded text-xs cursor-not-allowed">
                  Locked
                </button>
              </div>
            </div>
             <button className="mt-4 text-xs font-bold text-purple-400 hover:text-purple-400 w-full text-center hover:underline relative z-10">View All {chapter.mockCount} Tests</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple fallback Target icon if not imported above
function Target({ className }: { className?: string }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
