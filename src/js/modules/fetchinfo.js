import mostrarPokemonSeleccionado from './ui.js';
import { agregarCeros, capitalize } from './utils.js';

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon';

async function obtenerDescripcion(idPokemon) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`);
  const pokemonSpecies = await res.json();
  const flavorText = pokemonSpecies.flavor_text_entries.find((flavor) => flavor.language.name === 'es');
  if (flavorText) {
    return flavorText.flavor_text;
  }
  return 'No se encontró una descripción en español';
}

async function obtenerInfoPokemon(idPokemon) {
  const res = await fetch(`${urlPokemon}/${idPokemon}`);
  const pokemon = await res.json();
  return pokemon;
}

function obtenerFotoPokemon(idPokemon) {
  const urlImagenes = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  const fotoPokemon = `${urlImagenes}${agregarCeros(idPokemon, 3)}.png`;
  return fotoPokemon;
}

function obtenerInfoDelPokemonSeleccionado(id) {
  const pokemonInfo = {
    id: null,
    nombre: '',
    descripcion: '',
    habilidades: [],
    altura: null,
    peso: null,
    tipos: [],
    foto: '',
  };
  obtenerDescripcion(id).then((resultadoDescripcion) => {
    pokemonInfo.descripcion = resultadoDescripcion;
  })
  .catch(err => {
    console.log(err);
  });
  pokemonInfo.foto = obtenerFotoPokemon(id);
  obtenerInfoPokemon(id).then((pokemon) => {
    pokemonInfo.id = pokemon.id;
    pokemonInfo.nombre = pokemon.name;
    pokemon.abilities.forEach((habilidad) => {
      pokemonInfo.habilidades.push(capitalize(habilidad.ability.name));
    });
    pokemonInfo.altura = pokemon.height * 10;
    pokemonInfo.peso = pokemon.weight / 10;
    pokemon.types.forEach((tipo) => {
      pokemonInfo.tipos.push(tipo.type.name);
    });
    mostrarPokemonSeleccionado(pokemonInfo)
  })
  .catch(err => {
    console.log(err);
  });
}

export { obtenerInfoDelPokemonSeleccionado, urlPokemon };
