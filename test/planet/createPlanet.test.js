const { createPlanet } = require('../../src/features/planet/createPlanet');
const { deleteOne } = require('../../src/shared/dbManager');
const constants = require('../../src/shared/constants');

const request = {
  requestContext: true,
  headers: {
    'content-type': 'application/json',
  },
};
const newPlanet = {
  id: '1024',
  nombre: 'Tatooine',
  periodoDeRotacion: '23',
  periodoOrbital: '304',
  diametro: '10465',
  clima: 'arid',
  gravedad: '1',
  terreno: 'arid',
  superficieDelAgua: '1',
  poblacion: '200000',
  residentes: ['1', '2'],
  peiculas: ['1', '2'],
  url: 'https://swapi.co/api/planets/1/',
}

describe('Get Planets', () => {
  test('Should respond with a code of 200', async () => {
    const response = await createPlanet({
      ...request,
      body: JSON.stringify(newPlanet),
    });
    expect(response.statusCode).toBe(200);
  });
  test('Should respond with a code of 500 when the object does not have a required value', async () => {
    const { nombre, ...planetWithoutName } = newPlanet;
    const response = await createPlanet({
      ...request,
      body: JSON.stringify(planetWithoutName),
    });
    const decodeResponse=JSON.parse(response.body);
    expect(decodeResponse.message).toBe('El nombre es requerido');
    expect(response.statusCode).toBe(500);
  });
  afterAll(async () => {
    deleteOne(constants.PLANET_TABLE_NAME, 'id', newPlanet.id);
  });
});
