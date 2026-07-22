import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Custom hook to track mouse position using Framer Motion's MotionValues.
 * This prevents triggering React re-renders on every mouse move event.
 */
export function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  return { x, y };
}
export default useMousePosition;
