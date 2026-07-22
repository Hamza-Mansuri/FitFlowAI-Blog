import React from "react";

/**
 * BotanicalBackground Component
 * Acts as the premium light theme outer container shell,
 * establishing the layout context for scroll and parallax tracking.
 */
export function BotanicalBackground({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {children}
    </div>
  );
}

export default BotanicalBackground;
