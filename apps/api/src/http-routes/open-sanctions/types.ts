import { Request } from 'express';
import { EntityMatchQuery } from '../../services/jalb-opensanctions/types';

export type IRequestForEntityMatch = Request<any, EntityMatchQuery, IRequestQueryForEntityMatch>;

interface IRequestQueryForEntityMatch {
  /**
   * default is 'default'
   */
  dataset?: string;
}
