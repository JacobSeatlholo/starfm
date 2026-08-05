"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, .cursor-target"
      );
      const ring = ringRef.current;
      if (ring) {
        ring.style.width = interactive ? "48px" : "32px";
        ring.style.height = interactive ? "48px" : "32px";
        ring.style.borderColor = interactive
          ? "rgba(53, 189, 4, 0.8)"
          : "rgba(53, 189, 4, 0.5)";
        ring.style.background = interactive
          ? "rgba(53, 189, 4, 0.08)"
          : "transparent";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    document.body.classList.add("cursor-fine");

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-fine");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  );
}
