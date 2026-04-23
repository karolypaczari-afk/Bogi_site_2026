// @ts-check
const os = require('os');
const { defineConfig, devices } = require('@playwright/test');

const cpuCount = os.cpus().length;
const workerCount = process.env.CI ? 4 : Math.max(cpuCount, 4);

module.exports = defineConfig({
    testDir: './_dev/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: workerCount,
    reporter: process.env.FAST_MODE ? 'list' : 'html',
    timeout: 30000,

    use: {
        baseURL: 'http://127.0.0.1:8080',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    webServer: {
        command: 'npx http-server . -p 8080 -c-1',
        port: 8080,
        reuseExistingServer: !process.env.CI,
        timeout: 10000,
    },

    projects: [
        {
            name: 'chromium',
            testIgnore: /00-ios-smoke\.spec\.js/,
            use: {
                browserName: 'chromium',
                viewport: { width: 1280, height: 720 },
            },
        },
        {
            name: 'webkit-ios',
            testMatch: /00-ios-smoke\.spec\.js/,
            use: {
                browserName: 'webkit',
                ...devices['iPhone 13'],
            },
        },
    ],
});
