import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Container from "../components/layout/Container";
import BlogHero from "../components/blog/BlogHero";
import ExpertTipCard from "../components/blog/ExpertTipCard";
import TakeawayCard from "../components/blog/TakeawayCard";
import ShareButtons from "../components/blog/ShareButtons";
import SEO from "../components/common/SEO";
import { SITE_URL } from "../config/site";
import API from "../services/api";
import PageTransition from "../components/common/PageTransition";
import GlowBackground from "../components/common/GlowBackground";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import BlogDetailsSkeleton from "../components/blog/BlogDetailsSkeleton";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasIncremented = useRef(null);

  useEffect(() => {
    setBlog(null);

    const fetchBlog = async () => {
      try {
        if (hasIncremented.current !== id) {
          hasIncremented.current = id;
          await API.patch(`/blogs/${id}/view`);
        }

        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
        setLikesCount(res.data.likesCount || 0);

        if (user) {
          const userId = user.id || user._id;
          setLiked(res.data.likes?.includes(userId));
          setSaved(res.data.saves?.includes(userId));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [id, user]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const res = await API.post(`/blogs/${id}/like`);
      setLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const res = await API.post(`/blogs/${id}/save`);
      setSaved(res.data.saved);
    } catch (error) {
      console.error("Failed to toggle save", error);
    }
  };

  if (!blog) {
    return <BlogDetailsSkeleton />;
  }

  return (
    <PageTransition>
      <SEO
        title={`${blog.title} | FitFlowAI`}
        description={blog.description}
        image={blog.image}
        url={`${SITE_URL}/blog/${blog._id}`}
      />

      {/* Reading Progress Bar */}
      <div
        className="fixed left-0 top-[64px] z-50 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-75 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="relative bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] min-h-screen overflow-hidden pb-16">
        {/* Animated background glows */}
        <GlowBackground />

        <section className="relative z-10 py-10">
          <Container>
            {/* Hero Header with Actions */}
            <BlogHero
              blog={blog}
              liked={liked}
              saved={saved}
              likesCount={likesCount}
              onLike={handleLike}
              onSave={handleSave}
            />

            {/* Content Container */}
            <div className="relative max-w-4xl mx-auto mt-12 px-2 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <article
                  className="
                  prose
                  prose-lg
                  prose-slate
                  max-w-none
                  dark:prose-invert

                  prose-headings:text-slate-900
                  prose-headings:font-bold
                  dark:prose-headings:text-white

                  prose-p:text-slate-700
                  prose-p:leading-8
                  dark:prose-p:text-slate-300

                  prose-li:text-slate-750
                  dark:prose-li:text-slate-300
                  prose-strong:text-slate-900
                  dark:prose-strong:text-white

                  prose-a:text-green-600
                  prose-a:no-underline
                  hover:prose-a:underline
                  dark:prose-a:text-green-400

                  prose-img:rounded-3xl
                  prose-img:shadow-xl

                  prose-blockquote:border-green-500
                  dark:prose-blockquote:border-green-400
                "
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                />
              </motion.div>

              {/* Cards wrapped in premium container spacing */}
              <div className="mt-12 space-y-6">
                <ExpertTipCard tip={blog.expertTip} />
                <TakeawayCard takeaways={blog.takeaways} />
              </div>

              {/* Share Buttons */}
              <div className="mt-10 border-t border-slate-200/60 dark:border-slate-800/40 pt-8">
                <ShareButtons blog={blog} />
              </div>

              {/* Back Link */}
              <div className="mt-12">
                <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3.5 font-bold text-white transition hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-500/10 hover:shadow-lg"
                  >
                    <FaArrowLeft />
                    Back to Articles
                  </Link>
                </motion.div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </PageTransition>
  );
}

export default BlogDetails;