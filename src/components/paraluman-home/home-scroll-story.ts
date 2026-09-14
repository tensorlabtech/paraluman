import gsap from "gsap";

type StoryOptions = {
  isDesktop: boolean;
  isMobile: boolean;
};

export function createHomeScrollStory({ isDesktop, isMobile }: StoryOptions) {
  createHeroEditorialCut(isDesktop);
  createManifestoImageHandoff(isDesktop);
  createServicesChapterCuts({ isDesktop, isMobile });
  createProcessFocusTrack(isDesktop);
}

function createHeroEditorialCut(isDesktop: boolean) {
  if (!isDesktop) return;

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: "[data-hero]",
      start: "top top",
      end: "+=112%",
      pin: true,
      scrub: 0.85,
      anticipatePin: 1,
    },
  });

  timeline
    .addLabel("establish", 0)
    .to("[data-hero-image]", { xPercent: -5, duration: 1 }, "establish")
    .to("[data-hero-media]", { autoAlpha: 0.72, duration: 1 }, "establish")
    .addLabel("edit", 0.34)
    .to("[data-hero-media]", { autoAlpha: 0.46, duration: 0.58 }, "edit")
    .to("[data-hero-wash]", { opacity: 0.9, duration: 0.5 }, "edit")
    .to("[data-hero-inner]", { autoAlpha: 0, yPercent: -2.5, duration: 0.38 }, "edit+=0.02");
}

function createManifestoImageHandoff(isDesktop: boolean) {
  gsap.fromTo(
    "[data-manifesto-art]",
    {
      clipPath: isDesktop ? "inset(5% 5% 5% 62%)" : "inset(0 0 0 38%)",
      opacity: 0.08,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      opacity: 0.22,
      scrollTrigger: {
        trigger: "[data-manifesto]",
        start: "top 94%",
        end: isDesktop ? "top 14%" : "top 35%",
        scrub: 0.85,
      },
    },
  );

  gsap.fromTo(
    "[data-manifesto-art] img",
    { xPercent: isDesktop ? -4 : -2.5 },
    {
      ease: "none",
      xPercent: isDesktop ? 4 : 2.5,
      scrollTrigger: {
        trigger: "[data-manifesto]",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
      },
    },
  );
}

function createServicesChapterCuts({ isDesktop, isMobile }: StoryOptions) {
  const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
  if (!cards.length) return;

  if (isDesktop) {
    gsap.set(cards, { zIndex: (index) => index + 1 });
    gsap.set(cards.slice(1), { clipPath: "inset(100% 0% 0% 0%)", scale: 1.035 });

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "[data-services-story]",
        start: "top top",
        end: "+=255%",
        pin: "[data-services-stage]",
        scrub: 0.85,
      },
    });

    timeline.to("[data-services-progress]", { scaleX: 1, duration: 4 }, 0);

    cards.slice(1).forEach((card, index) => {
      const previousCard = cards[index];
      const cutAt = index * 2 + 1;
      timeline
        .to(previousCard, { opacity: 0.45, scale: 0.96, xPercent: -2.5, duration: 1 }, cutAt)
        .to(card, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1 }, cutAt)
        .fromTo(
          card.querySelector("[data-service-content]"),
          { autoAlpha: 0.35, xPercent: 7 },
          { autoAlpha: 1, xPercent: 0, duration: 0.7, immediateRender: false },
          cutAt + 0.18,
        );
    });
  } else if (isMobile) {
    gsap.fromTo(
      cards,
      { clipPath: "inset(0 0 18% 0)", opacity: 0.4, y: 36 },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.72,
        ease: "power3.out",
        immediateRender: false,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-service-cards]", start: "top 82%", once: true },
        y: 0,
      },
    );
  }
}

function createProcessFocusTrack(isDesktop: boolean) {
  if (!isDesktop) return;

  const track = document.querySelector<HTMLElement>("[data-process]");
  const stage = document.querySelector<HTMLElement>("[data-process-stage]");
  if (!track || !stage) return;

  const travel = () => Math.max(0, track.scrollWidth - stage.clientWidth);
  const trackTween = gsap.to(track, {
    x: () => -travel(),
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-process-section]",
      start: "top top",
      end: () => `+=${travel() * 1.02}`,
      pin: "[data-process-stage]",
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  });

  gsap.to("[data-process-progress]", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-process-section]",
      start: "top top",
      end: () => `+=${travel() * 1.02}`,
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  });

  gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: step,
          containerAnimation: trackTween,
          start: "left 88%",
          end: "right 12%",
          scrub: 0.45,
        },
      })
      .fromTo(step, { opacity: 0.48 }, { opacity: 1, duration: 0.42, immediateRender: false })
      .to(step, { opacity: 0.58, duration: 0.42 }, 0.58)
      .fromTo(
        step.querySelector("[data-process-media] img"),
        { scale: 1.06 },
        { scale: 1, duration: 0.5, immediateRender: false },
        0,
      )
      .fromTo(
        step.querySelector("[data-process-copy]"),
        { xPercent: 8 },
        { xPercent: 0, duration: 0.5, immediateRender: false },
        0,
      );
  });
}
