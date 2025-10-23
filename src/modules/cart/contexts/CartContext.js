import { createContext } from "react";

/**
 * @typedef {Object} CartContextValue
 *
 * @property {function} addToCart - Add a product to the cart.
 * @property {function} clearCart - Clear the cart.
 * @property {function} decreaseQuantity - Decrease the quantity of a product in the cart by 1.
 * @property {function} removeFromCart - Remove a product from the cart.
 * @property {function} setQuantity - Set the specific quantity of a product in the cart.
 * @property {string} cityName - The city name where the products are being bought.
 * @property {Number} itemsCount - The total number of products in the cart.
 * @property {Number} productQuantity - Get the quantity of a specific product in the cart.
 * @property {Object} state - The current state of the cart.
 * @property {string} total - The total price of the products in the cart.
 * @property {string} cupon - The coupon apply.
 * @property {function} updateCupon - Add a product to the cart.
 * @property {string} afiliado - The coupon apply.
 * @property {function} updateAfiliado - Add a product to the cart.
 */

/**
 * @type {React.Context<CartContextValue>}
 */
export const CartContext = createContext();
