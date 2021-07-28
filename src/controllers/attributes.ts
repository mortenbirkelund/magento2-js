import {RestClient} from '../rest_client';

import util from 'util';

export class AttributeController {
  private restClient: RestClient

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(searchCriteria: string) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/products/attributes?%s', query);
    return this.restClient.get(endpointUrl);
  }

  async create(categoryAttributes: any) {
    return this.restClient.post('/products/attributes', categoryAttributes);
  }

  async update(attributeId: any, categoryAttributes: any) {
    const endpointUrl = util.format('/products/attributes/%d', attributeId);
    return this.restClient.put(endpointUrl, categoryAttributes);
  }

  async delete(attributeId: any) {
    const endpointUrl = util.format('/products/attributes/%d', attributeId);
    return this.restClient.delete(endpointUrl);
  }
}
