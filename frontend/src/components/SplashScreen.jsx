import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SplashScreen with configurable durations, optional beams/streaks and optional sound.
 * Props:
 * - onFinished: () => void
 * - showDurationMs?: number (default 2000)
 * - exitDurationMs?: number (default 600)
 * - beamsIntensity?: 'low' | 'medium' | 'high' (default 'medium')
 * - enableSound?: boolean (default false)
 * - soundSrc?: string (default `${import.meta.env.BASE_URL}splash.mp3`)
 */
export default function SplashScreen({
  onFinished,
  showDurationMs = 2000,
  exitDurationMs = 600,
  beamsIntensity = "medium",
  enableSound = false,
  soundSrc = `${import.meta.env.BASE_URL}splash.mp3`,
}) {
  const [animateOut, setAnimateOut] = useState(false);
  const [needsUnlock, setNeedsUnlock] = useState(false);
  const audioRef = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Beam configuration based on intensity
  const beams = useMemo(() => {
    const config = {
      low: { count: 3, opacity: 0.25 },
      medium: { count: 5, opacity: 0.33 },
      high: { count: 8, opacity: 0.4 },
    }[beamsIntensity] || { count: 5, opacity: 0.33 };

    return Array.from({ length: config.count }).map((_, i) => ({
      id: i,
      top: `${10 + i * (70 / config.count)}%`,
      rotate: i % 2 === 0 ? -24 : -18,
      delay: i * 0.12,
      duration: 1.0 + (i % 3) * 0.25,
      opacity: config.opacity,
    }));
  }, [beamsIntensity]);

  useEffect(() => {
    // Handle sound with autoplay fallback
    let unlockers = [];
    const setupUnlockHandlers = () => {
      const attempt = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = false;
        // ramp volume up smoothly
        let v = 0;
        audio.volume = v;
        const step = () => {
          v += 0.07;
          audio.volume = Math.min(0.35, v);
          if (v < 0.35) requestAnimationFrame(step);
        };
        audio.play().then(() => {
          setNeedsUnlock(false);
          requestAnimationFrame(step);
          // remove handlers once played
          unlockers.forEach(({ type, fn }) => window.removeEventListener(type, fn));
          unlockers = [];
        }).catch(() => {
          // still blocked; keep handlers active
        });
      };
      const onPointerDown = () => attempt();
      const onKeyDown = () => attempt();
      const onTouchStart = () => attempt();
      unlockers = [
        { type: 'pointerdown', fn: onPointerDown },
        { type: 'keydown', fn: onKeyDown },
        { type: 'touchstart', fn: onTouchStart },
      ];
      unlockers.forEach(({ type, fn }) => window.addEventListener(type, fn, { passive: true }));
    };

    if (enableSound && soundSrc) {
      const audio = audioRef.current;
      if (audio) {
        try {
          audio.autoplay = true;
          audio.loop = false;
          audio.preload = 'auto';
          audio.crossOrigin = 'anonymous';
          audio.muted = true; // start muted, then unmute
          audio.volume = 0.0;
          const tryPlay = () => {
            audio.play().then(() => {
              // unmute and ramp up shortly after start
              setTimeout(() => {
                audio.muted = false;
                let v = 0;
                const step = () => {
                  v += 0.07;
                  audio.volume = Math.min(0.35, v);
                  if (v < 0.35) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
              }, 120);
            }).catch(() => {
              // Autoplay blocked, set up unlock
              setNeedsUnlock(true);
              setupUnlockHandlers();
            });
          };
          tryPlay();
        } catch (_) {
          // ignore
        }
      }
    }

    // timers
    const startExit = setTimeout(() => setAnimateOut(true), Math.max(0, showDurationMs));
    const finish = setTimeout(() => {
      if (onFinished) onFinished();
    }, Math.max(0, showDurationMs) + Math.max(0, exitDurationMs));

    return () => {
      clearTimeout(startExit);
      clearTimeout(finish);
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch (_) {}
      }
      // cleanup unlock handlers
      unlockers.forEach(({ type, fn }) => window.removeEventListener(type, fn));
      unlockers = [];
    };
  }, [enableSound, soundSrc, showDurationMs, exitDurationMs, onFinished]);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        animate={{ opacity: animateOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: exitDurationMs / 1000, ease }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Subtle red glow backdrop */}
        {!reduceMotion && (
          <motion.div
            className="absolute"
            style={{
              width: "42vmax",
              height: "42vmax",
              borderRadius: "9999px",
              background:
                "radial-gradient(closest-side, rgba(255,0,0,0.22), rgba(0,0,0,0) 70%)",
              filter: "blur(6px)",
            }}
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: animateOut ? 0 : 0.35, scale: animateOut ? 1.15 : 1.05 }}
            transition={{ duration: 1.2, ease }}
          />
        )}

        {/* Beams/Streaks */}
        {!reduceMotion && beams.map((b) => (
          <motion.div
            key={`beam-${b.id}`}
            className="pointer-events-none absolute left-[-40%]"
            style={{
              top: b.top,
              width: "180%",
              height: 2,
              transformOrigin: "left center",
              background:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.15) 20%, rgba(255,0,0,0.55) 50%, rgba(255,255,255,0.12) 80%, rgba(0,0,0,0) 100%)",
              filter: "blur(0.5px)",
              opacity: b.opacity,
              rotate: `${b.rotate}deg`,
            }}
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: animateOut ? "20%" : "140%", opacity: animateOut ? 0 : b.opacity }}
            transition={{ duration: b.duration, delay: b.delay, ease }}
          />
        ))}

        {/* Logo */}
        <motion.img
          src={`${import.meta.env.BASE_URL}MR.png`}
          alt="MR"
          draggable={false}
          className="w-40 h-40 md:w-48 md:h-48 object-contain select-none"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            scale: animateOut ? 8 : 1,
            filter: animateOut ? "blur(10px)" : "blur(0px)",
          }}
          transition={{ duration: animateOut ? exitDurationMs / 1000 : 0.9, ease }}
        />

        {/* Soft vignette to mimic cinematic feel */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Hidden audio element for better autoplay compatibility */}
        {enableSound && (
          <audio
            ref={audioRef}
            src={soundSrc}
            preload="auto"
            playsInline
            aria-hidden="true"
            className="hidden"
          />)
        }

      </motion.div>
    </AnimatePresence>
  );
}
