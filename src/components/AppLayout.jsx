export default function AppLayout({ children }) {
  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <span className="brand">StageLink</span>
          <nav className="nav">
            {/* placeholder: no real links yet */}
            <span>Cart</span>
            <span>My Tickets</span>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">{children}</div>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <small>&copy; 2026 StageLink (Portfolio project)</small>
        </div>
      </footer>
    </div>
  );
}
