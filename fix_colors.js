const fs = require('fs');
const files = ['index.html', 'style.css', 'script.js'];
files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/#03001C/gi, '#000000');
        content = content.replace(/#0A0628/gi, '#0A0A0A');
        content = content.replace(/#100A38/gi, '#121212');
        content = content.replace(/#181048/gi, '#1A1A1A');
        content = content.replace(/#06031F/gi, '#050505');
        content = content.replace(/#201660/gi, '#1C1C1C');
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Done');
