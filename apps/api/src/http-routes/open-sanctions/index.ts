import { Application } from 'express';

import { IResponse } from '../types';
import { IRequestForEntityMatch } from './types';
import { IOpenSanctionsApi } from '../../services/jalb-opensanctions';
import { IOpenSanctionsValidators } from '../../services/jalb-opensanctions/takid-demo';

export function makeRoutesForOpenSanctions(
  app: Application,
  openSanctions: IOpenSanctionsApi,
  v: IOpenSanctionsValidators,
) {

  async function postToOpenSanctions(req: IRequestForEntityMatch, res: IResponse) {
    const { id, log } = res.locals;
    const { dataset = 'default' } = req.query;
    const input = req.body;
    log.info('postToOpenSanctions');
    try {
      if (v.isEntityMatchRequestBody(input)) { // can throw error
        const api = openSanctions.apiPerRequest(id, log);
        const result = await api.matchDataset(String(dataset), input);
        res.json(result);
      } else {
        res.json({ error: 'Bad request' });
      }
    } catch (err: unknown) {
      log.warn('Invalid request', { err });
      const error = err instanceof Error ? err.message : 'Bad request';
      res.status(404).json({ error });
    }
  }

  app.post('/open-sanctions/match', postToOpenSanctions);

  return {
    openSanctions,
  };
}
