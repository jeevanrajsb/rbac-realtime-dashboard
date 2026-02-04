import { useEffect, useState, useCallback, memo } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";

/* ===================== MEMOIZED ROW ===================== */
const UserRow = memo(function UserRow({
  user,
  index,
  onEdit,
  onDelete
}) {
  return (
    <tr
      style={{
        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f6f7f9"
      }}
      onMouseEnter={e =>
        (e.currentTarget.style.background = "#eef2ff")
      }
      onMouseLeave={e =>
        (e.currentTarget.style.background =
          index % 2 === 0 ? "#ffffff" : "#f6f7f9")
      }
    >
      <td style={page.td}>{user.name}</td>
      <td style={page.td}>{user.phone}</td>
      <td style={page.td}>{user.credits}</td>
      <td style={page.td}>
        <div style={styles.actionGroup}>
          <button
            onClick={() => onEdit(user)}
            style={styles.editBtn}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            style={styles.deleteBtn}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
});

/* ===================== DASHBOARD ===================== */
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    credits: ""
  });
  const [editingUser, setEditingUser] = useState(null);

  // Loading states → prevent UI blocking
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  /* REAL-TIME LISTENER (already optimal) */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), snap => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  /*  ADD USER (NON-BLOCKING) */
  const addUser = useCallback(async () => {
    if (!newUser.name || !newUser.phone || newUser.credits === "") {
      alert("All fields required");
      return;
    }

    setAdding(true);
    await addDoc(collection(db, "users"), {
      name: newUser.name,
      phone: newUser.phone,
      credits: Number(newUser.credits)
    });
    setAdding(false);

    setNewUser({ name: "", phone: "", credits: "" });
  }, [newUser]);

  /* DELETE USER */
  const deleteUser = useCallback(async id => {
    if (!window.confirm("Delete this user?")) return;

    setDeletingId(id);
    await deleteDoc(doc(db, "users", id));
    setDeletingId(null);
  }, []);

  /* SAVE EDIT */
  const saveEdit = useCallback(async () => {
    setSaving(true);
    await updateDoc(doc(db, "users", editingUser.id), {
      name: editingUser.name,
      phone: editingUser.phone,
      credits: Number(editingUser.credits)
    });
    setSaving(false);
    setEditingUser(null);
  }, [editingUser]);

  return (
    <div style={page.page}>
      <div style={page.content}>
        <div style={page.header}>
          <h2>Admin Dashboard</h2>
        </div>

        {/* ADD USER */}
        <div style={page.card}>
          <h3>Add User</h3>

          <input
            style={page.input}
            placeholder="Name"
            value={newUser.name}
            onChange={e =>
              setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <input
            style={page.input}
            placeholder="Phone"
            value={newUser.phone}
            onChange={e =>
              setNewUser({ ...newUser, phone: e.target.value })
            }
          />
          <input
            style={page.input}
            type="number"
            placeholder="Credits"
            value={newUser.credits}
            onChange={e =>
              setNewUser({ ...newUser, credits: e.target.value })
            }
          />

          <button
            onClick={addUser}
            style={page.addBtn}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add User"}
          </button>
        </div>

        {/* USERS TABLE */}
        <div style={page.card}>
          <table style={page.table}>
            <thead>
              <tr style={page.tableHeaderRow}>
                <th style={page.th}>Name</th>
                <th style={page.th}>Phone</th>
                <th style={page.th}>Credits</th>
                <th style={page.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <UserRow
                  key={u.id}
                  user={u}
                  index={index}
                  onEdit={setEditingUser}
                  onDelete={deleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingUser && (
        <div style={modal.overlay}>
          <div style={modal.box}>
            <h3>Edit User</h3>

            <input
              style={modal.input}
              value={editingUser.name}
              onChange={e =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            <input
              style={modal.input}
              value={editingUser.phone}
              onChange={e =>
                setEditingUser({ ...editingUser, phone: e.target.value })
              }
            />
            <input
              style={modal.input}
              type="number"
              value={editingUser.credits}
              onChange={e =>
                setEditingUser({
                  ...editingUser,
                  credits: e.target.value
                })
              }
            />

            <div style={modal.actions}>
              <button
                style={modal.cancel}
                onClick={() => setEditingUser(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                style={modal.save}
                onClick={saveEdit}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
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
    marginBottom: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  addBtn: {
    background: "#667eea",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
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

const styles = {
  actionGroup: {
    display: "flex",
    gap: "8px",
    justifyContent: "center"
  },
  editBtn: {
    background: "#667eea",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

const modal = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  box: {
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    width: "360px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px"
  },
  cancel: {
    background: "#ccc",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  save: {
    background: "#667eea",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
