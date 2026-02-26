const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Ensure section tags sit correctly above the fixed canvas
html = html.replace(/<section class="/g, '<section class="relative z-10 ');
html = html.replace(/<footer class="/g, '<footer class="relative z-10 ');

fs.writeFileSync('index.html', html);
console.log('Fixed relative z-index for sections');
