import { useEffect, useRef, useState } from "react";

export default function LazyVideo({ videoSrc, posterSrc, ratio = 56.25 }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [shouldRender, setShouldRender] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          if (!prefersReduced) setShouldPlay(true);
        } else {
          setShouldPlay(false);
        }
      },
      {
        rootMargin: "20px",
        threshold: 1,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (shouldPlay) {
      const tryPlay = () => {
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      };

      if (v.readyState >= 2) {
        tryPlay();
      } else {
        v.addEventListener("canplay", tryPlay, { once: true });
      }
    } else {
      v.pause();
    }
  }, [shouldPlay]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingBottom: `${ratio}%`,
        overflow: "hidden",
        borderRadius: "16px",
        background: posterSrc
          ? `url(${posterSrc}) center / cover no-repeat`
          : "#000",
      }}
    >
      {shouldRender && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          loop
          preload="metadata"
          onCanPlay={() => setReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: ready ? 1 : 0,
            transition: "opacity 250ms ease",
          }}
        />
      )}
    </div>
  );
}

