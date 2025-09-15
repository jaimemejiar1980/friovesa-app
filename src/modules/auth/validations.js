import lang from "../../lang/es";

const NAMES_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_.]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/;

export function validateSignUpFields({
  username = "",
  name = "",
  lastName = "",
  email = "",
  password = "",
  checkedPassword = "",
}) {
  const sanitizedData = {
    username: username?.trim(),
    name: name?.trim(),
    lastName: lastName?.trim(),
    email: email?.trim(),
    password: password?.trim(),
    checkedPassword: checkedPassword?.trim(),
  };

  if (areFieldsEmpty(sanitizedData)) {
    throw new Error(lang?.pleaseInput);
  }

  // Username
  if (
    !isValidUsername(sanitizedData.username) ||
    sanitizedData.username.length < 6
  ) {
    throw new Error(lang?.invalidUsername);
  }

  // Name
  if (!isValidName(sanitizedData.name)) {
    throw new Error(lang?.invalidFirstName);
  }

  // Last name
  if (!isValidName(sanitizedData.lastName)) {
    throw new Error(lang?.invalidLastName);
  }

  // Email
  if (!isValidEmail(sanitizedData.email)) {
    throw new Error(lang?.invalidEmail);
  }

  // Password
  if (!isValidPassword(sanitizedData.password)) {
    throw new Error(lang?.invalidPassword);
  }

  // Checked password
  if (
    !isCheckedPasswordValid(
      sanitizedData.password,
      sanitizedData.checkedPassword
    )
  ) {
    throw new Error(lang?.invalidCheckedPassword);
  }

  return sanitizedData;
}

function areFieldsEmpty({
  username = "",
  name = "",
  lastName = "",
  email = "",
  password = "",
  checkedPassword = "",
}) {
  return (
    !username || !name || !lastName || !email || !password || !checkedPassword
  );
}

function isValidUsername(username) {
  return USERNAME_REGEX.test(username);
}

function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

function isValidName(name) {
  return NAMES_REGEX.test(name);
}

function isValidPassword(password) {
  return PASSWORD_REGEX.test(password);
}

function isCheckedPasswordValid(password, checkedPassword) {
  return password === checkedPassword;
}
