import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  // FaClock,
  // FaCalendarAlt,
  // FaUser,
  // FaLightbulb,
  // FaCheckCircle,
} from "react-icons/fa";

import { useEffect, useState, useRef } from "react";

//import blogs from "../data/blogs";
import Container from "../components/layout/Container";

// import axios from "axios";

import BlogHero from "../components/blog/BlogHero";

import ExpertTipCard from "../components/blog/ExpertTipCard";

import TakeawayCard from "../components/blog/TakeawayCard";

import ShareButtons from "../components/blog/ShareButtons";

import SEO from "../components/common/SEO";

import { SITE_URL } from "../config/site";

import API from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
  const fetchBlog = async () => {

  try {

    // Increase view count only once per blog ID session
    if (hasIncremented.current !== id) {
      hasIncremented.current = id;
      await API.patch(`/blogs/${id}/view`);
    }

    // Get updated blog

    const res = await API.get(`/blogs/${id}`);

    setBlog(res.data);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } catch (error) {
    console.error(error);
  }

};

  fetchBlog();
}, [id]);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [id]);

  if (!blog) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Article Not Found
        </h2>

        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Back Home
        </Link>
      </div>
    );
  }

  return (

    <>

      <SEO
        title={`${blog.title} | FitFlowAI`}
        description={blog.description}
        image={blog.image}
        url={`${SITE_URL}/blog/${blog._id}`}
      />

      {/* Reading Progress Bar */}
      <div 
        className="fixed left-0 top-[64px] z-50 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

            <section className="py-8">
        <Container>
          {/* Hero Image */}

          <BlogHero blog={blog} />

          {/* Content */}

        <article
          className="
            prose
            prose-lg
            prose-slate
            max-w-4xl
            mx-auto
            mt-12
            dark:prose-invert

            prose-headings:text-slate-900
            prose-headings:font-bold
            dark:prose-headings:text-white

            prose-p:text-slate-700
            prose-p:leading-8
            dark:prose-p:text-slate-350

            prose-li:text-slate-700
            dark:prose-li:text-slate-350
            prose-strong:text-slate-900
            dark:prose-strong:text-white

            prose-a:text-green-600
            prose-a:no-underline
            hover:prose-a:underline
            dark:prose-a:text-green-400

            prose-img:rounded-2xl
            prose-img:shadow-lg

            prose-blockquote:border-green-500
            dark:prose-blockquote:border-green-400
          "
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />

          {/* Expert Tip */}

          <ExpertTipCard tip={blog.expertTip} />

          {/* Takeaways */}

          <TakeawayCard takeaways={blog.takeaways} />

          {/* Share Buttons */}

          <ShareButtons
            blog={blog}
          />

          {/* Back */}

          <div className="mx-auto mt-14 max-w-4xl">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <FaArrowLeft />
              Back to Articles
            </Link>
          </div>
        </Container>
      </section>

    </>
  );
}

export default BlogDetails;