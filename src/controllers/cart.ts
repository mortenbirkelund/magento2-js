import {RestClient} from '../rest_client';

function isNumeric(val: string) {
  return Number(parseFloat(val)).toString() == val;
}

export class CartController {
  private restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  create(customerToken: string | undefined, customerId = null) {
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
  update(customerToken: string | undefined, cartId: string, cartItem: any, adminRequest = false) {
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

  applyCoupon(
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
  deleteCoupon(customerToken: string | undefined, cartId: string, adminRequest = false) {
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
  getCoupon(customerToken: string | undefined, cartId: string, adminRequest = false) {
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
  delete(
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
  pull(customerToken: string | undefined, cartId: string, params: any, adminRequest = false) {
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
  totals(customerToken: string | undefined, cartId: string, params: any, adminRequest = false) {
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

  billingAddress(
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

  shippingInformation(
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

  order(customerToken: string | undefined, cartId: string, body: any, adminRequest = false) {
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

  paymentInformationAndOrder(
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

  assign(cartId: string, userId: any, storeId = 0) {
    return this.restClient.put('/guest-carts/' + cartId, {
      customerId: userId,
      storeId: storeId,
    });
  }

  shippingMethods(customerToken: string | undefined, cartId: string, address: any) {
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

  paymentMethods(customerToken: string | undefined, cartId: string) {
    if (customerToken && isNumeric(cartId)) {
      return this.restClient.get('/carts/mine/payment-methods', customerToken);
    } else {
      return this.restClient.get('/guest-carts/' + cartId + '/payment-methods');
    }
  }

  collectTotals(customerToken: string | undefined, cartId: string, shippingMethod: any) {
    if (customerToken && isNumeric(cartId)) {
      return this.restClient.put('/carts/mine/collect-totals', shippingMethod, customerToken);
    } else {
      return this.restClient.put('/guest-carts/' + cartId + '/collect-totals', shippingMethod);
    }
  }
}
