const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(__dirname, '..', 'migrations', 'seeds', 'Codigos-Postales-Argentina.csv');
const destPath = path.resolve(__dirname, '..', '..', 'dist', 'migrations', 'seeds', 'Codigos-Postales-Argentina.csv');

fs.copyFileSync(sourcePath, destPath);
console.log('File copied successfully');