import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CustomCursor() {
  const [cursorType, setCursorType] = useState("default"); // default, hover, play, view
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configure smooth spring movement
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on fine-pointer devices (i.e. mouse, not touch screen)
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Find closest interactive element or one with custom data-cursor
      const target = e.target.closest("[data-cursor], a, button, [role='button'], input, textarea");
      if (target) {
        const customCursor = target.getAttribute("data-cursor");
        if (customCursor) {
          setCursorType(customCursor);
          if (customCursor === "play") {
            setCursorText("PLAY");
          } else if (customCursor === "view") {
            setCursorText("VIEW");
          } else {
            setCursorText(customCursor);
          }
        } else {
          setCursorType("hover");
          setCursorText("");
        }
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Render variant-based cursor sizes & stylings
  const cursorVariants = {
    default: {
      width: 14,
      height: 14,
      backgroundColor: "rgba(16, 185, 129, 0.9)", // Emerald theme
      borderRadius: "50%",
    },
    hover: {
      width: 52,
      height: 52,
      backgroundColor: "rgba(16, 185, 129, 0.15)",
      border: "1.5px solid rgba(16, 185, 129, 0.8)",
      borderRadius: "50%",
    },
    play: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      color: "#05070d",
      borderRadius: "50%",
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(16, 185, 129, 0.95)",
      color: "#ffffff",
      borderRadius: "50%",
    }
  };

  return (
    <>
      {/* Global CSS to hide default cursor on interactive sections */}
      <style>{`
        body {
          cursor: default;
        }
        a, button, [role='button'], [data-cursor] {
          cursor: none !important;
        }
      `}</style>

      {/* Outer follow ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 font-bold text-xs tracking-wider"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorVariants[cursorType] || cursorVariants.default}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorText && (
          <span className="scale-95 animate-fade-in font-black uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}

export default CustomCursor;
