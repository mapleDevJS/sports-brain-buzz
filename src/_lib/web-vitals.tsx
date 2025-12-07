'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
    const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
    });

    if (process.env.NODE_ENV === 'development') {
        console.log('[Web Vitals]', body);
    }

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', body);
    } else if (typeof fetch !== 'undefined') {
        fetch('/api/analytics', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
            keepalive: true,
        }).catch(() => {});
    }
}

export function WebVitals() {
    useEffect(() => {
        onCLS(sendToAnalytics);
        onINP(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
    }, []);

    return null;
}
