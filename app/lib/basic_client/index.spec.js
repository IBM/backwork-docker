'use strict';

const BasicClient = require('.');

let url = 'https://chell.example.com',
    accessKey = 'access',
    secretKey = 'secret',
    basicClient = new BasicClient({
      url: url,
      accessKey: accessKey,
      secretKey: secretKey
    });

describe('constructor', function() {
  it('should accept credentials outside of the URL', function() {
    expect(basicClient.url).toBe(url);
    expect(basicClient.accessKey).toBe(accessKey);
    expect(basicClient.secretKey).toBe(secretKey);
  });

  it('should accept credentials in the URL', function() {
    let url = 'https://' + accessKey + ':' + secretKey + '@chell.example.com/',
        basicClient = new BasicClient({
          url: url
        });

    expect(basicClient.url).toBe('https://chell.example.com');
    expect(basicClient.accessKey).toBe(accessKey);
    expect(basicClient.secretKey).toBe(secretKey);
  });
});
