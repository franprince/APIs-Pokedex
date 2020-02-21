import mostrarPokemonSeleccionado from './ui.js';
import { agregarCeros } from './utils.js';

const urlBase = 'https://pokeapi.co/api/v2/pokemon';

async function obtenerDescripcion(url, idioma = "es") {
  const res = await fetch(url);
  const pokemonSpecies = await res.json();
  const descripcion = pokemonSpecies.flavor_text_entries.find((flavor) => flavor.language.name === idioma);
  if (descripcion) {
    return descripcion.flavor_text;
  }
  return false;
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

async function obtenerHabilidades(arrayHabilidades) {
  const habilidades = [];
  async function obtenerNombreHabilidad(url, idioma = "es") {
    const res = await fetch(url);
    const abilities = await res.json();
    const habilidad = abilities.names.find((ability) => ability.language.name === idioma);
    if (habilidad) {
      return habilidad.name;
    }
    return false;
  }
  arrayHabilidades.forEach(async element => {
    await obtenerNombreHabilidad(element.ability.url).then((habilidad) => habilidades.push(habilidad));
  });
  return habilidades;
}

async function obtenerMovimiento(url, idioma = "es") {
  const res = await fetch(url);
  const moves = await res.json();
  const movimiento = moves.name.find((move) => move.language.name === idioma);
  if (movimiento) {
    return movimiento.name;
  }
  return false;
}

async function obtenerInfoPokemon(idPokemon) {
  const res = await fetch(`${urlBase}/${idPokemon}`);
  const pokemon = await res.json();
  return pokemon;
}

function obtenerFotoPokemon(idPokemon) {
  const urlImagenes = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  const fotoPokemon = `${urlImagenes}${agregarCeros(idPokemon, 3)}.png`;
  return fotoPokemon;
}

function obtenerYEnviarInfo(id) {

  obtenerInfoPokemon(id).then((infoBase) => {

    obtenerHabilidades(infoBase.abilities).then((habilidades) => {

      Promise.all([obtenerDescripcion(infoBase.species.url), obtenerCategoria(infoBase.species.url)]).then((desCat) => {

        mostrarPokemonSeleccionado(infoBase, desCat, obtenerFotoPokemon(id), habilidades)

      })
    })
  })
    .catch(err => {
      console.log(err);
    });
};

export { obtenerYEnviarInfo, urlBase };
