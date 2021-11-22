import { nanoid } from 'nanoid';

import { JwtConfig } from '@config/index';
import { ServiceCore } from '@core/index';
import { UserService } from '@modules/user';
import { EmailQueue, EMAIL_FORGOT_PASSWORD } from '@providers/email';
import { JWTService } from '@providers/jwt';
import { HttpExceptionType, httpError, httpSuccess } from '@utils/index';

import { LoginRequest, RefreshTokenRequest, LogoutRequest } from '../auth.type';
import { IAuthService } from '../interface';

import TokenService from './token.service';

export default class AuthService extends ServiceCore implements IAuthService {
  private readonly tokenService: TokenService;
  private readonly userService: UserService;

  constructor() {
    super();

    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  async forgotPassword(body: Pick<LoginRequest, 'email'>) {
    const { email } = body;
    const { id } = await this.userService.getOne({ email });

    const confirmTokenPassword = nanoid();
    const opts = {
      expiresIn: JwtConfig.expiresInToken,
    };
    const payload = {
      jti: confirmTokenPassword,
      sub: String(id),
      email,
    };

    const token = JWTService.sign(payload, JwtConfig.secretToken, opts);

    await this.userService.update({ id }, { confirmTokenPassword });
    void EmailQueue.add(EMAIL_FORGOT_PASSWORD, { token, email });

    return httpSuccess(HttpExceptionType.RESET_PASSWORD_SENT_EMAIL);
  }

  async login(body: LoginRequest) {
    const { email, password } = body;
    const user = await this.userService.getOne({ email });

    if (!this.userService.validateCredentials(user, password)) {
      throw httpError(HttpExceptionType.INVALID_CREDENTIALS);
    }

    return this.tokenService.getToken({ id: user.id, email });
  }

  async logout(body: LogoutRequest) {
    const { userId } = body;

    await this.tokenService.update({ userId }, { isRevoked: true });
  }

  async refreshToken(body: RefreshTokenRequest) {
    const { user } = await this.tokenService.resolveRefreshToken(
      body.refreshToken,
    );

    return this.tokenService.getToken({ id: user.id, email: user.email });
  }

  resetPassword() {
    throw new Error('Method not implemented.');
  }
}
