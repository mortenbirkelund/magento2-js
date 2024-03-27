/* eslint-disable prefer-promise-reject-errors */
import OAuth from 'oauth-1.0a';
import request from 'request-promise';
import crypto from 'crypto';
import {logger} from './helpers/log';

export class RestClient {
  private instance: Object;
  private serverUrl: String;
  private apiVersion: Number;
  private oauth: OAuth;
  private token: OAuth.Token;
  constructor(options: {
    url: any;
    version?: any;
    consumerKey: any;
    consumerSecret: any;
    accessToken: any;
    accessTokenSecret: any;
  }) {
    this.instance = {};

    this.serverUrl = options.url;
    this.apiVersion = options.version;

    this.oauth = new OAuth({
      consumer: {
        key: options.consumerKey,
        secret: options.consumerSecret,
      },
      signature_method: 'HMAC-SHA256',
      hash_function(base_string, key) {
        return crypto
            .createHmac('sha256', key)
            .update(base_string)
            .digest('base64');
      },
    });
    this.token = {
      key: options.accessToken,
      secret: options.accessTokenSecret,
    };
  }

  async apiCall(request_data: any, request_token = '', customHeaders = {}) {
    return request(
        {
          url: request_data.url,
          method: request_data.method,
          headers: {
            ...(request_token ?
            {Authorization: 'Bearer ' + this.token.key} :
            this.oauth.toHeader(this.oauth.authorize(request_data, this.token))),
            ...customHeaders,
          },
          json: true,
          body: request_data.body,
        },
        (error, response: any, body) => {
          if (error) {
            logger.error('Error occured: ' + error);
            return;
          } else if (!this.httpCallSucceeded(response)) {
            let errorMessage = 'HTTP ERROR ' + response.code;
            if (body && body.hasOwnProperty('message')) {
              errorMessage = this.errorString(
                  body.message,
              body.hasOwnProperty('parameters') ? body.parameters : {},
              );
            }

            logger.error('API call failed: ' + errorMessage);
          }
        },
    );
  }

  async consumerToken(login_data: any) {
    return this.apiCall({
      url: this.createUrl('/integration/customer/token'),
      method: 'POST',
      body: login_data,
    });
  }

  httpCallSucceeded(response: { statusCode: number }) {
    return response.statusCode >= 200 && response.statusCode < 300;
  }

  errorString(message: string, parameters: any) {
    if (parameters === null) {
      return message;
    }
    if (parameters instanceof Array) {
      for (let i = 0; i < parameters.length; i++) {
        const parameterPlaceholder = '%' + (i + 1).toString();
        message = message.replace(parameterPlaceholder, parameters[i]);
      }
    } else if (parameters) {
      // eslint-disable-next-line guard-for-in
      for (const key in parameters) {
        const parameterPlaceholder = '%' + key;
        message = message.replace(parameterPlaceholder, parameters[key]);
      }
    }

    return message;
  }

  async get(resourceUrl: any, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'GET',
    };
    return this.apiCall(request_data, request_token);
  }

  createUrl(resourceUrl: string) {
    return this.serverUrl + '/' + this.apiVersion + resourceUrl;
  }

  async post(
      resourceUrl: any,
      data?: any,
      request_token?: string,
      customHeaders?: Object,
  ) {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'POST',
      body: data,
    };
    return this.apiCall(request_data, request_token, customHeaders);
  }

  async put(resourceUrl: any, data?: any, request_token?: string) {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'PUT',
      body: data,
    };
    return this.apiCall(request_data, request_token);
  }

  async delete(resourceUrl: any, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'DELETE',
    };
    return this.apiCall(request_data, request_token);
  }
}
