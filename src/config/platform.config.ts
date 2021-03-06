import { Config } from '@core/config';
import { AppleConfig, FacebookConfig, GoogleConfig } from '@utils';

class PlatformConfig extends Config {
  readonly apple: AppleConfig;
  readonly facebook: FacebookConfig;
  readonly google: GoogleConfig;

  constructor() {
    super();

    this.apple = {
      url: this.set<string>('APPLE_URL', this.joi.string().required(), ''),
    };

    this.facebook = {
      url: this.set<string>('FACEBOOK_URL', this.joi.string().required(), ''),
      fields: this.set<string>(
        'FACEBOOK_FIELDS',
        this.joi.string().required(),
        '',
      ),
    };

    this.google = {
      clientId: this.set<string>(
        'GOOGLE_CLIENT_ID',
        this.joi.string().required(),
        '',
      ),
    };
  }
}

export default new PlatformConfig();
