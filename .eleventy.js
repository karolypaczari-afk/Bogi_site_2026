module.exports = function (eleventyConfig) {
    eleventyConfig.addGlobalData('currentYear', () => new Date().getFullYear());

    eleventyConfig.addFilter('slugify', (str) =>
        String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    );

    eleventyConfig.addFilter('date', (value, fmt) => {
        const d = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(d.getTime())) return value;
        if (fmt === 'iso') return d.toISOString();
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    });

    const wordsIn = (post) => {
        if (!post || !Array.isArray(post.content)) return 0;
        let words = 0;
        for (const block of post.content) {
            if (Array.isArray(block.v)) {
                for (const li of block.v) words += String(li).replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
            } else {
                words += String(block.v || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
            }
        }
        words += String(post.summary || '').split(/\s+/).filter(Boolean).length;
        return words;
    };

    eleventyConfig.addFilter('wordCount', (post) => wordsIn(post));

    eleventyConfig.addFilter('readingTime', (post) => {
        const words = wordsIn(post);
        const minutes = Math.max(1, Math.round(words / 220));
        return `${minutes} min read`;
    });

    eleventyConfig.addFilter('stripHtml', (s) => String(s || '').replace(/<[^>]*>/g, ''));

    eleventyConfig.addFilter('relatedPosts', (posts, currentId, limit = 2) => {
        if (!Array.isArray(posts)) return [];
        return posts.filter((p) => p.id !== currentId).slice(0, limit);
    });

    eleventyConfig.addCollection('posts', (collection) =>
        collection.getFilteredByGlob('./pages/blog/posts/*.njk').sort((a, b) =>
            new Date(b.data.date) - new Date(a.data.date)
        )
    );

    return {
        dir: {
            input: '.',
            output: '.',
            includes: '_includes',
            layouts: '_includes/layouts',
            data: '_data',
        },
        templateFormats: ['njk'],
    };
};
