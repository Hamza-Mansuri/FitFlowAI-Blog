import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

import gomziLogo from "../../assets/images/gomzi-logo.png";
import ScrollProgress from "./ScrollProgress";
import ProfilePopover from "./ProfilePopover";
import AnimatedSearch from "./AnimatedSearch";
import MobileDrawer from "./MobileDrawer";

/**
 * Reusable MagneticWrapper component.
 * Attracts elements gently towards the cursor when hovered.
 */
function MagneticWrapper({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configuration for elastic, responsive feel
  const springX = useSpring(x, { stiffness: 130, damping: 12, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 130, damping: 12, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Displace by 30% of mouse offset
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Scroll detection to show/hide navbar and swap compact sizing classes
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down: hide
          setVisible(false);
        } else {
          // Scrolling up: show
          setVisible(true);
        }
      } else {
        // Near top: always show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-emerald-500 font-bold relative py-1 hover:text-emerald-500 text-sm tracking-wide"
      : "text-slate-600 hover:text-slate-950 transition-all duration-300 dark:text-slate-300 dark:hover:text-white py-1 hover:-translate-y-[0.5px] text-sm tracking-wide";

  const links = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgress />

      {/* Floating Header Container */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className="fixed left-0 right-0 z-50 px-4 sm:px-6 md:px-8 pointer-events-none top-4"
      >
        <div
          className={`mx-auto max-w-7xl w-full rounded-[2.5rem] border pointer-events-auto bg-white/70 backdrop-blur-2xl dark:bg-slate-950/60 shadow-xl py-2 px-6 transition-colors duration-300 ${
            scrolled
              ? "border-slate-200/40 dark:border-slate-800/40 shadow-2xl"
              : "border-slate-250/20 dark:border-slate-900/10"
          }`}
        >
          <div className="flex h-14 items-center justify-between">
            {/* Left Column: Logo + Menu Links */}
            <div className="flex items-center gap-8">
              <MagneticWrapper>
                <Link
                  to="/"
                  className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] group hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <img
                    src={gomziLogo}
                    alt="FitFlowAI Logo"
                    className="h-7 sm:h-8 w-auto"
                  />
                </Link>
              </MagneticWrapper>

              {/* Desktop Navigation Links with active underline */}
              <nav className="hidden items-center gap-6 font-semibold md:flex select-none">
                {links.map((link) => (
                  <MagneticWrapper key={link.path}>
                    <NavLink to={link.path} className={navClass}>
                      <span>{link.label}</span>
                      
                      {/* Active Indicator Underline */}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </NavLink>
                  </MagneticWrapper>
                ))}

                {/* Conditional Admin route */}
                {user && user.role === "admin" && (
                  <MagneticWrapper>
                    <NavLink to="/admin" className={navClass}>
                      <span>Dashboard</span>
                      {location.pathname === "/admin" && (
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </NavLink>
                  </MagneticWrapper>
                )}
              </nav>
            </div>

            {/* Right Column: Search + Theme switch + Registration links */}
            <div className="hidden md:flex items-center gap-4">
              <MagneticWrapper>
                <AnimatedSearch />
              </MagneticWrapper>

              {user ? (
                <ProfilePopover />
              ) : (
                <div className="flex items-center gap-4">
                  <MagneticWrapper>
                    <Link
                      to="/login"
                      className="text-sm font-semibold text-slate-600 hover:text-emerald-500 dark:text-slate-350 dark:hover:text-emerald-400 transition-colors"
                    >
                      Sign In
                    </Link>
                  </MagneticWrapper>

                  <MagneticWrapper>
                    <Link
                      to="/signup"
                      className="rounded-full bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition duration-305 hover:bg-emerald-700 shadow-sm"
                    >
                      Register
                    </Link>
                  </MagneticWrapper>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <MagneticWrapper className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDrawerOpen(true)}
                className="text-2xl text-emerald-500 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
              >
                <FaBars size={18} />
              </motion.button>
            </MagneticWrapper>
          </div>
        </div>
      </motion.header>

      {/* Animated Fullscreen Mobile Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

export default Navbar;