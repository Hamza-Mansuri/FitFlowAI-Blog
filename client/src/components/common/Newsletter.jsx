import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import Container from "../layout/Container";

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
    <section className="py-4">
      <Container>

        <div className="rounded-3xl bg-gradient-to-r from-[#0B5A53] to-[#148F86] px-6 py-8 text-center text-white shadow-xl">

          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            Weekly Fitness Newsletter
          </span>
          
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            Stay Consistent. Stay Informed.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-green-100 md:text-base">
            Join 12,000+ readers. Get weekly fitness tips, nutrition advice, and evidence-based
            training guides delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-xl overflow-hidden rounded-full bg-white shadow-md">

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="Enter your email"
              required
              className="w-full px-5 py-3 text-sm text-slate-800 outline-none disabled:bg-slate-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-black disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

          </form>

        </div>

      </Container>
    </section>
  );
}

export default Newsletter;