import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const ASTRONAUT_VIDEO = "https://res.cloudinary.com/wycpodzl/video/upload/v1784699437/8480543-hd_1920_1080_25fps_pfrxtr.mp4";
const AMBIENT_MUSIC = "https://assets.mixkit.co/music/preview/mixkit-space-ambient-593.mp3";

export default function AstronautFooterAnimation() {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  
  const [showLeftCard, setShowLeftCard] = useState(false);
  const [showFixedVideo, setShowFixedVideo] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const [hasScrolledAuto, setHasScrolledAuto] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Detect when section enters the viewport
      if (rect.top < windowHeight * 0.85) {
        setShowLeftCard(true);
      } else {
        setShowLeftCard(false);
      }

      // Detect when section is fully in focus to trigger fixed astronaut video
      if (rect.top < windowHeight * 0.4) {
        if (!showFixedVideo) {
          setShowFixedVideo(true);
          // Play music
          if (audioRef.current && !isPlayingMusic) {
            audioRef.current.play()
              .then(() => setIsPlayingMusic(true))
              .catch((err) => console.log("Music play prevented:", err));
          }
          // Trigger one-time auto-scroll to reveal footer fully
          if (!hasScrolledAuto) {
            setHasScrolledAuto(true);
            setTimeout(() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
              });
            }, 800);
          }
        }
      } else {
        setShowFixedVideo(false);
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlayingMusic(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [showFixedVideo, isPlayingMusic, hasScrolledAuto]);

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !musicMuted;
      setMusicMuted(!musicMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[120vh] bg-slate-950 w-full overflow-hidden flex flex-col justify-between"
    >
      {/* Hidden audio element for ambient music */}
      <audio ref={audioRef} src={AMBIENT_MUSIC} loop />

      {/* Floating Card appearing on Left */}
      <AnimatePresence>
        {showLeftCard && !showFixedVideo && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-32 left-8 z-30 w-72 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/80 p-4 backdrop-blur-md shadow-2xl hidden md:block"
          >
            <span className="text-[10px] font-black text-emerald-400 tracking-wider uppercase block mb-2">
              Bottom Section Ahead
            </span>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 mb-3 border border-white/5 relative">
              <video
                src={ASTRONAUT_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-white font-bold text-sm">Deep Space Core</h4>
            <p className="text-slate-400 text-xs mt-1">Scroll down to initiate synchronization...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Astronaut Transition View */}
      <AnimatePresence>
        {showFixedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950 flex items-center justify-center pointer-events-none"
          >
            {/* Astronaut Video Background */}
            <video
              src={ASTRONAUT_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            {/* Glowing Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />

            {/* Centered Synchronizing Text Overlay */}
            <div className="relative z-10 text-center max-w-xl px-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-emerald-400 font-extrabold text-xs tracking-widest uppercase block mb-3">
                  SYSTEM SYNCHRONIZED
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
                  Limitless <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Potential</span>
                </h3>
                <p className="text-slate-350 text-xs sm:text-sm">
                  Connecting your mind and body with AI-enhanced workout plans and nutrition tracks.
                </p>
              </motion.div>
            </div>

            {/* Music Controls Badge (clickable area) */}
            <button
              onClick={handleMuteToggle}
              className="absolute bottom-24 right-8 z-50 pointer-events-auto flex items-center gap-3 rounded-full bg-slate-900/60 border border-white/10 px-5 py-3 text-xs font-bold text-white shadow-xl hover:bg-slate-800 transition backdrop-blur-md cursor-pointer"
            >
              {musicMuted ? (
                <>
                  <FaVolumeMute className="text-red-400 animate-pulse" />
                  <span>UNMUTE SPACE SYNTH</span>
                </>
              ) : (
                <>
                  <FaVolumeUp className="text-emerald-400 animate-bounce" />
                  <span>PLAYING SOUNDSCAPE</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full text-center relative z-10 py-12">
        <div className="h-0.5 w-16 bg-emerald-500/30 mx-auto mb-6" />
        <p className="text-slate-500 text-xs tracking-widest uppercase">
          FitFlowAI Deep Dive Sequence
        </p>
      </div>
    </div>
  );
}
