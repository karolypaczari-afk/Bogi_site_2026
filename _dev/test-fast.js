#!/usr/bin/env node
process.env.FAST_MODE = '1';
const { spawnSync } = require('child_process');
const result = spawnSync('npx', ['playwright', 'test', '--grep', '@smoke'], {
    stdio: 'inherit',
    shell: true,
});
process.exit(result.status ?? 0);
