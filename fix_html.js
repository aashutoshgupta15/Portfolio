const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace testimonial backs
html = html.replace(/bg-primary rounded-lg shadow-md p-6 flex flex-col justify-center rotate-y-180/g, 'bg-[#0a0a0a] border border-[#262626] rounded-lg shadow-md p-6 flex flex-col justify-center rotate-y-180');

// Replace contact form inputs
html = html.replace(/class="w-full px-4 py-3 border border-\[#333333\] rounded focus:ring-2 focus:ring-secondary focus:ring-opacity-50 focus:border-secondary transition-all"/g, 'class="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#262626] rounded focus:ring-2 focus:ring-[#7c3aed] focus:ring-opacity-50 focus:border-[#7c3aed] outline-none transition-all"');

// Replace contact form textarea (depends on how prettier formatted it)
html = html.replace(/class="w-full px-4 py-3 border resize-none border-\[#333333\] rounded focus:ring-2 focus:ring-secondary focus:ring-opacity-50 focus:border-secondary transition-all"/g, 'class="w-full px-4 py-3 resize-none bg-[#0a0a0a] text-white border border-[#262626] rounded focus:ring-2 focus:ring-[#7c3aed] focus:ring-opacity-50 focus:border-[#7c3aed] outline-none transition-all"');

html = html.replace(/class="w-full px-4 py-3 resize-none border border-\[#333333\] rounded focus:ring-2 focus:ring-secondary focus:ring-opacity-50 focus:border-secondary transition-all"/g, 'class="w-full px-4 py-3 resize-none bg-[#0a0a0a] text-white border border-[#262626] rounded focus:ring-2 focus:ring-[#7c3aed] focus:ring-opacity-50 focus:border-[#7c3aed] outline-none transition-all"');

// Make sure submit button is visible
html = html.replace(/bg-primary text-\[#050505\] py-3 rounded-button/g, 'bg-[#1a1a1a] border border-[#262626] text-[#e2e8f0] hover:border-[#7c3aed] py-3 rounded-button');

fs.writeFileSync('index.html', html);
console.log('Fixed background and form styling');
