import { CART_ACTIONS } from "./CartActions";
import { errorToast, successToast } from "../../../lib/Toast";
import { generateUUID } from "../../../lib/utils";
import lang from "../../../lang/es";

function findProductInCart(cart, productId) {
  const productInCartIndex = cart?.findIndex((item) => item.id === productId);
  const isProductNotInCart = productInCartIndex === -1;

  return { productInCartIndex, isProductNotInCart };
}

function findProductInCartByUUID(cart, productUUID) {
  const productInCartIndex = cart?.findIndex(
    (item) => item.uuid === productUUID
  );
  const isProductNotInCart = productInCartIndex === -1;

  return { productInCartIndex, isProductNotInCart };
}

function populateCart(state, action) {
  const { products, cityName } = action.payload;
  return {
    cityName: cityName,
    cart: products,
    renderToast: () => {},
  };
}

function addBundledProductToCart(state, action) {
  const { product, cityName, quantity } = action.payload;
  const { cart } = state;

  const newQuantity = Number(quantity);
  const uuid = generateUUID();

  return {
    cityName: cityName,
    cart: [
      ...cart,
      { ...action?.payload?.product, quantity: newQuantity, uuid },
    ],
    renderToast: () =>
      successToast({
        title: product?.name,
        subtitle: lang?.addToCartSuccessfully,
      }),
  };
}

function addToCart(state, action) {
  const { product, cityName, quantity } = action.payload;
  const { cart } = state;
  const { productInCartIndex, isProductNotInCart } = findProductInCart(
    cart,
    product?.id
  );
  const newQuantity = Number(quantity);
  const uuid = generateUUID();

  if (isProductNotInCart) {
    return {
      cityName: cityName,
      cart: [
        ...cart,
        { ...action?.payload?.product, quantity: newQuantity, uuid },
      ],
      renderToast: () =>
        successToast({
          title: product?.name,
          subtitle: lang?.addToCartSuccessfully,
        }),
    };
  }

  const currentQuantity = Number(cart[productInCartIndex].quantity);
  const maxQuantity = Number(cart[productInCartIndex].stockQuantity);
  const hasReachedMaxQuantity = currentQuantity === maxQuantity;
  const willExceedMaxQuantity = currentQuantity + newQuantity > maxQuantity;

  if (hasReachedMaxQuantity || willExceedMaxQuantity) {
    return {
      cityName: cityName,
      cart: cart,
      renderToast: () =>
        errorToast({
          title: `${
            lang?.youCanOnlyPurchase
          } ${maxQuantity} ${lang?.forThisProduct?.toLowerCase()}`,
        }),
    };
  }

  const beforeProduct = cart?.slice(0, productInCartIndex);
  const afterProduct = cart?.slice(productInCartIndex + 1);
  const productQuantityAdded = {
    ...cart[productInCartIndex],
    quantity: currentQuantity + newQuantity,
  };
  const newState = [...beforeProduct, productQuantityAdded, ...afterProduct];
  return {
    cityName: cityName,
    cart: newState,
    renderToast: () =>
      successToast({
        title: product?.name,
        subtitle: lang?.addToCartSuccessfully,
      }),
  };
}

function clearCart() {
  return {
    cityName: "",
    cart: [],
    renderToast: () => {},
  };
}

function decreaseQuantity(state, action) {
  const { productId } = action.payload;
  const { cart, cityName } = state;
  const { productInCartIndex, isProductNotInCart } = findProductInCart(
    cart,
    productId
  );

  if (isProductNotInCart) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  const currentQuantity = Number(cart[productInCartIndex].quantity);
  const willBeRemovedFromCart = currentQuantity === 1;
  if (willBeRemovedFromCart) {
    const newState = cart?.filter((item) => item.id !== productId);
    return {
      cityName: cityName,
      cart: newState,
    };
  }

  const beforeProduct = cart?.slice(0, productInCartIndex);
  const afterProduct = cart?.slice(productInCartIndex + 1);
  const productQuantityDecreased = {
    ...cart[productInCartIndex],
    quantity: currentQuantity - 1,
  };

  const newState = [
    ...beforeProduct,
    productQuantityDecreased,
    ...afterProduct,
  ];
  return {
    cityName: cityName,
    cart: newState,
  };
}

function removeFromCart(state, action) {
  const { productUUID } = action.payload;
  const { cart, cityName } = state;
  const { isProductNotInCart } = findProductInCartByUUID(cart, productUUID);

  if (isProductNotInCart) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  const newState = cart?.filter((item) => item.uuid !== productUUID);
  return {
    cityName: cityName,
    cart: newState,
  };
}

function setQuantity(state, action) {
  const { productUUID, quantity } = action.payload;
  const { cart, cityName } = state;
  const { productInCartIndex, isProductNotInCart } = findProductInCartByUUID(
    cart,
    productUUID
  );

  if (isProductNotInCart) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  const newQuantity = Number(quantity);
  const currentQuantity = Number(cart[productInCartIndex].quantity);
  if (currentQuantity === newQuantity) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  const beforeProduct = cart?.slice(0, productInCartIndex);
  const afterProduct = cart?.slice(productInCartIndex + 1);
  const productQuantityAdded = {
    ...cart[productInCartIndex],
    quantity: newQuantity,
  };
  const newState = [...beforeProduct, productQuantityAdded, ...afterProduct];
  return {
    cityName: cityName,
    cart: newState,
  };
}

const UPDATE_STATE = {
  [CART_ACTIONS.ADD_TO_CART]: addToCart,
  [CART_ACTIONS.ADD_BUNDLED_PRODUCT_TO_CART]: addBundledProductToCart,
  [CART_ACTIONS.CLEAR_CART]: clearCart,
  [CART_ACTIONS.DECREASE_QUANTITY]: decreaseQuantity,
  [CART_ACTIONS.POPULATE_CART]: populateCart,
  [CART_ACTIONS.REMOVE_FROM_CART]: removeFromCart,
  [CART_ACTIONS.SET_QUANTITY]: setQuantity,
};

export function CartReducer(state, action) {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE[actionType];
  return updateState ? updateState(state, action) : state;
}
