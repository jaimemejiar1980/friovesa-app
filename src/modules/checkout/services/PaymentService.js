import { apiPrivate } from "../../../axios";
import { API } from "../../../constants/wordpress";

class PaymentMethod {
  constructor({ id, title, methodTitle, description, instructions, icon }) {
    {
      this.id = id;
      this.title = title;
      this.methodTitle = methodTitle;
      this.description = description;
      this.instructions = instructions;
      this.icon = icon;
    }
  }
}

export class PaymentService {
  async getPaymentMethods() {
    const response = await apiPrivate.get(API.CHECKOUT.PAYMENT_METHODS.URL);

    const paymentMethods = response.data?.map(
      (paymentMethod) =>
        new PaymentMethod({
          ...paymentMethod,
          methodTitle: paymentMethod?.method_title,
        })
    );

    return paymentMethods;
  }
}
