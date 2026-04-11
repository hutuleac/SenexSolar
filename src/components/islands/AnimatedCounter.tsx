import { useRef, useEffect } from 'react';
import { useInView, animate } from 'motion/react';

interface Props {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function AnimatedCounter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.8,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const el = ref.current;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        el.textContent = prefix + value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, to, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
