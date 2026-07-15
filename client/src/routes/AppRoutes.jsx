import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Categories from "../pages/Categories";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";

import AdminDashboard from "../pages/AdminDashboard";

import AdminLogin from "../pages/AdminLogin";

import ProtectedRoute from "../components/common/ProtectedRoute";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      
    </Routes>
  );
}

export default AppRoutes;