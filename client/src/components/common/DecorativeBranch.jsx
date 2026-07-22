import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { branchVariants } from "../../data/branchVariants";

/**
 * DecorativeBranch Component
 * Renders an inline organic SVG botanical branch.
 * Animates the growth (stroke-dashoffset), leaf reveals, and soft breeze sway.
 */
export function DecorativeBranch({
  side = "left",
  variant = "A",
  size = "medium",
  opacity = 0.3,
  delay = 0,
  triggerRef,
  scrub = false,
  customHeight = null
}) {
  const containerRef = useRef(null);
  const stemRef = useRef(null);
  const leavesRef = useRef([]);

  const data = branchVariants[variant] || branchVariants.A;

  // Determine size classes
  const sizeClasses = {
    large: "h-[450px] sm:h-[600px] w-auto",
    medium: "h-[300px] sm:h-[450px] w-auto",
    small: "h-[180px] sm:h-[280px] w-auto"
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Stem path length
    const stemPath = stemRef.current;
    if (!stemPath) return;

    const length = stemPath.getTotalLength();
    
    // Set initial dash attributes
    gsap.set(stemPath, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    // Set initial leaves attributes
    leavesRef.current.forEach((leaf) => {
      if (leaf) {
        gsap.set(leaf, {
          scale: 0,
          opacity: 0,
          transformOrigin: "center bottom"
        });
      }
    });

    if (prefersReducedMotion) {
      // Reduced motion: show statically without animations
      gsap.set(stemPath, { strokeDashoffset: 0 });
      leavesRef.current.forEach((leaf) => {
        if (leaf) gsap.set(leaf, { scale: 1, opacity: 1 });
      });
      return;
    }

    // GSAP ScrollTrigger timeline
    const scrollTriggerConfig = {
      trigger: triggerRef?.current || containerRef.current,
      start: "top 75%",
      end: "bottom 95%",
      scrub: scrub ? 1.0 : false,
      toggleActions: scrub ? undefined : "play none none none"
    };

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
      delay: delay
    });

    // 1. Draw the stem path
    tl.to(stemPath, {
      strokeDashoffset: 0,
      duration: scrub ? 1.0 : 1.6,
      ease: "power2.out"
    });

    // 2. Staggered reveal of leaves
    tl.to(
      leavesRef.current.filter(Boolean),
      {
        scale: 1,
        opacity: 1,
        duration: scrub ? 0.6 : 0.8,
        stagger: scrub ? 0.05 : 0.08,
        ease: "back.out(1.2)"
      },
      "-=0.8" // Start leaf reveals before stem completes drawing
    );

    // 3. Gentle wind sway loop (infinite) after reveal completes
    let swayTween;
    if (!scrub) {
      tl.eventCallback("onComplete", () => {
        swayTween = gsap.to(containerRef.current, {
          rotation: side === "left" ? 1.8 : -1.8,
          x: side === "left" ? 8 : -8,
          duration: 9 + Math.random() * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    } else {
      // For scrubbed branches, start a subtle independent sway loop immediately
      swayTween = gsap.to(containerRef.current, {
        rotation: side === "left" ? 1.2 : -1.2,
        x: side === "left" ? 5 : -5,
        duration: 10 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    return () => {
      tl.kill();
      if (swayTween) swayTween.kill();
    };
  }, [variant, side, delay, triggerRef, scrub]);

  // Leaf SVG path - organic teardrop leaf shape
  const leafShape = "M 0 0 C -8 -10 -12 -22 0 -30 C 12 -22 8 -10 0 0";

  // Calculate side flip transform
  const flipTransform = side === "right" ? "scaleX(-1)" : "none";

  const heightStyle = customHeight || undefined;

  return (
    <div
      ref={containerRef}
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 transition-opacity duration-500 will-change-transform ${
        side === "left" 
          ? "left-0 -translate-x-[15%] sm:-translate-x-[8%]" 
          : "right-0 translate-x-[15%] sm:translate-x-[8%]"
      } ${customHeight ? "" : sizeClasses[size]}`}
      style={{
        opacity: opacity,
        transform: `${flipTransform} translateY(-50%)`,
        height: heightStyle
      }}
    >
      <svg
        viewBox={data.viewBox}
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Custom Botanical Mint Gradient based on user's image */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbeee0" />
            <stop offset="100%" stopColor="#acd7be" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#89af97" />
            <stop offset="100%" stopColor="#a5c9b2" />
          </linearGradient>
          {/* Soft Drop Shadow for Depth */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Stem Line */}
        <path
          ref={stemRef}
          d={data.stemPath}
          fill="none"
          stroke="url(#stemGrad)"
          strokeWidth={data.strokeWidth}
          strokeLinecap="round"
        />

        {/* Leaves Group */}
        <g filter="url(#shadow)">
          {data.leaves.map((leaf, idx) => (
            <path
              key={idx}
              ref={(el) => (leavesRef.current[idx] = el)}
              d={leafShape}
              fill="url(#leafGrad)"
              transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.size})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default DecorativeBranch;
