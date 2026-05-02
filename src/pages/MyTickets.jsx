import { useState } from "react";

import { TICKET_DATE_GROUPS } from "../features/tickets/lib/ticketWallet.js";
import { getTickets } from "../features/tickets/lib/ticketStorage.js";
import { getVisibleTickets } from "../features/tickets/lib/ticketWallet.js";

import EmptyTicketList from "../components/tickets/EmptyTicketList/EmptyTicketList.jsx";
import TicketsToolbar from "../components/tickets/TicketsToolbar/TicketsToolbar.jsx";
import TicketList from "../components/tickets/TicketList/TicketList.jsx";
import TicketModal from "../components/tickets/TicketModal/TicketModal.jsx";

import styles from "./MyTickets.module.css";
import { Link } from "react-router-dom";

export default function MyTickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(TICKET_DATE_GROUPS.UPCOMING);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = getTickets();
  const isEmpty = tickets.length === 0;

  const visibleTickets = getVisibleTickets({
    tickets,
    activeTab,
    searchQuery,
    sortOrder: sortDirection,
  });

  function handleSearchQueryChange(value) {
    setSearchQuery(value);
  }

  function handleActiveTabChange(value) {
    setActiveTab(value);
  }

  function handleSortDirectionChange(value) {
    setSortDirection(value);
  }

  function handleViewTicketModal(ticket) {
    setSelectedTicket(ticket);
  }

  function handleCloseModal() {
    setSelectedTicket(null);
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>My Tickets</h1>
        <p className={styles.pageDescription}>
          Access and manage your digital event passes.
        </p>
        {!isEmpty && (
          <Link
            to="/events"
            className={`button button--primary ${styles.headerLink}`}
          >
            Browse More Events
          </Link>
        )}
      </header>
      {!isEmpty && (
        <TicketsToolbar
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          activeTab={activeTab}
          onActiveTabChange={handleActiveTabChange}
          sortDirection={sortDirection}
          onSortDirectionChange={handleSortDirectionChange}
        />
      )}
      <div className={styles.content}>
        {isEmpty ? (
          <EmptyTicketList />
        ) : (
          <TicketList
            tickets={visibleTickets}
            onViewTicketModal={handleViewTicketModal}
          />
        )}
      </div>
      <TicketModal ticket={selectedTicket} onClose={handleCloseModal} />
      {!isEmpty && (
        <Link
          to="/events"
          className={`button button--primary ${styles.footerLink}`}
        >
          Browse More Events
        </Link>
      )}
    </section>
  );
}
