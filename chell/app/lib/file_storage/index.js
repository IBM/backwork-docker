const S3 = require('aws-sdk/clients/s3');

function ErrorResponse(error) {
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
    params: {
      Bucket: options.bucket,
    },
  });
}

FileStorage.prototype.list = function () {
  return new Promise((resolve, reject) => {
    this.s3.listObjects().promise()
      .then((results) => {
        const list = results.Contents.map(item => item.Key);
        resolve(list);
      })
      .catch(err => reject(new ErrorResponse(err)));
  });
};

// `name` is the full path to the file, relative to root
// `content` is Buffer, String, or streamObject
FileStorage.prototype.put = function (name, content) {
  return new Promise((resolve, reject) => {
    this.s3.putObject({
      Key: name,
      Body: content,
    }).promise()
      .then(() => resolve(name)) // { ETag: '"..."' }
      .catch(err => reject(new ErrorResponse(err)));
  });
};

// `name` is the full path to the file, relative to root
FileStorage.prototype.get = function (name) {
  return new Promise((resolve, reject) => {
    this.s3.getObject({ Key: name }).promise()
      .then(result => resolve(result.Body))
      .catch(err => reject(new ErrorResponse(err)));
  });
};

// `name` is the full path to the file, relative to root
FileStorage.prototype.delete = function (name) {
  return new Promise((resolve, reject) => {
    this.s3.deleteObject({ Key: name }).promise()
      .then(() => resolve(name))
      .catch(err => reject(new ErrorResponse(err)));
  });
};

module.exports = FileStorage;
