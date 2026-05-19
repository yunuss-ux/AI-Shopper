import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

export const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  const characters = text.split('');

  return (
    <p ref={ref} className={className}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        return <Char key={i} char={char} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
};

const Char = ({ char, progress, range }: { char: string, progress: any, range: number[] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};