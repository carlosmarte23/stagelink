export function normalizeCardNumber(cardNumber) {
  return cardNumber.replace(/\D/g, "");
}

export function getCardLast4(cardNumber) {
  return normalizeCardNumber(cardNumber).slice(-4);
}

export function validatePaymentDetails(formPaymentDetails) {
  const { cardNumber, expirationDate, securityCode, saveCard } =
    formPaymentDetails;

  const missingFieldErrors = {};

  if (!cardNumber) {
    missingFieldErrors.cardNumber = "Please enter your card number.";
  }

  if (!expirationDate) {
    missingFieldErrors.expirationDate = "Please enter your card expiry date.";
  }

  if (!securityCode) {
    missingFieldErrors.securityCode = "Please enter your card CVC.";
  }

  if (Object.keys(missingFieldErrors).length > 0) {
    return {
      errors: missingFieldErrors,
    };
  }

  const nextErrors = {};

  const cleanCardNumber = normalizeCardNumber(cardNumber);
  const cleanExpirationDate = expirationDate.trim();
  const cleanSecurityCode = securityCode.trim();

  //Validation
  if (!cleanCardNumber) {
    nextErrors.cardNumber = "Please enter your card number.";
  } else if (!/^\d{16}$/.test(cleanCardNumber)) {
    nextErrors.cardNumber = "Please enter a valid card number.";
  }

  if (!cleanExpirationDate) {
    nextErrors.expirationDate = "Please enter your card expiry date.";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cleanExpirationDate)) {
    nextErrors.expirationDate = "Please enter a valid expiry date.";
  }

  if (!cleanSecurityCode) {
    nextErrors.securityCode = "Please enter your card CVC.";
  } else if (!/^\d{3}$/.test(cleanSecurityCode)) {
    nextErrors.securityCode = "Please enter a valid CVC.";
  }

  return {
    errors: nextErrors,
    validatedValues: {
      cardNumber: cleanCardNumber,
      expirationDate: cleanExpirationDate,
      securityCode: cleanSecurityCode,
      saveCard,
    },
  };
}

export async function authorizePayment(paymentDetails) {
  // Simulated payment authorization
  const { cardNumber, saveCard } = paymentDetails;

  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  return {
    ok: true,
    paymentDetails: {
      method: "card",
      cardLast4: getCardLast4(cardNumber),
      saveCard,
    },
  };
}
