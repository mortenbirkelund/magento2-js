import util from 'util';
import {RestClient} from '../rest_client';

export class StockItemController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(sku: string | number | boolean) {
    const endpointUrl = util.format('/stockItems/%s', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }

  // MSI
  async getSalableQty(sku: string | number | boolean, stockId: string | number | boolean) {
    const endpointUrl = util.format(
        '/inventory/get-product-salable-quantity/%s/%d',
        encodeURIComponent(sku),
        encodeURIComponent(stockId),
    );
    return this.restClient.get(endpointUrl);
  }

  // MSI
  async isSalable(sku: string | number | boolean, stockId: string | number | boolean) {
    const endpointUrl = util.format(
        '/inventory/is-product-salable/%s/%d',
        encodeURIComponent(sku),
        encodeURIComponent(stockId),
    );
    return this.restClient.get(endpointUrl);
  }
}
