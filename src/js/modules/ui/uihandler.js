import { agregarCeros } from '../utils.js';
import crearContainerDescripcion from './containerdescripcion.js';
import crearContainerFoto from './containerfoto.js';
import crearContainerPesoAltura from './containerpesoaltura.js';
import crearContainerHabilidadesCategoria from './containerhabilidadescategoria.js';
import obtenerIdioma from '../cambiaridioma.js'

function mostrarPokemonSeleccionado(data, idioma) {
  const divRowClass = $('<div id="fila" class="row"></div>');
  const containerPokemon = $('<div id="container-pokemon" class="mt-5 col-md-4"></div>');
  const nombrePokemon = $('<h2 id="nombre-pokemon" class="pt-3 text-capitalize text-center">Cargando...</h2>');
  const idiomaSeleccionado = obtenerIdioma(idioma);

  if ($('#container-pokemon')) {
    document.querySelector('#container-principal').innerHTML = '';
  }
  $('#container-principal').append(nombrePokemon);
  nombrePokemon.text(`${data.base.name} - #${agregarCeros(data.base.id, 3)}`);
  $('#container-principal').append(divRowClass);
  divRowClass.append(containerPokemon);

  crearContainerFoto(data.base.types, data.foto);
  crearContainerPesoAltura(idiomaSeleccionado, data.base.weight, data.base.height);
  crearContainerHabilidadesCategoria(idiomaSeleccionado, data.habilidades, data.categoria);
  crearContainerDescripcion(idiomaSeleccionado, data.descripcion);
}

export default mostrarPokemonSeleccionado;
