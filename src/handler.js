const hello = (event) => {
  console.info('Event:', event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
      },
    ),
  };
};
const hello2 = (event) => ({
  return: {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2,
    ),
  },
});
export { hello, hello2 };
