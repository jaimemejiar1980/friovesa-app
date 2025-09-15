import { API, BLOCKED_CATEGORY_IDS } from "../../../constants/wordpress";
import { buildURL, getPaginationData } from "../../../lib/URLs";
import { CategoryDTO } from "../dto";

export class CategoryService {
  async getCategories({
    parentId,
    page = 1,
    perPage = API.CATEGORIES.RESULTS_PER_PAGE,
    orderBy = "name",
  }) {
    const url = buildURL(
      API.CATEGORIES.URL,
      {
        parent: parentId,
        page,
        per_page: perPage,
        orderby: orderBy,
        hide_empty: true,
      },
      {
        exclude: BLOCKED_CATEGORY_IDS.join(","),
      }
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const responseJson = await response.json();
    const categories = responseJson.map(
      (category) => new CategoryDTO(category)
    );
    const pagination = getPaginationData(response);

    return { data: categories, pagination };
  }
}
