import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import Container from "../layout/Container";
import { motion } from "framer-motion";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Subscription failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-[#06302c] via-[#0B5A53] to-[#117c74] px-6 py-12 sm:py-16 text-center text-white shadow-2xl"
        >
          {/* Decorative subtle circles in background */}
          <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-green-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-bold tracking-wider uppercase">
              Weekly Fitness Newsletter
            </span>
            
            <h2 className="mt-6 text-3xl font-extrabold md:text-4xl tracking-tight leading-tight">
              Stay Consistent. Stay Informed.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-green-100 md:text-base opacity-90">
              Join 12,000+ readers. Get weekly fitness tips, nutrition advice, and evidence-based
              training guides delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-full bg-white dark:bg-slate-900 border border-slate-200/20 shadow-lg p-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-3 text-sm text-slate-800 dark:text-slate-100 bg-transparent outline-none disabled:cursor-not-allowed"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white rounded-full px-6 text-sm font-bold transition-all hover:bg-black dark:bg-green-600 dark:hover:bg-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed flex-shrink-0"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Newsletter;