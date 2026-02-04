import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      setLoading(true);
      setError("");
      sessionStorage.clear();

      const result = await signInWithPopup(auth, provider);
      const email = result.user.email.toLowerCase().trim();

      const rolesSnap = await getDoc(doc(db, "roles", "config"));
      if (!rolesSnap.exists()) throw new Error("Roles config missing");

      const roles = rolesSnap.data();

      let role = "viewer";
      if (
        Array.isArray(roles.admin) &&
        roles.admin.map(e => e.toLowerCase().trim()).includes(email)
      ) {
        role = "admin";
      }

      sessionStorage.setItem("email", email);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("photo", result.user.photoURL);

      navigate(role === "admin" ? "/admin" : "/viewer");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>RBAC Dashboard</h1>
        <p style={styles.sub}>Sign in to continue</p>

        {error && <p style={styles.error}>{error}</p>}

        <button
          onClick={login}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "18px",
    width: "360px",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
  },
  title: {
    marginBottom: "6px"
  },
  sub: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "24px"
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer"
  },
  error: {
    color: "#e53e3e",
    fontSize: "13px",
    marginBottom: "12px"
  }
};
