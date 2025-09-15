import { PRODUCT_TYPES } from "../../../constants/wordpress";
import {
  OrderBillingRequestDto,
  OrderShippingRequestDto,
  OrderMetadataRequestDto,
  OrderShippingLineRequestDto,
  OrderRequestDto,
  OrderProductRequestDto,
  OrderSimpleProductRequestDto,
  OrderVariableProductRequestDto,
  OrderBundleProductRequestDto,
} from "../dto";

interface Billing {
  businessType: string
  documentType: string
  identification: string
  name: string
  lastName: string
  address: string
  addressStreet: string
  sector: string
  phone: string
  email: string
  addressLatitude: string
  addressLongitude: string
  additionalNotes: string
  isShippingDifferent: boolean
}

interface Shipping {
  businessName: string
  address: string
  identification: string
  phone: string
  email: string
}

interface OrderFormatter {
  shippingZone: any
  paymentMethod: any
  billing: Billing
  shipping: Shipping
  cart: any
  customerId: any
  settings: any
  cupon: any
}

export class OrderRequestFormatter {
  shippingZone: any
  paymentMethod: any
  billing: Billing
  shipping: Shipping
  cart: any
  customerId: any
  settings: any
  products: any
  order: any
  cupon: any

  constructor({
    shippingZone,
    paymentMethod,
    billing,
    shipping,
    cart,
    customerId,
    settings,
    cupon,
  }: OrderFormatter) {
    this.shippingZone = shippingZone;
    this.billing = billing;
    this.shipping = shipping;
    this.products = cart;
    this.cupon = cupon;

    const formattedLineItems = this.formatOrderLineItems();

    const formattedBilling = this.formatBilling();

    const { formattedShipping, formattedShippingMetadata } =
      this.formatShipping();

    const orderMetadata = new OrderMetadataRequestDto({
      companyType: billing.businessType,
      documentType: billing.documentType,
      document: billing.identification,
      sector: billing.sector,
      ...formattedShippingMetadata,
    });

    const formattedShippingLines = this.formatShippingLine();

    this.order = {
      order_meta: orderMetadata,
      order: new OrderRequestDto({
        paymentMethod: paymentMethod.id,
        paymentMethodTitle: paymentMethod.title,
        customerId: customerId,
        customerNote: this.billing?.additionalNotes,
        billing: formattedBilling,
        shipping: formattedShipping,
        lineItems: formattedLineItems,
        shippingLines: formattedShippingLines,
      }),
      order_settings: {
        store: settings.store?.toUpperCase(), // define the city to handle events in Friovesa Mobile Api plugin
      },
      cupon,
    };
  }

  getProductByType({ product }: { product: any }) {
    if (product?.type === PRODUCT_TYPES.SIMPLE) {
      return new OrderSimpleProductRequestDto({
        id: product.id,
        quantity: product.quantity,
      });
    } else if (product?.type === PRODUCT_TYPES.VARIABLE) {
      return new OrderVariableProductRequestDto({
        id: product.id,
        quantity: product.quantity,
      });
    } else if (product?.type === PRODUCT_TYPES.BUNDLE) {
      const formattedBundle = product?.bundle?.map((item: any) => {
        return new OrderProductRequestDto({
          id: item.id,
          quantity: item.quantity,
        })
      });

      return new OrderBundleProductRequestDto({
        id: product.id,
        quantity: product.quantity,
        bundle: formattedBundle,
      });
    } else {
      return new OrderProductRequestDto({
        id: product.id,
        quantity: product.quantity,
      });
    }
  }

  formatOrderLineItems(): OrderProductRequestDto[] {
    let products = [];

    for (let i = 0; i < this.products.length; i++) {
      const productInCart = this.products[i];

      const product = this.getProductByType({ product: productInCart });
      products.push(product);
    }

    return products;
  }

  formatShipping() {
    if (this.billing.isShippingDifferent) {
      const formattedShipping = new OrderShippingRequestDto({
        company: "",
        address1: this.shipping.address,
        city: "",
        state: "",
        postcode: "",
        country: "EC",
        email: this.shipping?.email,
        phone: this.shipping?.phone,
      });

      const formattedShippingMetadata = {
        shippingCompany: this.shipping?.businessName,
        shippingEmail: this.shipping?.email,
      };

      return { formattedShipping, formattedShippingMetadata };
    }

    const formattedShipping = new OrderShippingRequestDto({
      company: "",
      address1: this.billing?.address,
      city: "",
      state: "",
      postcode: "",
      country: "EC",
      email: this.billing?.email,
      phone: this.billing?.phone,
    });

    const formattedShippingMetadata = {
      shippingEmail: this.billing?.email,
    };

    return { formattedShipping, formattedShippingMetadata };
  }

  formatBilling() {
    return new OrderBillingRequestDto({
      firstName: this.billing?.name,
      lastName: this.billing?.lastName,
      company: "",
      address1: this.billing?.address,
      address2: this.billing?.addressStreet,
      city: "",
      postcode: "",
      country: "EC",
      state: "",
      email: this.billing?.email,
      phone: this.billing?.phone,
    });
  }

  formatShippingLine() {
    const shippingLine = new OrderShippingLineRequestDto({
      methodId: this.shippingZone.id,
      methodTitle: this.shippingZone.title,
      total: this.shippingZone.costPerOrder.slice(1),
    });

    return [shippingLine];
  }
}
