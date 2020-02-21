import { agregarCeros, capitalize } from './utils.js';

function mostrarPokemonSeleccionado(infoBase, desCat, foto, habilidades) {
  const divRowClass = $('<div class="row"></div>');
  const divInfoRowClass = $('<div class="row indo"></div>');
  const containerPokemon = $('<div id="container-pokemon" class="mt-5 col-md-4"></div>');
  const nombrePokemon = $('<h2 id="nombre-pokemon" class="pt-3 text-capitalize text-center">Cargando...</h2>');
  const containerBadgeTipoPokemon = $('<div id="container-badge-tipo-pokemon" class="container"></div>');
  const containerFotoPokemon = $('<div id="container-foto-pokemon"></div>');
  const fotoPokemon = $('<img id="foto-pokemon" src="./src/img/loading.gif" class="card-img-top" alt="">');
  const containerInfo = $('<div id="container-info" class="col-md-8 mt-5 ml-auto"></div>');
  const containerInfoTop1 = $('<div id="container-peso-altura" class="col-md-5 ml-auto mt-0"></div>');
  const containerInfoTop2 = $('<div id="container-peso-altura" class="col-md-5 ml-auto mt-0"></div>');
  const containerInfoBottom = $('<div id="container-descripcion" class="col-md-11 ml-auto mt-0"><p class="titulo">Descripción:</p></div>');
  const pesoPokemon = $('<div id="pesoPokemon" class="text-left pt-3">Cargando...</div>');
  const alturaPokemon = $('<div id="alturaPokemon" class="text-left">Cargando...</div>');
  const habilidadesPokemon = $('<div id="pesoPokemon" class="text-left">Cargando...</div>');
  const categoriaPokemon = $('<div id="alturaPokemon" class="text-left pt-3">Cargando...</div>');


  if ($('#container-pokemon')) {
    document.querySelector('#container-principal').innerHTML = '';
  }

  $('#container-principal').append(nombrePokemon);
  $('#container-principal').append(divRowClass);
  nombrePokemon.text(`${infoBase.name} - #${agregarCeros(infoBase.id, 3)}`);
  containerPokemon.append(containerBadgeTipoPokemon);

  for (let i = 0; i < infoBase.types.length; i += 1) {
    const tipoPokemon = infoBase.types[i].type.name;
    const imgSrc = `./src/img/pokemon-types/${tipoPokemon}.png`;
    containerBadgeTipoPokemon.append($(`<img class="icon ${tipoPokemon}" alt="tipo ${tipoPokemon}" title="${tipoPokemon}" src="${imgSrc}"/>`));
  }
  divRowClass.append(containerPokemon);
  containerPokemon.append(containerFotoPokemon);
  containerFotoPokemon.append(fotoPokemon);
  fotoPokemon.attr('src', foto);
  divRowClass.append(containerInfo);
  containerInfo.append(divInfoRowClass);
  divInfoRowClass.append(containerInfoTop1);
  containerInfoTop1.append(alturaPokemon);
  alturaPokemon.html(`<strong>Altura:</strong> ${infoBase.height} cm`);
  containerInfoTop1.append(pesoPokemon);
  pesoPokemon.html(`<strong>Peso:</strong> ${infoBase.weight} kg`);
  divInfoRowClass.append(containerInfoTop2);
  containerInfoTop2.append(habilidadesPokemon);
  habilidadesPokemon.html(`<strong>Habilidades:</strong> ${habilidades.join(', ')}`);
  containerInfoTop2.append(categoriaPokemon);
  categoriaPokemon.html(`<strong>Categoría:</strong> ${desCat[1]}`);
  containerInfo.append(containerInfoBottom);
  containerInfoBottom.append(`<p>${desCat[0]}</p>`);
}

export default mostrarPokemonSeleccionado;
