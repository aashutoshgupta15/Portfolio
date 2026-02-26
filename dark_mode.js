const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace colors
html = html.replace(/bg-white/g, 'bg-[#050505]');
// The body background:
html = html.replace(/<body(.*?)>/g, '<body class="bg-[#050505] text-white" $1>');
html = html.replace(/bg-gray-50/g, 'bg-[#0f0f0f]');
html = html.replace(/bg-gray-100/g, 'bg-[#1a1a1a]');
html = html.replace(/bg-gray-200/g, 'bg-[#262626]');

html = html.replace(/text-gray-900/g, 'text-gray-100');
html = html.replace(/text-gray-800/g, 'text-gray-200');
html = html.replace(/text-gray-700/g, 'text-gray-300');
html = html.replace(/text-gray-600/g, 'text-gray-400');
html = html.replace(/text-gray-500/g, 'text-gray-500');

html = html.replace(/border-gray-100/g, 'border-[#262626]');
html = html.replace(/border-gray-200/g, 'border-[#333333]');

// Fix hero gradient
html = html.replace(/from-white/g, 'from-[#050505]');
html = html.replace(/via-white\/80/g, 'via-[#050505]/80');

// Fix primary color logic
// Old primary color was #333333, we'll make it an engaging accent color like a vivid purple/blue gradient or just a vibrant color like '#6d28d9'
html = html.replace(/primary:'#333333'/g, "primary:'#e2e8f0', accent:'#7c3aed', accentDark:'#5b21b6'");

// Any bg-primary text-white combinations should be preserved or updated
html = html.replace(/bg-primary text-white/g, 'bg-primary text-[#050505]');

// Nav links hover
html = html.replace(/hover:text-primary/g, 'hover:text-[#F9A826]');

// Project overlay dark background
html = html.replace(/bg-primary bg-opacity-70/g, 'bg-[#000000] bg-opacity-80 flex flex-col justify-end p-6 duration-300 ease-in-out');

// Buttons that use border-primary text-primary
html = html.replace(/border-primary text-primary hover:bg-primary hover:text-white/g, 'border-[#e2e8f0] text-[#e2e8f0] hover:bg-[#e2e8f0] hover:text-[#050505]');
html = html.replace(/border-2 border-primary text-primary/g, 'border-2 border-[#e2e8f0] text-[#e2e8f0]');

// Hero text replace
html = html.replace(/<h1 class="serif text-5xl md:text-6xl font-bold leading-tight mb-6">/g, '<h1 class="serif text-5xl md:text-6xl font-bold leading-tight mb-6 text-white text-glow">');
html = html.replace(/<p class="text-lg md:text-xl text-gray-700 mb-10 max-w-lg">/g, '<p class="text-lg md:text-xl text-gray-300 mb-10 max-w-lg">');

// Hero background replace
let oldBg = `<div class="absolute inset-0 w-full h-full" style="background-image: url\\('/images/Cover\\.png'\\); background-size: cover; background-position: center;"><\\/div>`;
let newBg = `<canvas id="hero-canvas" class="absolute inset-0 w-full h-full z-0 pointer-events-none"></canvas>`;
if(html.match(new RegExp(oldBg))) {
    html = html.replace(new RegExp(oldBg), newBg);
} else {
    // try a loose replace
    html = html.replace(/<div class="absolute inset-0 w-full h-full" style="background-image: url\('\/images\/Cover\.png'\); background-size: cover; background-position: center;"><\/div>/g, newBg);
}

// Nav background change for dark mode
html = html.replace(/bg-white bg-opacity-95/g, 'bg-[#0a0a0a] bg-opacity-95 border-b border-[#222]');

fs.writeFileSync('index.html', html);
console.log('Index.html updated for dark mode.');
