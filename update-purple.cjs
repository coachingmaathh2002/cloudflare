const fs = require('fs');

const files = [
  'src/pages/Courses.tsx',
  'src/pages/Dashboard.tsx',
  'src/pages/MockTestApp.tsx',
  'src/components/Navbar.tsx',
  'src/App.tsx',
  'src/index.css'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Change rose and fuchsia to purple and violet
  content = content.replace(/rose/g, 'purple');
  content = content.replace(/fuchsia/g, 'violet');

  // Dark background gradients (was #0f0005, now #090014)
  content = content.replace(/#0f0005/g, '#090014');
  // Gradient in index.css
  content = content.replace(/#3e0b22/g, '#240b3e');
  content = content.replace(/#0a0004/g, '#05000a');
  
  // Specific RGBA shadow updates
  content = content.replace(/rgba\(225,29,72,/g, 'rgba(147,51,234,'); 
  content = content.replace(/rgba\(251,113,133,/g, 'rgba(192,132,252,');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Purple theme applied.");
