import { agregarCeros } from '../utils.js';
import crearContainerDescripcion from './containerdescripcion.js';
import crearContainerFoto from './containerfoto.js';
import crearContainerPesoAltura from './containerpesoaltura.js';
import crearContainerHabilidadesCategoria from './containerhabilidadescategoria.js';

function mostrarPokemonSeleccionado(data) {
  const divRowClass = $('<div id="fila" class="row"></div>');
  const containerPokemon = $('<div id="container-pokemon" class="mt-5 col-md-4"></div>');
  const nombrePokemon = $('<h2 id="nombre-pokemon" class="pt-3 text-capitalize text-center">Cargando...</h2>');

  if ($('#container-pokemon')) {
    document.querySelector('#container-principal').innerHTML = '';
  }
  $('#container-principal').append(nombrePokemon);
  nombrePokemon.text(`${data.base.name} - #${agregarCeros(data.base.id, 3)}`);
  $('#container-principal').append(divRowClass);
  divRowClass.append(containerPokemon);

  crearContainerFoto(data.base.types, data.foto);
  crearContainerPesoAltura(data.base.height, data.base.weight);
  crearContainerHabilidadesCategoria(data.habilidades, data.categoria);
  crearContainerDescripcion(data.descripcion);
}

export default mostrarPokemonSeleccionado;
