const axios = require('axios');
const constants = require('../../shared/constants');
const { Planet } = require('./entities/planet');
const { getOne } = require('../../shared/dbManager');

const getPlanet = async (event) => {
  console.info('Event: ', event);
  if (!event.requestContext) return {};
  try {
    const { id } = event.pathParameters;
    let planet = await getOne(constants.PLANET_TABLE_NAME, 'id', id);
    if (planet) {
      return {
        statusCode: 200,
        body: JSON.stringify(planet),
      };
    }
    const { data } = await axios.get(`${constants.SWAPI_BASE_URL}planets/${id}`);
    planet = Planet.fromJson(data);
    return {
      statusCode: 200,
      body: JSON.stringify(planet),
    };
  } catch (error) {
    console.error('Error ', error);
    if (error.isAxiosError) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message ?? 'Internal Server Error',
      }),
    };
  }
};
module.exports = { getPlanet };
