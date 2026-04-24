export function validateBuyerDetails(buyerDetails) {
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
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  return { errors: errors, validatedValues: { fullName, email, phone } };
}
