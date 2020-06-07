const playwright = require('playwright');

describe("bunseki", () => {
    describe("chromium", () => {
        it("should return performance metrics", async () => {
            const browser = await playwright['chromium'].launch();
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://yunusozcan.com/');
            const metrics = await page.evaluate(() => {
                const timestamp = new Date();
                const navigationTiming = performance.getEntriesByType(
                    'navigation'
                )[0];
                const TTFB = navigationTiming.responseStart;
                const WINDOW_LOAD = navigationTiming.loadEventStart;
                const DOM_LOAD = navigationTiming.domInteractive;
                const FCP = performance.getEntriesByName('first-contentful-paint')[0].startTime;

                return [
                    {
                        "type": "dom",
                        "value": DOM_LOAD,
                        "timestamp": timestamp
                    },
                    {
                        "type": "ttfb",
                        "value": TTFB,
                        "timestamp": timestamp
                    },
                    {
                        "type": "window",
                        "value": WINDOW_LOAD,
                        "timestamp": timestamp
                    },
                    {
                        "type": "fcp",
                        "value": FCP,
                        "timestamp": timestamp
                    }
                ];
            });
            expect(metrics.length).toBe(4);
            await browser.close();
        });
    });
});
