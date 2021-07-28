import util from 'util';
import {RestClient} from '../rest_client';

export class ConfigurableOptionsController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(sku: string | number | boolean) {
    const endpointUrl = util.format(
        '/configurable-products/%s/options/all',
        encodeURIComponent(sku),
    );
    return this.restClient.get(endpointUrl);
  }
}
