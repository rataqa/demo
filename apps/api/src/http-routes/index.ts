import { Application, Request, Response } from 'express';

import { IRequest, IResponse } from './types';
import { IConfig } from '../services/muhit-demo/types';
import { IWebhookSite } from '../services/jalb-webhooksite';

export function makeRoutes(
  app: Application,
  config: IConfig,
  webhookSite: IWebhookSite,
) {

  const ts = new Date().getTime();

  app.get('/1', (_req, res) => res.json({ ts, path: 1 }));
  app.post('/2', (req, res) => res.json({ ts, path: 2, input: req.body }));

  app.get('/', (_req: Request, res: Response) => {
    res.json({ data: config.appInfo, ts: new Date() });
  });

  async function postToWebhookSite(req: IRequest, res: IResponse) {
    const { id, log } = res.locals;
    const { lat, lon } = req.body;
    log.info('Handling request for root path');

    const api = webhookSite.apiPerRequest(id, log);
    const result = await api.homePage(lat, lon);

    res.send(result);
  }

  app.post('/webhook-site', postToWebhookSite);

  return {
    postToWebhookSite,
  };
}
