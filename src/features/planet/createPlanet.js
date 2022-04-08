const constants = require('../../shared/constants');
const { createOne } = require('../../shared/dbManager');
const { Planet } = require('./entities/planet');

const createPlanet = async (event) => {
  console.info('Event: ', event);
  if (!event.requestContext) return {};
  try {
    const body = JSON.parse(event.body);
    if (!body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing body',
        }),
      };
    }
    const newPlanet = await createOne(constants.PLANET_TABLE_NAME, new Planet(body));
    return {
      statusCode: 200,
      body: JSON.stringify(newPlanet),
    };
  } catch (error) {
    console.error('Error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message ?? 'Internal Server Error',
      }),
    };
  }
};
module.exports = { createPlanet };
