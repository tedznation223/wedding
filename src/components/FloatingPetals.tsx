'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  el: HTMLDivElement;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const petals: Petal[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = Math.random() * 8 + 6;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 12 + 14;

      el.className = 'petal';
      el.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: ${Math.random() * 0.5 + 0.3};
      `;

      container.appendChild(el);
      petals.push({ el, left, delay, duration, size });
    }

    return () => {
      petals.forEach((p) => p.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
