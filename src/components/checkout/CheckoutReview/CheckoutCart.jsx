import CheckoutEventCard from "./CheckoutEventCard.jsx";

import styles from "./CheckoutReview.module.css";

export default function CheckoutCart({
  cartItems,
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
}) {
  return (
    <ol className={styles.checkoutEventList}>
      {cartItems.map((cartItem) => (
        <CheckoutEventCard
          cartItem={cartItem}
          key={cartItem.eventId}
          onIncreaseTicket={onIncreaseTicket}
          onDecreaseTicket={onDecreaseTicket}
          onRemoveTicket={onRemoveTicket}
        />
      ))}
    </ol>
  );
}
