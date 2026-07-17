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
  FaExclamationTriangle,
  FaDumbbell,
  FaAppleAlt,
  FaCalendarCheck,
  FaChevronRight,
  FaChartLine,
  FaRobot
} from "react-icons/fa";
import API from "../services/api";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import PageTransition from "../components/common/PageTransition";
import EmptyState from "../components/common/EmptyState";
import SkeletonImage from "../components/common/SkeletonImage";
import FitnessProfileCard from "../components/profile/FitnessProfileCard";
import WorkoutCard from "../components/workout/WorkoutCard";
import AnalyticsDashboard from "./AnalyticsDashboard";
import AICoachWorkspace from "./AICoachWorkspace";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("my-blogs");
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [myNutrition, setMyNutrition] = useState([]);
  const [todayLog, setTodayLog] = useState(null);
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

  const fetchWorkouts = async () => {
    try {
      const { data } = await API.get("/workouts");
      setMyWorkouts(data.workouts || []);
    } catch (err) {
      console.error("Failed to load workouts on profile:", err);
    }
  };

  const fetchNutrition = async () => {
    try {
      const { data } = await API.get("/nutrition");
      setMyNutrition(data.plans || []);
    } catch (err) {
      console.error("Failed to load nutrition plans on profile:", err);
    }
  };

  const fetchTodayLog = async () => {
    try {
      const { data } = await API.get("/checkin/today");
      setTodayLog(data.checkIn || null);
    } catch (err) {
      console.error("Failed to fetch today's log on profile:", err);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchWorkouts();
    fetchNutrition();
    fetchTodayLog();
  }, []);

  const handleDeleteWorkout = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout plan?")) return;
    try {
      await API.delete(`/workouts/${id}`);
      toast.success("Workout routine deleted successfully");
      fetchWorkouts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete workout");
    }
  };

  const handleDeleteNutrition = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nutrition plan?")) return;
    try {
      await API.delete(`/nutrition/${id}`);
      toast.success("Nutrition plan deleted successfully");
      fetchNutrition();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete nutrition plan");
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await API.delete(`/blogs/${blogId}`);
      toast.success("Blog deleted successfully!");
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
    { id: "workouts", name: `My Workouts (${myWorkouts.length})`, icon: <FaDumbbell /> },
    { id: "nutrition", name: `My Meal Plans (${myNutrition.length})`, icon: <FaAppleAlt /> },
    { id: "analytics", name: "Progress Analytics", icon: <FaChartLine /> },
    { id: "ai-coach", name: "AI Coach Workspace", icon: <FaRobot /> },
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

          <div className="mb-10">
            <FitnessProfileCard />
          </div>

          {!todayLog && (
            <div className="rounded-[2.5rem] border border-dashed border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                  <FaCalendarCheck size={16} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    Start Today's Check-in
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5 max-w-md">
                    Log your sleep, weight, stress, and workouts so FitCoach AI can suggest safety modifications and volume adjustments.
                  </p>
                </div>
              </div>
              <Link to="/checkin">
                <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-xs font-extrabold text-slate-955 shadow-md shadow-emerald-500/15 cursor-pointer">
                  <span>Complete Log</span>
                  <FaChevronRight size={8} />
                </button>
              </Link>
            </div>
          )}

          {todayLog && (
            <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <FaCalendarCheck size={16} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    Daily Check-in Completed
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 font-light mt-0.5">
                    Today's recovery status calculated score: <strong className="text-emerald-500 font-extrabold">{todayLog.recoveryScore}%</strong>. View AI Recommendations.
                  </p>
                </div>
              </div>
              <Link to="/checkin">
                <button className="flex items-center gap-1.5 rounded-xl border border-slate-250 bg-white/50 px-5 py-3 text-xs font-extrabold text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer hover:bg-slate-100">
                  <span>View Recovery Dashboard</span>
                </button>
              </Link>
            </div>
          )}

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
                    <div className="col-span-full">
                      <EmptyState
                        title="No Published Blogs"
                        description="You haven't authored any fitness articles yet. Share your experience with the community."
                        actionText="Write Your First Blog"
                        actionPath="/publish"
                      />
                    </div>
                  ) : (
                    myBlogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="flex flex-col rounded-[2.25rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                          <SkeletonImage
                            src={blog.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"}
                            alt={blog.title}
                            aspectClass="h-44 w-full"
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
                    <div className="col-span-full">
                      <EmptyState
                        title="No Liked Articles"
                        description="You haven't liked any fitness articles yet. Browse popular categories to find interesting guides."
                        actionText="Explore Categories"
                        actionPath="/categories"
                      />
                    </div>
                  ) : (
                    likedBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog._id}`}
                        className="group flex flex-col rounded-[2.25rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                          <SkeletonImage
                            src={blog.image}
                            alt={blog.title}
                            aspectClass="h-44 w-full"
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
                    <div className="col-span-full">
                      <EmptyState
                        title="No Saved Articles"
                        description="You haven't bookmarked any guides yet. Save your favorite strength, nutrition, and wellness topics for quick access."
                        actionText="Explore Topics"
                        actionPath="/categories"
                      />
                    </div>
                  ) : (
                    savedBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog._id}`}
                        className="group flex flex-col rounded-[2.25rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                          <SkeletonImage
                            src={blog.image}
                            alt={blog.title}
                            aspectClass="h-44 w-full"
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

              {activeTab === "workouts" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {myWorkouts.length === 0 ? (
                    <div className="col-span-full">
                      <EmptyState
                        title="No Saved Routines"
                        description="You haven't generated any custom workouts yet. Build one now with FitCoach AI."
                        actionText="Build Workout Routine"
                        actionPath="/workouts/build"
                        icon={FaDumbbell}
                      />
                    </div>
                  ) : (
                    myWorkouts.map((workout) => (
                      <WorkoutCard
                        key={workout._id}
                        workout={workout}
                        onDelete={handleDeleteWorkout}
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === "nutrition" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {myNutrition.length === 0 ? (
                    <div className="col-span-full">
                      <EmptyState
                        title="No Saved Meal Plans"
                        description="You haven't generated any nutrition plans yet. Setup one now using BMR and TDEE math."
                        actionText="Generate Nutrition Program"
                        actionPath="/nutrition/build"
                        icon={FaAppleAlt}
                      />
                    </div>
                  ) : (
                    myNutrition.map((plan) => (
                      <motion.div
                        key={plan._id}
                        whileHover={{ y: -6, scale: 1.015 }}
                        className="group rounded-3xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-md transition-all duration-300 hover:border-emerald-500/30 flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                              {plan.planType}
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-500 transition-colors duration-300 line-clamp-1">
                              {plan.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => handleDeleteNutrition(plan._id)}
                            className="p-2 text-slate-450 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-y border-slate-200/45 dark:border-slate-800/30 py-3.5 mb-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <div>Energy: <strong className="text-slate-855 dark:text-white">{plan.dailyCalories} kcal</strong></div>
                          <div>Split: <strong className="text-slate-855 dark:text-white">{plan.mealCount} meals/day</strong></div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-450">
                          <span className="capitalize">{plan.dietPreference} Diet</span>
                          <Link
                            to={`/nutrition/${plan._id}`}
                            className="inline-flex items-center gap-1.5 font-bold text-emerald-500 hover:underline"
                          >
                            <span>View Program</span>
                            <FaEye size={12} />
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="w-full">
                  <AnalyticsDashboard />
                </div>
              )}

              {activeTab === "ai-coach" && (
                <div className="w-full">
                  <AICoachWorkspace />
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
