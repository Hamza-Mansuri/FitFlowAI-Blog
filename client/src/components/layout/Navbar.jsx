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

import Container from "./Container";
import gomziLogo from "../../assets/images/gomzi-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

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
      ? "text-green-600 font-semibold relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-green-500 dark:text-green-400"
      : "text-slate-600 hover:text-green-600 transition duration-300 dark:text-slate-300 dark:hover:text-green-400";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80 dark:text-white">
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Left side: Logo + Navigation Links */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center flex-shrink-0">
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
            {user && (
              <button
                onClick={toggleTheme}
                className="rounded-full border border-slate-200 bg-slate-50 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {theme === "dark" ? <FaSun size={12} className="text-yellow-400 animate-[spin_10s_linear_infinite]" /> : <FaMoon size={12} />}
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700 dark:bg-green-950 dark:text-green-400">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user.name}</span>
                    {user.role === "admin" && (
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider dark:text-green-400">Admin</span>
                    )}
                  </div>
                </div>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                >
                  <FaSignOutAlt size={11} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-green-600 transition dark:text-slate-300 dark:hover:text-green-400"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 shadow-sm hover:shadow"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-green-700 md:hidden dark:text-green-400"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="space-y-4 border-t border-slate-200 py-5 text-base md:hidden dark:border-slate-850">

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

            {user ? (
              <div className="border-t border-slate-200 pt-4 mt-4 space-y-3 dark:border-slate-800">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700 dark:bg-green-950 dark:text-green-400">
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
                    className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {theme === "dark" ? <FaSun size={13} className="text-yellow-400" /> : <FaMoon size={13} />}
                  </button>
                </div>
                
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block text-sm font-semibold text-green-600 px-1 dark:text-green-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-slate-200 pt-4 mt-4 flex flex-col gap-3 dark:border-slate-800">
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex w-full items-center justify-center rounded-xl bg-green-600 py-3 text-sm font-semibold text-white shadow-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        )}
      </Container>
    </header>
  );
}

export default Navbar;