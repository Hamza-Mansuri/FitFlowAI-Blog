import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecorativeBranch from "./DecorativeBranch";

gsap.registerPlugin(ScrollTrigger);

/**
 * DecorativeSectionWrapper Component
 * Wraps a section, renders a botanical branch at the edge,
 * and sets up a subtle vertical scroll parallax on that branch.
 */
export function DecorativeSectionWrapper({
  children,
  side = "left",
  variant = "A",
  size = "medium",
  opacity = 0.28,
  delay = 0,
  className = ""
}) {
  const sectionRef = useRef(null);
  const branchWrapperRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Create a subtle parallax effect on scroll
    const parallaxTween = gsap.fromTo(
      branchWrapperRef.current,
      { y: 35 },
      {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      }
    );

    return () => {
      parallaxTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {/* Decorative Branch Wrapper */}
      <div ref={branchWrapperRef} className="absolute inset-y-0 w-44 sm:w-64 pointer-events-none select-none z-0" style={{ [side]: 0 }}>
        <DecorativeBranch
          side={side}
          variant={variant}
          size={size}
          opacity={opacity}
          delay={delay}
          triggerRef={sectionRef}
        />
      </div>

      {/* Main Section Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

export default DecorativeSectionWrapper;
