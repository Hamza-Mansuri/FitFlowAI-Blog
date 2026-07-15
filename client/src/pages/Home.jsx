import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/common/Hero";
import SearchBar from "../components/common/SearchBar";
import CategoryList from "../components/common/CategoryList";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import TrendingBlogs from "../components/blog/TrendingBlogs";
import Newsletter from "../components/common/Newsletter";
import Footer from "../components/layout/Footer";
import Stats from "../components/common/Stats";
import API from "../services/api";
import SEO from "../components/common/SEO";
import { SITE_URL } from "../config/site";
import { useAuth } from "../context/AuthContext";

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
    <>
      <SEO
        title="FitFlowAI | Fitness Blogs & Nutrition Guides"
        description="Read expert fitness articles, workout guides, nutrition tips and healthy lifestyle blogs."
        url={SITE_URL}
      />

      <div className="bg-slate-50 transition-colors duration-300 dark:bg-slate-900 min-h-screen">
        <Hero />
        <FeaturedBlog />
        <Stats />
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={handleSetCategory}
        />
        <SearchBar
          search={search}
          setSearch={handleSetSearch}
        />
        <TrendingBlogs blogs={filteredBlogs} loading={loading} />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default Home;
