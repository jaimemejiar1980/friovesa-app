import { API } from "../../../constants/wordpress";
import { AuthResponse } from "../dto";
import { AuthService } from "./AuthService";
import { CustomError } from "../../../errors";
import lang from "../../../lang/es";

export class AppleSignInService extends AuthService {
  constructor({ authorizationCode, identityToken, firstName, lastName }) {
    super();
    this.authorizationCode = authorizationCode;
    this.identityToken = identityToken;
    this.firstName = firstName?.trim()?.split(" ")?.join("") ?? "";
    this.lastName = lastName?.trim()?.split(" ")?.join("") ?? "";
  }

  async signIn() {
    const response = await fetch(API.AUTH.APPLE_SIGN_IN.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorization_code: this.authorizationCode,
        first_name: this.firstName,
        last_name: this.lastName,
      }),
    });

    const responseJson = await response.json();
    console.log(
      "🚀 ~ AppleSignInService ~ signIn ~ responseJson:",
      JSON.stringify(responseJson, null, 2)
    );

    if (!response.ok) {
      throw new CustomError(lang?.cannotSignWithAppleTryAgainLater);
    }

    return new AuthResponse(responseJson);
  }
}
