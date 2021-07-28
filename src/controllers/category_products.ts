import util from 'util';
// eslint-disable-next-line no-unused-vars
import {RestClient} from '../rest_client';

export class CategoryProductController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(categoryId: any) {
    const endpointUrl = util.format('/categories/%d/products', categoryId);
    return this.restClient.get(endpointUrl);
  }
}

