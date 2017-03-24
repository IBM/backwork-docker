function S3Mock(options) {
  this.fileName = options.fileName;
  this.fileContent = options.fileContent;

  const listObjectsResponse = {
    IsTruncated: false,
    Marker: '',
    Contents: [
      {
        Key: this.fileName,
        LastModified: null,
        ETag: '"6a6320b901bad04ec19f51ae4f7414f6"',
        Size: 33747,
        StorageClass: 'STANDARD',
        Owner: null,
      },
    ],
    Name: 'bucket',
    Prefix: '',
    Delimiter: '',
    MaxKeys: 1000,
    CommonPrefixes: [],
  };

  const putObjectResponse = { ETag: '"cb859fb0a98ddff4ae1cf41cef193c98"' };

  const getObjectResponse = { AcceptRanges: 'bytes',
    LastModified: null,
    ContentLength: 122,
    ETag: '"cb859fb0a98ddff4ae1cf41cef193c98"',
    ContentType: 'application/octet-stream',
    Metadata: {},
    Body: new Buffer(this.fileContent),
  };

  const deleteObjectResponse = {};

  return {
    listObjects: () => ({ promise: () =>
      new Promise(resolve => resolve(listObjectsResponse)) }),
    putObject: () => ({ promise: () =>
      new Promise(resolve => resolve(putObjectResponse)) }),
    getObject: () => ({ promise: () =>
      new Promise(resolve => resolve(getObjectResponse)) }),
    deleteObject: () => ({ promise: () =>
      new Promise(resolve => resolve(deleteObjectResponse)) }),
  };
}

module.exports = S3Mock;
