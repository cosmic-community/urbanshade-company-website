const fs = require('fs');
const path = require('path');

const scriptContent = `<script src="/dashboard-console-capture.js"></script>`;

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already injected
  if (content.includes('dashboard-console-capture.js')) {
    return false;
  }
  
  // Inject before closing </head> tag
  const headCloseIndex = content.indexOf('</head>');
  if (headCloseIndex !== -1) {
    content = content.substring(0, headCloseIndex) + 
              scriptContent + '\n' + 
              content.substring(headCloseIndex);
    
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let injectedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.')) {
      injectedCount += walkDir(filePath);
    } else if (file.endsWith('.html')) {
      if (injectScript(filePath)) {
        console.log(`Injected console capture into: ${filePath}`);
        injectedCount++;
      }
    }
  }
  
  return injectedCount;
}

// Check for common build output directories
const possibleDirs = ['.next', 'out', 'build', 'dist'];
let targetDir = null;

for (const dir of possibleDirs) {
  if (fs.existsSync(dir)) {
    targetDir = dir;
    break;
  }
}

if (targetDir) {
  console.log(`Injecting console capture scripts into ${targetDir}...`);
  const count = walkDir(targetDir);
  console.log(`Console capture injection complete. Modified ${count} files.`);
} else {
  console.log('No build output directory found. Skipping console capture injection.');
}