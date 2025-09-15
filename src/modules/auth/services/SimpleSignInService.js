import { API } from "../../../constants/wordpress";
import { AuthService } from "./AuthService";
import { AuthResponse } from "../dto";
import { CustomError } from "../../../errors";
import lang from "../../../lang/es";

export class SimpleSignInService extends AuthService {
  constructor({ username, password }) {
    super();
    this.username = username;
    this.password = password;
  }

  async signIn() {
    const response = await fetch(API.AUTH.SIMPLE_SIGN_IN.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    });

    const responseJson = await response.json();
    console.log(
      "🚀 ~ SimpleSignInService ~ signIn ~ responseJson:",
      JSON.stringify(responseJson, null, 2)
    );

    if (!response.ok && response.status === 403) {
      throw new CustomError(lang?.usernameOrPasswordInvalid);
    }

    if (!response.ok) {
      throw new CustomError(lang?.cannotLoginTryAgainLater);
    }

    return new AuthResponse(responseJson);
  }
}
