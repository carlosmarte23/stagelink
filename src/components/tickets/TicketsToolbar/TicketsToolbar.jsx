import { CalendarArrowDown, CalendarArrowUp, Search } from "lucide-react";
import { TICKET_DATE_GROUPS } from "../../../features/tickets/lib/ticketWallet.js";
import styles from "./TicketsToolbar.module.css";

export default function TicketsToolbar({
  searchQuery,
  onSearchQueryChange,
  activeTab,
  onActiveTabChange,
  sortDirection,
  onSortDirectionChange,
}) {
  const ticketTabs = [
    { id: TICKET_DATE_GROUPS.UPCOMING, label: "Upcoming" },
    { id: TICKET_DATE_GROUPS.PAST, label: "Past" },
  ];
  const isSortAscending = sortDirection === "asc";

  function handleSearchQueryChange(value) {
    onSearchQueryChange(value);
  }

  function handleActiveTabChange(value) {
    onActiveTabChange(value);
  }

  function handleSortDirectionChange(value) {
    onSortDirectionChange(value);
  }

  const nextSortDirection = isSortAscending ? "desc" : "asc";
  const sortLabel = isSortAscending ? "Oldest first" : "Newest first";
  const sortActionLabel = isSortAscending
    ? "Sort by newest tickets first"
    : "Sort by oldest tickets first";

  return (
    <div className={styles.toolbar}>
      <label className={styles.searchField}>
        <Search aria-hidden="true" className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Search artist, venue or Id"
          aria-label="Search tickets"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => handleSearchQueryChange("")}
          >
            x
          </button>
        )}
      </label>

      <div
        className={styles.tabs}
        role="group"
        aria-label="Ticket segment date filter"
      >
        <span
          className={`${styles.activeBackground} ${activeTab === TICKET_DATE_GROUPS.PAST ? styles.moveRight : ""}`}
          aria-hidden="true"
        />
        {ticketTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ""}`}
            aria-pressed={activeTab === tab.id}
            onClick={() => handleActiveTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.sortButton}
        title={sortActionLabel}
        aria-label={sortActionLabel}
        onClick={() => handleSortDirectionChange(nextSortDirection)}
      >
        {isSortAscending ? (
          <CalendarArrowDown aria-hidden="true" />
        ) : (
          <CalendarArrowUp aria-hidden="true" />
        )}
        <span className={styles.sortLabel}>{sortLabel}</span>
      </button>
    </div>
  );
}
