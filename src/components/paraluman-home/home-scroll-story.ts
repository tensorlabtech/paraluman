import gsap from "gsap";

type StoryOptions = {
  isDesktop: boolean;
  isMobile: boolean;
};

export function createHomeScrollStory({ isDesktop, isMobile }: StoryOptions) {
  createManifestoImageHandoff(isDesktop);
  createServicesChapterCuts({ isDesktop, isMobile });
  createProcessFocusTrack(isDesktop);
  createPartnerMarquee();
}

export function createHeroEditorialCut(isDesktop: boolean) {
  if (!isDesktop) return;

  const heroWords = gsap.utils.toArray<HTMLElement>("[data-hero-word]");

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: "[data-hero]",
      start: "top top",
      end: "+=145%",
      pin: true,
      scrub: 0.85,
      anticipatePin: 1,
    },
  });

  return timeline
    .addLabel("establish", 0)
    .fromTo(
      "[data-hero-image]",
      { scale: 1.06 },
      { duration: 1, ease: "none", scale: 1 },
      "establish",
    )
    .to("[data-hero-wash]", { duration: 0.82, opacity: 0 }, "establish+=0.08")
    .addLabel("exit", 0.3)
    .to(
      "[data-case-note]",
      { duration: 0.2, opacity: 0, scale: 0.92, x: 48 },
      "exit",
    )
    .to(
      "[data-hero-cta], [data-hero-description]",
      { duration: 0.2, opacity: 0, stagger: 0.04, y: 16 },
      "exit+=0.02",
    )
    .to(
      heroWords,
      {
        duration: 0.46,
        opacity: 0,
        rotateX: -76,
        stagger: { each: 0.018, from: "end" },
        yPercent: 115,
      },
      "exit+=0.12",
    )
    .to("[data-hero-title]", { autoAlpha: 0, duration: 0.08 }, ">-0.08")
    .to(
      "[data-hero-kicker] span",
      { duration: 0.2, opacity: 0, y: 16 },
      ">-0.06",
    )
    .addLabel("cleanFrame")
    .to({}, { duration: 0.48 });
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
    gsap.set(cards.slice(1), { clipPath: "inset(0% 0% 100% 0%)", scale: 1.035 });

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "[data-services-story]",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    });

    timeline.to("[data-services-progress]", { scaleX: 1, duration: 4 }, 0);

    cards.slice(1).forEach((card, index) => {
      const previousCard = cards[index];
      const cutAt = index * 2 + 1;
      timeline
        .to(previousCard, { opacity: 0.82, scale: 0.985, xPercent: -1, duration: 1 }, cutAt)
        .to(
          previousCard.querySelector("[data-service-content]"),
          { autoAlpha: 0, yPercent: -3, duration: 0.42 },
          cutAt,
        )
        .to(card, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1 }, cutAt)
        .fromTo(
          card.querySelector("[data-service-content]"),
          { autoAlpha: 0, xPercent: 4 },
          { autoAlpha: 1, xPercent: 0, duration: 0.28, immediateRender: false },
          cutAt + 0.62,
        );
    });

    // Hold the final chapter long enough to read before the pinned section releases.
    timeline.to({}, { duration: 0.65 });
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

function createPartnerMarquee() {
  gsap.fromTo(
    "[data-partner-marquee]",
    { xPercent: 0 },
    {
      xPercent: -24,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: "[data-partners]",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    },
  );
}
