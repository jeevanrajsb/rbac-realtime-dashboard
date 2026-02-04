import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ViewerDashboard() {
  const [users, setUsers] = useState([]);

  // REAL-TIME USERS (READ-ONLY)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), snap => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div style={page.page}>
      <div style={page.content}>

        {/* HEADER */}
        <div style={page.header}>
          <h2>Viewer Dashboard</h2>
        </div>

        {/* USERS TABLE */}
        <div style={page.card}>
          <table style={page.table}>
            <thead>
              <tr style={page.tableHeaderRow}>
                <th style={page.th}>Name</th>
                <th style={page.th}>Phone</th>
                <th style={page.th}>Credits</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u.id}
                  style={{
                    ...page.tr,
                    backgroundColor:
                      index % 2 === 0 ? "#ffffff" : "#f6f7f9"
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.background = "#eef2ff")
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.background =
                      index % 2 === 0 ? "#ffffff" : "#f6f7f9")
                  }
                >
                  <td style={page.td}>{u.name}</td>
                  <td style={page.td}>{u.phone}</td>
                  <td style={page.td}>{u.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              No users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const page = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    background: "#f4f6fb",
    paddingTop: "30px"
  },

  content: {
    width: "100%",
    maxWidth: "900px"
  },

  header: {
    marginBottom: "20px"
  },

  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    fontSize: "14px"
  },

  tableHeaderRow: {
    background: "#eceff4"
  },

  th: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "1px solid #ddd"
  },

  tr: {
    transition: "background 0.2s ease"
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle"
  }
};
