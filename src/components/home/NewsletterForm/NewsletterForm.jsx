import styles from "./NewsletterForm.module.css";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleChange(event) {
    setEmail(event.target.value);
    if (error) setError("");
    if (success) setSuccess(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      setSuccess(false);
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      setSuccess(false);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Simulate subscription process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setIsSubmitting(false);

      setEmail("");
    } catch (error) {
      setError("There was an error subscribing to the newsletter.");
      setSuccess(false);
      setIsSubmitting(false);
      console.error(error);
    }
  }

  return (
    <section className={styles.newsletterForm}>
      <h2 className={styles.title}>Never miss a beat.</h2>
      <p className={styles.description}>
        Sign up for our newsletter to receive personalized event recommendations
        and early bird access to tickets.
      </p>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          disabled={isSubmitting || success}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? "newsletter-error"
              : success
                ? "newsletter-success"
                : undefined
          }
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />
        <button
          type="submit"
          disabled={isSubmitting || success}
          className={`button button--primary ${styles.formButton}`}
        >
          {isSubmitting
            ? "Subscribing..."
            : success
              ? "Subscribed!"
              : "Suscribe"}
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && (
        <p className={styles.successMessage}>Thanks for subscribing!</p>
      )}
    </section>
  );
}
