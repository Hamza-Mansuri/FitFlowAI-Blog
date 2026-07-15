import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;