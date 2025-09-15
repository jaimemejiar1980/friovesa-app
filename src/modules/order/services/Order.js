import { convertToMoney, mapOrderStatusToSpanish } from "../../../lib/utils";

export class Product {
  constructor({
    id,
    name,
    productId,
    quantity,
    taxClass,
    subtotal,
    subtotalTax,
    total,
    totalTax,
    sku,
    price,
    image,
  }) {
    this.id = id;
    this.name = name;
    this.productId = productId;
    this.quantity = quantity;
    this.taxClass = taxClass;
    this.subtotal = convertToMoney(subtotal);
    this.subtotalTax = convertToMoney(subtotalTax);
    this.total = convertToMoney(total);
    this.totalTax = convertToMoney(totalTax);
    this.sku = sku;
    this.price = price;
    this.imageUrl = image?.src;
  }
}

export class Order {
  constructor({
    id,
    status,
    currency,
    dateCreated,
    dateModified,
    discountTotal,
    discountTax,
    shippingTotal,
    shippingTax,
    cartTax,
    subtotal,
    total,
    totalTax,
    customerId,
    orderKey,
    address,
    country,
    products,
    paymentMethod,
    paymentMethodTitle,
    shippingMethod,
  }) {
    this.id = id;
    this.status = status;
    this.currency = currency;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.discountTotal = discountTotal;
    this.discountTax = discountTax;
    this.shippingTotal = convertToMoney(shippingTotal);
    this.shippingTax = shippingTax;
    this.cartTax = cartTax;
    this.subtotal = convertToMoney(subtotal);
    this.total = convertToMoney(total);
    this.totalTax = convertToMoney(totalTax);
    this.customerId = customerId;
    this.orderKey = orderKey;
    this.address = address;
    this.country = country;
    this.products = products;
    this.paymentMethod = paymentMethod;
    this.paymentMethodTitle = paymentMethodTitle;
    this.shippingMethod = shippingMethod;
  }
}

export function orderFormatter({ order }) {
  const products = order.line_items.map((item) => new Product(item));
  const address = [order?.shipping?.address_1, order?.shipping?.address_2].join(
    " "
  );

  const total = Number(order?.total);
  const totalTax = Number(order?.total_tax);
  const shippingTotal = Number(order?.shipping_total);
  const subtotal = total - totalTax - shippingTotal;
  const shippingMethod = order?.shipping_lines[0]?.method_title;
  const orderStatus = mapOrderStatusToSpanish(order?.status);

  return new Order({
    id: order?.id,
    status: orderStatus,
    currency: order?.currency,
    dateCreated: order?.date_created,
    dateModified: order?.date_modified,
    discountTotal: order?.discount_total,
    discountTax: order?.discount_tax,
    shippingTotal: shippingTotal,
    shippingTax: order?.shipping_tax,
    cartTax: order?.cart_tax,
    subtotal,
    total,
    totalTax,
    customerId: order?.customer_id,
    orderKey: order?.order_key,
    address: address,
    country: order?.shipping?.country,
    products: products,
    paymentMethod: order.payment_method,
    paymentMethodTitle: order.payment_method_title,
    shippingMethod: shippingMethod,
  });
}
