const AWS = require('aws-sdk-mock');
const operations = require('../src/operations.js');

describe('DynamoDB operations wrapper', () => {
  afterEach(() => {
    AWS.restore();
  });

  it('should import all the operations', () => {
    expect(operations.scan).toBeDefined();
    expect(operations.write).toBeDefined();
  });

  describe('scan()', () => {
    it('should scan the table and return with all the items', async () => {
      const testItems = {
        testItemOne: 'testItemOne',
        testItemTwo: 'testItemTwo'
      };
      const spy = jest.fn((params, callback) => callback(null, { Items: testItems }));
      AWS.mock('DynamoDB.DocumentClient', 'scan', spy);

      const result = await operations.scan('tableName');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ TableName: 'tableName' }, expect.anything());
      expect(result).toEqual(testItems);
    });

    it('should scan the table and throw an error', async () => {
      const testError = 'testError';
      const spy = jest.fn((params, callback) => callback(testError, null));
      AWS.mock('DynamoDB.DocumentClient', 'scan', spy);

      try {
        await operations.scan('tableName');
      } catch (err) {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({ TableName: 'tableName' }, expect.anything());
        expect(err.message).toEqual(testError);
      }
    });
  });

  describe('write()', () => {
    it('should write an item to the table', async () => {
      const testItem = { testItem: 'testItem' };
      const spy = jest.fn((params, callback) => callback(null, testItem));
      AWS.mock('DynamoDB.DocumentClient', 'put', spy);

      const result = await operations.write('tableName', testItem);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ TableName: 'tableName', Item: testItem }, expect.anything());
      expect(result).toEqual(testItem);
    });

    it('should scan the table and throw an error', async () => {
      const testError = 'testError';
      const testItem = { testItem: 'testItem' };
      const spy = jest.fn((params, callback) => callback(testError, null));
      AWS.mock('DynamoDB.DocumentClient', 'put', spy);

      try {
        await operations.write('tableName', testItem);
      } catch (err) {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({ TableName: 'tableName', Item: testItem }, expect.anything());
        expect(err.message).toEqual(testError);
      }
    });
  });
});
