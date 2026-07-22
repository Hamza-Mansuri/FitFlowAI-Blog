import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/common/Hero";
import AboutSection from "../components/common/AboutSection";
import SearchBar from "../components/common/SearchBar";
import CategoryList from "../components/common/CategoryList";
import ClientReviews from "../components/common/ClientReviews";
import TrendingBlogs from "../components/blog/TrendingBlogs";
import FinalCTA from "../components/common/FinalCTA";
import Footer from "../components/layout/Footer";
import API from "../services/api";
import SEO from "../components/common/SEO";
import { SITE_URL } from "../config/site";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/common/PageTransition";
import LusionVideoSection from "../components/common/LusionVideoSection";
import FeaturedBlogsCuberto from "../components/common/FeaturedBlogsCuberto";
import AstronautFooterAnimation from "../components/common/AstronautFooterAnimation";


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

      <div className="relative bg-slate-950 min-h-screen overflow-hidden">
        <div className="relative z-10 space-y-6 md:space-y-8 pb-8">
          <Hero />
          <LusionVideoSection />
          <AboutSection />

          <div className="relative z-10">
            <ClientReviews />
          </div>

          <FeaturedBlogsCuberto />

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

          <AstronautFooterAnimation />
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
