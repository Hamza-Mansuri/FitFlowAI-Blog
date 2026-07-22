import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ScrollTopButton from "./components/common/ScrollTopButton";
import AIButton from "./components/ai/AIButton";
import ScrollToTop from "./components/common/ScrollToTop";
import CustomCursor from "./components/common/CustomCursor";

function App() {
  const location = useLocation();
  const isBleedRoute = location.pathname === "/" || location.pathname === "/landing";

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <div className={isBleedRoute ? "" : "pt-24 sm:pt-28"}>
        <AppRoutes />
      </div>
      <ScrollTopButton />
      <AIButton />
    </>
  );
}

export default App;