import styles from "./Pagination.module.css";

export default function Pagination() {
  return (
    <nav className={styles.pagination} aria-label="Events Pagination">
      <button className={styles.navButton} aria-label="Previous Page">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>

      <div className={styles.pages}>
        <button
          type="button"
          className={`${styles.pageButton} ${styles.active}`}
        >
          1
        </button>
        <button type="button" className={styles.pageButton}>
          2
        </button>
        <button type="button" className={styles.pageButton}>
          3
        </button>
        <span className={styles.ellipsis}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        </span>
        <button type="button" className={styles.pageButton}>
          8
        </button>
      </div>
      <button className={styles.navButton} aria-label="Next Page">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
    </nav>
  );
}
