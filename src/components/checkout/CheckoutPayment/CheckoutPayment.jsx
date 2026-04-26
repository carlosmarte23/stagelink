import { useState } from "react";
import { CreditCard, ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";

import {
  validatePaymentDetails,
  authorizePayment,
} from "../../../features/checkout/lib/checkoutPayment.js";
import { formatCurrency } from "../../../utils/currency.js";
import styles from "./CheckoutPayment.module.css";

export default function CheckoutPayment({
  totalAmountDue,
  onBack,
  onContinue,
}) {
  const [formPaymentDetails, setFormPaymentDetails] = useState(() => ({
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    saveCard: false,
  }));
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const [errors, setErrors] = useState({});

  function handleCardNumberChange(event) {
    const onlyDigits = event.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedCardNumber = onlyDigits.replace(/(.{4})/g, "$1 ").trim();

    setFormPaymentDetails({
      ...formPaymentDetails,
      cardNumber: formattedCardNumber,
    });
  }

  function handleExpirationDateChange(event) {
    const onlyDigits = event.target.value.replace(/\D/g, "").slice(0, 4);

    if (onlyDigits.length <= 2) {
      setFormPaymentDetails({
        ...formPaymentDetails,
        expirationDate: onlyDigits,
      });

      return;
    }

    const month = onlyDigits.slice(0, 2);
    const year = onlyDigits.slice(2);
    setFormPaymentDetails({
      ...formPaymentDetails,
      expirationDate: `${month}/${year}`,
    });
  }

  function handleSecurityCodeChange(event) {
    const onlyDigits = event.target.value.replace(/\D/g, "").slice(0, 3);
    setFormPaymentDetails({
      ...formPaymentDetails,
      securityCode: onlyDigits,
    });
  }

  function handleSaveCardChange(event) {
    setFormPaymentDetails({
      ...formPaymentDetails,
      saveCard: event.target.checked,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});

    const { errors, validatedValues } =
      validatePaymentDetails(formPaymentDetails);

    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsAuthorizing(true);
    const result = await authorizePayment(validatedValues);

    if (!result.ok) {
      setIsAuthorizing(false);
      setErrors({ form: result.error });
      return;
    }

    onContinue(result.paymentDetails);
  }

  return (
    <section
      aria-labelledby="checkout-payment-title"
      className={styles.paymentContainer}
    >
      <div className={styles.paymentCard}>
        <h2 id="checkout-payment-title" className={styles.title}>
          Payment Method
        </h2>

        <form noValidate onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="cardNumber" className={styles.label}>
              Card Number
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                autoComplete="cc-number"
                aria-invalid={errors.cardNumber ? "true" : "false"}
                aria-describedby={errors.cardNumber ? "cardNumber-error" : ""}
                maxLength={19}
                value={formPaymentDetails.cardNumber}
                onChange={handleCardNumberChange}
                className={styles.input}
              />
              <span aria-hidden="true" className={styles.inputIcon}>
                <CreditCard />
              </span>
            </div>
            {errors.cardNumber && (
              <p id="cardNumber-error" className={styles.error}>
                {errors.cardNumber}
              </p>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="expirationDate" className={styles.label}>
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              placeholder="MM/YY"
              inputMode="numeric"
              autoComplete="cc-exp"
              maxLength={5}
              aria-invalid={errors.expirationDate ? "true" : "false"}
              aria-describedby={
                errors.expirationDate ? "expirationDate-error" : ""
              }
              value={formPaymentDetails.expirationDate}
              onChange={handleExpirationDateChange}
              className={styles.input}
            />
            {errors.expirationDate && (
              <p id="expirationDate-error" className={styles.error}>
                {errors.expirationDate}
              </p>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="securityCode" className={styles.label}>
              CVC
            </label>
            <input
              type="text"
              id="securityCode"
              name="securityCode"
              placeholder="000"
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={3}
              aria-invalid={errors.securityCode ? "true" : "false"}
              aria-describedby={errors.securityCode ? "securityCode-error" : ""}
              value={formPaymentDetails.securityCode}
              onChange={handleSecurityCodeChange}
              className={styles.input}
            />
            {errors.securityCode && (
              <p id="securityCode-error" className={styles.error}>
                {errors.securityCode}
              </p>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.checkboxField}>
              <input
                type="checkbox"
                name="saveCard"
                id="saveCard"
                checked={formPaymentDetails.saveCard}
                onChange={handleSaveCardChange}
                className={styles.checkboxInput}
              />

              <span className={styles.checkboxLabel}>
                Save card information for future purchases
              </span>
            </label>
          </div>

          <div className={styles.summary}>
            <p className={styles.summaryLabel}>Total Amount Due:</p>
            <p className={styles.amountDue}>{formatCurrency(totalAmountDue)}</p>
          </div>

          <div className={styles.formGroupActions}>
            <button
              type="button"
              className={`button ${styles.buttonPrevious}`}
              onClick={onBack}
            >
              <ArrowLeft aria-hidden="true" />
              Back to Details
            </button>
            <button
              type="submit"
              className={`button button--primary ${styles.buttonNext}`}
              disabled={isAuthorizing}
              aria-busy={isAuthorizing}
            >
              {isAuthorizing ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Authorizing...
                </>
              ) : (
                <>
                  Complete Purchase <LockKeyhole aria-hidden="true" />
                </>
              )}
            </button>
          </div>
          <p className={styles.encryption}>
            <span aria-hidden="true">
              <ShieldCheck />
            </span>
            Encrypted and secure checkout
          </p>
        </form>
      </div>
    </section>
  );
}
