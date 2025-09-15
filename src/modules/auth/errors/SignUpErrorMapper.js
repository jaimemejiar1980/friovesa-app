import lang from "../../../lang/es";

const SIGN_UP_ERRORS = {
  uncompleted_fields: lang?.uncompletedFields,
  invalid_username: lang?.invalidUsername,
  invalid_first_name: lang?.invalidFirstName,
  invalid_last_name: lang?.invalidLastName,
  invalid_email: lang?.invalidEmail,
  invalid_password: lang?.invalidPassword,
  username_already_exists: lang?.userAlreadyExists,
  email_already_exists: lang?.emailAlreadyExists,
  cannot_sign_up: lang?.failedToSignUp,
  unknown_error: lang?.failedToSignUp,
};

export default function signUpErrorMapper(errorCode) {
  console.log("🚀 ~ signUpErrorMapper ~ errorCode:", errorCode);
  return SIGN_UP_ERRORS[errorCode] || SIGN_UP_ERRORS.unknown_error;
}
