import { OrderBillingRequestDto } from "./OrderBillingRequestDto";
import { OrderProductRequestDto } from "./OrderProductRequestDto";
import { OrderShippingLineRequestDto, OrderShippingRequestDto } from "./OrderShippingRequestDto";

interface OrderRequest {
  paymentMethod: string;
  paymentMethodTitle: string;
  customerId: number;
  customerNote: string;
  billing: OrderBillingRequestDto;
  shipping: OrderShippingRequestDto;
  lineItems: OrderProductRequestDto[];
  shippingLines: OrderShippingLineRequestDto[];
}

export class OrderRequestDto {
  readonly origin: string;
  readonly payment_method: string;
  readonly payment_method_title: string;
  readonly customer_id: number;
  readonly customer_note: string;
  readonly billing: OrderBillingRequestDto;
  readonly shipping: OrderShippingRequestDto;
  readonly line_items: OrderProductRequestDto[];
  readonly shipping_lines: OrderShippingLineRequestDto[];

  constructor({
    paymentMethod,
    paymentMethodTitle,
    customerId,
    customerNote,
    billing,
    shipping,
    lineItems,
    shippingLines,
  }: OrderRequest) {
    this.origin = "mobile";
    this.payment_method = paymentMethod;
    this.payment_method_title = paymentMethodTitle;
    this.customer_id = customerId;
    this.customer_note = customerNote;
    this.billing = billing;
    this.shipping = shipping;
    this.line_items = lineItems;
    this.shipping_lines = shippingLines;
  }
}
