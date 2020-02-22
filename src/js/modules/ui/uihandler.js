import { agregarCeros } from '../utils.js';
import crearContainerDescripcion from './containerdescripcion.js';
import crearContainerFoto from './containerfoto.js';
import crearContainerPesoAltura from './containerpesoaltura.js';
import crearContainerHabilidadesCategoria from './containerhabilidadescategoria.js';

function mostrarPokemonSeleccionado(data, idioma) {
  const idiomaTexto = {
    es: { altura: "Altura", peso: "Peso", habilidades: "Habilidades", categoria: "Categoría", descripcion: "Descripción" },
    en: { altura: "Height", peso: "Weight", habilidades: "Abilities", categoria: "Category", descripcion: "Description" },
    ja: { altura: "高さ", peso: "重量", habilidades: "能力", categoria: "カテゴリー", descripcion: "説明" },
    de: { altura: "Höhe", peso: "Gewicht", habilidades: "Fähigkeiten", categoria: "Kategorie", descripcion: "Beschreibung" },
    fr: { altura: "Poids", peso: "Taille", habilidades: "Capacités", categoria: "Catégorie", descripcion: "Description" }
  };

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
  crearContainerPesoAltura(idiomaTexto[idioma], data.base.weight, data.base.height);
  crearContainerHabilidadesCategoria(idiomaTexto[idioma], data.habilidades, data.categoria);
  crearContainerDescripcion(idiomaTexto[idioma], data.descripcion);
}

export default mostrarPokemonSeleccionado;
