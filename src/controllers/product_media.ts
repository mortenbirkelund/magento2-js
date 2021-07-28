import util from 'util';
import {RestClient} from '../rest_client';

export class ProductMediaController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(productSku: any) {
    const endpointUrl = util.format('/products/%s/media', productSku);
    return this.restClient.get(endpointUrl);
  }

  async get(productSku: string | number | boolean, mediaId: any) {
    const endpointUrl = util.format(
        '/products/%s/media/%d',
        encodeURIComponent(productSku),
        mediaId,
    );
    return this.restClient.get(endpointUrl);
  }

  async create(productSku: string | number | boolean, productMediaAttributes: any) {
    const endpointUrl = util.format('/products/%s/media', encodeURIComponent(productSku));
    return this.restClient.post(endpointUrl, productMediaAttributes);
  }

  async update(productSku: string | number | boolean, mediaId: any, productMediaAttributes: any) {
    const endpointUrl = util.format(
        '/products/%s/media/%d',
        encodeURIComponent(productSku),
        mediaId,
    );
    return this.restClient.put(endpointUrl, productMediaAttributes);
  }

  async delete(productSku: string | number | boolean, mediaId: any) {
    const endpointUrl = util.format(
        '/products/%s/media/%d',
        encodeURIComponent(productSku),
        mediaId,
    );
    return this.restClient.delete(endpointUrl);
  }
}
