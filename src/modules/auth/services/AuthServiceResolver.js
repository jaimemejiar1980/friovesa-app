import { AuthService } from "./AuthService";
import { SessionStoreService } from "./SessionStoreService";
import { UserStoreService } from "./UserStoreService";

export class AuthServiceResolver {
  /**
   *
   * @param {AuthService} authService
   */
  constructor(authService) {
    this.authService = authService;
  }

  async signIn() {
    const result = await this.authService.signIn();
    await UserStoreService.save(result.getUserData());
    await SessionStoreService.save(result.getSessionData());
  }
}
