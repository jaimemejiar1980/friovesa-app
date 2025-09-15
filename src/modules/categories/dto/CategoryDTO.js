/**
 * Data Transfer Object (DTO) representing a WooCommerce Category.
 * This DTO is used to structure and format category data retrieved from
 * the WooCommerce REST API, following the standard category properties.
 *
 * @see {@link https://woocommerce.github.io/woocommerce-rest-api-docs/#product-category-properties}
 */
export class CategoryDTO {
  /**
   * Create a CategoryDTO.
   *
   * @param {number} id - The unique identifier for the category.
   * @param {string} name - The name of the category.
   * @param {string} slug - An alphanumeric identifier for the resource unique to its type.
   * @param {string} description - HTML description of the resource.
   * @param {Object} image - image object of the category.
   *
   * @example
   * const category =  new CategoryDTO({
   *    id: 123,
   *    name: "Category Name",
   *    slug: "category",
   *    description: "",
   *    image:  {
   *        src: "https://myapp.com/../image.webp"
   *    }
   * })
   */
  constructor({ id, name, slug, description, image }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.imageUrl = image?.src;
  }
}
