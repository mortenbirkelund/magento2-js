import util from 'util';
import {RestClient} from '../rest_client';

export class ReviewController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async getByProductSku(sku: string | number | boolean) {
    const endpointUrl = util.format('/products/%s/reviews', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }

  async list(searchCriteria: string) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/reviews/?%s', query);
    return this.restClient.get(endpointUrl);
  }

  async create(reviewData: any) {
    return this.restClient.post('/reviews', {review: reviewData});
  }

  async delete(reviewId: any) {
    const endpointUrl = util.format('/reviews/%d', reviewId);
    return this.restClient.delete(endpointUrl);
  }
}
