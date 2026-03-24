import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logoIcon from "../../../assets/branding/stagelink-logo.png";
import styles from "../header/PublicHeader.module.css";

export default function PublicHeader() {
  const navLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`;

  const navItems = [
    { to: "/events", label: "Events" },
    { to: "/my-tickets", label: "My Tickets" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleLogoClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isMenuOpen) {
      handleCloseMenu();
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLink} onClick={handleLogoClick}>
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
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions}>
          <Link to="/login" className={`${styles.cta} button `}>
            Login
          </Link>
        </div>
        <div className={styles.menuToggle}>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={handleToggleMenu}
            className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ""}`}
          >
            <span className={styles.buttonLine}></span>
            <span className={styles.buttonLine}></span>
            <span className={styles.buttonLine}></span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass + " " + styles.mobileNavLink}
              onClick={handleCloseMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <Link to="/login" className={`button ${styles.cta}`}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
