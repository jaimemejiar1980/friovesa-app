import { API } from "../../../constants/wordpress";
import { apiPrivate } from "../../../axios";
import { BankPayment, PagomediosPayment } from "./OrderPaymentMethods";
import { buildURL, getPaginationData } from "../../../lib/URLs";
import { convertToMoney, mapOrderStatusToSpanish } from "../../../lib/utils";
import { orderFormatter } from "./Order";
import lang from "../../../lang/es";

export default class OrderService {
  /**
   * Request the order creation based on a creation url (different url for each payment method).
   */
  async createOrder({ order }) {
    console.log(
      "🚀 ~ OrderService ~ createOrder ~ order:",
      JSON.stringify(order, null, 2)
    );
    const response = await apiPrivate.post(API.ORDERS.CREATE.URL, order);

    const responseJson = response.data;
    console.log(
      "🚀 ~ OrderService ~ createOrder ~ responseJson:",
      JSON.stringify(responseJson, null, 2)
    );

    const formattedOrder = orderFormatter({
      order: responseJson.order,
    });

    return { order: formattedOrder, payment: responseJson.payment };
  }

  async createBankOrder({ order }) {
    const { order: createdOrder, payment } = await this.createOrder({
      order,
    });
    const paymentInfo = payment[0];

    const formattedPayment = new BankPayment({
      accountName: paymentInfo.account_name,
      accountNumber: paymentInfo.account_number,
      bankName: paymentInfo.bank_name,
      classificationCode: paymentInfo.sort_code,
      iban: paymentInfo.iban,
    });
    return { order: createdOrder, payment: formattedPayment };
  }

  async createPagomediosOrder({ order }) {
    const { order: createdOrder, payment } = await this.createOrder({
      order,
    });

    const formattedPayment = new PagomediosPayment({
      paymentLink: payment.payment_link,
    });
    return { order: createdOrder, payment: formattedPayment };
  }

  async getCustomerOrders({
    customerId,
    page = 1,
    perPage = API.CUSTOMER_ORDERS.RESULTS_PER_PAGE,
    orderBy = "desc",
  }) {
    try {
      const url = buildURL(API.CUSTOMER_ORDERS.URL, {
        customer: parseInt(customerId),
        page,
        per_page: perPage,
        orderBy: orderBy,
      });

      const response = await fetch(url);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(lang?.failedToLoadOrders);
      }

      const orders = this.formatResults(responseJson);
      const pagination = getPaginationData(response);
      return { data: orders, pagination };
    } catch (error) {
      console.log("🚀 ~ OrderService ~ error:", error);
      throw new Error(lang?.failedToLoadOrders);
    }
  }

  formatResults(orders) {
    return orders.map((order) => this.formatOrder(order));
  }

  formatOrder(order) {
    const products = order?.line_items.map((item) => ({
      id: item?.id,
      name: item?.name,
      productId: item?.product_id,
      quantity: item?.quantity,
      taxClass: item?.tax_class,
      subtotal: convertToMoney(item?.subtotal),
      subtotalTax: convertToMoney(item?.subtotal_tax),
      total: convertToMoney(item?.total),
      totalTax: convertToMoney(item?.total_tax),
      sku: item?.sku,
      price: item?.price,
      imageUrl: item?.image?.src,
    }));

    const address = [
      order?.shipping?.address_1,
      order?.shipping?.address_2,
    ].join(" ");

    const subtotal = order?.total - order?.total_tax - order?.shipping_total;
    const shippingMethod = order?.shipping_lines[0]?.method_title;
    return {
      id: order?.id,
      status: mapOrderStatusToSpanish(order?.status),
      currency: order?.currency,
      dateCreated: order?.date_created,
      dateModified: order?.date_modified,
      discountTotal: order?.discount_total,
      discountTax: order?.discount_tax,
      shippingTotal: convertToMoney(order?.shipping_total),
      shippingTax: order?.shipping_tax,
      cartTax: order?.cart_tax,
      subtotal: convertToMoney(subtotal),
      total: convertToMoney(order?.total),
      totalTax: convertToMoney(order?.total_tax),
      customerId: order?.customer_id,
      orderKey: order?.order_key,
      address: address,
      country: order?.shipping?.country,
      products: products,
      paymentMethodTitle: order?.payment_method_title,
      shippingMethod: shippingMethod,
    };
  }
}
