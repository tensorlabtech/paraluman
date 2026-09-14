"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useRef } from "react";

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

          if (isDesktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: "[data-hero]",
                  start: "top top",
                  end: "+=88%",
                  pin: true,
                  scrub: 0.7,
                },
              })
              .to("[data-hero-image]", { scale: 1.075, xPercent: -1.2, ease: "none", duration: 0.78 }, 0.22)
              .to("[data-hero-wash]", { opacity: 0.82, ease: "none", duration: 0.78 }, 0.22)
              .fromTo(
                "[data-hero-kicker]",
                { opacity: 1, x: 0, y: 0 },
                { opacity: 0, y: -10, ease: "none", duration: 0.2, immediateRender: false },
                0.3,
              )
              .fromTo(
                "[data-hero-description]",
                { opacity: 1, x: 0, y: 0 },
                { opacity: 0, y: -12, ease: "none", duration: 0.2, immediateRender: false },
                0.34,
              )
              .fromTo(
                "[data-hero-title]",
                { opacity: 1, scale: 1, x: 0, y: 0 },
                { opacity: 0, scale: 0.99, y: -18, ease: "none", duration: 0.28, immediateRender: false },
                0.38,
              )
              .fromTo(
                "[data-hero-cta]",
                { opacity: 1, x: 0, y: 0 },
                { opacity: 0, y: -8, ease: "none", duration: 0.18, immediateRender: false },
                0.42,
              )
              .fromTo(
                "[data-case-note-shell]",
                { opacity: 1, scale: 1, x: 0, y: 0 },
                { opacity: 0, scale: 0.98, x: -18, y: -16, ease: "none", duration: 0.3, immediateRender: false },
                0.36,
              );
          }

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

          gsap.fromTo(
            "[data-manifesto-art] img",
            { scale: 1.02, yPercent: -3 },
            {
              ease: "none",
              scale: 1.1,
              scrollTrigger: {
                trigger: "[data-manifesto]",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
              yPercent: 3,
            },
          );

          if (isDesktop) {
            const serviceCards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
            gsap.set(serviceCards, { zIndex: (index) => index + 1 });
            gsap.set(serviceCards.slice(1), { yPercent: 112, scale: 0.92 });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: "[data-services-story]",
                  start: "top top",
                  end: "+=260%",
                  pin: "[data-services-stage]",
                  scrub: 0.8,
                },
              })
              .to("[data-services-progress]", { scaleX: 1, duration: 4, ease: "none" }, 0)
              .to(serviceCards[0], { opacity: 1, duration: 0.7 }, 0)
              .to(serviceCards[0], { yPercent: -7, scale: 0.9, opacity: 0.3, duration: 1, ease: "none" }, 1)
              .to(serviceCards[1], { yPercent: 0, scale: 1, duration: 1, ease: "none" }, 1)
              .to(serviceCards[1], { opacity: 1, duration: 0.7 }, 2)
              .to(serviceCards[1], { yPercent: -7, scale: 0.9, opacity: 0.3, duration: 1, ease: "none" }, 3)
              .to(serviceCards[2], { yPercent: 0, scale: 1, duration: 1, ease: "none" }, 3)
              .to(serviceCards[2], { opacity: 1, duration: 0.7 }, 4);
          } else if (isMobile) {
            gsap.set("[data-service-card]", { opacity: 0, y: 48 });
            gsap.fromTo(
              "[data-service-card]",
              { opacity: 0, y: 48 },
              {
                duration: 0.65,
                ease: "power3.out",
                immediateRender: false,
                opacity: 1,
                stagger: 0.1,
                scrollTrigger: { trigger: "[data-service-cards]", start: "top 82%", once: true },
                y: 0,
              },
            );
          }

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

          if (isDesktop) {
            const processTrack = document.querySelector<HTMLElement>("[data-process]");
            const processStage = document.querySelector<HTMLElement>("[data-process-stage]");
            if (processTrack && processStage) {
              const travel = () => Math.max(0, processTrack.scrollWidth - processStage.clientWidth);
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: "[data-process-section]",
                    start: "top top",
                    end: () => `+=${travel() * 1.02}`,
                    pin: "[data-process-stage]",
                    scrub: 0.9,
                    invalidateOnRefresh: true,
                  },
                })
                .to(processTrack, { x: () => -travel(), duration: 1, ease: "none" }, 0)
                .to("[data-process-progress]", { scaleX: 1, duration: 1, ease: "none" }, 0);
            }
          } else {
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

          const proofPath = document.querySelector<SVGPathElement>("[data-proof-path]");
          if (proofPath) {
            const length = proofPath.getTotalLength();
            gsap.set(proofPath, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(proofPath, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: { trigger: "[data-proof]", start: "top 72%", end: "bottom 56%", scrub: 0.7 },
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

          const tiltCard = document.querySelector<HTMLElement>("[data-tilt-card]");
          let removeTiltListeners = () => undefined;
          if (tiltCard && isDesktop) {
            gsap.set(tiltCard, { transformPerspective: 1100, transformOrigin: "center" });
            const rotateX = gsap.quickTo(tiltCard, "rotationX", { duration: 0.26, ease: "power3.out" });
            const rotateY = gsap.quickTo(tiltCard, "rotationY", { duration: 0.26, ease: "power3.out" });
            const scaleX = gsap.quickTo(tiltCard, "scaleX", { duration: 0.28, ease: "power3.out" });
            const scaleY = gsap.quickTo(tiltCard, "scaleY", { duration: 0.28, ease: "power3.out" });
            const setScale = (value: number) => {
              scaleX(value);
              scaleY(value);
            };
            const onEnter = () => setScale(1.025);
            const onMove = (event: PointerEvent) => {
              const bounds = tiltCard.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / bounds.width;
              const y = (event.clientY - bounds.top) / bounds.height;
              tiltCard.style.setProperty("--tilt-x", `${x * 100}%`);
              tiltCard.style.setProperty("--tilt-y", `${y * 100}%`);
              rotateX((0.5 - y) * 13);
              rotateY((x - 0.5) * 15);
            };
            const onLeave = () => {
              rotateX(0);
              rotateY(0);
              setScale(1);
            };
            tiltCard.addEventListener("pointerenter", onEnter);
            tiltCard.addEventListener("pointermove", onMove);
            tiltCard.addEventListener("pointerleave", onLeave);
            removeTiltListeners = () => {
              tiltCard.removeEventListener("pointerenter", onEnter);
              tiltCard.removeEventListener("pointermove", onMove);
              tiltCard.removeEventListener("pointerleave", onLeave);
            };
          }

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh, { once: true });
          document.fonts.ready.then(refresh);

          return () => {
            headerTrigger.kill();
            removeTiltListeners();
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
