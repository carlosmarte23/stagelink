import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `nav__link ${isActive ? "nav__link--active" : ""}`;

export default function AppLayout({ children }) {
  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="brand">
            StageLink
          </Link>
          <nav className="nav">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              Cart
            </NavLink>
            <NavLink to="/my-tickets" className={navLinkClass}>
              My Tickets
            </NavLink>
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
