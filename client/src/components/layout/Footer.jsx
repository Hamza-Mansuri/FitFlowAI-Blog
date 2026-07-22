import { Link } from "react-router-dom";
import Container from "./Container";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";

import gomziLogo from "../../assets/images/gomzi-logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaInstagram, url: "https://instagram.com", name: "Instagram" },
    { icon: FaYoutube, url: "https://youtube.com", name: "YouTube" },
    { icon: FaLinkedin, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: FaTwitter, url: "https://twitter.com", name: "Twitter" },
  ];

  return (
    <footer className="relative mt-20 border-t border-slate-200 bg-slate-50 text-slate-600 overflow-hidden transition-colors duration-500">
      {/* Background radial accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-emerald-500/3 blur-[100px] pointer-events-none" />

      <Container>
        {/* Footer Columns */}
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" className="inline-block transition-transform duration-300 hover:scale-[1.02] group">
              <img
                src={gomziLogo}
                alt="FitFlowAI Logo"
                className="h-9 w-auto"
              />
            </Link>

            <p className="text-sm leading-relaxed text-slate-500 font-light">
              Evidence-based fitness and nutrition education designed to
              help people build stronger bodies, healthier habits, and a
              sustainable lifestyle.
            </p>

            {/* Social Icons with microinteractions */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    whileHover={{ y: -4, scale: 1.08, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-200/40 hover:bg-emerald-600 hover:text-white text-slate-500 transition-colors duration-300 shadow-sm border border-slate-200"
                    aria-label={`Visit our ${item.name}`}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Explore
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm font-medium">
              <li>
                <Link to="/" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/categories?category=Workout" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Company
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm font-medium">
              <li>
                <Link to="/about" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Resources
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm font-medium">
              <li>
                <Link to="/categories?category=Workout" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Fitness
                </Link>
              </li>
              <li>
                <Link to="/categories?category=Nutrition" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link to="/categories?category=Lifestyle" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-emerald-600 transition-colors duration-250 hover:pl-0.5 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="border-t border-slate-200 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-xs font-semibold text-slate-400 uppercase tracking-widest">
          <span>
            © {currentYear} FitFlowAI & Gomzi Lifesciences.
          </span>
          <span className="flex items-center gap-1.5 normal-case font-normal text-sm text-slate-500">
            Made with <span className="text-red-500 text-base animate-pulse">❤️</span> by FitFlowAI
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;