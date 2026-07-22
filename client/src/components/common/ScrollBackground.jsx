import { useEffect, useRef } from "react";

function ScrollBackground() {
  const canvasRef = useRef(null);
  const totalFrames = 180;
  const imagesRef = useRef([]);
  const stateRef = useRef({
    currentFrame: 1,
    targetFrame: 1,
    loadedCount: 0,
    isLoaded: false,
  });

  // Preload images
  useEffect(() => {
    let active = true;
    const preloadImages = () => {
      const loadedImages = [];
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, "0");
        img.src = `/assets/images/backFrames/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          if (!active) return;
          stateRef.current.loadedCount++;
          if (stateRef.current.loadedCount === totalFrames) {
            stateRef.current.isLoaded = true;
            // Draw first frame once loaded
            drawFrame(stateRef.current.currentFrame);
          }
        };
        loadedImages.push(img);
      }
      imagesRef.current = loadedImages;
    };

    preloadImages();
    return () => {
      active = false;
    };
  }, []);

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use actual frame index (clamped between 1 and totalFrames)
    const imgIndex = Math.max(1, Math.min(totalFrames, Math.round(frameIndex))) - 1;
    const img = imagesRef.current[imgIndex];

    if (img && img.complete && img.naturalWidth !== 0) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover scaling (fit with aspect ratio cover)
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }
  };

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        drawFrame(stateRef.current.currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update target frame based on scroll and animate smoothly
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop <= 0 ? 0 : scrollTop / maxScrollTop;

      // Calculate target frame (1 to totalFrames)
      const target = 1 + scrollFraction * (totalFrames - 1);
      stateRef.current.targetFrame = target;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Smooth animation loop
    let animationFrameId;
    const updateFrame = () => {
      const state = stateRef.current;
      // Interpolate currentFrame towards targetFrame for buttery smooth motion (damping)
      const diff = state.targetFrame - state.currentFrame;

      // If the difference is small enough, snap to it, otherwise interpolate
      if (Math.abs(diff) > 0.02) {
        state.currentFrame += diff * 0.08; // 0.08 damping factor for super smooth deceleration
        drawFrame(state.currentFrame);
      } else if (state.currentFrame !== state.targetFrame) {
        state.currentFrame = state.targetFrame;
        drawFrame(state.currentFrame);
      }

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-100 transition-opacity duration-700"
      />
    </div>
  );
}

export default ScrollBackground;
