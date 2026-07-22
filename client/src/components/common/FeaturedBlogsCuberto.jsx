import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import API from "../../services/api";

const FALLBACK_VIDEOS_BLACK = [
  "https://res.cloudinary.com/wycpodzl/video/upload/v1784696252/6980389-uhd_2160_4096_30fps_bisj0z.mp4",
  "https://res.cloudinary.com/wycpodzl/video/upload/v1784696247/116342-707531391_medium_wt7gjt.mp4",
  "https://res.cloudinary.com/wycpodzl/video/upload/v1784696246/19523592-hd_1080_1920_30fps_egpzup.mp4",
  "https://res.cloudinary.com/wycpodzl/video/upload/v1784696244/5389088-uhd_2160_4096_30fps_ijuy0k.mp4"
];

function FeaturedBlogCard({ blog, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Detect mobile / touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection observer to play/pause video on mobile when in viewport
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Control video play/pause status
  useEffect(() => {
    if (videoRef.current) {
      if (isMobile) {
        videoRef.current.pause();
      } else {
        if (isHovered) {
          videoRef.current.play().catch((err) => console.log("Desktop video autoplay prevented:", err));
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    }
  }, [isHovered, isMobile]);

  const activeVideo = blog.videoUrl || FALLBACK_VIDEOS_BLACK[index % FALLBACK_VIDEOS_BLACK.length];
  // Apply staggered vertical translation to create a zig-zag column offset
  const zigzagClass = index % 2 === 1 ? "md:translate-y-24" : "";

  // Overshoot spring reveal transitions for Lusion "pop" heading/description
  const cardAnimationVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 12,
        mass: 0.6,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardAnimationVariants}
      className={`w-full rounded-[40px] overflow-hidden bg-slate-50/90 border border-slate-200/60 shadow-lg flex flex-col p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl z-10 backdrop-blur-sm ${zigzagClass}`}
      style={{ minHeight: "580px" }}
    >
      {/* Blog Image/Video Media Container - Tall aspect ratio for portrait videos */}
      <Link
        to={`/blog/${blog._id}`}
        data-cursor="view"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[3/4] rounded-[30px] overflow-hidden bg-slate-900 group border border-slate-200/10 flex items-center justify-center cursor-none"
      >
        {/* Cover Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            (!isMobile && isHovered) ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video Player (Desktop Only) */}
        {!isMobile && (
          <video
            ref={videoRef}
            src={activeVideo}
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
          HOVER FOR VIDEO
        </div>
      </Link>

      {/* Blog Details Content */}
      <div className="w-full flex flex-col justify-center text-left mt-6">
        <span className="text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
          Story 0{index + 1}
        </span>
        
        {/* Popping Heading */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-3 leading-tight hover:text-emerald-700 transition">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h3>
        
        {/* Popping Description */}
        <p className="text-slate-600 text-xs sm:text-sm mb-5 line-clamp-2">
          {blog.description}
        </p>

        <Link
          to={`/blog/${blog._id}`}
          className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-600 transition group w-fit"
        >
          READ STORY
          <span className="transform group-hover:translate-x-1 transition duration-200">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function FeaturedBlogsCuberto() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Monitor scroll progress for drawing curves
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const sideLineLength = useTransform(scrollYProgress, [0.0, 0.45], [0, 1]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get("/blogs");
        const approved = data.filter((b) => b.status === "approved");
        const withVideo = approved.filter((b) => b.videoUrl);
        let selected = [];
        if (withVideo.length >= 4) {
          selected = withVideo.slice(0, 4);
        } else {
          selected = [...withVideo, ...approved.filter((b) => !b.videoUrl)].slice(0, 4);
        }
        setFeaturedBlogs(selected);
      } catch (err) {
        console.error("Failed to load featured blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Canvas Particle Web (AI wellness nodes) Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particleCount = 45;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.strokeStyle = "rgba(16, 185, 129, 0.045)";
      ctx.lineWidth = 1;

      // Update & Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw web lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center bg-white rounded-t-[80px]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (featuredBlogs.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-32 rounded-t-[80px] sm:rounded-t-[100px] rounded-b-[80px] sm:rounded-b-[100px] border-t border-slate-100 overflow-hidden z-25 -mt-24 shadow-inner"
    >
      {/* Canvas Particle Web Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

      {/* Lusion Side-Drawn SVG Lines */}
      <div className="absolute top-1/4 left-0 w-24 sm:w-48 h-24 pointer-events-none opacity-40 z-10">
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
          <motion.path
            d="M 0 50 Q 80 90, 200 40"
            stroke="#047857"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: sideLineLength }}
          />
        </svg>
      </div>

      <div className="absolute top-1/2 right-0 w-24 sm:w-48 h-24 pointer-events-none opacity-40 z-10">
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
          <motion.path
            d="M 200 50 Q 120 10, 0 60"
            stroke="#047857"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: sideLineLength }}
          />
        </svg>
      </div>

      <div className="max-w-[90vw] mx-auto px-4 mb-20 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight uppercase"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Stories</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 mt-4 text-sm sm:text-base max-w-xl mx-auto font-medium"
        >
          Explore fitness, nutrition, and wellness trends curated by our head coach. Hover over cards to preview.
        </motion.p>
      </div>

      {/* 2-Column Staggered Zig-Zag Cards Grid occupying 90vw */}
      <div className="relative max-w-[90vw] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 pb-36">
        {featuredBlogs.map((blog, idx) => (
          <FeaturedBlogCard
            key={blog._id}
            blog={blog}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
