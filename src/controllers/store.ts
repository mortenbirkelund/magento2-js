import {RestClient} from '../rest_client';

export class StoreController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list() {
    return this.restClient.get('/store/websites');
  }
}
