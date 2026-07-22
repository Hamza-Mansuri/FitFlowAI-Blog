import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaTimes, FaExpand } from "react-icons/fa";

const LUSION_VIDEO_URL = "https://res.cloudinary.com/wycpodzl/video/upload/v1784699442/4754040-uhd_4096_2160_25fps_ckfaga.mp4";

export default function LusionVideoSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const hoverVideoRef = useRef(null);
  const fullVideoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingFullscreen, setIsPlayingFullscreen] = useState(false);
  const [fullVideoPlaying, setFullVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Monitor scroll for lines and scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale card from 0.85 to 1.0, and keep corners curved (40px down to 28px)
  const cardScale = useTransform(scrollYProgress, [0.1, 0.45], [0.85, 1.0]);
  const cardRadius = useTransform(scrollYProgress, [0.1, 0.45], ["40px", "28px"]);

  // Animated line drawing stroke dash array offset
  const pathLength = useTransform(scrollYProgress, [0.0, 0.5], [0, 1]);
  // Side drawing lines on scroll
  const sideLineLength = useTransform(scrollYProgress, [0.0, 0.4], [0, 1]);

  useEffect(() => {
    if (hoverVideoRef.current) {
      if (isHovered && !isPlayingFullscreen) {
        hoverVideoRef.current.play().catch(() => {});
      } else {
        hoverVideoRef.current.pause();
        hoverVideoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isPlayingFullscreen]);

  // Canvas ECG heartbeat animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    
    // Set proper canvas sizing
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ECG wave properties
    let x = 0;
    const points = [];
    const speed = 1.8;
    const amplitude = 35;
    
    const drawECG = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.18)"; // Emerald green heartbeat
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(16, 185, 129, 0.3)";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // Increment drawing point
      x += speed;
      if (x > canvas.width) {
        x = 0;
        points.length = 0;
      }

      // Generate ECG wave signature shape
      const cy = canvas.height / 2;
      let y = cy;
      const progress = x % 350; // heartbeat cycle spacing

      if (progress > 140 && progress < 155) {
        // P Wave (small bump)
        y = cy - Math.sin((progress - 140) * (Math.PI / 15)) * 6;
      } else if (progress >= 165 && progress < 170) {
        // Q Wave (slight dip)
        y = cy + (progress - 165) * 2;
      } else if (progress >= 170 && progress < 178) {
        // R Wave (big peak upward)
        const peakT = (progress - 170) / 8;
        y = cy - Math.sin(peakT * Math.PI) * amplitude;
      } else if (progress >= 178 && progress < 184) {
        // S Wave (deep dip downward)
        const dipT = (progress - 178) / 6;
        y = cy + Math.sin(dipT * Math.PI) * (amplitude * 0.45);
      } else if (progress >= 195 && progress < 215) {
        // T Wave (medium bump)
        y = cy - Math.sin((progress - 195) * (Math.PI / 20)) * 10;
      }

      points.push({ x, y });

      // Draw active path
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        if (i === 0) {
          ctx.moveTo(points[i].x, points[i].y);
        } else {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.stroke();

      animationId = requestAnimationFrame(drawECG);
    };

    drawECG();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Fullscreen video controls handlers
  const handlePlayPause = () => {
    if (fullVideoRef.current) {
      if (fullVideoPlaying) {
        fullVideoRef.current.pause();
      } else {
        fullVideoRef.current.play().catch(() => {});
      }
      setFullVideoPlaying(!fullVideoPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (fullVideoRef.current) {
      fullVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (fullVideoRef.current) {
      setCurrentTime(fullVideoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (fullVideoRef.current) {
      setDuration(fullVideoRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    if (fullVideoRef.current) {
      const newTime = parseFloat(e.target.value);
      fullVideoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Splitting text for Lusion split-word effect
  const words = "Dynamic Flow Experience".split(" ");

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white py-32 rounded-t-[80px] sm:rounded-t-[100px] rounded-b-[80px] sm:rounded-b-[100px] overflow-hidden flex flex-col items-center z-20 shadow-inner"
    >
      {/* Canvas ECG Heartbeat Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />

      {/* Scroll Animated Drawn SVG Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 pointer-events-none z-10 opacity-80">
        <svg viewBox="0 0 800 200" fill="none" className="w-full h-full">
          <motion.path
            d="M 100 20 Q 400 180, 700 20"
            stroke="url(#emerald-gradient-light)"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="emerald-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lusion-style Side Drawn Lines */}
      <div className="absolute top-1/4 left-0 w-24 sm:w-48 h-24 pointer-events-none opacity-40 z-10">
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
          <motion.path
            d="M 0 50 Q 80 10, 200 60"
            stroke="#047857"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: sideLineLength }}
          />
        </svg>
      </div>

      <div className="absolute top-1/3 right-0 w-24 sm:w-48 h-24 pointer-events-none opacity-40 z-10">
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
          <motion.path
            d="M 200 50 Q 120 90, 0 40"
            stroke="#047857"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: sideLineLength }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-emerald-700 font-bold text-xs uppercase tracking-widest block mb-4"
        >
          Visual Identity
        </motion.span>
        
        {/* Lusion split-word animated heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight uppercase flex flex-wrap justify-center"
        >
          {words.map((word, idx) => (
            <span key={idx} className="inline-block overflow-hidden mr-3 sm:mr-4 pb-1">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } }
                }}
              >
                {word === "Flow" ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                    Flow
                  </span>
                ) : word}
              </motion.span>
            </span>
          ))}
        </motion.h2>
      </div>

      {/* Scaling Card Container - Fixed to 16:9 with curved borders */}
      <motion.div
        ref={cardRef}
        style={{
          scale: cardScale,
          borderRadius: cardRadius,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsPlayingFullscreen(true)}
        className="relative w-full max-w-5xl aspect-video overflow-hidden bg-black shadow-2xl border border-slate-100 flex items-center justify-center group cursor-none z-10"
        data-cursor="play"
      >
        {/* Cover image placeholder */}
        <div className="absolute inset-0 bg-slate-900 z-0">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=cover"
            alt="Workout Intro"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-0" : "opacity-50"
            }`}
          />
        </div>

        {/* Video plays on hover */}
        <video
          ref={hoverVideoRef}
          src={LUSION_VIDEO_URL}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none z-10 ${
            isHovered ? "opacity-90" : "opacity-0"
          }`}
        />

        {/* Overlay Play Indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/20">
          <motion.div
            animate={{ scale: isHovered ? 1.15 : 1 }}
            className="h-20 w-20 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl transition duration-300 group-hover:bg-emerald-400"
          >
            <FaPlay className="ml-1 text-2xl" />
          </motion.div>
          <span className="mt-4 text-xs font-black tracking-widest text-emerald-450 uppercase drop-shadow-md">
            Click to Expand Player
          </span>
        </div>
      </motion.div>

      {/* Fullscreen Video Player Overlay */}
      {isPlayingFullscreen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950 flex items-center justify-center p-0 md:p-8 animate-fade-in">
          <div className="relative w-full h-full max-w-7xl aspect-video bg-black rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col group/player">
            
            <video
              ref={fullVideoRef}
              src={LUSION_VIDEO_URL}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={handlePlayPause}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Custom Video Controls Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col gap-4 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
              
              {/* Progress Slider */}
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer appearance-none"
                />
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-white text-lg">
                  <button onClick={handlePlayPause} className="hover:text-emerald-400 transition">
                    {fullVideoPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <button onClick={handleMuteToggle} className="hover:text-emerald-400 transition">
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                  <span className="text-xs font-mono text-slate-350">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-white text-lg">
                  <button className="hover:text-emerald-400 transition">
                    <FaExpand />
                  </button>
                </div>
              </div>
            </div>

            {/* Top Close Button */}
            <button
              onClick={() => {
                setIsPlayingFullscreen(false);
                setFullVideoPlaying(true);
              }}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-slate-900/60 border border-white/10 hover:bg-slate-800 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
