import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ScrollTopButton from "./components/common/ScrollTopButton";
import AIButton from "./components/ai/AIButton";

function App() {
  const location = useLocation();
  const isBleedRoute = location.pathname === "/" || location.pathname === "/landing";

  return (
    <>
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