# Magento2 REST client

This Node.js library enables JavaScript applications to communicate with Magento2 sites using their REST API.
This module based on the magento2-rest-client module created by Alessandro Ronchi (2019).

**NOTE: the library is not finished yet! Only a subset of Magento2 API is currently implemented.**

## Installation

The library can be installed using the Npm package manager:

```
    npm install --save github:brunocordioli072/magento2-rest
```

## Usage

The code sample below shows the usage of the library:

```javascript
const {Magento2Client} = require('magento2-rest-client');

const options = {
  url: 'http://www.test.com/index.php/rest',
  consumerKey: '<OAuth 1.0a consumer key>',
  consumerSecret: '<OAuth 1.0a consumer secret>',
  accessToken: '<OAuth 1.0a access token>',
  accessTokenSecret: '<OAuth 1.0a access token secret>',
};
const client = Magento2Client(options);

const stores = await client.stores.list();

```

## Credit

This Repository is an independent fork of https://github.com/vuestorefront/magento2-rest-client created by Alessandro Ronchi (2019).
