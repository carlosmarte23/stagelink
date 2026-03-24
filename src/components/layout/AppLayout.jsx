import PublicHeader from "./PublicHeader/PublicHeader.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="app">
      <PublicHeader />
      <main className="main">{children}</main>

      <footer className="footer">
        <div className="container footer__inner">
          <small>&copy; 2026 StageLink (Portfolio project)</small>
        </div>
      </footer>
    </div>
  );
}
