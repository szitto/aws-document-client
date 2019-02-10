# aws-document-client
Simple async wrapper for DynamoDB client

# Usage
Import the module into your code
```javascript
const awsDocClient = require('aws-document-client')
```

## Scan the table
Returns with all the items
```javascript
try {
  await awsDocClient.scan('tableName')
} catch (err) {
  handleError(err)
}
```

## Write to the table
Returns with the item written to the table
```javascript
try {
  await awsDocClient.write('tableName', item)
} catch (err) {
  handleError(err)
}
```
