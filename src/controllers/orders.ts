import {RestClient} from '../rest_client';

export class OrderController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  /**
   * @see https://devdocs.magento.com/guides/v2.3/rest/retrieve-filtered-responses.html
   * @see salesOrderRepositoryV1: GET /V1/orders/{id}
   *
   * @param {String} orderId
   * @return {Promise<{increment_id: String}>}
   */
  async incrementIdById(orderId: string) {
    return this.restClient.get('/orders/' + orderId + '?fields=increment_id');
  }

  async pending() {
    return this.restClient.get('/orders/pending');
  }
  async searchOrderByOrderId(orderId: string) {
    return this.restClient.get(
        '/orders/?searchCriteria[filter_groups][0][filters][0][field]=entity_id&' +
        'searchCriteria[filter_groups][0][filters][0][value]=' +
        orderId +
        '&' +
        'searchCriteria[filter_groups][0][filters][0][condition_type]=eq',
    );
  }
  async searchOrderByIncrementId(increment_id: string) {
    return this.restClient.get(
        '/orders/?searchCriteria[filter_groups][0][filters][0][field]=increment_id&' +
        'searchCriteria[filter_groups][0][filters][0][value]=' +
        increment_id +
        '&' +
        'searchCriteria[filter_groups][0][filters][0][condition_type]=eq',
    );
  }
}
