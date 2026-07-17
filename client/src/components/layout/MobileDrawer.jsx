import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

function MobileDrawer({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    onClose();
    await logout();
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-emerald-500 font-bold text-lg relative py-1"
      : "text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors text-lg py-1";

  const drawerVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "spring", stiffness: 350, damping: 35 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[80]"
          />

          {/* Sliding Panel */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-[290px] sm:w-[320px] bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-l border-slate-200/50 dark:border-slate-800/40 z-[90] p-6 flex flex-col justify-between shadow-2xl"
          >
            {/* Top Header Row */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/50 dark:border-slate-800/40">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Navigation
                </span>
                <button
                  onClick={onClose}
                  className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-450 dark:hover:text-white"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Links List */}
              <nav className="mt-8 flex flex-col gap-6 font-semibold">
                <NavLink to="/" className={navClass} onClick={onClose}>
                  Home
                </NavLink>

                <NavLink to="/categories" className={navClass} onClick={onClose}>
                  Categories
                </NavLink>

                <NavLink to="/about" className={navClass} onClick={onClose}>
                  About
                </NavLink>

                <NavLink to="/contact" className={navClass} onClick={onClose}>
                  Contact
                </NavLink>

                {user && (
                  <>
                    <div className="my-2 border-t border-slate-200/50 dark:border-slate-800/40" />
                    
                    {user.role !== "admin" && (
                      <NavLink to="/publish" className={navClass} onClick={onClose}>
                        Publish Blog
                      </NavLink>
                    )}

                    <NavLink to="/profile" className={navClass} onClick={onClose}>
                      Profile
                    </NavLink>

                    {user.role === "admin" && (
                      <NavLink to="/admin" className={navClass} onClick={onClose}>
                        Admin Dashboard
                      </NavLink>
                    )}
                  </>
                )}
              </nav>
            </div>

            {/* Bottom Actions Row */}
            <div className="border-t border-slate-200/50 pt-6 dark:border-slate-800/40 space-y-5">
              {/* Theme switch in drawer */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Theme Mode
                </span>
                <ThemeSwitcher />
              </div>

              {/* User profile actions */}
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500/10 to-green-500/20 font-bold text-emerald-450 border border-emerald-500/25">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">
                        {user.name}
                      </span>
                      <span className="text-xs text-slate-450 truncate leading-tight mt-0.5">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 hover:bg-red-500/20 py-3 text-xs sm:text-sm font-bold text-red-500 transition-colors"
                  >
                    <FaSignOutAlt size={12} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="flex justify-center items-center py-3 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-300 font-bold text-xs rounded-2xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={onClose}
                    className="flex justify-center items-center py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold text-xs rounded-2xl shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileDrawer;
