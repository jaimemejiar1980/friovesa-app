export class BankPayment {
  constructor({
    accountName,
    bankName,
    accountNumber,
    classificationCode,
    iban,
  }) {
    this.accountName = accountName;
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.classificationCode = classificationCode;
    this.iban = iban;
  }
}

export class PagomediosPayment {
  constructor({ paymentLink }) {
    this.paymentLink = paymentLink;
  }
}
