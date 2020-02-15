import { mostrarPokemonSeleccionado, urlPokemon } from './modules/ui.js';
import obtenerInfoDelPokemonSeleccionado from './modules/fetchinfo.js';
import autoComplete from './modules/autocomplete.js';

const $buscador = document.querySelector('#autoComplete');

$buscador.onclick = function (e) {
  if (e.target.classList.contains('elemento-lista-pokemon')) {
    obtenerInfoDelPokemonSeleccionado(e.target.id);
  }
};
