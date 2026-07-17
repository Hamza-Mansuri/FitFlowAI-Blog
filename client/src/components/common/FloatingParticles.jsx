import { useEffect, useRef } from "react";

function FloatingParticles({ mousePosition }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 40;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseRadius = Math.random() * 1.5 + 0.5;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.alpha = Math.random() * 0.35 + 0.15;
      }

      update(width, height, mouseX, mouseY) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction: repel slightly
        if (mouseX !== null && mouseY !== null) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 120;

          if (distance < forceRadius) {
            const force = (forceRadius - distance) / forceRadius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.x += directionX * force * 0.8;
            this.y += directionY * force * 0.8;
          }
        }
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(16, 185, 129, ${this.alpha})`; // Emerald green particles
        context.fill();
      }
    }

    // Initialize particles
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(width, height));
    }

    const animate = () => {
      const currentRect = canvas.getBoundingClientRect();
      const currentWidth = currentRect.width;
      const currentHeight = currentRect.height;

      ctx.clearRect(0, 0, currentWidth, currentHeight);

      particles.forEach((particle) => {
        particle.update(currentWidth, currentHeight, mousePosition.x, mousePosition.y);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

export default FloatingParticles;
