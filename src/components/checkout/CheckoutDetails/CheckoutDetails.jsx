import { useState } from "react";

import { formatCurrency } from "../../../utils/currency.js";

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

  function validateBuyerDetails(buyerDetails) {
    const fullName = buyerDetails.fullName.trim();
    const email = buyerDetails.email.trim();
    const phone = buyerDetails.phone.trim();

    const errors = {};

    if (!fullName) {
      errors.fullName = "Please enter your full name.";
    } else if (fullName.split(" ").length < 2) {
      errors.fullName = "Please enter your full name.";
    }

    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      errors.phone = "Please enter your phone number.";
    } else if (!/^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    return { errors: errors, validatedValues: { fullName, email, phone } };
  }

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
            <label htmlFor="fullName">Primary Contact Name</label>
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
            />
            {errors.fullName && (
              <p id="fullName-error" className={styles.error}>
                {errors.fullName}
              </p>
            )}
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroupFull}>
              <label htmlFor="email">Email Address</label>
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
              />
              {errors.email && (
                <p id="email-error" className={styles.error}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className={styles.formGroupFull}>
              <label htmlFor="phone">Phone Number</label>
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
              <p>
                Total Amount Due:
                <span className={styles.amountDue}>
                  {formatCurrency(totalAmountDue)}
                </span>
              </p>
            </div>
            <div className={styles.formGroupActions}>
              <button
                type="button"
                className={`button ${styles.buttonPrevious}`}
                onClick={onBack}
              >
                Previous: Review Tickets
              </button>
              <button
                type="submit"
                className={`button button--primary ${styles.buttonNext}`}
              >
                Next: Choose Payment Method
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
