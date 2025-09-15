import { ProductDTO } from "../dto";
import { ProductService } from "../services";
import { useEffect, useState } from "react";

/**
 * The state and functions for fetching product.
 * @typedef {Object} UseProduct
 *
 * @property {boolean} isLoading - Indicates whether the data is currently loading.
 * @property {boolean} isError - Indicates whether there was an error fetching the data.
 * @property {ProductDTO} product - The fetched product.
 */

/**
 * A custom hook that fetches product variations using infinite scrolling.
 *
 * @param {number} id - The product id to fetch.
 *
 * @returns {UseProduct} - The state and functions for fetching product.
 */
export default function useProduct({ id }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productService = new ProductService();

      setIsLoading(true);
      setIsError(false);

      try {
        const productData = await productService.getProduct({ id });
        setProduct(productData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    isLoading,
    isError,
  };
}
