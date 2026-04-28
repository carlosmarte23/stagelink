export function normalizePhoneDigits(phone) {
  return phone.replace(/\D/g, "").slice(0, 10);
}

export function formatPhoneNumber(phone) {
  const digits = normalizePhoneDigits(phone);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function validateBuyerDetails(buyerDetails) {
  const cleanFullName = buyerDetails.fullName.trim();
  const cleanEmail = buyerDetails.email.trim().toLowerCase();
  const cleanPhone = normalizePhoneDigits(buyerDetails.phone.trim());

  const errors = {};

  if (!cleanFullName) {
    errors.fullName = "Please enter your full name.";
  } else if (cleanFullName.split(" ").length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!cleanEmail) {
    errors.email = "Please enter your email address.";
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(cleanEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!cleanPhone) {
    errors.phone = "Please enter your phone number.";
  } else if (cleanPhone.length !== 10) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  return {
    errors: errors,
    validatedValues: {
      fullName: cleanFullName,
      email: cleanEmail,
      phone: cleanPhone,
    },
  };
}
