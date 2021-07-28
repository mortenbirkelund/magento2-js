import util from 'util';
import {RestClient} from '../rest_client';

export class ProductController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(searchCriteria: string) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/products?%s', query);
    return this.restClient.get(endpointUrl);
  }

  async renderList(searchCriteria: string, currencyCode = 'USD', storeId = 1) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format(
        '/products-render-info?%s&storeId=%d&currencyCode=' + encodeURIComponent(currencyCode),
        query,
        storeId,
    );
    return this.restClient.get(endpointUrl);
  }

  async create(productAttributes: any) {
    return this.restClient.post('/products', productAttributes);
  }

  async update(productSku: string | number | boolean, productAttributes: any) {
    const endpointUrl = util.format('/products/%s', encodeURIComponent(productSku));
    return this.restClient.put(endpointUrl, productAttributes);
  }

  async delete(productSku: string | number | boolean) {
    const endpointUrl = util.format('/products/%s', encodeURIComponent(productSku));
    return this.restClient.delete(endpointUrl);
  }
}
