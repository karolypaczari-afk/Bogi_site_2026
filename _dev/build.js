#!/usr/bin/env node
/**
 * bogihorvath.com — build script
 * Minifies .src.css → .css and .src.js → .js.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

let singleFile = null;
let typeFilter = null;

for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--file' && args[i + 1]) {
        singleFile = args[++i].replace(/\\/g, '/');
    } else if (args[i] === '--type' && args[i + 1]) {
        typeFilter = args[++i];
    }
}

function getFiles(dir, ext) {
    const fullDir = path.join(ROOT, dir);
    if (!fs.existsSync(fullDir)) return [];
    return fs
        .readdirSync(fullDir)
        .filter((file) => file.endsWith(ext))
        .map((file) => (dir === '.' ? file : `${dir}/${file}`));
}

function minifyCSS(srcPath) {
    const outPath = srcPath.replace('.src.css', '.css');
    const absSrc = path.join(ROOT, srcPath);
    const absOut = path.join(ROOT, outPath);
    try {
        execSync(`npx clean-css-cli "${absSrc}" -o "${absOut}"`, { cwd: ROOT, stdio: 'pipe' });
        const srcSize = fs.statSync(absSrc).size;
        const outSize = fs.statSync(absOut).size;
        const pct = ((1 - outSize / srcSize) * 100).toFixed(0);
        console.log(`  ok ${srcPath} -> ${outPath} (${srcSize} -> ${outSize}, -${pct}%)`);
    } catch (error) {
        console.error(`  fail ${srcPath}: ${error.message}`);
        process.exitCode = 1;
    }
}

function minifyJS(srcPath) {
    const outPath = srcPath.replace('.src.js', '.js');
    const absSrc = path.join(ROOT, srcPath);
    const absOut = path.join(ROOT, outPath);
    try {
        execSync(`npx terser "${absSrc}" -c -m -o "${absOut}"`, { cwd: ROOT, stdio: 'pipe' });
        const srcSize = fs.statSync(absSrc).size;
        const outSize = fs.statSync(absOut).size;
        const pct = ((1 - outSize / srcSize) * 100).toFixed(0);
        console.log(`  ok ${srcPath} -> ${outPath} (${srcSize} -> ${outSize}, -${pct}%)`);
    } catch (error) {
        console.error(`  fail ${srcPath}: ${error.message}`);
        process.exitCode = 1;
    }
}

if (singleFile) {
    if (singleFile.endsWith('.src.css')) minifyCSS(singleFile);
    else if (singleFile.endsWith('.src.js')) minifyJS(singleFile);
} else {
    const start = Date.now();

    if (!typeFilter || typeFilter === 'css') {
        const cssFiles = getFiles('css', '.src.css');
        if (cssFiles.length) {
            console.log(`=== Minifying CSS (${cssFiles.length} files) ===`);
            cssFiles.forEach(minifyCSS);
            console.log();
        }
    }

    if (!typeFilter || typeFilter === 'js') {
        const jsFiles = getFiles('js', '.src.js');
        if (jsFiles.length) {
            console.log(`=== Minifying JS (${jsFiles.length} files) ===`);
            jsFiles.forEach(minifyJS);
            console.log();
        }
    }

    const buildHash = Date.now().toString(36);
    const dataDir = path.join(ROOT, '_data');
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, 'buildHash.json'), JSON.stringify(buildHash));
    console.log(`=== Build hash: ${buildHash} ===\n`);

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`Done in ${elapsed}s.`);
}
