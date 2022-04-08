const { getPlanet } = require('../../src/features/planet/getPlanet');

const request = {
  requestContext: true,
  headers: {
    'content-type': 'application/json',
  },
};

describe('Get Planets', () => {

  test('Should respond with a code of 200', async () => {
    const response = await getPlanet({
      ...request,
      pathParameters: {
        id: '1',
      },
    });
    expect(response.statusCode).toBe(200);
  });
  
  test('Should respond with 404 statusCode if id not exists', async () => {
    const response = await getPlanet({
      ...request,
      pathParameters: {
        id: 'undefined',
      },
    });
    expect(response.statusCode).toBe(404);
  });

});
