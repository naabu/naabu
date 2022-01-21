// playwright.config.js
// @ts-check
import { devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig<{ domain: string, showAllConsole: boolean }>} */
const config = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  timeout: 120000,
  workers: 1,
  use: {
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'localhost',
      use: {
        channel: 'chrome',
        domain: "http://localhost:3000",
        showAllConsole: false,
        launchOptions: {
          headless: false,
          devtools: false,
        }
      },
    },
    {
      name: 'docker',
      use: {
        channel: 'chrome',
        domain: "http://sveltekit-test:3000",
        showAllConsole: false,
        launchOptions: {
          headless: true
        }
      },
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // use: {
  //   // video: 'on',
  //   trace: 'on-first-retry',
  //   channel: 'chrome',
  //   launchOptions: {
  //     // slowMo: 4000,
  //     // args: ["--disable-gpu"]
  //   }
  // },
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

export default config;
