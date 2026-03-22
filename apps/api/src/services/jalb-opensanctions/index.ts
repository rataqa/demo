import { IAxiosFactory } from '@rataqa/jalb';
import { type IBasicLogger } from '@rataqa/sijil';

import { EntityMatchQuery, EntityMatchResponse, EntityResponse } from './types';

export type IOpenSanctionsApi = ReturnType<typeof makeOpenSanctionsApi>;

export function makeOpenSanctionsApi(ax: IAxiosFactory) {

  function apiPerRequest(id: string, rl: IBasicLogger) {
    const headers = { 'x-correlation-id': id }
    const http = ax.makeAxiosPerRequest(headers, rl);

    async function matchDataset(dataset: string, reqBody: EntityMatchQuery) {
      rl.info('matchDataset()', { dataset, reqBody });
      
      const result = await http.post<EntityMatchResponse>('/match/' + dataset, reqBody);

      return result.data;
    }

    async function fetchEntity(entityId: string) {
      rl.info('fetchEntity()', { entityId });
      const result = await http.get<EntityResponse>('/entities/' + entityId);

      return result.data;
    }

    return {
      http,
      matchDataset,
      fetchEntity,
    };
  }

  return {
    apiPerRequest,
  };
}
