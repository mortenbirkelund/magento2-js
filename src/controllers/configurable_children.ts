import util from 'util';
import {RestClient} from '../rest_client';

export class ConfigurableChildrenController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(sku: string | number | boolean): Promise<any> {
    const endpointUrl = util.format('/configurable-products/%s/children', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }
}
