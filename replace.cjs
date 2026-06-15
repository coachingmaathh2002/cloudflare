const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/Home.tsx',
  'src/pages/MockTestApp.tsx',
  'src/pages/Dashboard.tsx',
  'src/pages/Courses.tsx',
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx',
  'src/App.tsx'
];

function updateColors() {
  files.forEach(f => {
    let p = path.join(__dirname, f);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');

    // Remove legacy hex backgrounds
    content = content.replace(/bg-\[#090014\]/g, 'bg-slate-950');
    content = content.replace(/bg-\[#0b001a\]/g, 'bg-slate-900');
    content = content.replace(/bg-\[#05000a\]/g, 'bg-slate-950');
    
    // Replace gray and zinc with slate
    content = content.replace(/gray-/g, 'slate-');
    content = content.replace(/zinc-/g, 'slate-');

    // Replace purples with pinks (Primary Accent)
    content = content.replace(/purple-400/g, 'pink-400');
    content = content.replace(/purple-300/g, 'pink-300');
    content = content.replace(/purple-500/g, 'pink-600');
    content = content.replace(/purple-600/g, 'pink-700');
    content = content.replace(/purple-900/g, 'pink-900');
    content = content.replace(/purple-200/g, 'pink-200');

    // Replace violets with purples (Secondary Accent)
    content = content.replace(/violet-400/g, 'purple-400');
    content = content.replace(/violet-300/g, 'purple-300');
    content = content.replace(/violet-500/g, 'purple-600');
    content = content.replace(/violet-600/g, 'purple-700');
    content = content.replace(/violet-900/g, 'purple-900');
    
    // Make text white slightly softer according to palette
    content = content.replace(/text-white/g, 'text-slate-50');

    // Adjust specific glassmorphism effects based on prompt
    // Card Background & Surface: #1e293b (Tailwind slate-800 / surface)
    // Glass Card: background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(8px);
    content = content.replace(/bg-white\/5/g, 'bg-slate-800/60');
    
    fs.writeFileSync(p, content, 'utf8');
  });
}

updateColors();
