import {RestClient} from '../rest_client';
import util from 'util';

export class CategoryController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list() {
    return this.restClient.get('/categories');
  }

  async create(categoryAttributes: any) {
    return this.restClient.post('/categories', categoryAttributes);
  }

  async update(categoryId: any, categoryAttributes: any) {
    const endpointUrl = util.format('/categories/%d', categoryId);
    return this.restClient.put(endpointUrl, categoryAttributes);
  }

  async delete(categoryId: any) {
    const endpointUrl = util.format('/categories/%d', categoryId);
    return this.restClient.delete(endpointUrl);
  }
}
