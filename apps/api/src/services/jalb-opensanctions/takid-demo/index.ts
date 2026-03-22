import { JsonSchemaService } from '@rataqa/takid';
import { resolve } from 'node:path';

import { requireJsonFile } from '../../../utils';
import { EntityMatchQuery } from '../types';

export type IOpenSanctionsValidators = ReturnType<typeof makeOpenSanctionsValidators>

export function makeOpenSanctionsValidators() {
  const specFile = resolve(__dirname, '../../../generated/openapi.json');
  const specObj = requireJsonFile(specFile);
  const jss = new JsonSchemaService(specObj.components.schemas);

  const entityMatchRequestBody = jss.validator<EntityMatchQuery>('EntityMatchQuery');

  function isEntityMatchRequestBody(body: EntityMatchQuery | any): body is EntityMatchQuery {
    const result = entityMatchRequestBody.validate(body);
    if (result.errors && result.errors.length) {
      throw new Error(result.errors[0]?.message || 'invalid');
    }
    return !!result.success;
  }

  return {
    jss,
    entityMatchRequestBody,
    isEntityMatchRequestBody,
  };
}
