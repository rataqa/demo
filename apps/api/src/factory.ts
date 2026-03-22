import dotenv from 'dotenv';
import express from 'express';

import { makeAxiosFactory } from '@rataqa/jalb';
import { mwFactory } from '@rataqa/wasit';

import { makeWebhookSite } from './services/jalb-webhooksite';
import { MyEnvSettings } from './services/muhit-demo';
import { makeMyLogger } from './services/sijil-demo';
import { makeRoutes } from './http-routes';
import { makeOpenSanctionsValidators } from './services/jalb-opensanctions/takid-demo';
import { makeOpenSanctionsApi } from './services/jalb-opensanctions';
import { makeRoutesForOpenSanctions } from './http-routes/open-sanctions';

export function factory() {

  dotenv.config();

  const app = express();

  const env = new MyEnvSettings(process.env);
  const config = env.config();

  const logger = makeMyLogger(config);

  const webhookSiteClient = makeAxiosFactory(config.webhookSite.baseURL, { headers: config.webhookSite.headers }, logger.defaultLogger);
  const webhookSite = makeWebhookSite(webhookSiteClient);

  const openSanctionsClient = makeAxiosFactory(config.openSanctions.baseURL, { headers: config.openSanctions.headers, timeout: 30_000 }, logger.defaultLogger);
  const openSanctionsValidators = makeOpenSanctionsValidators();
  const openSanctions = makeOpenSanctionsApi(openSanctionsClient);

  const mw = mwFactory(logger);

  mw.useAtStart(app);
  makeRoutes(app, config, webhookSite);
  makeRoutesForOpenSanctions(app, openSanctions, openSanctionsValidators);
  mw.useAtFinish(app);

  return {
    app,
    config,
    env,
    logger,
    webhookSite,
    openSanctions,
  };
}
