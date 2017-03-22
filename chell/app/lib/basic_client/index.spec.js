const BasicClient = require('.');

const accessKey = 'access';
const secretKey = 'secret';

let url = 'https://chell.example.com';
let basicClient = new BasicClient({ url, accessKey, secretKey });

describe('constructor', () => {
  it('should accept credentials outside of the URL', () => {
    expect(basicClient.url).toBe(url);
    expect(basicClient.accessKey).toBe(accessKey);
    expect(basicClient.secretKey).toBe(secretKey);
  });

  it('should accept credentials in the URL', () => {
    url = `https://${accessKey}:${secretKey}@chell.example.com/`;
    basicClient = new BasicClient({ url });

    expect(basicClient.url).toBe('https://chell.example.com');
    expect(basicClient.accessKey).toBe(accessKey);
    expect(basicClient.secretKey).toBe(secretKey);
  });
});
