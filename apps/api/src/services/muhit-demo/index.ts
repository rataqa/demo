import { MuhitService } from '@rataqa/muhit';

import { IConfig, IEnvSettings } from './types';

export class MyEnvSettings extends MuhitService<IEnvSettings> {
  config(): IConfig {
    return {
      appInfo: {
        appName: 'api',
        appVersion: '1.2.3',
      },
      http: {
        port: this.portRequired('HTTP_PORT'),
      },
      logger: {
        level: this.str('LOG_LEVEL', 'info'),
      },
      webhookSite: {
        baseURL: this.urlRequired('SERVICE_URL').toString(),
        headers: {
          [this.str('SERVICE_API_KEY_HEADER', 'x-api-key')]: this.strRequired('SERVICE_API_KEY'),
        },
      },
      openSanctions: {
        baseURL: this.urlRequired('OPENSANCTIONS_BASE_URL').toString(),
        headers: {
          Authorization: `ApiKey ${this.strRequired('OPENSANCTIONS_API_KEY')}`,
        },
      },
    };
  }
}
