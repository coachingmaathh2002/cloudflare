const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/Home.tsx',
  'src/pages/MockTestApp.tsx',
  'src/pages/Dashboard.tsx',
  'src/pages/Courses.tsx',
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx',
  'src/App.tsx',
  'src/index.css'
];

function updateColors() {
  files.forEach(f => {
    let p = path.join(__dirname, f);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');

    // Fix the specific hover button gradient from before:
    content = content.replace(/from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600/g, 'from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500');
    
    // Convert remaining purple-700 back to violet-600 (since violet-600 is #7c3aed)
    content = content.replace(/purple-700/g, 'violet-600');
    
    // Purple 600 was #9333ea, let's keep secondary accent as violet-600 where appropriate, or fuchsia
    // User: Secondary Accent (Purple): #7c3aed (Tailwind violet-600)
    // Fuchsia Glow Effect: #c026d3 (Tailwind fuchsia-600)
    content = content.replace(/purple-600/g, 'violet-600');
    content = content.replace(/purple-500/g, 'violet-500');
    content = content.replace(/purple-400/g, 'violet-400');
    content = content.replace(/purple-300/g, 'violet-300');
    
    content = content.replace(/pink-700/g, 'pink-600'); 

    // Box shadows that still use rgb(147, 51, 234) (which is purple-600) -> change to pink-600 #db2777
    content = content.replace(/rgba\(147,51,234/g, 'rgba(219,39,119');
    
    // The glow text
    content = content.replace(/text-glow/g, 'text-glow text-pink-600');

    // Add float animation to specific elements if missing: (just ambient, let's add one to the glass card in home maybe)
    
    fs.writeFileSync(p, content, 'utf8');
  });
}

updateColors();
