import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaRunning } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/authService";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import PageTransition from "../components/common/PageTransition";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await register({ name, email, password });
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Email might already be in use."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Create Account | FitFlowAI"
        description="Join FitFlowAI to start reading personalized fitness, nutrition, and lifestyle articles."
      />

      <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50/50 px-4 py-16 dark:bg-[#05070d] overflow-hidden">
        {/* Ambient background glows */}
        <GlowBackground />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 w-full max-w-md rounded-3xl premium-glass-card p-8 sm:p-10 shadow-xl border border-slate-200/60 dark:border-slate-800/40"
        >
          {/* Logo Icon & Title */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20"
            >
              <FaRunning className="text-3xl" />
            </motion.div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Join the FitFlowAI fitness community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <FaUser size={13} />
              </span>
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-white/50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all duration-300 hover:border-green-400/80 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:border-slate-800/60 dark:bg-slate-900/45 dark:text-white dark:hover:border-green-500/50 dark:focus:border-green-500 dark:focus:bg-slate-900 dark:focus:ring-green-500/5"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <FaEnvelope size={13} />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-white/50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all duration-300 hover:border-green-400/80 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:border-slate-800/60 dark:bg-slate-900/45 dark:text-white dark:hover:border-green-500/50 dark:focus:border-green-500 dark:focus:bg-slate-900 dark:focus:ring-green-500/5"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <FaLock size={13} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-white/50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition-all duration-300 hover:border-green-400/80 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:border-slate-800/60 dark:bg-slate-900/45 dark:text-white dark:hover:border-green-500/50 dark:focus:border-green-500 dark:focus:bg-slate-900 dark:focus:ring-green-500/5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-650 dark:text-slate-500 dark:hover:text-slate-350"
              >
                {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <FaLock size={13} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-white/50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition-all duration-300 hover:border-green-400/80 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:border-slate-800/60 dark:bg-slate-900/45 dark:text-white dark:hover:border-green-500/50 dark:focus:border-green-500 dark:focus:bg-slate-900 dark:focus:ring-green-500/5"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-650 dark:text-slate-500 dark:hover:text-slate-350"
              >
                {showConfirmPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-500/10 transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-500/20 focus:ring-4 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:bg-green-400 dark:from-green-600 dark:to-emerald-700 dark:hover:from-green-500 dark:hover:to-emerald-600"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-green-500 hover:text-green-600 hover:underline dark:text-green-450 dark:hover:text-green-300"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default Signup;
