import { API, API_KEY } from "../../../constants/wordpress";
import { HOME_CAROUSEL } from "../../../constants/imagesCarousel";

export default class HomeServices {
  static async getCarouselImages() {
    const response = await fetch(API.CAROUSEL.URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      return HOME_CAROUSEL;
    }

    const responseJson = await response.json();
    return responseJson;
  }
}
