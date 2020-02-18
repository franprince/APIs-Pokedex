import { agregarCeros } from './fetchinfo.js';

function mostrarPokemonSeleccionado(pokemonSeleccionado) {
	const pokemonRow = $('<div class="row"></div>');
	const containerPokemon = $('<div id="container-pokemon" class="mt-5 col-md-4"></div>');
	const nombrePokemon = $('<h2 id="nombre-pokemon" class="pt-3 text-capitalize text-center">Cargando...</h2>');
	const containerBadgeTipoPokemon = $('<div id="container-badge-tipo-pokemon" class="container"></div>');
	const containerFotoPokemon = $('<div id="container-foto-pokemon"></div>');
	const fotoPokemon = $('<img id="foto-pokemon" src="./src/img/loading.gif" class="card-img-top" alt="">');
	const containerInfo = $('<div id="container-info" class="col-md-8 mt-5 ml-auto"></div>');
	const containerPesoAltura = $('<div id="container-peso-altura" class="col-md-11 ml-auto mt-0"></div>');
	const containerDescripcion = $('<div id="container-descripcion" class="col-md-11 ml-auto mt-0"><p class="titulo">Descripción:</p></div>')
	const pesoPokemon = $('<div id="pesoPokemon" class="text-left pt-3 col-6">Cargando...</div>');
	const alturaPokemon = $('<div id="alturaPokemon" class="col-6 text-left">Cargando...</div>');


	if ($('#container-pokemon')) {
		document.querySelector('#container-principal').innerHTML = '';
	}

	$('#container-principal').append(nombrePokemon);
	$('#container-principal').append(pokemonRow);
	nombrePokemon.text(`${pokemonSeleccionado.nombre} - #${agregarCeros(pokemonSeleccionado.id, 3)}`);
	containerPokemon.append(containerBadgeTipoPokemon);

	for (let i = 0; i < pokemonSeleccionado.tipos.length; i += 1) {
		containerBadgeTipoPokemon.append($(`<img class="icon ${pokemonSeleccionado.tipos[i]}" alt="tipo ${pokemonSeleccionado.tipos[i]}" data-toggle="tooltip" data-placement="top" title="${pokemonSeleccionado.tipos[i]}" src="./src/img/pokemon-types/${pokemonSeleccionado.tipos[i]}.png"/>`));
	}
	pokemonRow.append(containerPokemon);
	containerPokemon.append(containerFotoPokemon);
	containerFotoPokemon.append(fotoPokemon);
	fotoPokemon.attr('src', pokemonSeleccionado.foto);
	pokemonRow.append(containerInfo);
	containerInfo.append(containerPesoAltura);
	containerPesoAltura.append(alturaPokemon);
	alturaPokemon.html(`<strong>Altura:</strong> ${pokemonSeleccionado.altura} cm`);
	containerPesoAltura.append(pesoPokemon);
	pesoPokemon.html(`<strong>Peso:</strong> ${pokemonSeleccionado.peso} kg`);
	containerInfo.append(containerDescripcion);
	containerDescripcion.append(`<p>${pokemonSeleccionado.descripcion}</p>`);
}

export default mostrarPokemonSeleccionado;
