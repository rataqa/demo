import { makeLogger } from '@rataqa/sijil';

import { IConfig } from '../muhit-demo/types';

export function makeMyLogger(config: IConfig) {
  return makeLogger('pino', config.appInfo, { level: config.logger.level });
}
