import React, { useState, useEffect, useRef } from "react";
import { slides } from "../../../data/slides";
import HeroSlider from "./HeroSlider";
import HeroContent from "./HeroContent";
import HeroControls from "./HeroControls";
import HeroOverlay from "./HeroOverlay";

/**
 * Hero Component (Main Container)
 * Controls state, autoplay (5s), manual controls, and orchestrates
 * the premium transitions between slides.
 */
export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [triggerTextAnimation, setTriggerTextAnimation] = useState(false);

  const autoplayTimer = useRef(null);

  // Autoplay effect: triggers slide change every 3 seconds
  useEffect(() => {
    if (isAnimating) return;

    autoplayTimer.current = setTimeout(() => {
      setIsAnimating(true);
      setTriggerTextAnimation(false);
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      if (autoplayTimer.current) {
        clearTimeout(autoplayTimer.current);
      }
    };
  }, [currentIndex, isAnimating]);

  // On page load: Wait 0.5s before triggering initial text animations
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setTriggerTextAnimation(true);
    }, 500);

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTriggerTextAnimation(false);
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTriggerTextAnimation(false);
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSelect = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTriggerTextAnimation(false);
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const handleTransitionComplete = () => {
    setIsAnimating(false);
    setTriggerTextAnimation(true);
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0a0d14]"
      aria-label="Fitness Hero Slider"
    >
      {/* 1. Hero Images / Slider */}
      <HeroSlider
        slides={slides}
        currentIndex={currentIndex}
        prevIndex={prevIndex}
        isAnimating={isAnimating}
        onTransitionComplete={handleTransitionComplete}
      />

      {/* 2. Premium Dark Gradient Overlay */}
      <HeroOverlay />

      {/* 3. Slide Content (Heading, Paragraph, Button) */}
      {slides.map((slide, idx) => (
        <HeroContent
          key={idx}
          slide={slide}
          active={idx === currentIndex}
          triggerAnimation={triggerTextAnimation}
        />
      ))}

      {/* 4. Glassmorphism Controls (Arrows & Dot Pagination) */}
      <HeroControls
        currentIndex={currentIndex}
        totalSlides={slides.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
      />
    </section>
  );
}

export default Hero;
