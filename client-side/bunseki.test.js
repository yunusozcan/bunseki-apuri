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
                let navigationTiming = performance.getEntriesByType('navigation');
                if (navigationTiming === undefined || navigationTiming.length <= 0) {
                    console.log("There are no Navigation performance records");
                    navigationTiming = {
                        responseStart: 0,
                        loadEventStart: 0,
                        domInteractive: 0
                    };
                } else {
                    navigationTiming = navigationTiming[0];
                }

                let paintTiming = performance.getEntriesByName("first-contentful-paint");
                if (paintTiming === undefined || paintTiming.length <= 0) {
                    console.log("There are no paint performance records");
                    paintTiming = {startTime: 0};
                } else {
                    paintTiming = paintTiming[0];
                }

                const TTFB = navigationTiming.responseStart;
                const WINDOW_LOAD = navigationTiming.loadEventStart;
                const DOM_LOAD = navigationTiming.domInteractive;
                const FCP = paintTiming.startTime;

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
    describe("firefox", () => {
        it("should return performance metrics", async () => {
            const browser = await playwright['firefox'].launch();
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://yunusozcan.com/');
            const metrics = await page.evaluate(() => {
                const timestamp = new Date();
                let navigationTiming = performance.getEntriesByType('navigation');
                if (navigationTiming === undefined || navigationTiming.length <= 0) {
                    console.log("There are no Navigation performance records");
                    navigationTiming = {
                        responseStart: 0,
                        loadEventStart: 0,
                        domInteractive: 0
                    };
                } else {
                    navigationTiming = navigationTiming[0];
                }

                let paintTiming = performance.getEntriesByName("first-contentful-paint");
                if (paintTiming === undefined || paintTiming.length <= 0) {
                    console.log("There are no paint performance records");
                    paintTiming = {startTime: 0};
                } else {
                    paintTiming = paintTiming[0];
                }

                const TTFB = navigationTiming.responseStart;
                const WINDOW_LOAD = navigationTiming.loadEventStart;
                const DOM_LOAD = navigationTiming.domInteractive;
                const FCP = paintTiming.startTime;

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
    describe("webkit", () => {
        it("should return performance metrics", async () => {
            const browser = await playwright['webkit'].launch();
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://yunusozcan.com/');
            const metrics = await page.evaluate(() => {
                const timestamp = new Date();
                let navigationTiming = performance.getEntriesByType('navigation');
                if (navigationTiming === undefined || navigationTiming.length <= 0) {
                    console.log("There are no Navigation performance records");
                    navigationTiming = {
                        responseStart: 0,
                        loadEventStart: 0,
                        domInteractive: 0
                    };
                } else {
                    navigationTiming = navigationTiming[0];
                }

                let paintTiming = performance.getEntriesByName("first-contentful-paint");
                if (paintTiming === undefined || paintTiming.length <= 0) {
                    console.log("There are no paint performance records");
                    paintTiming = {startTime: 0};
                } else {
                    paintTiming = paintTiming[0];
                }

                const TTFB = navigationTiming.responseStart;
                const WINDOW_LOAD = navigationTiming.loadEventStart;
                const DOM_LOAD = navigationTiming.domInteractive;
                const FCP = paintTiming.startTime;

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
