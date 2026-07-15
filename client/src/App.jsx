import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
// import ScrollToTop from "./components/common/ScrollToTop";

import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Navbar />
      <AppRoutes />
      
    </>
  );
}

export default App;