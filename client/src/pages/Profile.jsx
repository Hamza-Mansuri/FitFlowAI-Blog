import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaBook,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaEye,
  FaHeart,
  FaBookmark,
  FaEdit,
  FaTrashAlt,
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaArrowRight,
  FaExclamationTriangle
} from "react-icons/fa";
import API from "../services/api";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import PageTransition from "../components/common/PageTransition";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("my-blogs");
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs/user/profile");
      setData(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await API.delete(`/blogs/${blogId}`);
      toast.success("Blog deleted successfully!");
      // Refresh
      fetchProfileData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#05070d]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#05070d] p-6 text-center">
        <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-850 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button
          onClick={fetchProfileData}
          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 font-bold text-white shadow shadow-green-500/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { profile, stats, myBlogs, likedBlogs, savedBlogs } = data;

  const tabs = [
    { id: "my-blogs", name: `My Blogs (${myBlogs.length})`, icon: <FaBook /> },
    { id: "liked-blogs", name: `Liked Blogs (${likedBlogs.length})`, icon: <FaHeart /> },
    { id: "saved-blogs", name: `Saved Blogs (${savedBlogs.length})`, icon: <FaBookmark /> },
  ];

  return (
    <PageTransition>
      <SEO
        title={`${profile.name} - Profile | FitFlowAI`}
        description="View your fitness published blogs, stats, and liked content."
      />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Profile Header Card */}
          <div className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-900/40 dark:bg-slate-950/65 p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-green-500 to-emerald-600 font-black text-3xl sm:text-4xl text-slate-950 border border-green-500/20 shadow-lg">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                {profile.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <FaEnvelope className="text-green-500" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  Joined {new Date(profile.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
            {[
              { label: "Total Blogs", val: stats.totalBlogs, color: "text-blue-500 bg-blue-500/10" },
              { label: "Approved Blogs", val: stats.approvedBlogs, color: "text-green-500 bg-green-500/10" },
              { label: "Pending Blogs", val: stats.pendingBlogs, color: "text-amber-500 bg-amber-500/10" },
              { label: "Rejected Blogs", val: stats.rejectedBlogs, color: "text-red-500 bg-red-500/10" },
              { label: "Total Views", val: stats.totalViews, color: "text-teal-500 bg-teal-500/10" },
              { label: "Likes Received", val: stats.totalLikesReceived, color: "text-rose-500 bg-rose-500/10" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/50 bg-white/60 dark:border-slate-900/30 dark:bg-slate-950/40 p-4 text-center backdrop-blur-md shadow-sm"
              >
                <div className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs ${stat.color}`}>
                  {stat.val}
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tab Control */}
          <div className="flex border-b border-slate-250 dark:border-slate-850 mb-8 gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-all shrink-0 ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-500"
                    : "border-transparent text-slate-550 hover:text-slate-800 dark:text-slate-450 dark:hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "my-blogs" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {myBlogs.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-500">
                      You haven't written any blogs yet.
                      <div className="mt-4">
                        <Link
                          to="/publish"
                          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow shadow-green-500/20"
                        >
                          Write Your First Blog
                        </Link>
                      </div>
                    </div>
                  ) : (
                    myBlogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 dark:border-slate-900/40 dark:bg-slate-950/65 overflow-hidden shadow-md"
                      >
                        <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                          <img
                            src={blog.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            {blog.status === "approved" && (
                              <span className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-md">
                                <FaCheckCircle /> Approved
                              </span>
                            )}
                            {blog.status === "pending" && (
                              <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-md">
                                <FaHourglassHalf className="animate-spin" /> Pending
                              </span>
                            )}
                            {blog.status === "rejected" && (
                              <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                                <FaTimesCircle /> Rejected
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                              {blog.category}
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2">
                              {blog.title}
                            </h3>
                            <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                              <span className="flex items-center gap-1"><FaEye /> {blog.views || 0}</span>
                              <span className="flex items-center gap-1"><FaHeart /> {blog.likesCount || 0}</span>
                              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>

                            {/* Rejection Reason Display */}
                            {blog.status === "rejected" && blog.rejectionReason && (
                              <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-950/40 p-3 text-xs">
                                <p className="font-bold text-red-600 dark:text-red-400 mb-1 flex items-center gap-1">
                                  <FaExclamationTriangle /> Rejection Reason:
                                </p>
                                <p className="text-slate-655 dark:text-slate-350 italic">{blog.rejectionReason}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-900">
                            {blog.status === "approved" ? (
                              <Link
                                to={`/blog/${blog._id}`}
                                className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 text-xs dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition duration-200"
                              >
                                <FaEye /> View
                              </Link>
                            ) : (
                              <>
                                <Link
                                  to={`/blog/${blog._id}`}
                                  className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-250 text-slate-700 font-semibold py-2.5 text-xs dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition duration-200"
                                >
                                  <FaEye /> Preview
                                </Link>
                                <Link
                                  to={`/edit/${blog._id}`}
                                  className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-700 font-semibold py-2.5 text-xs dark:text-green-400 transition duration-200 border border-green-500/10"
                                >
                                  <FaEdit /> Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(blog._id)}
                                  className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-600 font-semibold py-2.5 text-xs dark:text-red-400 transition duration-200 border border-red-500/10"
                                >
                                  <FaTrashAlt /> Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "liked-blogs" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {likedBlogs.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-500">
                      You haven't liked any blogs yet.
                    </div>
                  ) : (
                    likedBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog._id}`}
                        className="group flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 dark:border-slate-900/40 dark:bg-slate-950/65 overflow-hidden shadow-md hover:shadow-lg transition-all duration-305"
                      >
                        <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                              {blog.category}
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                              By <span className="font-semibold text-slate-700 dark:text-slate-300">{blog.authorName || "Expert"}</span>
                            </p>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-550 dark:text-slate-400">
                            <span className="flex items-center gap-1"><FaEye /> {blog.views || 0}</span>
                            <span className="flex items-center gap-1"><FaHeart className="text-rose-500" /> {blog.likesCount || 0}</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}

              {activeTab === "saved-blogs" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {savedBlogs.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-500">
                      You haven't saved any blogs yet.
                    </div>
                  ) : (
                    savedBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog._id}`}
                        className="group flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 dark:border-slate-900/40 dark:bg-slate-950/65 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                              {blog.category}
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-xs text-slate-550 dark:text-slate-400 mb-4">
                              By <span className="font-semibold text-slate-705 dark:text-slate-300">{blog.authorName || "Expert"}</span>
                            </p>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-500">
                            <span>Saved</span>
                            <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}

export default Profile;
