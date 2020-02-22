import { agregarCeros } from './utils.js';

const urlBase = 'https://pokeapi.co/api/v2/pokemon';

async function obtenerInfoBase(id) {
  const res = await fetch(`${urlBase}/${id}`);
  const pokemon = await res.json();
  return pokemon;
}

function obtenerFoto(id) {
  const urlImagenes = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  const foto = `${urlImagenes}${agregarCeros(id, 3)}.png`;
  return foto;
}

async function obtenerHabilidades(arrayHabilidades, idioma) {
  const habilidades = [];
  async function obtenerNombreHabilidad(url, idioma = "es") {
    const res = await fetch(url);
    const abilities = await res.json();
    const habilidad = await abilities.names.find((ability) => ability.language.name === idioma);
    if (habilidad) {
      return habilidad.name;
    }
    return false;
  }
  arrayHabilidades.forEach(async (element) => {
    const habilidad = await obtenerNombreHabilidad(element.ability.url, idioma);
    habilidades.push(habilidad)
  });
  return habilidades;
}

async function obtenerCategoria(url, idioma = "es") {
  const res = await fetch(url);
  const pokemonSpecies = await res.json();
  const categoria = pokemonSpecies.genera.find((genera) => genera.language.name === idioma);
  if (categoria) {
    return categoria.genus;
  }
  return false;
}

async function obtenerDescripcion(url, idioma = "es") {
  const res = await fetch(url);
  const pokemonSpecies = await res.json();
  const descripcion = pokemonSpecies.flavor_text_entries.find((flavor) => flavor.language.name === idioma);
  if (descripcion) {
    return descripcion.flavor_text;
  }
  return false;
}

async function obtenerInfo(id, idioma) {
  const data = {};

  data.base = await obtenerInfoBase(id);

  data.foto = obtenerFoto(id);

  data.habilidades = await obtenerHabilidades(data.base.abilities, idioma);

  data.descripcion = await obtenerDescripcion(data.base.species.url, idioma);

  data.categoria = await obtenerCategoria(data.base.species.url, idioma);

  return data;
}

export { obtenerInfo, urlBase };
