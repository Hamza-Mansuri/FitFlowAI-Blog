import {
  FaArrowRight,
  FaDumbbell,
  FaAppleAlt,
  FaHeart,
} from "react-icons/fa";

import Container from "../layout/Container";
import gautam from "../../assets/images/gautam.png";

function FeaturedBlog() {
  return (
    <section className="py-1">
      <Container>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#063B37] via-[#0B5A53] to-[#148F86] shadow-xl">

          {/* Background Decorations */}

          <div className="absolute inset-0 opacity-10">

            <div className="absolute left-[55%] top-6 h-24 w-24 rotate-45 border border-white"></div>

            <div className="absolute right-16 bottom-10 h-32 w-32 rotate-45 border border-white"></div>

          </div>

          {/* Glow */}

          <div className="absolute right-12 top-10 h-64 w-64 rounded-full bg-green-400/20 blur-3xl"></div>

          <div className="relative grid items-center lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT */}

            <div className="px-7 py-7 lg:px-9">

              <span className="inline-flex items-center rounded-full bg-green-400/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-200">
                🔥 Featured Fitness Guide
              </span>

              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white lg:text-3xl">
                Build a Stronger,
                <br />
                Healthier You.
              </h2>

              <div className="mt-4 h-1 w-14 rounded-full bg-green-400"></div>

              <p className="mt-4 max-w-md text-[15px] leading-7 text-slate-200">
                Learn practical, science-backed strategies for training,
                nutrition, fat loss, recovery, and sustainable lifestyle
                transformation.
              </p>

              {/* Topics */}

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-100">

                <div className="flex items-center gap-2">
                  <FaDumbbell className="text-green-300" />
                  <span>Strength Training</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaAppleAlt className="text-green-300" />
                  <span>Nutrition Science</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaHeart className="text-green-300" />
                  <span>Healthy Lifestyle</span>
                </div>

              </div>

              {/* CTA */}

              <button className="mt-6 flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:translate-x-1">
                Start Learning
                <FaArrowRight className="text-xs" />
              </button>

            </div>

            {/* RIGHT */}

            <div className="flex items-end justify-center">

              <img
                src={gautam}
                alt="Gautam Jani"
                className="h-[300px] object-contain md:h-[340px] lg:h-[400px]"
              />

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default FeaturedBlog;