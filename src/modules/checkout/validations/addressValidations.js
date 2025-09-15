import { DOCUMENT_TYPE_VALUES } from "../../../constants/wordpress";
import lang from "../../../lang/es";

const NO_ZEROS_REGEX = /^(?!0+$)\d+$/;

const LENGTH_FIELDS_VALIDATIONS = {
  DOCUMENT: {
    [DOCUMENT_TYPE_VALUES.RUC]: 13,
    [DOCUMENT_TYPE_VALUES.NATIONAL_ID]: 10,
  },
};

function isBillingCompleted({
  businessType = "",
  documentType = "",
  identification = "",
  name = "",
  lastName = "",
  address = "",
  sector = "",
  phone = "",
  email = "",
}) {
  return (
    businessType !== "" &&
    documentType !== "" &&
    identification !== "" &&
    name !== "" &&
    lastName !== "" &&
    address !== "" &&
    sector !== "" &&
    phone !== "" &&
    email !== ""
  );
}

export function validateBilling({
  businessType = "",
  documentType = "",
  identification = "",
  name = "",
  lastName = "",
  address = "",
  addressStreet = "",
  sector = "",
  phone = "",
  email = "",
  addressLatitude = "",
  addressLongitude = "",
  additionalNotes = "",
}) {
  const sanitizedData = {
    businessType: businessType?.trim(),
    documentType: documentType?.trim(),
    identification: identification?.trim(),
    name: name?.trim(),
    lastName: lastName?.trim(),
    address: address?.trim(),
    addressStreet: addressStreet?.trim(),
    sector: sector?.trim(),
    phone: phone?.trim(),
    email: email?.trim(),
    addressLatitude: addressLatitude?.trim(),
    addressLongitude: addressLongitude?.trim(),
    additionalNotes: additionalNotes?.trim(),
  };

  if (!isBillingCompleted(sanitizedData)) {
    throw new Error(lang?.pleaseInput);
  }

  // Check if the provided identification length is valid based on the selected document type
  const requiredIdentificationLength =
    LENGTH_FIELDS_VALIDATIONS.DOCUMENT[sanitizedData.documentType];
  if (
    (!isNaN(requiredIdentificationLength) &&
      requiredIdentificationLength != sanitizedData.identification.length) ||
    !NO_ZEROS_REGEX.test(sanitizedData.identification)
  ) {
    throw new Error(lang?.pleaseCheckIdentification);
  }
}

function isShippingCompleted({
  businessName = "",
  address = "",
  identification = "",
  phone = "",
  email = "",
}) {
  return (
    businessName !== "" &&
    address !== "" &&
    identification !== "" &&
    phone !== "" &&
    email !== ""
  );
}

export function validateShipping({
  businessName,
  address,
  identification,
  phone,
  email,
}) {
  const sanitizedData = {
    businessName: businessName?.trim(),
    address: address?.trim(),
    identification: identification?.trim(),
    phone: phone?.trim(),
    email: email?.trim(),
  };

  if (!isShippingCompleted(sanitizedData)) {
    throw new Error(lang?.pleaseInput);
  }

  const isCorrectIdentificationLength =
    sanitizedData.identification.length ===
      LENGTH_FIELDS_VALIDATIONS.DOCUMENT[DOCUMENT_TYPE_VALUES.NATIONAL_ID] ||
    sanitizedData.identification.length ===
      LENGTH_FIELDS_VALIDATIONS.DOCUMENT[DOCUMENT_TYPE_VALUES.RUC];

  if (
    !isCorrectIdentificationLength ||
    !NO_ZEROS_REGEX.test(sanitizedData.identification)
  ) {
    throw new Error(lang?.pleaseCheckIdentification);
  }
}
