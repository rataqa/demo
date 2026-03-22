import { IProcessEnv, MuhitService } from '@rataqa/muhit';

export interface IEnvSettings extends IProcessEnv {
  HTTP_PORT?: string;
  LOG_LEVEL?: string;

  SERVICE_URL?: string;
  SERVICE_API_KEY_HEADER?: string;
  SERVICE_API_KEY?: string;

  OPENSANCTIONS_BASE_URL?: string;
  OPENSANCTIONS_API_KEY?: string;
}

export interface IConfig {
  appInfo: {
    appName: string;
    appVersion: string;
  };
  http: {
    port: number;
  };
  logger: {
    level: string;
  };
  webhookSite: {
    baseURL: string;
    headers: Record<string, string>;
  };
  openSanctions: {
    baseURL: string;
    headers: Record<string, string>;
  };
}
