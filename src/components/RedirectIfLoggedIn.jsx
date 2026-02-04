import { Navigate } from "react-router-dom";

export default function RedirectIfLoggedIn({ children }) {
  const role = sessionStorage.getItem("role");

  // Already logged in → go to dashboard
  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "viewer") {
    return <Navigate to="/viewer" replace />;
  }

  // Not logged in → allow login page
  return children;
}
