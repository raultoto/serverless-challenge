const { v4: uuidv4 } = require('uuid');
const assert = require('assert');

class Planet {
  constructor(object) {
    assert(object.nombre, 'El nombre es requerido');
    this.id = object.id ?? uuidv4();
    this.nombre = object.nombre;
    this.periodoDeRotacion = object.periodoDeRotacion;
    this.periodoOrbital = object.periodoOrbital;
    this.diametro = object.diametro;
    this.clima = object.clima;
    this.gravedad = object.gravedad;
    this.terreno = object.terreno;
    this.superficieDelAgua = object.superficieDelAgua;
    this.poblacion = object.poblacion;
    this.residentes = object.residentes;
    this.peiculas = object.peiculas;
    this.creado = object.creado ?? new Date().toISOString();
    this.editado = object.editado ?? new Date().toISOString();
    this.url = object.url;
  }

  static fromJson(object) {
    const splitUrl = object.url.split('/');
    return new Planet({
      id: splitUrl[splitUrl.length - 2],
      nombre: object.name,
      periodoDeRotacion: object.rotation_period,
      periodoOrbital: object.orbital_period,
      diametro: object.diameter,
      clima: object.climate,
      gravedad: object.gravity,
      terreno: object.terrain,
      superficieDelAgua: object.surface_water,
      poblacion: object.population,
      residentes: object.residents,
      peiculas: object.films,
      creado: object.created,
      editado: object.edited,
      url: object.url,
    });
  }
}
module.exports = { Planet };
