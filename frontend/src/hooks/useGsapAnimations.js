import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".site-header", { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" });

      // Fade-up reveal
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

      // Grid stagger
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

      // Parallax media
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

      // Scroll-only gradient veil: visible during motion, hidden when idle
      const veil = document.getElementById("scroll-veil");
      if (veil) {
        ScrollTrigger.addEventListener("scrollStart", () => {
          gsap.to(veil, { opacity: 0.18, duration: 0.25, ease: "power1.out" });
        });
        ScrollTrigger.addEventListener("scrollEnd", () => {
          gsap.to(veil, { opacity: 0, duration: 0.6, ease: "power1.out" });
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}