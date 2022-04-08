const axios = require('axios');
const constants = require('../../shared/constants');
const { Planet } = require('./entities/planet');

const getAllPlanets = async (event) => {
  console.info('Event: ', event);
  if (!event.requestContext) return {};
  try {
    let filters = event.queryStringParameters ?? {};
    filters = Object.keys(filters).map((key) => `${key}=${filters[key]}`).join('&');
    const { data } = await axios.get(`${constants.SWAPI_BASE_URL}planets/?${filters}`);
    const planets = data.results.map((planet) => Planet.fromJson(planet));
    data.results = planets;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
module.exports = { getAllPlanets };
