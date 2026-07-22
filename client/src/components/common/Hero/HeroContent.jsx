import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * HeroContent Component
 * Renders the heading, subheading, and CTA button for the active slide.
 * Animates text elements using GSAP once the slide transition finishes.
 */
export function HeroContent({ slide, active, triggerAnimation }) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!active || !triggerAnimation) return;

    // Create the entrance animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Reset initial states before animation
    gsap.set(headingRef.current, { x: -100, opacity: 0 });
    gsap.set(subheadingRef.current, { x: 100, opacity: 0 });
    gsap.set(buttonRef.current, { y: 40, opacity: 0 });

    // Animate sequence
    tl.to(headingRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8
    })
    .to(subheadingRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.6")
    .to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, [active, triggerAnimation, slide]);

  // If not active, render hidden or un-animated to avoid layout shift
  if (!active) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 z-20 select-none pointer-events-none"
    >
      <div className="max-w-4xl flex flex-col items-center">
        <h1 
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight uppercase leading-[1.05] mb-6 opacity-0"
        >
          {slide.heading}
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-base sm:text-lg md:text-xl text-white/80 font-light max-w-2xl leading-relaxed mb-10 opacity-0"
        >
          {slide.subheading}
        </p>

        <div ref={buttonRef} className="opacity-0 pointer-events-auto">
          <button className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-black bg-white rounded-full transition-all duration-300 hover:bg-black hover:text-white border border-white hover:border-white/20 active:scale-95 shadow-[0_8px_30px_rgb(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            {slide.button}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
