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
      // Enhanced header entrance with stagger
      gsap.from(".site-header", { 
        y: -30, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.2
      });

      // Top page elements - immediate animation for better UX
      const topElements = gsap.utils.toArray('[data-anim="fade-up"]');
      if (topElements.length > 0) {
        topElements.forEach((el, index) => {
          // Check if element is in viewport initially (top elements)
          const rect = el.getBoundingClientRect();
          const isTopElement = rect.top < window.innerHeight * 0.5;
          
          if (isTopElement) {
            // Animate immediately for top elements
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.1 + (index * 0.1),
            });
          } else {
            // Use scroll trigger for elements below fold
            gsap.from(el, {
              y: 25,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          }
        });
      }

      // Enhanced grid stagger with improved timing
      const grids = gsap.utils.toArray('.reveal-grid');
      if (grids.length > 0) {
        grids.forEach((grid) => {
          const items = grid.querySelectorAll('.reveal-card');
          if (items.length > 0) {
            gsap.from(items, {
              y: 30,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: grid,
                start: "top 80%",
                once: true,
              },
            });
          }
        });
      }

      // Smooth parallax with optimized performance
      const parallaxElements = gsap.utils.toArray('.parallax-y');
      if (parallaxElements.length > 0) {
        parallaxElements.forEach((el) => {
          gsap.to(el, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      }

      // Scroll-based background gradient animation
      let scrollTimeout;
      let isScrolling = false;
      
      const updateScrollGradient = () => {
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const gradientOpacity = Math.min(scrollProgress * 0.3, 0.15); // Max 15% opacity
        
        if (!isScrolling) {
          isScrolling = true;
          document.body.style.background = `
            linear-gradient(135deg, 
              rgba(212, 175, 55, ${gradientOpacity * 0.8}) 0%, 
              rgba(0, 0, 0, 1) 30%, 
              rgba(11, 120, 138, ${gradientOpacity * 0.6}) 70%, 
              rgba(0, 0, 0, 1) 100%
            )
          `;
        }
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set timeout to return to solid black when scrolling stops
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          gsap.to(document.body, {
            background: "linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)",
            duration: 0.8,
            ease: "power2.out"
          });
        }, 150); // 150ms after scrolling stops
      };

      // Throttled scroll listener for performance
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateScrollGradient();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      // Auto-scrolling gallery enhancement
      const autoScrollGalleries = gsap.utils.toArray('.auto-scroll-gallery');
      autoScrollGalleries.forEach((gallery) => {
        const images = gallery.querySelectorAll('img');
        if (images.length > 0) {
          // Create infinite scroll effect
          gsap.to(images, {
            x: "-100%",
            duration: 20,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize(x => parseFloat(x) % 100)
            }
          });
        }
      });

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}