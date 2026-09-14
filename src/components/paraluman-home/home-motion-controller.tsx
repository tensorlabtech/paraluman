"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useRef } from "react";
import { createHomeScrollStory } from "./home-scroll-story";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HomeMotionControllerProps = { children: ReactNode };

export function HomeMotionController({ children }: HomeMotionControllerProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          isDesktop: "(min-width: 901px)",
          isMobile: "(max-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, isMobile, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          const header = document.querySelector<HTMLElement>("[data-site-header]");
          const headerTrigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              if (header) header.dataset.scrolled = String(self.scroll() > 72);
            },
          });

          if (reduceMotion) {
            gsap.set("[data-hero-curtain] span", { scaleY: 0 });
            return () => headerTrigger.kill();
          }

          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to("[data-hero-curtain] span", {
              duration: 0.75,
              ease: "power4.inOut",
              scaleY: 0,
              stagger: 0.08,
            })
            .from("[data-site-header]", { opacity: 0, y: -16, duration: 0.45 }, 0.28)
            .from("[data-hero-kicker] span", { opacity: 0, y: 16, duration: 0.45 }, 0.42)
            .from(
              "[data-hero-word]",
              { opacity: 0, rotateX: -76, stagger: 0.028, yPercent: 115, duration: 0.7 },
              0.48,
            )
            .from("[data-case-note]", { opacity: 0, scale: 0.92, x: 48, duration: 0.7 }, 0.82)
            .from("[data-case-note] i b", { scale: 0, stagger: 0.08, duration: 0.3 }, 1);

          createHomeScrollStory({ isDesktop, isMobile });

          const manifestoWords = gsap.utils.toArray<HTMLElement>("[data-manifesto-word]");
          gsap.set(manifestoWords, {
            color: "var(--color-ivory-bright)",
            opacity: 0.34,
            yPercent: 18,
          });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-manifesto]",
                start: isDesktop ? "top 84%" : "top 86%",
                end: isDesktop ? "bottom 54%" : "bottom 40%",
                scrub: isDesktop ? 0.75 : 0.45,
              },
            })
            .to("[data-manifesto-progress]", { "--manifesto-progress": 1, duration: 1, ease: "none" }, 0)
            .to(
              manifestoWords,
              {
                opacity: 1,
                stagger: 0.055,
                yPercent: 0,
                duration: 0.28,
                ease: "none",
              },
              0,
            )
            .fromTo(
              "[data-script-note]",
              { opacity: 0.24, x: 40 },
              { opacity: 1, x: 0, duration: 0.3, ease: "none" },
              0.68,
            );

          gsap.utils.toArray<HTMLElement>("[data-reveal-section]").forEach((section) => {
            const heading = section.querySelector("[data-section-heading]");
            if (!heading) return;
            gsap.set(heading.children, { clipPath: "inset(0 100% 0 0)", opacity: 0.2, x: -28 });
            gsap.fromTo(
              heading.children,
              { clipPath: "inset(0 100% 0 0)", opacity: 0.2, x: -28 },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.78,
                ease: "power3.out",
                immediateRender: false,
                opacity: 1,
                stagger: 0.06,
                scrollTrigger: { trigger: heading, start: "top 82%", once: true },
                x: 0,
              },
            );
          });

          gsap.utils.toArray<HTMLElement>("[data-vertical-card]").forEach((card) => {
            const copy = card.querySelectorAll("[data-vertical-card-copy]");
            gsap.set(copy, { opacity: 0, y: 28 });
            gsap.fromTo(
              copy,
              { opacity: 0, y: 28 },
              {
                duration: 0.72,
                ease: "power3.out",
                immediateRender: false,
                opacity: 1,
                stagger: 0.06,
                scrollTrigger: { trigger: card, start: "top 86%", once: true },
                y: 0,
              },
            );
          });

          gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((frame) => {
            const image = frame.querySelector("img");
            if (!image) return;
            gsap.fromTo(
              image,
              { scale: 1.12, yPercent: -5 },
              {
                scale: 1.03,
                yPercent: 5,
                ease: "none",
                scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.8 },
              },
            );
          });

          if (isMobile) {
            gsap.set("[data-process-step]", { opacity: 0, y: 40 });
            gsap.fromTo(
              "[data-process-step]",
              { opacity: 0, y: 40 },
              {
                duration: 0.75,
                ease: "power3.out",
                immediateRender: false,
                opacity: 1,
                stagger: 0.08,
                scrollTrigger: { trigger: "[data-process]", start: "top 82%", once: true },
                y: 0,
              },
            );
          }

          const proofAreaReveal = document.querySelector<SVGRectElement>("[data-proof-area-reveal]");
          if (proofAreaReveal) {
            gsap.set(proofAreaReveal, { scaleX: 0, transformOrigin: "left center" });
            gsap.to(proofAreaReveal, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: "[data-proof]", start: "top 92%", end: "top 12%", scrub: 0.85 },
            });
          }
          gsap.set("[data-proof-title] span", {
            clipPath: "inset(0 0 100% 0)",
            opacity: 0,
            yPercent: 32,
          });
          gsap.fromTo(
            "[data-proof-title] span",
            { clipPath: "inset(0 0 100% 0)", opacity: 0, yPercent: 32 },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.9,
              ease: "power3.out",
              immediateRender: false,
              opacity: 1,
              stagger: 0.1,
              scrollTrigger: { trigger: "[data-proof]", start: "top 68%", once: true },
              yPercent: 0,
            },
          );

          gsap.set("[data-proof-stat]", { opacity: 0, x: 36 });
          gsap.fromTo(
            "[data-proof-stat]",
            { opacity: 0, x: 36 },
            {
              duration: 0.72,
              ease: "power3.out",
              immediateRender: false,
              opacity: 1,
              stagger: 0.06,
              scrollTrigger: { trigger: "[data-proof-stats]", start: "top 76%", once: true },
              x: 0,
            },
          );

          gsap.set("[data-project-card]", { opacity: 0, scale: 0.94, y: 56 });
          gsap.fromTo(
            "[data-project-card]",
            { opacity: 0, scale: 0.94, y: 56 },
            {
              duration: 0.82,
              ease: "power3.out",
              immediateRender: false,
              opacity: 1,
              scale: 1,
              stagger: 0.06,
              scrollTrigger: { trigger: "[data-project-grid]", start: "top 80%", once: true },
              y: 0,
            },
          );

          gsap.set("[data-insight-row]", { opacity: 0, x: -32 });
          gsap.fromTo(
            "[data-insight-row]",
            { opacity: 0, x: -32 },
            {
              duration: 0.68,
              ease: "power3.out",
              immediateRender: false,
              opacity: 1,
              stagger: 0.06,
              scrollTrigger: { trigger: "[data-insight-list]", start: "top 82%", once: true },
              x: 0,
            },
          );

          gsap.fromTo(
            "[data-intelligence-pattern]",
            { rotation: -1.2, xPercent: 8 },
            {
              ease: "none",
              rotation: 1.2,
              scrollTrigger: {
                trigger: "[data-intelligence-pattern]",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
              xPercent: -5,
            },
          );

          gsap.to("[data-partner-marquee]", {
            xPercent: -24,
            ease: "none",
            scrollTrigger: { trigger: "[data-partners]", start: "top bottom", end: "bottom top", scrub: 0.8 },
          });

          gsap.set("[data-footer-title] span", { opacity: 0, rotateX: -68, yPercent: 100 });
          gsap.fromTo(
            "[data-footer-title] span",
            { opacity: 0, rotateX: -68, yPercent: 100 },
            {
              duration: 0.75,
              ease: "power3.out",
              immediateRender: false,
              opacity: 1,
              rotateX: 0,
              stagger: 0.07,
              scrollTrigger: { trigger: "[data-footer]", start: "top 72%", once: true },
              yPercent: 0,
            },
          );
          gsap.set("[data-footer-script]", { opacity: 0, x: 80 });
          gsap.fromTo(
            "[data-footer-script]",
            { opacity: 0, x: 80 },
            {
              duration: 0.8,
              ease: "power3.out",
              immediateRender: false,
              opacity: 1,
              scrollTrigger: { trigger: "[data-footer]", start: "top 72%", once: true },
              x: 0,
            },
          );
          gsap.to("[data-footer-orb]", {
            rotate: 26,
            yPercent: -18,
            ease: "none",
            scrollTrigger: { trigger: "[data-footer]", start: "top bottom", end: "bottom bottom", scrub: 1 },
          });

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh, { once: true });
          document.fonts.ready.then(refresh);

          return () => {
            headerTrigger.kill();
            window.removeEventListener("load", refresh);
          };
        },
      );

      return () => media.revert();
    },
    { scope: scopeRef },
  );

  return <div ref={scopeRef}>{children}</div>;
}
