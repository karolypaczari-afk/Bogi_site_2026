#!/usr/bin/env node
/**
 * One-off SEO image optimization:
 *  - Renames images to descriptive slugs
 *  - Resizes to target dimensions for their use
 *  - Converts PNG/JPG -> WebP (quality 82)
 *  - Preserves original aspect ratio
 *  - Writes output to img/, leaves originals in place until confirmed
 */
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const SRC = path.resolve(__dirname, '../../img');
const OUT = SRC;

const jobs = [
    // Hero / portraits
    { in: 'bogi-horvath-og-1200x630.webp', out: 'bogi-horvath-portrait.webp', width: 880, height: null, fit: 'inside', kind: 'webp' },
    { in: 'image-1.png', out: 'bogi-horvath-about.webp', width: 1120, height: null, fit: 'inside', kind: 'webp' },

    // Blog covers — wide 3:2 aspect, max 1200px wide
    { in: 'blog-500k-savings.jpg', out: 'blog-500k-savings.webp', width: 1200, height: 800, fit: 'cover', kind: 'webp' },
    { in: 'blog-adoption-success.jpg', out: 'blog-adoption-success.webp', width: 1200, height: 800, fit: 'cover', kind: 'webp' },
    { in: 'blog-automation-efficiency.png', out: 'blog-automation-efficiency.webp', width: 1200, height: 800, fit: 'cover', kind: 'webp' },
    { in: 'blog-money-leaks.jpg', out: 'blog-money-leaks.webp', width: 1200, height: 800, fit: 'cover', kind: 'webp' },
    { in: 'blog-process-tools.png', out: 'blog-process-tools.webp', width: 1200, height: 800, fit: 'cover', kind: 'webp' },

    // Testimonial avatars — square, 224px (serves @2x for 112px display)
    { in: 'grace-chan.png', out: 'grace-chan.webp', width: 224, height: 224, fit: 'cover', kind: 'webp' },
    { in: 'justin-strohmenger.png', out: 'justin-strohmenger.webp', width: 224, height: 224, fit: 'cover', kind: 'webp' },
    { in: 'mark-sheperd.png', out: 'mark-shepherd.webp', width: 224, height: 224, fit: 'cover', kind: 'webp' },
    { in: 'peter-ujfalusi.png', out: 'peter-ujfalusi.webp', width: 224, height: 224, fit: 'cover', kind: 'webp' },
    { in: 'miquel-herrero.png', out: 'miquel-herrero.webp', width: 224, height: 224, fit: 'cover', kind: 'webp' },
    { in: 'saimah-shakeel.png', out: 'saimah-shakeel.webp', width: 224, height: 224, fit: 'cover', kind: 'webp' },

    // OG / social share image — 1200x630 is the canonical OG size
    { in: 'bogi-horvath-og-1200x630.webp', out: 'bogi-horvath-og-1200x630.webp', width: 1200, height: 630, fit: 'cover', kind: 'webp', quality: 85 },
];

async function run() {
    console.log(`Processing ${jobs.length} images...\n`);
    let totalBefore = 0;
    let totalAfter = 0;

    for (const job of jobs) {
        const inPath = path.join(SRC, job.in);
        const outPath = path.join(OUT, job.out);
        if (!fs.existsSync(inPath)) {
            console.log(`  skip: ${job.in} (missing)`);
            continue;
        }

        let pipeline = sharp(inPath).rotate();
        if (job.width || job.height) {
            pipeline = pipeline.resize({
                width: job.width || undefined,
                height: job.height || undefined,
                fit: job.fit || 'inside',
                withoutEnlargement: true,
            });
        }
        if (job.kind === 'webp') {
            pipeline = pipeline.webp({ quality: job.quality || 82, effort: 6 });
        } else if (job.kind === 'png') {
            pipeline = pipeline.png({ quality: 85, compressionLevel: 9 });
        }

        await pipeline.toFile(outPath);

        const inSize = fs.statSync(inPath).size;
        const outSize = fs.statSync(outPath).size;
        totalBefore += inSize;
        totalAfter += outSize;
        const pct = ((1 - outSize / inSize) * 100).toFixed(0);
        console.log(`  ok ${job.in.padEnd(36)} -> ${job.out.padEnd(40)} ${String(inSize).padStart(7)} -> ${String(outSize).padStart(6)} (-${pct}%)`);
    }

    console.log(`\nTotal: ${totalBefore} -> ${totalAfter} (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
}

run().catch((e) => { console.error(e); process.exit(1); });
