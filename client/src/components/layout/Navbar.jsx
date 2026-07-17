import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

import Container from "./Container";
import gomziLogo from "../../assets/images/gomzi-logo.png";
import ScrollProgress from "./ScrollProgress";
import ThemeSwitcher from "./ThemeSwitcher";
import ProfilePopover from "./ProfilePopover";
import AnimatedSearch from "./AnimatedSearch";
import MobileDrawer from "./MobileDrawer";

function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-emerald-500 font-bold relative py-1 hover:text-emerald-500"
      : "text-slate-650 hover:text-slate-900 transition-all duration-300 dark:text-slate-350 dark:hover:text-white py-1 hover:-translate-y-[1px]";

  const links = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Header Container */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 md:px-8 pointer-events-none ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl w-full rounded-[2rem] border transition-all duration-500 pointer-events-auto ${
            scrolled
              ? "border-slate-200/50 bg-white/75 backdrop-blur-2xl dark:border-slate-850/50 dark:bg-slate-950/70 shadow-2xl py-2 px-6"
              : "border-transparent bg-white/35 backdrop-blur-md dark:bg-slate-950/20 shadow-lg py-3 px-8"
          }`}
        >
          <div className="flex h-14 items-center justify-between">
            {/* Left side: Logo + Navigation Links */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] group hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.25)]"
              >
                <img
                  src={gomziLogo}
                  alt="FitFlowAI Logo"
                  className="h-8 w-auto"
                />
              </Link>

              {/* Desktop Menu */}
              <nav className="hidden items-center gap-6 text-[13px] font-bold md:flex select-none">
                {links.map((link) => (
                  <NavLink key={link.path} to={link.path} className={navClass}>
                    <span>{link.label}</span>
                    {/* Animated Sliding Underline active indicator */}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                ))}

                {/* Additional user-only dashboard route */}
                {user && user.role === "admin" && (
                  <NavLink to="/admin" className={navClass}>
                    <span>Dashboard</span>
                    {location.pathname === "/admin" && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                )}
              </nav>
            </div>

            {/* Right Side Options */}
            <div className="hidden md:flex items-center gap-4">
              {/* Premium Expandable Search */}
              <AnimatedSearch />

              {/* Pill Theme switch */}
              <ThemeSwitcher />

              {/* Profile or Registration Options */}
              {user ? (
                <ProfilePopover />
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-xs font-bold text-slate-650 hover:text-emerald-500 dark:text-slate-350 dark:hover:text-emerald-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
                    <Link
                      to="/signup"
                      className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-xs font-extrabold text-white transition hover:from-emerald-600 hover:to-green-700 shadow-md shadow-emerald-500/10 hover:shadow-lg"
                    >
                      Register
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile drawer toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDrawerOpen(true)}
              className="text-2xl text-emerald-500 md:hidden p-1.5 rounded-full hover:bg-slate-200/20 dark:hover:bg-slate-900/30 cursor-pointer"
            >
              <FaBars size={18} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Panel */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

export default Navbar;