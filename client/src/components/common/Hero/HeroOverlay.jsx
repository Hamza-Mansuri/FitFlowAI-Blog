import React from "react";

/**
 * HeroOverlay Component
 * Provides a premium dark gradient overlay (40–50% opacity) over the slides
 * to ensure text readability and high visual contrast.
 */
export function HeroOverlay() {
  return (
    <div 
      className="absolute inset-0 bg-gradient-to-t from-[#ffffff]/85 via-[#ffffff]/15 to-[#ffffff]/45 pointer-events-none z-10" 
      aria-hidden="true"
    />
  );
}

export default HeroOverlay;
