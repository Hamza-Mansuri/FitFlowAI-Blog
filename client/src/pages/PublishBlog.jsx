import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaSave, FaPaperPlane, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import API from "../services/api";
import RichTextEditor from "../components/ui/RichTextEditor";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import PageTransition from "../components/common/PageTransition";

function PublishBlog() {
  const { id } = useParams(); // present if editing
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [showCategories, setShowCategories] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    readTime: "",
    expertTip: "",
    content: "",
    takeaways: "",
  });

  const categoriesList = [
    { value: "Workout", icon: "🏋️" },
    { value: "Nutrition", icon: "🥗" },
    { value: "Recovery", icon: "🛌" },
    { value: "Health", icon: "❤️" },
    { value: "Lifestyle", icon: "🌿" },
  ];

  useEffect(() => {
    if (id) {
      const fetchBlogDetails = async () => {
        try {
          setFetching(true);
          const { data } = await API.get(`/blogs/${id}`);
          
          // Verify if user is allowed to edit this blog (only if pending/rejected or admin)
          if (data.status === "approved") {
            setError("Approved blogs are read-only and cannot be edited.");
            setFetching(false);
            return;
          }

          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            readTime: data.readTime || "",
            expertTip: data.expertTip || "",
            content: data.content || "",
            takeaways: data.takeaways ? data.takeaways.join("\n") : "",
          });
          setPreview(data.image || "");
          setError("");
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || "Failed to load blog details.");
        } finally {
          setFetching(false);
        }
      };

      fetchBlogDetails();
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      toast.success("Cover image compressed successfully!");
    } catch (err) {
      console.error("Compression failed:", err);
      toast.error("Failed to compress cover image.");
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
    if (!formData.content.trim()) {
      toast.error("Content is required.");
      return;
    }
    if (!id && !image) {
      toast.error("Please upload a featured image.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("readTime", formData.readTime);
      data.append("expertTip", formData.expertTip);
      data.append("takeaways", formData.takeaways);

      if (image) {
        data.append("image", image);
      }

      if (id) {
        await API.put(`/blogs/${id}`, data);
      } else {
        await API.post("/blogs", data);
      }

      toast.success(
        id
          ? "Blog updated successfully! Saved as pending review."
          : "Blog submitted successfully! Awaiting admin review."
      );
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Access Denied</h2>
        <p className="text-slate-550 mb-6">{error}</p>
        <button
          onClick={() => navigate("/profile")}
          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 font-bold text-white shadow shadow-green-500/20"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  return (
    <PageTransition>
      <SEO
        title={id ? "Edit Blog | FitFlowAI" : "Publish Blog | FitFlowAI"}
        description="Share your health and fitness knowledge with the community."
      />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Back button */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-550 hover:text-slate-800 dark:text-slate-450 dark:hover:text-white mb-6 transition"
          >
            <FaArrowLeft /> Back to Profile
          </button>

          {/* Form Header */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {id ? "Edit Blog" : "Publish Blog"}
            </h1>
            <p className="text-slate-550 dark:text-slate-455 mt-2">
              {id
                ? "Modify your article fields. Edits to rejected blogs will reset status to pending for review."
                : "Submit an article to share with the community. It will appear on the platform once approved by an Admin."}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-900/40 dark:bg-slate-950/65 p-6 sm:p-8 shadow-xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Title */}
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-350 bg-slate-50/50 px-4 py-3 transition duration-305 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-850 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
              />

              {/* Premium Category Custom Dropdown */}
              <div ref={categoryRef} className="relative">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-350 bg-slate-50/50 px-4 py-3.5 transition duration-305 outline-none hover:border-green-400 hover:bg-white hover:shadow-md focus:border-green-500 focus:bg-white dark:border-slate-850 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-955"
                >
                  <span className={formData.category ? "font-semibold text-slate-800 dark:text-white" : "text-slate-400"}>
                    {formData.category
                      ? categoriesList.find((item) => item.value === formData.category)?.icon + " " + formData.category
                      : "📂 Select Category"}
                  </span>
                  <span className={`text-xs text-green-600 transition duration-300 ${showCategories ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {showCategories && (
                  <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-205 dark:border-slate-800 dark:bg-slate-950">
                    <div className="border-b p-3 dark:border-slate-800">
                      <input
                        type="text"
                        placeholder="🔍 Search category..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {categoriesList
                        .filter((item) => item.value.toLowerCase().includes(categorySearch.toLowerCase()))
                        .map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, category: item.value });
                              setShowCategories(false);
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition hover:bg-green-50 dark:hover:bg-slate-900 dark:text-white"
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
              {/* Read Time */}
              <input
                type="text"
                name="readTime"
                placeholder="Read Time (e.g. 5 min read)"
                value={formData.readTime}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-350 bg-slate-50/55 px-4 py-3 transition duration-305 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-850 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
              />
            </div>

            {/* Description */}
            <textarea
              rows={3}
              name="description"
              placeholder="Short Description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-350 bg-slate-50/50 p-4 transition duration-305 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-850 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-955"
            />

            {/* Content Editor */}
            <div>
              <label className="mb-2 block font-semibold text-slate-750 dark:text-slate-200">
                Blog Content (Rich Text)
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(html) =>
                  setFormData((prev) => ({ ...prev, content: html }))
                }
              />
            </div>

            {/* Side-by-side components */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Expert Tip */}
              <textarea
                rows={4}
                name="expertTip"
                placeholder="Expert Tip"
                value={formData.expertTip}
                onChange={handleChange}
                disabled={loading}
                className="rounded-xl border border-slate-350 bg-slate-50/50 p-4 transition duration-305 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-850 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
              />

              {/* Takeaways */}
              <textarea
                rows={4}
                name="takeaways"
                placeholder="Key Takeaways (one per line)"
                value={formData.takeaways}
                onChange={handleChange}
                disabled={loading}
                className="rounded-xl border border-slate-355 bg-slate-50/50 p-4 transition duration-305 outline-none hover:border-green-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-slate-850 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="mb-2 block font-semibold text-slate-750 dark:text-slate-200">
                Featured Cover Image
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-350 bg-slate-50/50 py-10 transition duration-305 hover:border-green-500 hover:bg-green-50/10">
                <FaCloudUploadAlt className="mb-4 text-5xl text-green-500" />
                <p className="font-bold">
                  {image ? image.name : "Click to Upload Cover Image"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  PNG • JPG • WEBP (auto-compressed on select)
                </p>
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
                <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-900 overflow-hidden max-h-[300px] flex justify-center bg-slate-100 dark:bg-slate-900">
                  <img
                    src={preview}
                    alt="Cover Preview"
                    className="object-contain max-h-[300px]"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 border-t border-slate-150 dark:border-slate-900 gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-bold text-slate-950 transition hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-500/10 hover:shadow-lg disabled:opacity-50"
              >
                {id ? <FaSave /> : <FaPaperPlane />}
                {loading ? "Processing..." : id ? "Update Blog" : "Submit Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default PublishBlog;
