import { api } from "../../../axios";
import {
  API,
  CONSUMER_KEY,
  CONSUMER_SECRET,
} from "../../../constants/wordpress";
import { buildURL, getPaginationData } from "../../../lib/URLs";
import { ProductDTO, ProductVariationDTO } from "../dto";

export default class ProductService {
  async getProducts({
    category = "",
    page = 1,
    perPage = API.PRODUCTS.RESULTS_PER_PAGE,
    orderBy = "name",
    search = "",
    catalogVisibility = "visible",
  }) {
    const url = buildURL(API.PRODUCTS.URL, {
      status: "publish",
      skip_cache: 1,
      page,
      per_page: perPage,
      category,
      orderby: orderBy,
      search,
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const responseJson = await response.json();
    const products = responseJson.map((product) => new ProductDTO(product));
    const filteredProducts = products.filter(
      (product) => product.catalogVisibility === catalogVisibility
    );
    const pagination = getPaginationData(response);
    return { data: filteredProducts, pagination };
  }

  async getProduct({ id }) {
    const url = buildURL(`${API.PRODUCTS.URL}/${id}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const responseJson = await response.json();
    const product = new ProductDTO(responseJson);
    return product;
  }

  async getProductsByIds({
    page = 1,
    perPage = API.PRODUCTS.RESULTS_PER_PAGE,
    ids,
  }) {
    const url = buildURL(
      API.PRODUCTS.URL,
      {
        status: "publish",
        skip_cache: 1,
        page,
        per_page: perPage,
      },
      {
        include: ids.join(","),
      }
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products by ids");
    }

    const responseJson = await response.json();
    const products = responseJson.map((product) => new ProductDTO(product));
    const pagination = getPaginationData(response);

    return { data: products, pagination };
  }

  async getProductVariations({
    page = 1,
    perPage = API.PRODUCTS.VARIATIONS.RESULTS_PER_PAGE,
    productId,
  }) {
    const response = await api.get(
      `${API.PRODUCTS.VARIATIONS.URL}/${productId}/variations`,
      {
        params: {
          order: "asc",
          status: "publish",
          orderby: "title",
          skip_cache: 1,
          page,
          per_page: perPage,
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
        },
      }
    );

    const products = response?.data?.map(
      (product) => new ProductVariationDTO(product)
    );
    const pagination = getPaginationData({
      headers: response.headers,
      url: response.request._url,
    });
    return { data: products, pagination };
  }

  async getBundledProducts({
    page = 1,
    perPage = API.PRODUCTS.BUNDLES.RESULTS_PER_PAGE,
    productId,
  }) {
    const response = await api.get(
      `${API.PRODUCTS.BUNDLES.URL}/${productId}/bundles`,
      {
        params: {
          skip_cache: 1,
          page,
          per_page: perPage,
        },
      }
    );

    const products = response?.data?.map((product) => new ProductDTO(product));

    const pagination = getPaginationData({
      headers: response.headers,
      url: response.request._url,
    });

    return { data: products, pagination };
  }
}
