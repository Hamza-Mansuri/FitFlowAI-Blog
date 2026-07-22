import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

/**
 * HeroSlider Component
 * Manages slide images, slide-up transition animations, and the Ken Burns effect.
 * Supports custom responsive focal points and mobile-specific picture crops.
 */
export function HeroSlider({
  slides,
  currentIndex,
  prevIndex,
  isAnimating,
  onTransitionComplete
}) {
  const slideRefs = useRef([]);
  const [viewport, setViewport] = useState("desktop");

  // Track viewport layout category
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewport("mobile");
      } else if (width < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload the next slide's image based on the active viewport crop
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];
    const preloadUrl = (viewport === "mobile" && nextSlide.mobileImage)
      ? nextSlide.mobileImage
      : nextSlide.image;

    const img = new Image();
    img.src = preloadUrl;
  }, [currentIndex, slides, viewport]);

  useEffect(() => {
    // Initial setup: position active slide at 0, others at 100% (below)
    slides.forEach((_, idx) => {
      if (slideRefs.current[idx]) {
        if (idx === currentIndex) {
          gsap.set(slideRefs.current[idx], { yPercent: 0, zIndex: 2 });
        } else {
          gsap.set(slideRefs.current[idx], { yPercent: 100, zIndex: 1 });
        }
      }
    });
  }, []);

  // Handle slide transition
  useEffect(() => {
    if (prevIndex === null || prevIndex === currentIndex) return;

    const prevSlide = slideRefs.current[prevIndex];
    const curSlide = slideRefs.current[currentIndex];

    if (!prevSlide || !curSlide) return;

    // Reset z-indices for transition: entering slide goes on top (zIndex: 2), exiting under (zIndex: 1)
    gsap.set(prevSlide, { zIndex: 1 });
    gsap.set(curSlide, { zIndex: 2 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Reset old slide position below the viewport
        gsap.set(prevSlide, { yPercent: 100, zIndex: 1 });
        onTransitionComplete();
      }
    });

    // Current slide slides UP and exits to -100%
    tl.to(prevSlide, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut"
    }, 0);

    // Next slide enters FROM THE BOTTOM to 0%
    tl.fromTo(curSlide, 
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.inOut"
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [currentIndex, prevIndex]);

  // Handle Ken Burns effect (Scale active image)
  useEffect(() => {
    slides.forEach((_, idx) => {
      const img = slideRefs.current[idx]?.querySelector("img");
      if (!img) return;

      if (idx === currentIndex && !isAnimating) {
        // Active slide: scale up slowly over 5s
        gsap.killTweensOf(img);
        gsap.fromTo(img, 
          { scale: 1.0 }, 
          { 
            scale: 1.05, 
            duration: 5, 
            ease: "none" 
          }
        );
      } else if (idx !== currentIndex) {
        // Reset scale for inactive slides
        gsap.killTweensOf(img);
        gsap.set(img, { scale: 1.0 });
      }
    });
  }, [currentIndex, isAnimating, slides]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0d14]">
      {slides.map((slide, idx) => (
        <div
          key={slide.image}
          ref={(el) => (slideRefs.current[idx] = el)}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <picture className="w-full h-full">
            {slide.mobileImage && (
              <source media="(max-width: 639px)" srcSet={slide.mobileImage} />
            )}
            <img
              src={slide.image}
              alt={slide.heading}
              loading={idx === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover select-none will-change-transform"
              style={{
                objectPosition: slide.position
                  ? slide.position[viewport] || slide.position.desktop
                  : "center center"
              }}
            />
          </picture>
        </div>
      ))}
    </div>
  );
}

export default HeroSlider;
