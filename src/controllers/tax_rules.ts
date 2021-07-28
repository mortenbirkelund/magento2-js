import util from 'util';

import {RestClient} from '../rest_client';

export class TaxRuleController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(searchCriteria: string) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/taxRules/search?%s', query);
    return this.restClient.get(endpointUrl);
  }

  async create(ruleAttributes: any) {
    return this.restClient.post('/taxRules', ruleAttributes);
  }

  async update(ruleId: any, ruleAttributes: any) {
    const endpointUrl = util.format('/taxRules/%d', ruleId);
    return this.restClient.put(endpointUrl, ruleAttributes);
  }

  async delete(ruleId: any) {
    const endpointUrl = util.format('/taxRules/%d', ruleId);
    return this.restClient.delete(endpointUrl);
  }
}

