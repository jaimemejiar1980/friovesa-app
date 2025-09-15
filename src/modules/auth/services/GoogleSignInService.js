import { API } from "../../../constants/wordpress";
import { AuthService } from "./AuthService";
import { AuthResponse } from "../dto";
import { CustomError } from "../../../errors";
import lang from "../../../lang/es";

export class GoogleSignInService extends AuthService {
  constructor({ accessToken }) {
    super();
    this.accessToken = accessToken;
  }

  async signIn() {
    const response = await fetch(API.AUTH.GOOGLE_SIGN_IN.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: this.accessToken,
      },
    });

    const responseJson = await response.json();
    console.log(
      "🚀 ~ GoogleSignInService ~ signIn ~ responseJson:",
      JSON.stringify(responseJson, null, 2)
    );

    if (!response.ok) {
      throw new CustomError(lang?.cannotSignInWithGoogleTryAgainLater);
    }

    return new AuthResponse(responseJson);
  }
}
