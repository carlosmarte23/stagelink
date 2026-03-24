import styles from "./PublicFooter.module.css";

export default function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <small>&copy; 2026 StageLink. Built as a portfolio project.</small>
      </div>
    </footer>
  );
}
