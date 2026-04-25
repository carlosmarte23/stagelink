import { ChevronLeft, ChevronRight } from "lucide-react";

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
        disabled={currentPage === 1}
        className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ""}`}
        aria-label="Previous Page"
      >
        <ChevronLeft />
      </button>

      <div className={styles.pages}>
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
            onClick={(e) => handlePageClick(e, page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={
              page === currentPage
                ? `Page ${page}, current page`
                : `Go to page ${page}`
            }
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${styles.navButton} ${currentPage === totalPages ? styles.disabled : ""}`}
        aria-label="Next Page"
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
