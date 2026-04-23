#!/usr/bin/env node
/**
 * bogihorvath.com — image optimization
 * Converts _dev/input/*.{jpg,png} -> img/*.webp via sharp.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const INPUT = path.join(ROOT, '_dev', 'input');
const OUTPUT = path.join(ROOT, 'img');
const DRY_RUN = process.argv.includes('--dry-run');

async function run() {
    let sharp;
    try {
        sharp = require('sharp');
    } catch {
        console.error('sharp not installed. Run: npm install');
        process.exit(1);
    }

    if (!fs.existsSync(INPUT)) {
        console.log(`Input folder not found: ${INPUT}`);
        return;
    }

    fs.mkdirSync(OUTPUT, { recursive: true });

    const files = fs.readdirSync(INPUT).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
    if (!files.length) {
        console.log('No images found in _dev/input/');
        return;
    }

    console.log(`Processing ${files.length} image(s)${DRY_RUN ? ' [DRY RUN]' : ''}...\n`);

    for (const file of files) {
        const src = path.join(INPUT, file);
        const base = path
            .basename(file, path.extname(file))
            .toLowerCase()
            .replace(/\s+/g, '-');
        const dest = path.join(OUTPUT, `${base}.webp`);

        if (DRY_RUN) {
            console.log(`  would convert: ${file} -> img/${base}.webp`);
            continue;
        }

        try {
            await sharp(src).rotate().webp({ quality: 82 }).toFile(dest);
            const srcSize = fs.statSync(src).size;
            const destSize = fs.statSync(dest).size;
            const pct = ((1 - destSize / srcSize) * 100).toFixed(0);
            console.log(`  ok ${file} -> ${base}.webp  (${srcSize} -> ${destSize}, -${pct}%)`);
        } catch (err) {
            console.error(`  fail ${file}: ${err.message}`);
        }
    }

    console.log('\nDone.');
}

run();
