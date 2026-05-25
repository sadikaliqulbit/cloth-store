import { ShippingInfo } from "@/types";

export type ValidationErrors = Partial<Record<keyof ShippingInfo, string>>;

export function validateEmail(email: string): string {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
  return "";
}

export function validatePhone(phone: string): string {
  if (!phone) return "Phone is required";
  if (!/^\+?[\d\s\-]{7,15}$/.test(phone)) return "Enter a valid phone number";
  return "";
}

export function validateRequired(value: string, label: string): string {
  if (!value || value.trim() === "") return `${label} is required`;
  return "";
}

export function validateCheckoutForm(form: ShippingInfo): ValidationErrors {
  const errors: ValidationErrors = {};

  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(form.phone);
  if (phoneErr) errors.phone = phoneErr;

  const firstNameErr = validateRequired(form.firstName, "First name");
  if (firstNameErr) errors.firstName = firstNameErr;

  const lastNameErr = validateRequired(form.lastName, "Last name");
  if (lastNameErr) errors.lastName = lastNameErr;

  if (!form.country || form.country === "Country") errors.country = "Select a country";

  const stateErr = validateRequired(form.state, "State");
  if (stateErr) errors.state = stateErr;

  const addressErr = validateRequired(form.address, "Address");
  if (addressErr) errors.address = addressErr;

  const cityErr = validateRequired(form.city, "City");
  if (cityErr) errors.city = cityErr;

  const postalErr = validateRequired(form.postalCode, "Postal code");
  if (postalErr) errors.postalCode = postalErr;

  return errors;
}

export function validateAuthLogin(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  if (!password) errors.password = "Password is required";
  return errors;
}

export function validateAuthRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirm: string
) {
  const errors: { firstName?: string; lastName?: string; email?: string; password?: string; confirm?: string } = {};
  if (!firstName.trim()) errors.firstName = "First name is required";
  if (!lastName.trim()) errors.lastName = "Last name is required";
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  if (!password) errors.password = "Password is required";
  if (password.length < 6) errors.password = "Min 6 characters";
  if (password !== confirm) errors.confirm = "Passwords do not match";
  return errors;
}
