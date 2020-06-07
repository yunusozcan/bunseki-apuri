/**
 * bunseki.js
 *
 */

const config = require("./config");

Bunseki = {};

window.Bunseki.VERSION = "1.0.0";
window.Bunseki.SERVICE_URL = config.url;

window.Bunseki.getMetrics = function (window) {
    console.log("getMetrics");
    const timestamp = new Date();
    const navigationTiming = window.performance.getEntriesByType(
        'navigation'
    )[0];
    const TTFB = navigationTiming.responseStart;
    const WINDOW_LOAD = navigationTiming.loadEventStart;
    const DOM_LOAD = navigationTiming.domInteractive;
    const FCP = window.performance.getEntriesByName('first-contentful-paint')[0].startTime;

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
};

window.Bunseki.getResourceNetworkTiming = function () {
    console.log("getResourceNetworkTiming");
    const resources = performance.getEntriesByType("resource");
    if (resources === undefined || resources.length <= 0) {
        console.log("There are no resource performance records");
        return {};
    }

    return resources.map((resource, i) => {
        return {
            name: resource.name,
            metrics: {
                redirectTime: resource.redirectEnd - resource.redirectStart,
                dnsLookupTime: resource.domainLookupEnd - resource.domainLookupStart,
                tcpHandshakeTime: resources[i].connectEnd - resource.connectStart,
                secureConnectionTime: (resource.secureConnectionStart > 0) ? (resource.connectEnd - resource.secureConnectionStart) : 0,
                responseTime: resources[i].responseEnd - resource.responseStart,
                fetchUntilResponseEndTime: (resource.fetchStart > 0) ? (resource.responseEnd - resource.fetchStart) : 0,
                requestStartUntilResponseEndTime: (resource.requestStart > 0) ? (resource.responseEnd - resource.requestStart) : 0,
                startUntilResponseEndTime: (resource.startTime > 0) ? (resource.responseEnd - resource.startTime) : 0
            }
        };
    });
};

window.Bunseki.save = function (apiKey, metrics, resourceNetworkTiming) {
    console.log("save");
    const url = 'api/v1/client-side/measures';

    fetch(window.Bunseki.SERVICE_URL + url, {
        method: 'POST',
        body: JSON.stringify({
            metrics: metrics,
            resourceNetworkTiming: resourceNetworkTiming
        }),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + apiKey,
        },
    });
};

window.Bunseki.init = function (clientWindow, apiKey) {
    console.log("Bunseki initialized.");
    if (clientWindow.performance) {
        window.Bunseki.save(apiKey, window.Bunseki.getMetrics(), window.Bunseki.getResourceNetworkTiming());
    } else {
        console.log('Performance timing isn\'t supported.');
    }
};
