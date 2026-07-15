import Container from "./Container";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaDumbbell,
} from "react-icons/fa";

import gomziLogo from "../../assets/images/gomzi-logo.png";

function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-slate-300">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <div className="flex items-center">
              <img
                src={gomziLogo}
                alt="Gomzi Lifesciences"
                className="h-12 w-auto"
              />
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Evidence-based fitness and nutrition education designed to
              help people build stronger bodies, healthier habits, and a
              sustainable lifestyle.
            </p>

            <div className="mt-6 flex gap-3">
              {[FaInstagram, FaYoutube, FaLinkedin].map((Icon, index) => (
                <button
                  key={index}
                  className="rounded-full bg-slate-800 p-3 transition duration-300 hover:bg-green-500 hover:text-white"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li className="cursor-pointer transition hover:text-green-400">
                Home
              </li>

              <li className="cursor-pointer transition hover:text-green-400">
                Featured Guide
              </li>

              <li className="cursor-pointer transition hover:text-green-400">
                Latest Articles
              </li>

              <li className="cursor-pointer transition hover:text-green-400">
                Contact
              </li>
            </ul>
          </div>

          {/* Categories */}

          <div>
            <h3 className="text-lg font-semibold text-white">
              Popular Topics
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>🏋 Strength Training</li>
              <li>🥗 Nutrition Science</li>
              <li>💪 Fat Loss</li>
              <li>❤️ Healthy Lifestyle</li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-500" />

                <span>Surat, Gujarat, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />

                <span>info@gomzi.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
          © 2026 Gomzi Lifesciences. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;