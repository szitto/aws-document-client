const AWS = require('aws-sdk');

const region = 'eu-west-2' || process.env.REGION;

/**
 * Scans the 'tableName' DynamoDB table and returns a promise
 *
 * @param {string} tableName
 * @returns {Promise}
 */
const scan = (tableName) => {
  const docClient = new AWS.DynamoDB.DocumentClient({ region });

  const params = {
    TableName: tableName
  };

  return new Promise((resolve) => {
    docClient.scan(params, (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        resolve(data.Items);
      }
    });
  });
};


/**
 * Write to 'tableName' DynamoDB table and returns a Promise
 *
 * @param {string} tableName
 * @param {object} item
 * @returns {Promise}
 */
const write = (tableName, item) => {
  const docClient = new AWS.DynamoDB.DocumentClient({ region });

  const params = {
    TableName: tableName,
    Item: item
  };

  return new Promise((resolve) => {
    docClient.put(params, (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { scan, write };
