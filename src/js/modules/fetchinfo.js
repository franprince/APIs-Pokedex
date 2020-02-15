/* eslint-disable no-console */
import { mostrarPokemonSeleccionado, urlPokemon } from './ui.js';

function obtenerInfoDelPokemonSeleccionado(id) {
	const urlImagenes = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
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

	function agregarCeros(numero, digitos) {
		return Array(Math.max(digitos - String(numero).length + 1, 0)).join(0) + numero;
	}

	fetch(`${urlPokemon}/${id}`)
		.then((res) => res.json())
		.then((pokemon) => {
			pokemonInfo.id = pokemon.id;

			pokemonInfo.nombre = pokemon.name;

			pokemon.abilities.forEach((habilidad) => {
				pokemonInfo.habilidades.push(habilidad.ability.name);
			});

			pokemonInfo.altura = pokemon.height * 10;
			pokemonInfo.peso = pokemon.weight / 10;
			pokemon.types.forEach((tipo) => {
				pokemonInfo.tipos.push(tipo.type.name);
			});

			pokemonInfo.foto = `${urlImagenes}${agregarCeros(id, 3)}.png`;

			return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
				.then((res) => res.json())
				.then((pokemonSpecies) => {
					pokemonSpecies.flavor_text_entries.some((flavor) => {
						if (flavor.language.name === 'es') {
							// eslint-disable-next-line no-return-assign
							return pokemonInfo.descripcion = flavor.flavor_text;
						}
						return false;
					});
					mostrarPokemonSeleccionado(pokemonInfo);
				});
		})
		.catch((error) => console.error('Hubo un error: ', error));
}

export default obtenerInfoDelPokemonSeleccionado;
