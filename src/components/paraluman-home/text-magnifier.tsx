"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef } from "react";
import styles from "./text-magnifier.module.css";

type TextMagnifierProps = {
  as?: "h1" | "p";
  className?: string;
  children: string;
  variant: "hero" | "statement";
};

type LensStyles = CSSProperties & {
  "--lens-x": string;
  "--lens-y": string;
};

function AnimatedWords({
  children,
  target,
}: {
  children: string;
  target?: "hero" | "manifesto";
}) {
  return children.split(" ").map((word, index) => (
    <span
      className={styles.word}
      data-hero-word={target === "hero" ? "" : undefined}
      data-manifesto-word={target === "manifesto" ? "" : undefined}
      key={`${word}-${index}`}
    >
      {word}
    </span>
  ));
}

export function TextMagnifier({
  as: Tag = "p",
  className,
  children,
  variant,
}: TextMagnifierProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const moveLens = (event: PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root || event.pointerType === "touch") return;
    const bounds = root.getBoundingClientRect();
    root.style.setProperty("--lens-x", `${event.clientX - bounds.left}px`);
    root.style.setProperty("--lens-y", `${event.clientY - bounds.top}px`);
    root.dataset.active = "true";
  };

  const hideLens = () => {
    if (rootRef.current) rootRef.current.dataset.active = "false";
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        root.dataset.scan = "true";
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const initialStyle: LensStyles = {
    "--lens-x": "50%",
    "--lens-y": "50%",
  };

  return (
    <div
      className={`${styles.root} ${styles[variant]} ${className ?? ""}`}
      data-magnifier-root
      data-active="false"
      data-scan="false"
      onPointerLeave={hideLens}
      onPointerMove={moveLens}
      ref={rootRef}
      style={initialStyle}
    >
      <Tag aria-label={children} className={styles.base}>
        <AnimatedWords target={variant === "hero" ? "hero" : "manifesto"}>{children}</AnimatedWords>
      </Tag>
      <div aria-hidden="true" className={styles.highlight}>
        <AnimatedWords>{children}</AnimatedWords>
      </div>
      <span aria-hidden="true" className={styles.lens} />
    </div>
  );
}
