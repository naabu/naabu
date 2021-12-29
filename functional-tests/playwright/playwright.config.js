// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 180000,
  use: {
    trace: 'on-first-retry',
    channel: 'chrome',
    launchOptions: {
      // slowMo: 4000,
      // args: ["--disable-gpu"]
    }
  },
};
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: {
  //       // ...devices['Desktop Firefox'],
  //       ...devices['Desktop Chrome'],
  //       // channel: 'chrome',
  //       launchOptions: {
  //         args: [
  //           "--disable-gpu",
  //           "--disable-accelerated-video-encode",
  //           "--disable-accelerated-video-decode",
  //           "--disable-accelerated-mjpeg-decode",
  //           "--disable-accelerated-2d-canvas",
  //         ]
  //       }
  //     }
  //   },
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // }
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },
  // ],
// };

module.exports = config;