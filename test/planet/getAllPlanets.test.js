const { getAllPlanets } = require('../../src/features/planet/getAllPlanets');

const request = {
  requestContext: true,
  headers: {
    'content-type': 'application/json',
  },
};

describe('Get Planets', () => {

  test('Should respond with a code of 200', async () => {
    const response = await getAllPlanets({
      ...request
    });
    expect(response.statusCode).toBe(200);
  });
  test('Should return 200 when passing the query params', async () => {
    const response = await getAllPlanets({
      ...request,
      queryStringParameters:{
        page: '2'
      }
    });
    expect(response.statusCode).toBe(200);
  });

});
