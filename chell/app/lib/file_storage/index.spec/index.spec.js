const FileStorage = require('../index');
const S3Mock = require('./s3_mock');

const fileName = 'file.txt';
const fileContent = 'some fake data';

const s3Mock = new S3Mock({ fileName, fileContent });

const fileStorage = new FileStorage({
  endpoint: 'endpoint.example.com',
  accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
  secretAccessKey: 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
  bucket: 'bucket',
});

fileStorage.s3 = s3Mock;

describe('FileStorage', () => {
  describe('list', () => {
    it('should list all files', (done) => {
      fileStorage.list()
        .then((list) => {
          expect(list).toEqual([fileName]);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('get', () => {
    it('should read the specified file', (done) => {
      fileStorage.get(fileName)
        .then((result) => {
          expect(result).toBeDefined();
          expect(result.toString()).toEqual(fileContent);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('put', () => {
    it('should write the specified file', (done) => {
      fileStorage.put(fileName)
        .then((result) => {
          expect(result).toEqual(fileName);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('delete', () => {
    it('should delete the specified file', (done) => {
      fileStorage.delete(fileName)
        .then((result) => {
          expect(result).toEqual(fileName);
          done();
        })
        .catch(done.fail);
    });
  });
});
