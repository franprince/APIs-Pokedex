const $listaContainer = $('.container-lista');

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon';

const offset = 0;
const limite = 807;
let id = 1 + offset;


function cargarListaPokemon() {
	fetch(`${urlPokemon}?offsset=${offset}&limit=${limite}`)
		.then((res) => res.json())
		.then((pokemon) => {
			pokemon.results.forEach((element) => {
				const $listaNombrePokemon = $(`<a href="#" id="${id}" class="text-capitalize list-group-item list-group-item-action bg-light elemento-lista-pokemon">Cargando...</a>`);
				$listaContainer.append($listaNombrePokemon);
				$listaNombrePokemon.text(element.name);
				id++;
			});
		})
		.catch((error) => console.error('Hubo un error: ', error));
}

function mostrarPokemonSeleccionado(pokemonSeleccionado) {
	const containerPokemon = $('<div id="container-pokemon" class="card mx-auto mt-5"></div>');
	const nombrePokemon = $('<h2 id="nombre-pokemon" class="card-title pt-3 text-capitalize text-center">Cargando...</h2>');
	const containerBadgeTipoPokemon = $('<div id="container-badge-tipo-pokemon" class="container"></div>');
	const fotoPokemon = $('<img id="foto-pokemon" src="./src/img/loading.gif" class="card-img-top" alt="">');
	const containerPesoAlturaDescripcion = $('<div id="container-descripcion-peso-altura" class="card-body"></div>');
	const containerPesoAltura = $('<div id="container-peso-altura" class="row"></div>');
	const pesoPokemon = $('<div id="pesoPokemon" class="text-center pt-3 col-6 border-top">Cargando...</div>');
	const alturaPokemon = $('<div id="alturaPokemon" class="col-6 pt-3 border-top text-center">Cargando...</div>');
	const descripcionPokemon = $('<p id="descripcion" class="card-text mt-3">Cargando...</p>');
  
  
	if ($('#container-pokemon')) {
	  $('#container-pokemon').remove();
	}
  
	$('#container-principal').append(containerPokemon);
	containerPokemon.append(nombrePokemon);
	nombrePokemon.text(pokemonSeleccionado.nombre);
	containerPokemon.append(containerBadgeTipoPokemon);
  
	for (let i = 0; i < pokemonSeleccionado.tipos.length; i ++) {
	  containerBadgeTipoPokemon.append($(`<span class="badge pb-1 ${pokemonSeleccionado.tipos[i]}">${pokemonSeleccionado.tipos[i]}</span>`));
	}
  
	containerPokemon.append(fotoPokemon);
	fotoPokemon.attr('src', pokemonSeleccionado.foto);
	containerPokemon.append(containerPesoAlturaDescripcion);
	containerPesoAlturaDescripcion.append(containerPesoAltura);
	containerPesoAltura.append(pesoPokemon);
	pesoPokemon.html(`<strong>Peso:</strong> ${pokemonSeleccionado.peso} kg`);
	containerPesoAltura.append(alturaPokemon);
	alturaPokemon.html(`<strong>Altura:</strong> ${pokemonSeleccionado.altura} cm`);
	containerPesoAlturaDescripcion.append($('<hr/>'));
	containerPesoAlturaDescripcion.append(descripcionPokemon);
	descripcionPokemon.text(pokemonSeleccionado.descripcion);
  }

export { cargarListaPokemon, mostrarPokemonSeleccionado, $listaContainer, urlPokemon };
