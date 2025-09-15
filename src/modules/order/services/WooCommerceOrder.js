import { PRODUCT_TYPES } from "../../../constants/wordpress";

export class WooCommerceOrderMeta {
  constructor({
    company_type,
    document_type,
    document,
    sector,
    shipping_company,
    shipping_invoice,
    shipping_email,
  }) {
    this.company_type = company_type;
    this.document_type = document_type;
    this.document = document;
    this.sector = sector;

    if (shipping_company) {
      this.shipping_company = shipping_company;
    }
    if (shipping_invoice) {
      this.shipping_invoice = shipping_invoice;
    }
    if (shipping_email) {
      this.shipping_email = shipping_email;
    }
  }
}

export class WooCommerceOrder {
  constructor({
    payment_method,
    payment_method_title,
    customer_id,
    customer_note,
    billing,
    shipping,
    line_items,
    shipping_lines,
  }) {
    this.origin = "mobile";
    this.payment_method = payment_method;
    this.payment_method_title = payment_method_title;
    this.customer_id = customer_id;
    this.customer_note = customer_note;
    this.billing = billing;
    this.shipping = shipping;
    this.line_items = line_items;
    this.shipping_lines = shipping_lines;
  }
}

export class WooCommerceProduct {
  constructor({ product_id, quantity }) {
    this.product_id = product_id;
    this.quantity = quantity;
  }
}

export class WooCommerceBilling {
  constructor({
    first_name,
    last_name,
    company,
    address_1,
    address_2,
    city,
    postcode,
    country,
    state,
    email,
    phone,
  }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.company = company;
    this.address_1 = address_1;
    this.address_2 = address_2;
    this.city = city;
    this.postcode = postcode;
    this.country = country;
    this.state = state;
    this.email = email;
    this.phone = phone;
  }
}

export class WooCommerceShipping {
  constructor({
    first_name,
    last_name,
    company,
    address_1,
    address_2,
    city,
    state,
    postcode,
    country,
    email,
    phone,
  }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.company = company;
    this.address_1 = address_1;
    this.address_2 = address_2;
    this.city = city;
    this.state = state;
    this.postcode = postcode;
    this.country = country;
    this.email = email;
    this.phone = phone;
  }
}

export class WooCommerceShippingLine {
  constructor({ method_id, method_title, total }) {
    this.method_id = method_id;
    this.method_title = method_title;
    this.total = total;
  }
}

export class WooCommerceOrderFormatter {
  constructor({
    shippingZone,
    paymentMethod,
    billing,
    shipping,
    cart,
    customerId,
    settings,
  }) {
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      const productInCart = cart[i];

      products.push(
        new WooCommerceProduct({
          product_id: productInCart?.id,
          quantity: productInCart?.quantity,
        })
      );

      if (productInCart?.type !== PRODUCT_TYPES.BUNDLE) {
        continue;
      }

      if (productInCart?.bundle && productInCart?.bundle?.length === 0) {
        continue;
      }

      const bundle = productInCart.bundle;
      const bundleMultiplier = productInCart?.quantity;

      const formattedBundle = bundle?.map((item) => {
        const newQuantity = item?.quantity * bundleMultiplier;

        return new WooCommerceProduct({
          product_id: item?.id,
          quantity: newQuantity,
        });
      });

      const updatedProducts = products.concat(formattedBundle);
      products = updatedProducts;
    }

    const newBilling = new WooCommerceBilling({
      first_name: billing?.name,
      last_name: billing?.lastName,
      company: "",
      address_1: billing?.address,
      address_2: billing?.addressStreet,
      city: "",
      postcode: "",
      country: "EC",
      state: "",
      email: billing?.email,
      phone: billing?.phone,
    });

    let newShipping = {};
    let shippingMetadata = {};
    if (billing?.isShippingDifferent) {
      newShipping = new WooCommerceShipping({
        first_name: shipping?.name,
        last_name: shipping?.lastName,
        company: "",
        address_1: shipping?.address,
        address_2: shipping?.addressStreet,
        city: "",
        state: "",
        postcode: "",
        country: "EC",
        email: shipping?.email,
        phone: shipping?.phone,
      });

      shippingMetadata = {
        shipping_company: shipping?.businessName,
        shipping_email: shipping?.email,
      };
    } else {
      newShipping = new WooCommerceShipping({
        first_name: null,
        last_name: null,
        company: "",
        address_1: billing?.address,
        address_2: null,
        city: "",
        state: "",
        postcode: "",
        country: "EC",
        email: billing?.email,
        phone: billing?.phone,
      });

      shippingMetadata = {
        shipping_email: billing?.email,
      };
    }

    const shippingLines = [
      new WooCommerceShippingLine({
        method_id: shippingZone.id,
        method_title: shippingZone.title,
        total: shippingZone.costPerOrder.slice(1),
      }),
    ];

    this.order = {
      order_meta: new WooCommerceOrderMeta({
        company_type: billing.businessType,
        document_type: billing.documentType,
        document: billing.identification,
        sector: billing.sector,
        ...shippingMetadata,
      }),
      order: new WooCommerceOrder({
        payment_method: paymentMethod.id,
        payment_method_title: paymentMethod.title,
        customer_id: customerId,
        customer_note: billing?.additionalNotes,
        billing: newBilling,
        shipping: newShipping,
        line_items: products,
        shipping_lines: shippingLines,
      }),
      order_settings: {
        store: settings.store?.toUpperCase(), // define the city to handle events in Friovesa Mobile Api plugin
      },
    };
  }
}
