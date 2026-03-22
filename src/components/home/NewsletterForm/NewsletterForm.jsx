import styles from "./NewsletterForm.module.css";

export default function NewsletterForm() {
  return (
    <section className={styles.newsletterForm}>
      <h2 className={styles.title}>Never miss a beat.</h2>
      <p className={styles.description}>
        Sign up for our newsletter to receive personalized event recommendations
        and early bird access to tickets.
      </p>
      <form className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
        />
        <button
          type="submit"
          className={`button button--primary ${styles.formButton}`}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
