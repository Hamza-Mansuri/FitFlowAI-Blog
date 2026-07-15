import { Link } from "react-router-dom";
import Container from "./Container";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

import gomziLogo from "../../assets/images/gomzi-logo.png";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800/80 dark:bg-slate-950">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <img
                src={gomziLogo}
                alt="Gomzi Lifesciences"
                className="h-10 w-auto"
              />
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400 dark:text-slate-400">
              Evidence-based fitness and nutrition education designed to
              help people build stronger bodies, healthier habits, and a
              sustainable lifestyle.
            </p>

            <div className="mt-6 flex gap-3">
              {[
                { icon: FaInstagram, url: "https://instagram.com" },
                { icon: FaYoutube, url: "https://youtube.com" },
                { icon: FaLinkedin, url: "https://linkedin.com" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-slate-800 p-3 transition duration-300 hover:bg-green-500 hover:text-white dark:bg-slate-900 dark:hover:bg-green-500"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-slate-100">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/" className="cursor-pointer transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/categories" className="cursor-pointer transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  Popular Categories
                </Link>
              </li>

              <li>
                <Link to="/about" className="cursor-pointer transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  About Gautham
                </Link>
              </li>

              <li>
                <Link to="/contact" className="cursor-pointer transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-slate-100">
              Popular Topics
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/?category=Workout" className="transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  🏋️ Strength Training
                </Link>
              </li>
              <li>
                <Link to="/?category=Nutrition" className="transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  🥗 Nutrition Science
                </Link>
              </li>
              <li>
                <Link to="/?category=Recovery" className="transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  🛌 Active Recovery
                </Link>
              </li>
              <li>
                <Link to="/?category=Health" className="transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  ❤️ Healthy Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-slate-100">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-500" />
                <span className="dark:text-slate-400">Surat, Gujarat, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <a href="mailto:info@gomzi.in" className="transition hover:text-green-400 dark:text-slate-400 dark:hover:text-green-400">
                  info@gomzi.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800/80 py-5 text-center text-sm text-slate-500 dark:border-slate-900/60 dark:text-slate-500">
          © 2026 Gomzi Lifesciences. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;