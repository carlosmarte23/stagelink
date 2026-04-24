import { useState } from "react";

import { formatCurrency } from "../../../utils/currency.js";
import { validateBuyerDetails } from "../../../features/checkout/lib/checkoutDetailsValidation.js";

import styles from "./CheckoutDetails.module.css";

export default function CheckoutDetails({
  totalAmountDue,
  initialDetails,
  onBack,
  onContinue,
}) {
  const [formBuyerDetails, setFormBuyerDetails] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
    ...initialDetails,
  }));
  const [errors, setErrors] = useState({});

  const handleGuestValueChange = (value, fieldName) => {
    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: "",
    }));

    setFormBuyerDetails((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors, validatedValues } = validateBuyerDetails(formBuyerDetails);

    setErrors({
      fullName: errors.fullName,
      email: errors.email,
      phone: errors.phone,
    });

    if (Object.keys(errors).length > 0) return;

    onContinue(validatedValues);
  };

  return (
    <section
      aria-labelledby="checkout-details-title"
      className={styles.detailsContainer}
    >
      <div className={styles.detailsCard}>
        <h2 id="checkout-details-title" className={styles.title}>
          Guest Details
        </h2>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroupFull}>
            <label htmlFor="fullName" className={styles.label}>
              Primary Contact Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formBuyerDetails.fullName}
              onChange={(e) =>
                handleGuestValueChange(e.target.value, "fullName")
              }
              aria-invalid={errors.fullName ? "true" : "false"}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={styles.input}
            />
            {errors.fullName && (
              <p id="fullName-error" className={styles.error}>
                {errors.fullName}
              </p>
            )}
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroupFull}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formBuyerDetails.email}
                onChange={(e) =>
                  handleGuestValueChange(e.target.value, "email")
                }
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={styles.input}
              />
              {errors.email && (
                <p id="email-error" className={styles.error}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className={styles.formGroupFull}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 555-5555"
                value={formBuyerDetails.phone}
                onChange={(e) =>
                  handleGuestValueChange(e.target.value, "phone")
                }
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={styles.input}
              />
              {errors.phone && (
                <p id="phone-error" className={styles.error}>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className={styles.detailsCardFooter}>
            <div className={styles.summary}>
              <p className={styles.summaryLabel}>Total Amount Due:</p>
              <p className={styles.amountDue}>
                {formatCurrency(totalAmountDue)}
              </p>
            </div>
            <div className={styles.formGroupActions}>
              <button
                type="button"
                className={`button ${styles.buttonPrevious}`}
                onClick={onBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M5 12l4 4" />
                  <path d="M5 12l4 -4" />
                </svg>
                Previous: Review Tickets
              </button>
              <button
                type="submit"
                className={`button button--primary ${styles.buttonNext}`}
              >
                Next: Choose Payment Method{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M15 16l4 -4" />
                  <path d="M15 8l4 4" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
