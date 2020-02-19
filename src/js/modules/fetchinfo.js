import mostrarPokemonSeleccionado from './ui.js';
import { agregarCeros } from './utils.js';

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
async function obtenerTipoPokemon(idPokemon) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`);
  const pokemonSpecies = await res.json();
  const genera = pokemonSpecies.genera.find((categoria) => categoria.language.name === 'es');
  if (genera) {
    return genera.genus;
  }
  return 'No se encontró una descripción en español';
}

async function obtenerInfoPokemon(idPokemon) {
  const res = await fetch(`${urlPokemon}/${idPokemon}`);
  const pokemon = await res.json();
  return pokemon;
}
async function obtenerHabilidadesEsp(url) {
  const res = await fetch(url);
  const abilityNames = await res.json();
  const nombreEspaniol = abilityNames.names.find((nombres) => nombres.language.name === 'es');
  if (nombreEspaniol) {
    return nombreEspaniol.name;
  } else {
    return 'No se encontró'
  }

};

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
    habilidades: {
      url: [],
      eng: [],
      esp: []
    },
    altura: null,
    peso: null,
    tipos: [],
    categoria: '',
    foto: '',
  };
  console.log(Promise.all);
  pokemonInfo.foto = obtenerFotoPokemon(id);
  obtenerInfoPokemon(id).then((pokemon) => {
    pokemonInfo.id = pokemon.id;
    pokemonInfo.nombre = pokemon.name;
    pokemon.abilities.forEach((habilidad) => {
      pokemonInfo.habilidades.url.push(habilidad.ability.url);
      pokemonInfo.habilidades.eng.push(habilidad.ability.name);
    });
    pokemonInfo.altura = pokemon.height * 10;
    pokemonInfo.peso = pokemon.weight / 10;
    pokemon.types.forEach((tipo) => {
      pokemonInfo.tipos.push(tipo.type.name);
    });
    obtenerDescripcion(id).then((resultadoDescripcion) => {
      pokemonInfo.descripcion = resultadoDescripcion;
      pokemonInfo.habilidades.url.forEach((habilidad) => {
        obtenerHabilidadesEsp(habilidad).then((habilidadEsp) => {
          pokemonInfo.habilidades.esp.push(habilidadEsp);
        });
      });
      obtenerTipoPokemon(id).then((resultadoCategoria) => {
        pokemonInfo.categoria = resultadoCategoria;
        mostrarPokemonSeleccionado(pokemonInfo);
        console.log(pokemonInfo)
      })
    })
  })
    .catch(err => {
      console.log(err);
    });
}

export { obtenerInfoDelPokemonSeleccionado, urlPokemon };
