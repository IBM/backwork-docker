const S3 = require('aws-sdk/clients/s3');

function errorResponse(error) {
  return {
    code: error.code,
    message: error.message,
  };
}

function FileStorage(options) {
  this.s3 = new S3({
    endpoint: options.endpoint,
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey,
    region: options.region,
    params: {
      Bucket: options.bucket,
    },
  });
}

FileStorage.prototype.list = function () {
  return this.s3.listObjects().promise()
    .then(results => results.Contents.map(item => item.Key))
    .catch(errorResponse);
};

// `name` is the full path to the file, relative to root
// `content` is Buffer, String, or streamObject
FileStorage.prototype.put = function (name, content) {
  return this.s3.putObject({
    Key: name,
    Body: content,
  }).promise()
    .then(() => name) // { ETag: '"..."' }
    .catch(errorResponse);
};

// `name` is the full path to the file, relative to root
FileStorage.prototype.get = function (name) {
  return this.s3.getObject({ Key: name }).promise()
    .then(result => result.Body)
    .catch(errorResponse);
};

// `name` is the full path to the file, relative to root
FileStorage.prototype.delete = function (name) {
  return this.s3.deleteObject({ Key: name }).promise()
    .then(() => name)
    .catch(errorResponse);
};

module.exports = FileStorage;
