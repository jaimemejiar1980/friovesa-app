import { API, API_KEY } from "../../../constants/wordpress";
import { api, apiPrivate } from "../../../axios";
import { CustomError } from "../../../errors";
import { SessionStoreService } from "./SessionStoreService";
import { signUpErrorMapper } from "../errors";

export default class Auth {
  static async signUp({ username, name, lastName, email, password }) {
    const response = await fetch(API.AUTH.SIGNUP.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({
        username,
        first_name: name,
        last_name: lastName,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    console.log("🚀 ~ Auth ~ signUp ~ responseJson:", responseJson);

    if (!response.ok) {
      const errorCode = responseJson?.code;
      throw new CustomError(signUpErrorMapper(errorCode));
    }

    return response.ok;
  }

  static async refreshToken() {
    const refreshToken = await SessionStoreService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await api.post(API.AUTH.REFRESH_TOKEN.URL, null, {
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { access_token: newAccessToken } = response.data;
    await SessionStoreService.setAccessToken(newAccessToken);
    return newAccessToken;
  }

  static formatAuthResult(data) {
    return {
      accessToken: data?.access_token,
      id: data?.store_id,
      username: data?.user_display_name || data?.user_nicename,
      email: data?.user_email,
    };
  }

  static async deleteAccount({ username, password }) {
    await apiPrivate.delete(API.AUTH.DELETE_ACCOUNT.URL, {
      data: {
        username,
        password,
      },
    });
  }
}
