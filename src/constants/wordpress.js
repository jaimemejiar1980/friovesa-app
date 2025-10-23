export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const PLUGIN_URL = `${API_URL}/wp-json/friovesa-mobile-api`;
export const API_KEY = process.env.EXPO_PUBLIC_MOBILE_API_KEY;

export const CONSUMER_KEY = process.env.EXPO_PUBLIC_CONSUMER_KEY;
export const CONSUMER_SECRET = process.env.EXPO_PUBLIC_CONSUMER_SECRET;

export const API = {
  NOTIFICATION: {
    APP_VERSION_ANDROID: {
      URL: `${PLUGIN_URL}/v3/notification/app-version/android`,
    },
    APP_VERSION_IOS: {
      URL: `${PLUGIN_URL}/v3/notification/app-version/ios`,
    },
    APP_AVAILABILITY_ANDROID: {
      URL: `${PLUGIN_URL}/v3/notification/app-availability/android`,
    },
    APP_AVAILABILITY_IOS: {
      URL: `${PLUGIN_URL}/v3/notification/app-availability/ios`,
    },
  },
  PRODUCTS: {
    URL: `${API_URL}/wp-json/wc/v3/products`,
    RESULTS_PER_PAGE: 10,
    RELATED_RESULTS_PER_PAGE: 20,
    VARIATIONS: {
      URL: `${API_URL}/wp-json/wc/v3/products`,
      RESULTS_PER_PAGE: 50,
    },
    BUNDLES: {
      URL: `${PLUGIN_URL}/v3/products`,
      RESULTS_PER_PAGE: 20,
    },
  },
  CATEGORIES: {
    URL: `${API_URL}/wp-json/wc/v3/products/categories`,
    RESULTS_PER_PAGE: 100,
  },
  AUTH: {
    SIGNUP: {
      URL: `${PLUGIN_URL}/v3/auth/signup`,
    },
    REFRESH_TOKEN: {
      URL: `${PLUGIN_URL}/v3/auth/token/refresh`,
    },
    SIMPLE_SIGN_IN: {
      URL: `${PLUGIN_URL}/v3/auth/login`,
    },
    GOOGLE_SIGN_IN: {
      URL: `${PLUGIN_URL}/v3/auth/google/login`,
    },
    APPLE_SIGN_IN: {
      URL: `${PLUGIN_URL}/v3/auth/apple/login`,
    },
    DELETE_ACCOUNT: {
      URL: `${PLUGIN_URL}/v3/auth/delete-account`,
    },
  },
  CHECKOUT: {
    SHIPPING_ZONES: {
      URL: `${PLUGIN_URL}/v3/shipping-zones`,
    },
    PAYMENT_METHODS: {
      URL: `${PLUGIN_URL}/v3/payment-methods`,
    },
  },
  ORDERS: {
    CREATE: {
      URL: `${PLUGIN_URL}/v4/orders`,
    },
  },
  COUPON: {
    GET_ALL: {
      URL: `${API_URL}/wp-json/wc/v3/coupons`,
    },
  },
  AFFILIATES: {
    GET_ALL: {
      URL: `${PLUGIN_URL}/v4/affiliates`,
    },
    IS_AFFILIATE: {
      URL: `${PLUGIN_URL}/v4/is_affiliates`,
    },
  },
  CUSTOMER_ORDERS: {
    URL: `${API_URL}/wp-json/wc/v3/orders`,
    RESULTS_PER_PAGE: 10,
  },
  CAROUSEL: {
    URL: `${PLUGIN_URL}/v3/carousel/home`,
  },
};

// matches the WooCommerce payment methods
export const AVAILABLE_PAYMENT_METHODS = {
  BANK: "bacs",
  PAGOMEDIOS: "pagomedios",
};

export const UIO_CATEGORY_ID = 135;
export const GYE_CATEGORY_ID = 134;

export const CITIES = {
  Uio: {
    id: UIO_CATEGORY_ID,
  },
  Gye: {
    id: GYE_CATEGORY_ID,
  },
};

// To avoid displaying specific categories in the category list
export const BLOCKED_CATEGORY_IDS = [
  // 103, // Canasta Frutas y Verduras
  // 238, // frutas y verduras frescas uio
];

export const PRODUCT_TYPES = {
  SIMPLE: "simple",
  VARIABLE: "variable",
  BUNDLE: "woosb",
};

export const DEFAULT_STOCK_QUANTITY = 10;
export const MIN_CART_PRODUCTS_QUANTITY = 1;

// the values of BUSINESS TYPES AND DOCUMENT TYPES are based on Friovesa Mobile Api WordPress Plugin
export const BUSINESS_TYPES = [
  { value: "Persona Natural", title: "Persona Natural" },
  { value: "Empresa", title: "Empresa" },
];

export const DOCUMENT_TYPE_VALUES = {
  RUC: "RUC",
  NATIONAL_ID: "Cédula de identidad",
  PASSPORT: "Pasaporte",
  FOREIGN_ID: "ID del exterior",
};

export const DOCUMENT_TYPES = [
  { value: DOCUMENT_TYPE_VALUES.RUC, title: DOCUMENT_TYPE_VALUES.RUC },
  {
    value: DOCUMENT_TYPE_VALUES.NATIONAL_ID,
    title: DOCUMENT_TYPE_VALUES.NATIONAL_ID,
  },
  {
    value: DOCUMENT_TYPE_VALUES.PASSPORT,
    title: DOCUMENT_TYPE_VALUES.PASSPORT,
  },
  {
    value: DOCUMENT_TYPE_VALUES.FOREIGN_ID,
    title: DOCUMENT_TYPE_VALUES.FOREIGN_ID,
  },
];

export const ORDER_STATUS = {
  pending: "Pendiente",
  processing: "En proceso",
  "on-hold": "En espera",
  completed: "Completado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
  failed: "Fallido",
  trash: "Basura",
};

export const STORE_LINKS = {
  APP_STORE: "https://apps.apple.com/ec/app/friovesa/id1639810429",
  GOOGLE_PLAY:
    "https://play.google.com/store/apps/details?id=com.friovesa.store",
};

export const APP_EXTERNAL_LINKS = {
  APP_WEB: {
    DEFAULT: API_URL,
    RESTORE_PASSWORD: `${API_URL}/mi-cuenta/lost-password/`,
  },
};
