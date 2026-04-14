const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (!content.startsWith('"use client";') && !content.startsWith("'use client';")) {
        // Strip out // @ts-nocheck if it's the very first line before adding use client, actually just prepend it before everything!
        fs.writeFileSync(fullPath, '"use client";\n' + content);
      }
    }
  }
}

processDir(path.join(process.cwd(), 'src', 'components'));
processDir(path.join(process.cwd(), 'src', 'hooks'));
