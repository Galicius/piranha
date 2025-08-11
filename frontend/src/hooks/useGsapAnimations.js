import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Generic fade-up reveal
      gsap.utils.toArray('[data-anim="fade-up"]').forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Card stagger in grids
      gsap.utils.toArray('.reveal-grid').forEach((grid) => {
        const items = grid.querySelectorAll('.reveal-card');
        gsap.from(items, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
          },
        });
      });

      // Soft parallax for media blocks
      gsap.utils.toArray('.parallax-y').forEach((el) => {
        gsap.to(el, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      // CTA subtle pulse on enter
      gsap.utils.toArray('.cta-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.98, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}