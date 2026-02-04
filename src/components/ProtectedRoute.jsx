import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRole, children }) {
  const role = sessionStorage.getItem("role");

  // Not logged in
  if (!role) {
    return <Navigate to="/" replace />;
  }
  // Logged in but wrong role → redirect to own dashboard
  if (role !== allowedRole ) {
    return <Navigate to={`/${role}`} replace />;
  }
  
  return children;
}
