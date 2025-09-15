import base64 from "react-native-base64";
import { ORDER_STATUS } from "../constants/wordpress";
import * as Crypto from "expo-crypto";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function convertToMoney(value) {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return currencyFormatter.format(0);
  }
  return currencyFormatter.format(numberValue);
}

export function sumMoneyList(list) {
  const totalSum = list.reduce((accumulator, item) => {
    const numericValue = Number(item.replace(/[^0-9.-]+/g, ""));
    return accumulator + (isNaN(numericValue) ? 0 : numericValue);
  }, 0);

  return convertToMoney(totalSum);
}

export function removeHtmlTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export function mapOrderStatusToSpanish(status) {
  if (!status) return "";
  return ORDER_STATUS[status] || "";
}

export function generateUUID() {
  const uuid = Crypto.randomUUID();
  return uuid;
}

export const decodeJWT = (token) => {
  if (token.length === 0) {
    return null;
  }
  const headerPart = sanitizeJson(base64.decode(token.split(".")[0]));
  const payloadPart = sanitizeJson(base64.decode(token.split(".")[1]));
  return {
    header: JSON.parse(headerPart),
    payload: JSON.parse(payloadPart),
  };
};

const sanitizeJson = (json) => {
  return json.replace(/[\u0000]+/g, "");
};
