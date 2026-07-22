import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import coachImg from "../../assets/images/workout/coach.jpg";
import gymImg from "../../assets/images/workout/gym.jpg";
import DecorativeBranch from "./DecorativeBranch";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * AboutSection component.
 * Implements a premium, Apple/Stripe-styled brand summary.
 * Features GSAP ScrollTrigger card reveals, image parallax, and count-up stats.
 */
export function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cards stagger reveal on scroll
      gsap.fromTo(
        ".about-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-cards-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Parallax effect for the images
      gsap.fromTo(
        ".parallax-img-1",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".parallax-img-2",
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // 3. Stats numeric counter animations
      const counters = document.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        const targetVal = parseFloat(counter.getAttribute("data-target"));
        const stepValue = { val: 0 };

        gsap.to(stepValue, {
          val: targetVal,
          duration: 2.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            // Check if it's a decimal/fraction or flat integer
            if (targetVal % 1 !== 0) {
              counter.innerText = stepValue.val.toFixed(1);
            } else {
              counter.innerText = Math.floor(stepValue.val);
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP animations and triggers
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section relative w-full py-24 sm:py-32 bg-slate-50 rounded-t-[80px] sm:rounded-t-[100px] overflow-hidden border-t border-slate-200 z-20 -mt-20"
    >
      {/* Scroll-linked growing branches on both sides */}
      <DecorativeBranch
        side="left"
        variant="C"
        opacity={0.35}
        scrub={true}
        customHeight="85%"
        triggerRef={sectionRef}
      />
      <DecorativeBranch
        side="right"
        variant="C"
        opacity={0.35}
        scrub={true}
        customHeight="85%"
        triggerRef={sectionRef}
      />

      {/* Dynamic light gradient background blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[30rem] h-[30rem] bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title / Header */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.15em] text-emerald-600 uppercase mb-4">
            Our Fitness Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Bridging complex sports science <br className="hidden sm:inline" />
            and daily healthy routines.
          </h2>
        </div>

        {/* 2-Column Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-12 items-start mb-24">
          
          {/* Left Text & Stats Column */}
          <div className="lg:col-span-6 space-y-8">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              At FitFlowAI, we discard fleeting lifestyle trends and quick fixes. Every guide, nutrition planner, and workout routine we share is built upon modern, peer-reviewed clinical research and active sports science. 
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              We focus on nachhaltig results, tailoring fitness to harmonize with your professional lifestyle rather than overtaking it.
            </p>

            {/* Stat Row */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-slate-200">
              <div>
                <div className="text-3xl sm:text-5xl font-black text-slate-900 flex items-baseline">
                  <span className="stat-number" data-target="98">0</span>
                  <span className="text-emerald-600">%</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Success Rate</p>
              </div>

              <div>
                <div className="text-3xl sm:text-5xl font-black text-slate-900 flex items-baseline">
                  <span className="stat-number" data-target="15">0</span>
                  <span className="text-emerald-600">+</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Years Experience</p>
              </div>

              <div>
                <div className="text-3xl sm:text-5xl font-black text-slate-900 flex items-baseline">
                  <span className="stat-number" data-target="10">0</span>
                  <span className="text-emerald-600">k+</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Active Users</p>
              </div>
            </div>
          </div>

          {/* Right Image/Parallax Grid Column */}
          <div className="lg:col-span-6 relative flex justify-center w-full min-h-[350px] sm:min-h-[480px]">
            {/* Background Parallax Box (Gym scene) */}
            <div className="absolute left-4 top-0 w-3/5 aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={gymImg}
                alt="FitFlowAI gym setup"
                className="parallax-img-1 w-full h-[120%] object-cover"
              />
            </div>

            {/* Foreground Parallax Box (Coach portrait) */}
            <div className="absolute right-4 bottom-0 w-1/2 aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-slate-200 z-20">
              <img
                src={coachImg}
                alt="FitFlowAI professional coaching"
                className="parallax-img-2 w-full h-[125%] object-cover"
              />
            </div>
            
            {/* Subtle glow border decorative card */}
            <div className="absolute -right-2 -bottom-2 w-1/2 aspect-[3/4] rounded-3xl border border-emerald-500/10 bg-emerald-500/2 blur-sm -z-10" />
          </div>
        </div>

        {/* Foundations Pillar Cards Grid */}
        <div className="about-cards-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Evidence-Based Protocols",
              desc: "No quick-fix trends. We base every training protocol and macro recommendation on sports science clinical trials.",
              borderStyle: "hover:border-emerald-500/30",
              dotColor: "bg-emerald-500",
            },
            {
              title: "Customized Integration",
              desc: "We build programs tailored for busy corporate professionals, fitting fitness into your lifestyle, not vice versa.",
              borderStyle: "hover:border-teal-500/30",
              dotColor: "bg-teal-500",
            },
            {
              title: "Habit Loop Architecture",
              desc: "Motivation is temporary. We focus on structured habit systems and mental resilience models that stick permanently.",
              borderStyle: "hover:border-blue-500/30",
              dotColor: "bg-blue-500",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className={`about-card p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl ${pillar.borderStyle}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`h-2 w-2 rounded-full ${pillar.dotColor}`} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  0{idx + 1} / Pillar
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
