import { Link, NavLink } from "react-router-dom";
import logoIcon from "../../../assets/branding/stagelink-logo.png";
import styles from "../header/PublicHeader.module.css";

export default function PublicHeader() {
  const navLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <Link
            to="/"
            className={styles.brandLink}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={logoIcon}
              alt=""
              className={styles.icon}
              aria-hidden="true"
            />

            <span className={styles.text}>StageLink</span>
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Primary navigation">
          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>

          <NavLink to="/my-tickets" className={navLinkClass}>
            My Tickets
          </NavLink>
        </nav>
        <div className={styles.actions}>
          <Link to="/login" className={`${styles.cta} button `}>
            Login
          </Link>
        </div>
        <div className={styles.menuToggle}>
          <button type="button">Mobile Button Toggle</button>
        </div>
      </div>
    </header>
  );
}
