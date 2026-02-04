import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // SAFE reads
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role");
  const photo = sessionStorage.getItem("photo");

  const isLoggedIn = !!email;

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h2 style={styles.logo}>RBAC Dashboard</h2>

        {isLoggedIn && (
          <div style={styles.userArea}>
            <span style={styles.userText}>
              {email} ({role})
            </span>

            {/* Avatar ONLY if photo exists */}
            {photo && (
              <div style={styles.avatarWrapper}>
                <img
                  src={photo}
                  alt="avatar"
                  style={styles.avatar}
                  onClick={() => setOpen(!open)}
                />

                {open && (
                  <div style={styles.dropdown}>
                    <button onClick={logout} style={styles.logoutBtn}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    background: "#667eea",
    padding: "14px 0"
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff"
  },
  logo: { margin: 0 },
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  userText: {
    fontSize: "14px"
  },
  avatarWrapper: {
    position: "relative"
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "2px solid white",
    cursor: "pointer"
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "46px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
  },
  logoutBtn: {
    padding: "10px 16px",
    background: "none",
    border: "none",
    cursor: "pointer"
  }
};
