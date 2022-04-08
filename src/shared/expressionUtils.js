const createUpdateExpression = (updateableData) => {
  const keys = Object.keys(updateableData);
  return `set ${keys.map((key) => `${key}=:${key}`).join(',')}`;
};

const createExpressionAttributeValues = (updateableData) => {
  const keys = Object.keys(updateableData);
  return keys.map((key) => ({ [`:${key}`]: updateableData[key] })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

const filterExpression = (filters) => {
  const keys = Object.keys(filters);
  return `${keys.map((key) => `${key} = :${key}`).join(' and ')}`;
};
module.exports = {
  createUpdateExpression,
  createExpressionAttributeValues,
  filterExpression,
};
