import {RestClient} from '../rest_client';

function isNumeric(val: string) {
  return Number(parseFloat(val)).toString() == val;
}

export class CartController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async create(customerToken: string | undefined, customerId = null) {
    if (customerId) {
      return this.restClient.post('/customers/' + customerId + '/carts', {}, customerToken);
    } else {
      if (customerToken) {
        return this.restClient.post('/carts/mine', {}, customerToken);
      } else {
        return this.restClient.post('/guest-carts');
      }
    }
  }
  async update(customerToken: string | undefined, cartId: string, cartItem: any, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/items/', {
        cartItem: cartItem,
      });
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.post('/carts/mine/items', {cartItem: cartItem}, customerToken);
      } else {
        return this.restClient.post('/guest-carts/' + cartId + '/items', {
          cartItem: cartItem,
        });
      }
    }
  }

  async applyCoupon(
      customerToken: string | undefined,
      cartId: string,
      coupon: string,
      adminRequest = false,
  ) {
    if (adminRequest) {
      return this.restClient.put('/carts/' + cartId + '/coupons/' + coupon);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.put('/carts/mine/coupons/' + coupon, null, customerToken);
      } else {
        return this.restClient.put('/guest-carts/' + cartId + '/coupons/' + coupon);
      }
    }
  }
  async deleteCoupon(customerToken: string | undefined, cartId: string, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.delete('/carts/' + cartId + '/coupons');
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.delete('/carts/mine/coupons', customerToken);
      } else {
        return this.restClient.delete('/guest-carts/' + cartId + '/coupons');
      }
    }
  }
  async getCoupon(customerToken: string | undefined, cartId: string, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.get('/carts/' + cartId + '/coupons');
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.get('/carts/mine/coupons', customerToken);
      } else {
        return this.restClient.get('/guest-carts/' + cartId + '/coupons');
      }
    }
  }
  async delete(
      customerToken: string | undefined,
      cartId: string,
      cartItem: { item_id: string },
      adminRequest = false,
  ) {
    if (adminRequest) {
      return this.restClient.delete('/carts/' + cartId + '/items/' + cartItem.item_id);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.delete('/carts/mine/items/' + cartItem.item_id, customerToken);
      } else {
        return this.restClient.delete('/guest-carts/' + cartId + '/items/' + cartItem.item_id);
      }
    }
  }
  async pull(customerToken: string | undefined, cartId: string, params: any, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.get('/carts/' + cartId + '/items/');
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.get('/carts/mine/items', customerToken);
      } else {
        return this.restClient.get('/guest-carts/' + cartId + '/items/');
      }
    }
  }
  async totals(customerToken: string | undefined, cartId: string, params: any, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.get('/carts/' + cartId + '/totals/');
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.get('/carts/mine/totals', customerToken);
      } else {
        return this.restClient.get('/guest-carts/' + cartId + '/totals/');
      }
    }
  }

  async billingAddress(
      customerToken: string | undefined,
      cartId: string,
      body: any,
      adminRequest = false,
  ) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/billing-address', body);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.post('/carts/mine/billing-address', body, customerToken);
      } else {
        return this.restClient.post('/guest-carts/' + cartId + '/billing-address', body);
      }
    }
  }

  async shippingInformation(
      customerToken: string | undefined,
      cartId: string,
      body: any,
      adminRequest = false,
  ) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/shipping-information', body);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.post('/carts/mine/shipping-information', body, customerToken);
      } else {
        return this.restClient.post('/guest-carts/' + cartId + '/shipping-information', body);
      }
    }
  }

  async order(customerToken: string | undefined, cartId: string, body: any, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.put('/carts/' + cartId + '/order', body);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.put('/carts/mine/order', body, customerToken);
      } else {
        return this.restClient.put('/guest-carts/' + cartId + '/order', body);
      }
    }
  }

  async paymentInformationAndOrder(
      customerToken: string | undefined,
      cartId: string,
      body: any,
      adminRequest = false,
      headers = {},
  ) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/payment-information', body, '', headers);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return this.restClient.post(
            '/carts/mine/payment-information',
            body,
            customerToken,
            headers,
        );
      } else {
        return this.restClient.post(
            '/guest-carts/' + cartId + '/payment-information',
            body,
            '',
            headers,
        );
      }
    }
  }

  async assign(cartId: string, userId: any, storeId = 0) {
    return this.restClient.put('/guest-carts/' + cartId, {
      customerId: userId,
      storeId: storeId,
    });
  }

  async shippingMethods(customerToken: string | undefined, cartId: string, address: any) {
    if (customerToken && isNumeric(cartId)) {
      return this.restClient.post(
          '/carts/mine/estimate-shipping-methods',
          {address: address},
          customerToken,
      );
    } else {
      return this.restClient.post('/guest-carts/' + cartId + '/estimate-shipping-methods', {
        address: address,
      });
    }
  }

  async paymentMethods(customerToken: string | undefined, cartId: string) {
    if (customerToken && isNumeric(cartId)) {
      return this.restClient.get('/carts/mine/payment-methods', customerToken);
    } else {
      return this.restClient.get('/guest-carts/' + cartId + '/payment-methods');
    }
  }

  async collectTotals(customerToken: string | undefined, cartId: string, shippingMethod: any) {
    if (customerToken && isNumeric(cartId)) {
      return this.restClient.put('/carts/mine/collect-totals', shippingMethod, customerToken);
    } else {
      return this.restClient.put('/guest-carts/' + cartId + '/collect-totals', shippingMethod);
    }
  }
}
