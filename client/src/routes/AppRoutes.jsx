import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Categories from "../pages/Categories";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Landing from "../pages/Landing";

import AdminDashboard from "../pages/AdminDashboard";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import PublishBlog from "../pages/PublishBlog";
import AuthorPage from "../pages/AuthorPage";
import WorkoutHistory from "../pages/WorkoutHistory";
import WorkoutBuilder from "../pages/WorkoutBuilder";
import WorkoutDetails from "../pages/WorkoutDetails";
import NutritionHistory from "../pages/NutritionHistory";
import NutritionPlanner from "../pages/NutritionPlanner";
import NutritionDetails from "../pages/NutritionDetails";
import DailyCheckIn from "../pages/DailyCheckIn";
import WeeklySummary from "../pages/WeeklySummary";
import MonthlySummary from "../pages/MonthlySummary";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";
import WeeklyReport from "../pages/WeeklyReport";
import MonthlyReport from "../pages/MonthlyReport";
import AICoachWorkspace from "../pages/AICoachWorkspace";

import ProtectedRoute from "../components/common/ProtectedRoute";

const UserRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/author/:authorId" element={<AuthorPage />} />

      {/* Auth Redirects */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" replace /> : <Signup />}
      />

      {/* Logged-in User Routes */}
      <Route
        path="/profile"
        element={
          <UserRoute>
            <Profile />
          </UserRoute>
        }
      />
      <Route
        path="/publish"
        element={
          <UserRoute>
            <PublishBlog />
          </UserRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <UserRoute>
            <PublishBlog />
          </UserRoute>
        }
      />

      <Route
        path="/workouts"
        element={
          <UserRoute>
            <WorkoutHistory />
          </UserRoute>
        }
      />
      <Route
        path="/workouts/build"
        element={
          <UserRoute>
            <WorkoutBuilder />
          </UserRoute>
        }
      />
      <Route
        path="/workouts/:id"
        element={
          <UserRoute>
            <WorkoutDetails />
          </UserRoute>
        }
      />

      <Route
        path="/nutrition"
        element={
          <UserRoute>
            <NutritionHistory />
          </UserRoute>
        }
      />
      <Route
        path="/nutrition/build"
        element={
          <UserRoute>
            <NutritionPlanner />
          </UserRoute>
        }
      />
      <Route
        path="/nutrition/:id"
        element={
          <UserRoute>
            <NutritionDetails />
          </UserRoute>
        }
      />

      <Route
        path="/checkin"
        element={
          <UserRoute>
            <DailyCheckIn />
          </UserRoute>
        }
      />
      <Route
        path="/checkin/weekly"
        element={
          <UserRoute>
            <WeeklySummary />
          </UserRoute>
        }
      />
      <Route
        path="/checkin/monthly"
        element={
          <UserRoute>
            <MonthlySummary />
          </UserRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <UserRoute>
            <AnalyticsDashboard />
          </UserRoute>
        }
      />
      <Route
        path="/analytics/weekly"
        element={
          <UserRoute>
            <WeeklyReport />
          </UserRoute>
        }
      />
      <Route
        path="/analytics/monthly"
        element={
          <UserRoute>
            <MonthlyReport />
          </UserRoute>
        }
      />

      <Route
        path="/ai-coach"
        element={
          <UserRoute>
            <AICoachWorkspace />
          </UserRoute>
        }
      />

      {/* Admin Protected Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;