import { convertToMoney } from "../../../lib/utils";
import { getStockQuantity, isInStock } from "./ProductDTO";

/**
 * Data Transfer Object (DTO) representing a WooCommerce Product Variation.
 * This DTO is used to structure and format product variation data retrieved from
 * the WooCommerce REST API, following the standard product properties.
 *
 * @see {@link https://woocommerce.github.io/woocommerce-rest-api-docs/#product-variation-properties}
 */
export class ProductVariationDTO {
  /**
   * Create a ProductVariationDTO.
   *
   * @param {number} id - The unique identifier for the product.
   * @param {string} name - The name of the product.
   * @param {string} type - The type/category of the product.
   * @param {string} description - A detailed description of the product.
   * @param {string} sku - The stock keeping unit identifier for the product.
   * @param {string} price - The price of the product.
   * @param {string} regular_price - The regular price of the product before any sale.
   * @param {string} sale_price - The sale price of the product, if applicable.
   * @param {number} stock_quantity - The available stock quantity of the product.
   * @param {Object} image - Image object related to the product.
   * @param {string} stock_status - The stock status.
   * @param {number} parent_id - The id of the parent product (The one with the variations).
   *
   * @example
   * const product = new ProductDTO({
   *   id: 123,
   *   name: "Sample Product",
   *   ...
   *   price: "15.99",
   *   ...
   * });
   */
  constructor({
    id,
    name,
    type,
    description,
    sku,
    price,
    regular_price,
    sale_price,
    stock_quantity,
    image,
    stock_status,
    parent_id,
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.sku = sku;
    this.price = price;
    this.regularPrice = regular_price;
    this.formattedPrice = convertToMoney(price);
    this.salePrice = sale_price;
    this.stockQuantity = getStockQuantity(stock_quantity);
    this.imageUrl = getImage(image);
    this.inStock = isInStock(stock_status);
    this.parentId = parent_id;
  }
}

function getImage(image) {
  return image?.src;
}
