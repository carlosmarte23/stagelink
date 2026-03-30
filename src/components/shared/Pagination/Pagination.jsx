import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (e, page) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    onPageChange(page);
  };

  const handlePrevious = (e) => {
    if (currentPage === 1) return;
    handlePageClick(e, currentPage - 1);
  };

  const handleNext = (e) => {
    if (currentPage === totalPages) return;
    handlePageClick(e, currentPage + 1);
  };

  return (
    <nav className={styles.pagination} aria-label="Events Pagination">
      <button
        type="button"
        onClick={handlePrevious}
        className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ""}`}
        aria-label="Previous Page"
      >
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
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
            onClick={(e) => handlePageClick(e, page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleNext}
        className={`${styles.navButton} ${currentPage === totalPages ? styles.disabled : ""}`}
        aria-label="Next Page"
      >
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
