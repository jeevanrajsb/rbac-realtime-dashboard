export default function Footer() {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} RBAC Realtime App
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "12px 0",
    background: "#f1f1f1",
    color: "#555"
  }
};
