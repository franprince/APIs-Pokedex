import { cargarListaPokemon, $listaContainer } from './modules/ui.js';
import obtenerInfoDelPokemonSeleccionado from './modules/fetchinfo.js'

cargarListaPokemon();

const $listaPokemon = document.querySelector('.container-lista');

$listaPokemon.onclick = function (e) {
  if (e.target.classList.contains('elemento-lista-pokemon')) {
    obtenerInfoDelPokemonSeleccionado(e.target.id);
  }
};

$('#buscar').on('keyup', function () {
  if (this.value.length > 0) {
    $listaContainer.each(function () {
      $(this).children().hide().filter(function () {
        return $(this).text().toLowerCase().lastIndexOf($('#buscar').val().toLowerCase(), 0) === 0;
      })
        .show();
    });
  } else {
    $('.container-lista').show();
  }
});

$('#menu-toggle').click((e) => {
  e.preventDefault();
  $('#wrapper').toggleClass('toggled');
});
