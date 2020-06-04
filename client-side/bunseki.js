/**
 * bunseki.js
 *
 */

(function() {
    const Bunseki = function() {
        const VERSION = "1.0.0";
        const SERVICE_URL = "http://localhost:3000";
    };

    Bunseki.getMetrics = function () {
        const navigationTiming = window.performance.getEntriesByType(
            'navigation'
        )[0];
        const TTFB = navigationTiming.responseStart;
        const PAGE_LOAD = navigationTiming.loadEventStart;
        const DOM_LOAD = navigationTiming.domInteractive;
        const FCP = window.performance.getEntriesByName('first-contentful-paint');

        return {
            TTFB,
            PAGE_LOAD,
            DOM_LOAD,
            FCP
        };
    };

    Bunseki.getResourceNetworkTiming = function () {
        const resources = performance.getEntriesByType("resource");
        if (resources === undefined || resources.length <= 0) {
            console.log("There are no resource performance records");
            return {};
        }

        return resources.map((resouce) => {
            return {
                redirectTime: resource.redirectEnd - resource.redirectStart,
                dnsLookupTime: resource.domainLookupEnd - resource.domainLookupStart,
                tcpHandshakeTime: resources[i].connectEnd - resource.connectStart,
                secureConnectionTime: (resource.secureConnectionStart > 0) ? (resource.connectEnd - resource.secureConnectionStart) : 0,
                responseTime: resources[i].responseEnd - resource.responseStart,
                fetchUntilResponseEndTime: (resource.fetchStart > 0) ? (resource.responseEnd - resource.fetchStart) : 0,
                requestStartUntilResponseEndTime: (resource.requestStart > 0) ? (resource.responseEnd - resource.requestStart) : 0,
                startUntilResponseEndTime: (resource.startTime > 0) ? (resource.responseEnd - resource.startTime) : 0
            };
        });
    };

    Bunseki.save = function (apiKey, metrics, resourceNetworkTiming) {
        const url = '/api/v1/client-side/measures';

        fetch(Bunseki.SERVICE_URL + url, {
            method: 'POST',
            body: JSON.stringify({
                metrics: metrics,
                resourceNetworkTiming: resourceNetworkTiming
            }),
            headers: {
                'Content-Type': 'application/json',
                "X-API-Key": apiKey,
            },
        });
    };

    Bunseki.init = function (clientWindow, apiKey) {
        if (clientWindow.performance) {
            save(apiKey, getMetrics(), getResourceNetworkTiming());
        } else {
            console.log('Performance timing isn\'t supported.');
        }
    };
})();
