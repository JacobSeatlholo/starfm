"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
  as?: ElementType;
  id?: string;
};

export function Reveal({ children, className = "", delay, as: Tag = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `d${delay}` : "";

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal ${delayClass} ${visible ? "in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
