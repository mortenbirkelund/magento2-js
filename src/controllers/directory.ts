import util from 'util';
import {RestClient} from '../rest_client';

export class DirectoryController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async countries() {
    const endpointUrl = util.format('/directory/countries');
    return this.restClient.get(endpointUrl);
  }

  async currency() {
    const endpointUrl = util.format('/directory/currency');
    return this.restClient.get(endpointUrl);
  }
}

