import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/common/Hero";
import SearchBar from "../components/common/SearchBar";
import CategoryList from "../components/common/CategoryList";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import Testimonials from "../components/common/Testimonials";
import TrendingBlogs from "../components/blog/TrendingBlogs";
import FinalCTA from "../components/common/FinalCTA";
import Newsletter from "../components/common/Newsletter";
import Footer from "../components/layout/Footer";
import Stats from "../components/common/Stats";
import API from "../services/api";
import SEO from "../components/common/SEO";
import { SITE_URL } from "../config/site";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/common/PageTransition";
import GlowBackground from "../components/common/GlowBackground";

function Home() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [loading, setLoading] = useState(true);

  // Sync state when search parameters change (e.g. from Navbar searches)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const handleSetSearch = (val) => {
    setSearch(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set("search", val);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleSetCategory = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat && cat !== "All") {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      blog.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/blogs");
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <PageTransition>
      <SEO
        title="FitFlowAI | Fitness Blogs & Nutrition Guides"
        description="Read expert fitness articles, workout guides, nutrition tips and healthy lifestyle blogs."
        url={SITE_URL}
      />

      <div className="relative bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] min-h-screen overflow-hidden">
        {/* Animated background glows */}
        <GlowBackground />

        <div className="relative z-10 space-y-10 md:space-y-14 pb-12">
          <Hero />
          
          <div className="relative z-10">
            <FeaturedBlog blogs={blogs} />
          </div>

          <div className="relative z-10">
            <Testimonials />
          </div>

          <div className="relative z-10">
            <Stats />
          </div>

          <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <CategoryList
              selectedCategory={selectedCategory}
              setSelectedCategory={handleSetCategory}
            />
            <SearchBar
              search={search}
              setSearch={handleSetSearch}
            />
          </div>

          <div className="relative z-10">
            <TrendingBlogs blogs={filteredBlogs} loading={loading} />
          </div>

          <div className="relative z-10">
            <FinalCTA />
          </div>

          <div className="relative z-10">
            <Newsletter />
          </div>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
