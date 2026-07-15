import { useState } from "react";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaRunning } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const user = await loginUser(formData.email, formData.password);
      
      if (user.role === "admin") {
        toast.success(`Welcome back, Admin ${user.name}!`);
        navigate("/admin");
      } else {
        toast.success(`Welcome back, ${user.name}!`);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Login | FitFlowAI"
        description="Sign in to your FitFlowAI account to access workout guides, nutrition plans, and article updates."
      />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-800/80 dark:bg-slate-950"
        >
          {/* Logo Icon & Title */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/20"
            >
              <FaRunning className="text-3xl" />
            </motion.div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Sign in to your FitFlowAI dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all duration-200 hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:hover:border-green-500/50 dark:focus:border-green-500 dark:focus:bg-slate-900 dark:focus:ring-green-500/5"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition-all duration-200 hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:hover:border-green-500/50 dark:focus:border-green-500 dark:focus:bg-slate-900 dark:focus:ring-green-500/5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-green-500 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/10 focus:ring-4 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500 dark:disabled:bg-green-700"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-green-500 hover:text-green-600 hover:underline dark:text-green-400 dark:hover:text-green-300"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
