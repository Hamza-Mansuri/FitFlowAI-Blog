import Hero from "../components/common/Hero";
import SearchBar from "../components/common/SearchBar";
import CategoryList from "../components/common/CategoryList";

import FeaturedBlog from "../components/blog/FeaturedBlog";
import TrendingBlogs from "../components/blog/TrendingBlogs";

import Newsletter from "../components/common/Newsletter";
import Footer from "../components/layout/Footer";

//import blogs from "../data/blogs";

import Stats from "../components/common/Stats";

import API from "../services/api";

import { useEffect, useState } from "react";

import { getBlogs } from "../services/blogService";

import SEO from "../components/common/SEO";

import { SITE_URL } from "../config/site";


function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/blogs");
        setBlogs(data);
      } catch (error) {
        console.error(error);
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

  {/* Existing page content */}

      <Hero />

      <FeaturedBlog />

      <Stats />

      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      

      

      <TrendingBlogs blogs={filteredBlogs} />

      <Newsletter />

      <Footer />
    </>
  );
}

export default Home;
