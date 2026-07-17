import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaFileAlt,
  FaBookmark,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

function ProfilePopover() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const navigate = useNavigate();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate("/");
  };

  if (!user) return null;

  const menuItems = [
    {
      label: "Profile",
      path: "/profile",
      icon: FaUser,
    },
    {
      label: "My Blogs",
      path: "/profile", // existing route for my blogs
      icon: FaFileAlt,
      badge: 3,
    },
    {
      label: "Saved Blogs",
      path: "/profile",
      icon: FaBookmark,
      badge: 12,
    },
    {
      label: "Liked Blogs",
      path: "/profile",
      icon: FaHeart,
    },
    {
      label: "Settings",
      path: "/profile",
      icon: FaCog,
    },
  ];

  return (
    <div className="relative" ref={popoverRef}>
      {/* Profile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-200/20 dark:hover:bg-slate-900/30 transition-all duration-300 select-none cursor-pointer border border-transparent hover:border-white/5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500/20 to-green-500/20 font-extrabold text-emerald-450 border border-emerald-500/20 shadow-inner">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <FaChevronDown
          size={10}
          className={`text-slate-400 dark:text-slate-300 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-3 w-72 rounded-3xl border border-slate-200/50 bg-white/70 dark:border-slate-800/40 dark:bg-slate-950/70 backdrop-blur-2xl p-5 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header info */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/50 dark:border-slate-800/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500/10 to-green-500/15 font-bold text-emerald-450 border border-emerald-500/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-950 dark:text-slate-100 truncate leading-tight">
                  {user.name}
                </span>
                <span className="text-[11px] text-slate-450 truncate mt-0.5 leading-tight">
                  {user.email}
                </span>
                {/* Pro Badge */}
                <span className="self-start inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-450 uppercase tracking-widest mt-1.5">
                  Pro Member
                </span>
              </div>
            </div>

            {/* Menu options */}
            <nav className="mt-3.5 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="relative group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-200"
                  >
                    {/* Background slide animation hover */}
                    <span className="absolute inset-0 bg-emerald-500/5 rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-0 pointer-events-none" />

                    <div className="flex items-center gap-3 relative z-10">
                      <Icon size={14} className="text-slate-450 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                      <span>{item.label}</span>
                    </div>

                    {/* Animated Notification Badge system */}
                    {item.badge !== undefined && (
                      <motion.span
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-450"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="my-2 border-t border-slate-200/50 dark:border-slate-800/40" />

              {/* Logout option */}
              <button
                onClick={handleLogout}
                className="relative group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-350 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 text-left cursor-pointer"
              >
                <span className="absolute inset-0 bg-red-500/5 rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-0 pointer-events-none" />

                <FaSignOutAlt size={14} className="text-slate-450 group-hover:text-red-500 dark:group-hover:text-red-450 transition-colors relative z-10" />
                <span className="relative z-10">Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfilePopover;
