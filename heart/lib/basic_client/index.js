'use strict';

const url = require('url'),
      RestClient = require('node-rest-client').Client;

function BasicClient(options) {
  this.url = options.url;
  this.accessKey = options.accessKey;
  this.secretKey = options.secretKey;

  let uri = url.parse(this.url);
  if (uri.auth) {
    // If user/password are specified in the URL, remove them.
    let temp_url = uri.protocol;
    if (uri.slashes) {
      temp_url += '//';
    }
    temp_url += uri.host + uri.path;
    if (uri.hash) {
      temp_url += uri.hash;
    }

    // Remove trailing '/'.
    this.url = temp_url.replace(/\/$/, '');

    // If accessKey/secretKey weren't specified via arguments, get from URL.
    if (!this.accessKey || !this.secretKey) {
      let keys = uri.auth.split(':');

      this.accessKey = keys[0];
      this.secretKey = keys[1];
    }
  }

  // Create client
  this.client = new RestClient({
    mimetypes: {
      json: ['application/json', 'application/json; charset=utf-8']
    },
    user: this.accessKey,
    password: this.secretKey
  });

  this.clientDefaultArgs = {
    headers: { 'Content-Type': 'application/json' }
  };
}

module.exports = BasicClient;
