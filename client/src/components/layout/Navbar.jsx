import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

import Container from "./Container";
import gomziLogo from "../../assets/images/gomzi-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold relative py-1 after:absolute after:left-0 after:-bottom-1 after:h-[2.5px] after:w-full after:bg-gradient-to-r after:from-green-500 after:to-emerald-400 after:rounded-full"
      : "text-slate-600 hover:text-green-500 transition-all duration-300 dark:text-slate-300 dark:hover:text-green-400 py-1";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "border-b border-slate-200/40 bg-white/70 backdrop-blur-xl dark:border-slate-900/30 dark:bg-slate-950/65 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] py-2"
        : "border-b border-transparent bg-white/90 dark:bg-slate-950/90 py-4"
        } dark:text-white`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Left side: Logo + Navigation Links */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={gomziLogo}
                alt="Gomzi Lifesciences"
                className="h-9 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden items-center gap-8 text-[14px] font-semibold md:flex">
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>

              <NavLink to="/categories" className={navClass}>
                Categories
              </NavLink>

              <NavLink to="/about" className={navClass}>
                About
              </NavLink>

              <NavLink to="/contact" className={navClass}>
                Contact
              </NavLink>
            </nav>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">

            {/* Desktop Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="rounded-full border border-slate-200/80 bg-slate-50/50 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? (
                <FaSun size={12} className="text-yellow-400 animate-[spin_12s_linear_infinite]" />
              ) : (
                <FaMoon size={12} className="text-slate-600" />
              )}
            </motion.button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-green-500/10 to-emerald-500/20 font-bold text-green-700 dark:from-green-950/40 dark:to-emerald-950/60 dark:text-green-400 border border-green-500/20 shadow-inner">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-850 dark:text-slate-200 leading-tight">{user.name}</span>
                    {user.role === "admin" && (
                      <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider dark:text-green-450 mt-0.5">Admin</span>
                    )}
                  </div>
                </div>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3.5 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-500/20 dark:bg-green-500/10 dark:text-green-400 border border-green-500/20"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Dashboard
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={logout}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/50 px-4 py-2 text-xs font-semibold text-slate-650 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200/50 dark:border-slate-800/80 dark:bg-slate-900/50 dark:text-slate-350 dark:hover:bg-red-950/20 dark:hover:text-red-400 dark:hover:border-red-950/30"
                >
                  <FaSignOutAlt size={11} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-green-500 transition-colors dark:text-slate-300 dark:hover:text-green-400"
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20"
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-green-700 md:hidden dark:text-green-400 p-1"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:hidden border-t border-slate-200/60 dark:border-slate-850"
            >
              <div className="space-y-4 py-5 text-base flex flex-col">
                <NavLink
                  to="/"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/categories"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Categories
                </NavLink>

                <NavLink
                  to="/about"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </NavLink>

                <NavLink
                  to="/contact"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </NavLink>

                {/* Mobile Theme Toggle in Menu if logged out */}
                {!user && (
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2 dark:border-slate-900">
                    <span className="text-sm font-semibold text-slate-500">Theme</span>
                    <button
                      onClick={toggleTheme}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-650 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350"
                    >
                      {theme === "dark" ? <FaSun size={13} className="text-yellow-400" /> : <FaMoon size={13} />}
                    </button>
                  </div>
                )}

                {user ? (
                  <div className="border-t border-slate-200 pt-4 mt-4 space-y-4 dark:border-slate-850">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-green-500/10 to-emerald-500/20 font-bold text-green-750 dark:from-green-950/40 dark:to-emerald-950/60 dark:text-green-400 border border-green-500/20">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                      </div>

                      {/* Mobile Theme Toggle */}
                      <button
                        onClick={toggleTheme}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-650 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-800"
                      >
                        {theme === "dark" ? <FaSun size={13} className="text-yellow-400" /> : <FaMoon size={13} />}
                      </button>
                    </div>

                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="
      flex items-center justify-between
      rounded-2xl
      bg-gradient-to-r
      from-green-500
      to-emerald-600
      px-5
      py-4
      text-white
      shadow-lg
    "
                      >
                        <div>
                          <p className="text-xs opacity-80">
                            Administrator
                          </p>

                          <p className="font-semibold">
                            Dashboard
                          </p>
                        </div>

                        <span className="text-xl">
                          →
                        </span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-slate-200 pt-4 mt-2 flex flex-col gap-3 dark:border-slate-850">
                    <Link
                      to="/login"
                      className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-sm font-semibold text-white shadow-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Navbar;