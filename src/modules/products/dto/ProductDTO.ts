import { convertToMoney, removeHtmlTags } from "@/lib/utils";
import { DEFAULT_STOCK_QUANTITY, PRODUCT_TYPES } from "@/constants";

/**
 * Interface representing the structure of a WooCommerce product response.
 */
interface ProductResponse {
  id: number;
  name: string;
  type: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number;
  categories: any[];
  images: any[];
  variations: number;
  price_html: string;
  related_ids: number[];
  stock_status: string;
  catalog_visibility: string;
  meta_data: any[];
}

/**
 * Data Transfer Object (DTO) representing a WooCommerce Product.
 * This DTO is used to structure and format product data retrieved from
 * the WooCommerce REST API, following the standard product properties.
 *
 * @see {@link https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties}
 */
export class ProductDTO {
  /** The unique identifier for the product. */
  public id: number;

  /** The name of the product. */
  public name: string;

  /** The type/category of the product. */
  public type: string;

  /** A detailed description of the product. */
  public description: string;

  /** A short description of the product. */
  public shortDescription: string;

  /** The stock keeping unit identifier for the product. */
  public sku: string;

  /** The price of the product. */
  public price: string;

  /** The regular price of the product before any sale. */
  public regularPrice: string;

  /** The formatted price (e.g., "$15.99"). */
  public formattedPrice: string;

  /** The sale price of the product, if applicable. */
  public salePrice: string;

  /** The available stock quantity of the product. */
  public stockQuantity: number;

  /** List of categories the product belongs to. */
  public categories: string[];

  /** Image url of the product */
  public imageUrl: string;

  /** List of product variations IDs. */
  public variations: number;

  /** HTML representation of the product price. */
  public priceHtml: string;

  /** List of product IDs related to this product. */
  public relatedIds: number[];

  /** Whether the product is in stock. */
  public inStock: boolean;

  /** The visibility of the product. */
  public catalogVisibility: string;

  /** Minimum purchase limit for bundled products. */
  public totalLimitMin?: string;

  /**
   * Create a ProductDTO.
   *
   * @param {ProductResponse} data - The WooCommerce product response data.
   *
   * @example
   * const product = new ProductDTO({
   *   id: 123,
   *   name: "Sample Product",
   *   ...
   *   price: "15.99",
   *   ....
   *   categories: [
   *    {
   *      "id": 1,
   *      "name": "Category A",
   *      "slug": "category-a"
   *    },
   *    {
   *      "id": 1,
   *      "name": "Category B",
   *      "slug": "category-b"
   *    },
   *   ],
   *   ...
   * });
   */
  constructor({
    id,
    name,
    type,
    description,
    short_description,
    sku,
    price,
    regular_price,
    sale_price,
    stock_quantity,
    categories,
    images,
    variations,
    price_html,
    related_ids,
    stock_status,
    catalog_visibility,
    meta_data,
  }: ProductResponse) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.shortDescription = short_description;
    this.sku = sku;
    this.price = price;
    this.regularPrice = regular_price;
    this.formattedPrice = convertToMoney(price);
    this.salePrice = sale_price;
    this.stockQuantity = getStockQuantity(stock_quantity);
    this.categories = getCategoriesNames(categories);
    this.imageUrl = getImages(images);
    this.variations = variations;
    this.priceHtml = getPriceHtml(price_html, price);
    this.relatedIds = related_ids;
    this.inStock = isInStock(stock_status);
    this.catalogVisibility = catalog_visibility;

    /**
     * If it is an included product, a minimum purchase value will be established.
     */
    if (this.type === PRODUCT_TYPES.BUNDLE) {
      const min = meta_data?.filter(
        (metaData) => metaData?.key === "woosb_total_limits_min"
      )[0];

      this.totalLimitMin = min?.value;
    }
  }
}

function getPriceHtml(priceHtml: string, price: string): string {
  if (!priceHtml) return price;
  return removeHtmlTags(priceHtml);
}

export function isInStock(stockStatus: string): boolean {
  return stockStatus === "instock";
}

function getImages(images: any): string {
  return images[0]?.src;
}

function getCategoriesNames(categories: any): string[] {
  if (!categories) return [];
  return categories.map((category: any) => category.name);
}

export function getStockQuantity(stock: number): number {
  try {
    if (stock === null || isNaN(stock)) return DEFAULT_STOCK_QUANTITY;
    return stock;
  } catch (error) {
    return DEFAULT_STOCK_QUANTITY;
  }
}
