const AWS = require('aws-sdk');

const client = new AWS.DynamoDB.DocumentClient();

const createOne = async (tableName, data) => {
  try {
    console.info(`Create item in ${tableName} with data: `, data);
    const params = {
      TableName: tableName,
      Item: data,
    };
    await client.put(params).promise();
    console.info(`Result after insert in ${tableName}: `, data);
    return data;
  } catch (error) {
    console.error(`Error with DynamoDB.put in ${tableName}: `, error);
    throw error;
  }
};

const getOne = async (tableName, key, value) => {
  try {
    console.info(`Get item  from ${tableName}  with  Key: `, key, 'value: ', value);
    const searchParams = { TableName: tableName, Key: { [key]: value } };
    const item = (await client.get(searchParams).promise()).Item;
    console.info('Result after get: ', item);
    return item;
  } catch (error) {
    console.error('Error with DynamoDB.get: ', error);
    throw error;
  }
};

const deleteOne = async (tableName, key, value) => {
  try {
    console.info('Delete item with  Key: ', key, 'value: ', value);
    const params = {
      Key: { [key]: value },
      TableName: tableName,
      ReturnValues: 'ALL_OLD',
    };
    const result = await client.delete(params).promise();
    console.info('Result after delete: ', result);
    return !!result.Attributes;
  } catch (error) {
    console.error('Error with DynamoDB.delete: ', error);
    throw error;
  }
};

module.exports = {
  getOne,
  deleteOne,
  createOne,
  client,
};
