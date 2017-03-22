const url = require('url');
const RestClient = require('node-rest-client').Client;

function BasicClient(options) {
  this.url = options.url;
  this.accessKey = options.accessKey;
  this.secretKey = options.secretKey;

  const uri = url.parse(this.url);
  if (uri.auth) {
    // If user/password are specified in the URL, remove them.
    let tmpURL = uri.protocol;
    if (uri.slashes) {
      tmpURL += '//';
    }
    tmpURL += uri.host + uri.path;
    if (uri.hash) {
      tmpURL += uri.hash;
    }

    // Remove trailing '/'.
    this.url = tmpURL.replace(/\/$/, '');

    // If accessKey/secretKey weren't specified via arguments, get from URL.
    if (!this.accessKey || !this.secretKey) {
      const keys = uri.auth.split(':');

      this.accessKey = keys[0];
      this.secretKey = keys[1];
    }
  }

  // Create client
  this.client = new RestClient({
    mimetypes: {
      json: ['application/json', 'application/json; charset=utf-8'],
    },
    user: this.accessKey,
    password: this.secretKey,
  });

  this.clientDefaultArgs = {
    headers: { 'Content-Type': 'application/json' },
  };
}

module.exports = BasicClient;
