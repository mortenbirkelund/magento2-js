import util from 'util';
import {RestClient} from '../rest_client';

export class TaxRateController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(rateId: any) {
    const endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.get(endpointUrl);
  }

  async create(rateAttributes: any) {
    return this.restClient.post('/taxRates', rateAttributes);
  }

  async update(rateId: any, rateAttributes: any) {
    const endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.put(endpointUrl, rateAttributes);
  }

  async delete(rateId: any) {
    const endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.delete(endpointUrl);
  }
}
