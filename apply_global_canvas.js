const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Move canvas
html = html.replace('<canvas id="hero-canvas" class="absolute inset-0 w-full h-full z-0 pointer-events-none"></canvas>', '');
html = html.replace('<body class="bg-[#050505] text-white">', '<body class="bg-[#050505] text-white">\n  <canvas id="hero-canvas" class="fixed inset-0 w-full h-full z-0 pointer-events-none"></canvas>');

// 2. Make all sections and main containers translucent to see the canvas underneath
html = html.replace(/<section class="(.*?)bg-\[#050505\](.*?)"/g, '<section class="$1bg-[#050505]/85$2"');
html = html.replace(/<section class="(.*?)bg-\[#0f0f0f\](.*?)"/g, '<section class="$1bg-[#0f0f0f]/85$2"');
html = html.replace(/<footer class="(.*?)bg-\[#050505\](.*?)"/g, '<footer class="$1bg-[#050505]/85$2"');

fs.writeFileSync('index.html', html);
console.log('Canvas moved and sections updated.');
