import React, { useEffect } from 'react';

// Global activity tracker that counts only active, visible time on site
// Sends heartbeat pings every 15s when user is active in the last 60s and tab is visible.
// Dispatches a window event 'activity:pinged' after successful ping so dashboards can refresh.
export default function ActivityTracker() {
  useEffect(() => {
    let lastActiveAt = Date.now();
    let intervalId = null;

    const markActive = () => {
      lastActiveAt = Date.now();
    };

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((evt) => window.addEventListener(evt, markActive, { passive: true }));

    const ping = async (seconds = 15) => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${apiBase}/dashboard/student/activity/ping`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ seconds }),
          keepalive: true,
        });
        if (res.ok) {
          // Notify listeners (e.g., student dashboard) to refresh weekly activity
          window.dispatchEvent(new CustomEvent('activity:pinged'));
        }
      } catch (_) {
        // ignore network errors
      }
    };

    // Heartbeat every 15s when active and visible
    intervalId = setInterval(() => {
      if (document.hidden) return;
      const idleMs = Date.now() - lastActiveAt;
      if (idleMs > 60_000) return; // user idle more than 60s → don't count
      ping(15);
    }, 15000);

    // Send a final small beacon on pagehide to capture recent activity
    const onPageHide = () => {
      if (!document.hidden) return;
      const token = localStorage.getItem('token');
      if (!token || !('sendBeacon' in navigator)) return;
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      const url = `${apiBase}/dashboard/student/activity/ping`;
      const data = JSON.stringify({ seconds: 5 });
      const blob = new Blob([data], { type: 'application/json' });
      // Best-effort; backend validates and is idempotent per 15s cadence overall
      navigator.sendBeacon(url, blob);
    };

    document.addEventListener('visibilitychange', onPageHide);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, markActive));
      document.removeEventListener('visibilitychange', onPageHide);
      window.removeEventListener('pagehide', onPageHide);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return null;
}