import { Link, NavLink } from "react-router-dom";
import {
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

import Container from "./Container";

import gomziLogo from "../../assets/images/gomzi-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-green-500"
      : "text-slate-600 hover:text-green-600 transition duration-300";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}

          <Link to="/" className="flex items-center">
            <img
              src={gomziLogo}
              alt="Gomzi Lifesciences"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex">
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

          {/* Right Side */}

          <div className="hidden md:flex items-center">
            <button className="rounded-full bg-green-50 p-3 text-green-700 transition duration-300 hover:bg-green-600 hover:text-white">
              <FaSearch size={14} />
            </button>
          </div>

          {/* Mobile */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-green-700 md:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="space-y-4 border-t border-slate-200 py-5 text-base md:hidden">

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

          </div>
        )}
      </Container>
    </header>
  );
}

export default Navbar;