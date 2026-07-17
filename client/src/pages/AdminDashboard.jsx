import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import * as FaIcons from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import RichTextEditor from "../components/ui/RichTextEditor";
import Chart from "react-apexcharts";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    readTime: "",
    expertTip: "",
    content: "",
    takeaways: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const [search, setSearch] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState("All");
  const [tablePage, setTablePage] = useState(1);
  const tableBlogsPerPage = 6;

  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const categoryRef = useRef(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Community Blogs panel states
  const [dashboardView, setDashboardView] = useState("overview"); // "overview", "community"
  const [communityTab, setCommunityTab] = useState("pending"); // "pending", "approved", "rejected"
  const [communityBlogs, setCommunityBlogs] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });
  const [rejectionModal, setRejectionModal] = useState(false);
  const [blogToReject, setBlogToReject] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate();

  const categories = [
    { value: "Workout", icon: "🏋️" },
    { value: "Nutrition", icon: "🥗" },
    { value: "Recovery", icon: "🛌" },
    { value: "Health", icon: "❤️" },
    { value: "Lifestyle", icon: "🌿" },
  ];

  const filteredCategories = categories.filter((category) =>
    category.value
      .toLowerCase()
      .includes(categorySearch.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await API.get("/blogs");
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommunityBlogs = async () => {
    try {
      const { data } = await API.get("/blogs/admin/community");
      setCommunityBlogs(data);
    } catch (error) {
      console.log("Failed to load community blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCommunityBlogs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setImage(file);

    const options = {
      maxSizeMB: 0.42,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      setLoading(true);
      const compressedFile = await imageCompression(file, options);
      const namedCompressed = new File([compressedFile], file.name, {
        type: compressedFile.type,
        lastModified: Date.now(),
      });
      setImage(namedCompressed);
      setPreview(URL.createObjectURL(namedCompressed));
      toast.success(`Image compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(namedCompressed.size / 1024).toFixed(0)}KB`);
    } catch (error) {
      console.error("Compression failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a category.");
      return;
    }
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("author", formData.author);
      data.append("readTime", formData.readTime);
      data.append("expertTip", formData.expertTip);
      data.append("takeaways", formData.takeaways);

      if (image) {
        data.append("image", image);
      }

      if (editingId) {
        await API.put(`/blogs/${editingId}`, data);
      } else {
        await API.post("/blogs", data);
      }

      toast.success(
        editingId
          ? "Blog updated successfully!"
          : "Blog published successfully!"
      );

      fetchBlogs();
      fetchCommunityBlogs();

      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        author: "",
        readTime: "",
        expertTip: "",
        content: "",
        takeaways: "",
      });

      setImage(null);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );
      setLoading(false);
    }
  };

  const handleDelete = (blog) => {
    setBlogToDelete(blog);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    try {
      setLoading(true);
      await API.delete(`/blogs/${blogToDelete._id}`);
      toast.success("Blog deleted successfully!");
      setDeleteModal(false);
      setBlogToDelete(null);
      fetchBlogs();
      fetchCommunityBlogs();
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete blog."
      );
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      description: blog.description,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      expertTip: blog.expertTip,
      content: blog.content,
      takeaways: blog.takeaways ? blog.takeaways.join("\n") : "",
    });
    setPreview(blog.image);
    // Scroll to form
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      author: "",
      readTime: "",
      expertTip: "",
      content: "",
      takeaways: "",
    });
    setImage(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApproveBlog = async (blogId) => {
    try {
      setLoading(true);
      await API.patch(`/blogs/admin/community/${blogId}/approve`);
      toast.success("Blog approved successfully!");
      fetchBlogs();
      fetchCommunityBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClick = (blog) => {
    setBlogToReject(blog);
    setRejectionReason("");
    setRejectionModal(true);
  };

  const handleConfirmReject = async () => {
    if (!blogToReject) return;
    try {
      setLoading(true);
      await API.patch(`/blogs/admin/community/${blogToReject._id}/reject`, {
        rejectionReason,
      });
      toast.success("Blog rejected successfully.");
      setRejectionModal(false);
      setBlogToReject(null);
      setRejectionReason("");
      fetchBlogs();
      fetchCommunityBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject blog.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCatFilter === "All" || blog.category === selectedCatFilter;
    return matchesSearch && matchesCategory;
  });

  const totalTablePages = Math.ceil(filteredBlogs.length / tableBlogsPerPage);
  const currentTableBlogs = filteredBlogs.slice((tablePage - 1) * tableBlogsPerPage, tablePage * tableBlogsPerPage);

  useEffect(() => {
    setTablePage(1);
  }, [search, selectedCatFilter]);

  const totalBlogs = blogs.length;
  const totalCategories = new Set(blogs.map((blog) => blog.category)).size;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyCounts = new Array(12).fill(0);
  blogs.forEach((blog) => {
    const month = new Date(blog.createdAt).getMonth();
    monthlyCounts[month]++;
  });

  const monthlyChart = {
    series: [
      {
        name: "Blogs",
        data: monthlyCounts,
      },
    ],
    options: {
      theme: { mode: isDarkMode ? "dark" : "light" },
      chart: {
        background: "transparent",
        toolbar: { show: false },
        zoom: { enabled: false },
        height: 260,
      },
      legend: { show: false },
      colors: ["#22c55e"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3.5 },
      fill: {
        type: "gradient",
        gradient: {
          shade: "green",
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      grid: {
        borderColor: isDarkMode ? "#1e293b" : "#f1f5f9",
        strokeDashArray: 5,
      },
      xaxis: {
        categories: monthNames,
        labels: { style: { colors: isDarkMode ? "#94a3b8" : "#64748b" } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: { style: { colors: isDarkMode ? "#94a3b8" : "#64748b" } },
      },
      tooltip: { theme: isDarkMode ? "dark" : "light" },
    },
  };

  const categoryCounts = categories.map((category) => ({
    label: category.value,
    count: blogs.filter((blog) => blog.category === category.value).length,
  }));

  const pieChart = {
    series: categoryCounts.map((item) => item.count),
    options: {
      theme: { mode: isDarkMode ? "dark" : "light" },
      chart: {
        background: "transparent",
        type: "donut",
        toolbar: { show: false },
      },
      colors: ["#10b981", "#059669", "#0d9488", "#0f766e", "#115e59"],
      labels: categoryCounts.map((item) => item.label),
      legend: {
        position: "bottom",
        fontSize: "13px",
        labels: { colors: isDarkMode ? "#94a3b8" : "#64748b" },
      },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Blogs",
                color: isDarkMode ? "#f1f5f9" : "#0f172a",
                formatter: () => totalBlogs,
              },
            },
          },
        },
      },
      stroke: {
        colors: isDarkMode ? ["#0d1320"] : ["#fff"],
        width: 2,
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { width: "100%" },
            legend: { position: "bottom" },
          },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Premium Header */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 shadow-xl">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 left-1/2 h-32 w-32 rounded-full bg-white/5"></div>
          <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                🏋️ Fitness Blog CMS
              </span>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
                Content Manager
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-green-100">
                Create, edit and manage premium fitness articles with a modern content dashboard.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-2xl bg-white/15 px-5 py-3 text-center backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-green-100">Blogs</p>
                <h2 className="text-2xl font-bold text-white">{totalBlogs}</h2>
              </div>
              <div className="rounded-2xl bg-white/15 px-5 py-3 text-center backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-green-100">Categories</p>
                <h2 className="text-2xl font-bold text-white">{totalCategories}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* CMS Mode Navigation Tabs */}
        <div className="flex border-b border-slate-250 dark:border-slate-800 mb-8 gap-6 overflow-x-auto">
          <button
            onClick={() => setDashboardView("overview")}
            className={`py-4 text-sm font-bold border-b-2 transition-all ${
              dashboardView === "overview"
                ? "border-green-500 text-green-500"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            📂 CMS Overview
          </button>
          <button
            onClick={() => setDashboardView("community")}
            className={`py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              dashboardView === "community"
                ? "border-green-500 text-green-500"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            👥 Community Blogs
            {communityBlogs.pending?.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                {communityBlogs.pending.length}
              </span>
            )}
          </button>
        </div>

        {/* Conditional Rendering based on view switcher */}
        {dashboardView === "community" ? (
          <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-950 dark:border dark:border-slate-800">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Community Blogs Review</h2>
                <p className="text-slate-550 dark:text-slate-400 mt-1">Review community writers' article submissions.</p>
              </div>

              {/* Subtabs for status filter */}
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl gap-2 self-start md:self-auto">
                {["pending", "approved", "rejected"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCommunityTab(tab)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase transition ${
                      communityTab === tab
                        ? "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-white"
                        : "text-slate-555 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {tab} ({communityBlogs[tab]?.length || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(communityBlogs[communityTab] || []).length === 0 ? (
                <div className="col-span-full py-16 text-center text-slate-500">
                  No community articles in this tab.
                </div>
              ) : (
                (communityBlogs[communityTab] || []).map((blog) => (
                  <div
                    key={blog._id}
                    className="flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 dark:border-slate-850 dark:bg-slate-900/40 overflow-hidden shadow-md"
                  >
                    <div className="h-44 bg-slate-100 dark:bg-slate-900">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-xs font-bold text-green-500 uppercase tracking-widest">{blog.category}</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2">{blog.title}</h3>
                        <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <p>Author: <span className="font-semibold text-slate-800 dark:text-slate-200">{blog.authorName}</span></p>
                          <p>Submitted: {new Date(blog.createdAt).toLocaleDateString()}</p>
                          {blog.status === "rejected" && blog.rejectionReason && (
                            <div className="mt-2 p-2.5 rounded-lg bg-red-500/5 border border-red-500/10 text-red-500">
                              <span className="font-bold">Reason:</span> {blog.rejectionReason}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-850">
                        <Link
                          to={`/blog/${blog._id}`}
                          className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 text-xs dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition duration-200"
                        >
                          Preview
                        </Link>
                        {communityTab === "pending" && (
                          <>
                            <button
                              onClick={() => handleApproveBlog(blog._id)}
                              className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-slate-950 font-bold py-2.5 text-xs transition duration-200"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectClick(blog)}
                              className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-600 font-bold py-2.5 text-xs transition duration-200 border border-red-500/10"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {communityTab === "rejected" && (
                          <button
                            onClick={() => handleApproveBlog(blog._id)}
                            className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-700 font-bold py-2.5 text-xs transition duration-200 border border-green-500/10"
                          >
                            Approve
                          </button>
                        )}
                        {communityTab === "approved" && (
                          <button
                            onClick={() => handleRejectClick(blog)}
                            className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 font-bold py-2.5 text-xs transition duration-200 border border-red-500/10"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Overview charts */}
            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-950/40">📈</div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Monthly Publishing</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Blogs published this year</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-center text-white shadow">
                    <p className="text-xs uppercase opacity-80">Blogs</p>
                    <h3 className="text-xl font-bold">{totalBlogs}</h3>
                  </div>
                </div>
                <Chart options={monthlyChart.options} series={monthlyChart.series} type="area" height={240} />
              </div>

              <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/40">🥧</div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Category Distribution</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Content breakdown</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-2 text-center dark:bg-slate-900">
                    <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Categories</p>
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{totalCategories}</h3>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Chart options={pieChart.options} series={pieChart.series} type="donut" height={240} />
                </div>
              </div>
            </div>

            {/* Create Blog Form */}
            <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-950 dark:border dark:border-slate-800 mb-14">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-green-100 p-4 dark:bg-green-950/40">
                  <FaIcons.FaPenNib className="text-2xl text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                    {editingId ? "Update Blog" : "Create Blog"}
                  </h2>
                  <p className="text-slate-550 dark:text-slate-400">Fill all required information before publishing.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition duration-300 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
                  />

                  <div ref={categoryRef} className="relative">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setShowCategories(!showCategories)}
                      className="flex w-full items-center justify-between rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 shadow-sm transition-all duration-300 hover:border-green-400 hover:bg-white hover:shadow-lg focus:ring-4 focus:ring-green-100 dark:border-slate-850 dark:bg-slate-900 dark:text-slate-205"
                    >
                      <span className={formData.category ? "font-medium text-slate-800 dark:text-white" : "text-slate-400"}>
                        {formData.category
                          ? categories.find((item) => item.value === formData.category)?.icon + " " + formData.category
                          : "📂 Select Category"}
                      </span>
                      <span className={`text-xl text-green-600 transition duration-300 ${showCategories ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>

                    {showCategories && (
                      <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 dark:border-slate-800 dark:bg-slate-950">
                        <div className="border-b p-3">
                          <input
                            type="text"
                            placeholder="🔍 Search category..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-900"
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto p-2">
                          {filteredCategories.map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, category: item.value });
                                setShowCategories(false);
                              }}
                              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition hover:bg-green-50 dark:hover:bg-slate-900"
                            >
                              <span>{item.icon}</span>
                              <span>{item.value}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition duration-300 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
                  />

                  <input
                    type="text"
                    name="readTime"
                    placeholder="Read Time"
                    value={formData.readTime}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition duration-300 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-955"
                  />
                </div>

                <textarea
                  rows={3}
                  name="description"
                  placeholder="Short Description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 transition duration-300 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-955"
                />

                <div>
                  <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-200 font-bold">Blog Content</label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <textarea
                    rows={4}
                    name="expertTip"
                    placeholder="Expert Tip"
                    value={formData.expertTip}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition duration-300 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />

                  <textarea
                    rows={4}
                    name="takeaways"
                    placeholder="Takeaways (one per line)"
                    value={formData.takeaways}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition duration-300 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-10 transition duration-300 hover:border-green-500 hover:bg-green-50/10">
                  <FaIcons.FaCloudUploadAlt className="mb-4 text-5xl text-green-500" />
                  <p className="font-semibold">{image ? image.name : "Click to Upload Cover Image"}</p>
                  <p className="mt-1 text-sm text-slate-500">PNG • JPG • WEBP</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    disabled={loading}
                    onChange={handleImageChange}
                  />
                </label>

                {preview && (
                  <div className="rounded-2xl border bg-slate-50 dark:bg-slate-900 p-6 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img src={preview} alt="Preview" className="h-16 w-auto object-contain rounded-xl" />
                      <div>
                        <p className="font-semibold text-sm">{image ? image.name : "Existing Cover Image"}</p>
                        {image && <p className="text-xs text-slate-500">{(image.size / 1024).toFixed(1)} KB</p>}
                      </div>
                    </div>
                    {image && (
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setPreview("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-650"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 rounded-2xl py-4 text-lg font-bold text-white shadow-xl transition duration-300
                      ${editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}
                      ${loading ? "cursor-not-allowed opacity-70" : "hover:scale-[1.02]"}`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <FaIcons.FaSpinner className="animate-spin" />
                        <span>{editingId ? "Updating Blog..." : "Publishing Blog..."}</span>
                      </div>
                    ) : (
                      editingId ? "Update Blog" : "Publish Blog"
                    )}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={loading}
                      className="rounded-2xl border border-slate-300 bg-white px-8 font-semibold text-slate-705 shadow transition duration-300 hover:bg-slate-100 dark:bg-slate-900 dark:text-white disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Blog Management table */}
            <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-950 dark:border dark:border-slate-800">
              <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Blog CMS Management</h2>
                  <p className="mt-1 text-slate-550 dark:text-slate-400">Manage, edit and organize your published blogs.</p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    placeholder="Search blog..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-72 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />

                  <select
                    value={selectedCatFilter}
                    onChange={(e) => setSelectedCatFilter(e.target.value)}
                    className="w-full sm:w-48 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="All">All Categories</option>
                    <option value="Workout">Workout</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Recovery">Recovery</option>
                    <option value="Health">Health</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>

                  <div className="flex justify-center rounded-xl bg-green-105 px-5 py-3 font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    {filteredBlogs.length} Blogs
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-805">
                <table className="min-w-[950px] w-full">
                  <thead className="bg-slate-800 text-white dark:bg-slate-950">
                    <tr>
                      <th className="p-5 text-left">Image</th>
                      <th className="p-5 text-left">Title</th>
                      <th className="p-5 text-left">Category</th>
                      <th className="p-5 text-left">Author</th>
                      <th className="p-5 text-left">Status</th>
                      <th className="p-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTableBlogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="border-b transition duration-300 hover:bg-green-50 dark:border-slate-850 dark:hover:bg-slate-900/40"
                      >
                        <td className="p-4">
                          <img src={blog.image} alt={blog.title} className="h-12 w-20 rounded-lg object-cover" />
                        </td>
                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 mt-2">{blog.title}</td>
                        <td className="p-4 font-semibold text-green-600 dark:text-green-400">{blog.category}</td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{blog.author}</td>
                        <td className="p-4 text-xs font-bold uppercase">
                          <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 dark:bg-green-950/45 dark:text-green-400">
                            {blog.status || "approved"}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-100 dark:border-green-950 dark:bg-green-950/20 dark:text-green-400"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(blog)}
                              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 dark:text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalTablePages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTablePage((prev) => Math.max(prev - 1, 1))}
                    disabled={tablePage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-green-500 hover:text-green-600 disabled:opacity-40"
                  >
                    ◀
                  </button>

                  {Array.from({ length: totalTablePages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setTablePage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                        tablePage === page
                          ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-green-500 hover:text-green-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setTablePage((prev) => Math.min(prev + 1, totalTablePages))}
                    disabled={tablePage === totalTablePages}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-green-500 hover:text-green-600 disabled:opacity-40"
                  >
                    ▶
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-950 dark:border dark:border-slate-800">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/20">
              <span className="text-4xl">🗑️</span>
            </div>
            <h2 className="text-center text-2xl font-bold text-slate-800 dark:text-white">Delete Blog?</h2>
            <p className="mt-4 text-center text-slate-500 dark:text-slate-400">You're about to permanently delete</p>
            <p className="mt-2 text-center font-bold text-slate-800 dark:text-slate-200">"{blogToDelete?.title}"</p>
            <p className="mt-2 text-center text-xs text-red-500">This action cannot be undone.</p>
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setBlogToDelete(null);
                }}
                className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-105 dark:bg-slate-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-650 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-950 dark:border dark:border-slate-800">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/20">
              <span className="text-4xl">🚫</span>
            </div>
            <h2 className="text-center text-2xl font-bold text-slate-800 dark:text-white">Reject Submission?</h2>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
              Provide feedback to the author. Explain what needs to be improved (formatting, images, etc.).
            </p>
            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Please improve content formatting, add sources, or upload a higher quality cover image."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 transition duration-300 outline-none hover:border-red-400 focus:border-red-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setRejectionModal(false);
                  setBlogToReject(null);
                  setRejectionReason("");
                }}
                className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-105 dark:bg-slate-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleConfirmReject}
                className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-750 disabled:opacity-50"
              >
                {loading ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;