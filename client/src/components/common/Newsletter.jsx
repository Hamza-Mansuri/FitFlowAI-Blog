import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import Container from "../layout/Container";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaPaperPlane } from "react-icons/fa";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/newsletter/subscribe", { email });
      toast.success(data.message || "Thank you for subscribing!");
      setSubscribed(true);
      setEmail("");
      
      // Reset subscription status indicator after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Subscription failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter-section" className="py-12 md:py-16 relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/50 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-2xl px-6 py-14 sm:px-12 sm:py-20 text-center shadow-2xl z-10"
        >
          {/* Subtle moving glows inside the card */}
          <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-green-400/5 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-500 dark:text-emerald-400 uppercase">
              ✨ Weekly Fitness Newsletter
            </span>

            <h2 className="text-3xl font-extrabold md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Stay Consistent. Stay Informed.
            </h2>

            <p className="mx-auto max-w-lg text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-400 font-light">
              Join 12,000+ readers. Get weekly fitness tips, nutrition advice, and evidence-based
              training guides delivered straight to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-8 flex flex-col sm:flex-row items-stretch gap-3.5 max-w-md w-full"
            >
              {/* Input wrapper */}
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || subscribed}
                  placeholder="Enter your email address"
                  required
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 disabled:opacity-50"
                />
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                type="submit"
                disabled={loading}
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white dark:text-slate-950 font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
              >
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FaCheck className="text-base" />
                      <span>Subscribed!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FaPaperPlane size={11} />
                      <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <span className="block text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold mt-4">
              🔒 No spam. Unsubscribe anytime.
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Newsletter;