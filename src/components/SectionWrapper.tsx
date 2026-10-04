'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

export default function SectionWrapper({
  id,
  className = '',
  children,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  // Mengubah once menjadi false agar animasi aktif setiap kali elemen masuk ke layar (dua arah)
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}