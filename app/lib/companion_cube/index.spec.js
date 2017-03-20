const CompanionCube = require('.');

const accessKey = 'access';
const secretKey = 'secret';

let url = 'https://cc.example.com';
let companionCube = new CompanionCube({ url, accessKey, secretKey });

describe('constructor', () => {
  it('should accept credentials outside of the URL', () => {
    expect(companionCube.url).toBe(url);
    expect(companionCube.accessKey).toBe(accessKey);
    expect(companionCube.secretKey).toBe(secretKey);
  });

  it('should accept credentials in the URL', () => {
    url = `https://${accessKey}:${secretKey}@cc.example.com`;

    companionCube = new CompanionCube({ url });

    expect(companionCube.url).toBe('https://cc.example.com');
    expect(companionCube.accessKey).toBe(accessKey);
    expect(companionCube.secretKey).toBe(secretKey);
  });
});
