import { Link } from "react-router-dom";
import Container from "./Container";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

import gomziLogo from "../../assets/images/gomzi-logo.png";

function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-900/60 dark:bg-slate-950 overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] rounded-full bg-green-500/5 blur-[80px] pointer-events-none" />

      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center">
              <img
                src={gomziLogo}
                alt="Gomzi Lifesciences"
                className="h-10 w-auto transition-transform duration-305 hover:scale-[1.02]"
              />
            </div>

            <p className="text-sm leading-7 text-slate-400 dark:text-slate-400">
              Evidence-based fitness and nutrition education designed to
              help people build stronger bodies, healthier habits, and a
              sustainable lifestyle.
            </p>

            <div className="flex gap-3 pt-2">
              {[
                { icon: FaInstagram, url: "https://instagram.com" },
                { icon: FaYoutube, url: "https://youtube.com" },
                { icon: FaLinkedin, url: "https://linkedin.com" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-slate-800/80 p-3 text-slate-400 hover:text-white transition duration-300 hover:bg-green-500 dark:bg-slate-900/60 dark:hover:bg-green-500"
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-bold tracking-wider uppercase text-white dark:text-slate-100">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                <Link to="/" className="cursor-pointer text-slate-400 hover:text-green-400 transition-colors duration-250">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/categories" className="cursor-pointer text-slate-400 hover:text-green-400 transition-colors duration-250">
                  Popular Categories
                </Link>
              </li>

              <li>
                <Link to="/about" className="cursor-pointer text-slate-400 hover:text-green-400 transition-colors duration-250">
                  About Gautham
                </Link>
              </li>

              <li>
                <Link to="/contact" className="cursor-pointer text-slate-400 hover:text-green-400 transition-colors duration-250">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-md font-bold tracking-wider uppercase text-white dark:text-slate-100">
              Popular Topics
            </h3>

            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                <Link to="/?category=Workout" className="text-slate-400 hover:text-green-400 transition-colors duration-250 flex items-center gap-2">
                  <span>🏋️</span> Strength Training
                </Link>
              </li>
              <li>
                <Link to="/?category=Nutrition" className="text-slate-400 hover:text-green-400 transition-colors duration-250 flex items-center gap-2">
                  <span>🥗</span> Nutrition Science
                </Link>
              </li>
              <li>
                <Link to="/?category=Recovery" className="text-slate-400 hover:text-green-400 transition-colors duration-250 flex items-center gap-2">
                  <span>🛌</span> Active Recovery
                </Link>
              </li>
              <li>
                <Link to="/?category=Health" className="text-slate-400 hover:text-green-400 transition-colors duration-250 flex items-center gap-2">
                  <span>❤️</span> Healthy Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-md font-bold tracking-wider uppercase text-white dark:text-slate-100">
              Contact Us
            </h3>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-500 flex-shrink-0" />
                <span className="text-slate-400">Surat, Gujarat, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-500 flex-shrink-0" />
                <a href="mailto:info@gomzi.in" className="text-slate-400 hover:text-green-400 transition-colors duration-250">
                  info@gomzi.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800/80 dark:border-slate-900/60 py-6 text-center text-xs text-slate-500 tracking-wider">
          © {new Date().getFullYear()} FitFlowAI & Gomzi Lifesciences. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;