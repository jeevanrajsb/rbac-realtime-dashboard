import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main style={styles.main}>
        <Routes>
          {/* 🚫 BLOCK LOGIN IF ALREADY LOGGED IN */}
          <Route
            path="/"
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewer"
            element={
              <ProtectedRoute allowedRole="viewer">
                <ViewerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

const styles = {
  main: {
    minHeight: "calc(100vh - 120px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};
