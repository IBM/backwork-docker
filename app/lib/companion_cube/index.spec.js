'use strict';

const CompanionCube = require('.');

let url = 'https://cc.example.com',
    accessKey = 'access',
    secretKey = 'secret',
    companionCube = new CompanionCube({
      url: url,
      accessKey: accessKey,
      secretKey: secretKey
    });

describe('constructor', function() {
  it('should accept credentials outside of the URL', function() {
    expect(companionCube.url).toBe(url);
    expect(companionCube.accessKey).toBe(accessKey);
    expect(companionCube.secretKey).toBe(secretKey);
  });

  it('should accept credentials in the URL', function() {
    let url = 'https://' + accessKey + ':' + secretKey + '@cc.example.com/',
        companionCube = new CompanionCube({
          url: url
        });

    expect(companionCube.url).toBe('https://cc.example.com');
    expect(companionCube.accessKey).toBe(accessKey);
    expect(companionCube.secretKey).toBe(secretKey);
  });
});
