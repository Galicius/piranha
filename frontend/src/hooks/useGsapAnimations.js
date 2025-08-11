import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimations() {
  useLayoutEffect(() => {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Skip animations for users who prefer reduced motion
    }

    const ctx = gsap.context(() => {
      // Header entrance - simplified
      gsap.from(".site-header", { 
        y: -20, 
        opacity: 0, 
        duration: 0.4, 
        ease: "power1.out" 
      });

      // Optimized fade-up reveal with reduced complexity
      const fadeUpElements = gsap.utils.toArray('[data-anim="fade-up"]');
      if (fadeUpElements.length > 0) {
        fadeUpElements.forEach((el) => {
          gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none", // Simplified toggle actions
              once: true, // Only animate once for better performance
            },
          });
        });
      }

      // Optimized grid stagger with batch processing
      const grids = gsap.utils.toArray('.reveal-grid');
      if (grids.length > 0) {
        grids.forEach((grid) => {
          const items = grid.querySelectorAll('.reveal-card');
          if (items.length > 0) {
            gsap.from(items, {
              y: 20,
              opacity: 0,
              duration: 0.5,
              ease: "power1.out",
              stagger: 0.05, // Reduced stagger for faster completion
              scrollTrigger: {
                trigger: grid,
                start: "top 85%",
                once: true, // Only animate once
              },
            });
          }
        });
      }

      // Simplified parallax with reduced scrub intensity
      const parallaxElements = gsap.utils.toArray('.parallax-y');
      if (parallaxElements.length > 0) {
        parallaxElements.forEach((el) => {
          gsap.to(el, {
            yPercent: -5, // Reduced parallax effect
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1, // Increased scrub for smoother performance
            },
          });
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}