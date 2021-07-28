import util from 'util';
import {RestClient} from '../rest_client';

export class CustomerController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async create(customerData: any) {
    return this.restClient.post('/customers', customerData);
  }

  async token(loginData: any) {
    return this.restClient.consumerToken(loginData);
  }

  async me(requestToken: string | undefined) {
    return this.restClient.get('/customers/me', requestToken);
  }
  async orderHistory(requestToken: string | undefined, pageSize = 20, currentPage = 1) {
    return this.restClient.get('/customers/me', requestToken).then((result) => {
      const query =
        'searchCriteria=&searchCriteria[filterGroups][0][filters][0][field]=customer_id&' +
        'searchCriteria[filterGroups][0][filters][0][value]=' +
        result.id +
        '&' +
        'searchCriteria[filterGroups][0][filters][0][condition_type]=eq&' +
        'searchCriteria[pageSize]=' +
        pageSize +
        '&searchCriteria[currentPage]=' +
        currentPage +
        '&' +
        'searchCriteria[sortOrders][0][field]=entity_id&searchCriteria[sortOrders][0][direction]=desc';
      const endpointUrl = util.format('/orders?%s', query);
      return this.restClient.get(endpointUrl);
    });
  }
  async resetPassword(emailData: any) {
    return this.restClient.put('/customers/password', emailData);
  }

  async resetPasswordUsingResetToken(resetPasswordData: any) {
    return this.restClient.post('/customers/resetPassword', resetPasswordData);
  }

  async update(userData: { body: any; token: String | undefined; }) {
    return this.restClient.put('/customers/me', userData.body, userData.token);
  }

  async changePassword(passwordData: { body: any; token: String | undefined; }) {
    return this.restClient.put('/customers/me/password', passwordData.body, passwordData.token);
  }
}

