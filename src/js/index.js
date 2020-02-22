import { obtenerInfo, urlBase } from './modules/fetchinfo.js';

import mostrarPokemonSeleccionado from './modules/ui/uihandler.js';

const offset = 0;
const limite = 807;
const $idioma = document.querySelector('.selectpicker');

//Este módulo es una herramienta escrita por un tercero, no intervine el código.

new autoComplete({
  data: { 
    src: async () => {

      const source = await fetch(`${urlBase}?offsset=${offset}&limit=${limite}`);

      const data = await source.json();

      return data.results;
    },
    key: ['name'],
    cache: false,
  },
  sort: (a, b) => { 
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  placeHolder: 'Buscá tu Pokémon!',
  threshold: 1,
  debounce: 300,
  searchEngine: 'strict',
  resultsList: {
    render: true,
    container: (source) => {
      source.setAttribute('id', 'pokemon-list');
    },
    destination: document.querySelector('#autoComplete'),
    position: 'afterend',
    element: 'ul',
  },
  maxResults: 10,
  highlight: true,
  resultItem: {
    content: (data, source) => {
      source.innerHTML = data.match;
    },
    element: 'li',
  },
  onSelection: async (feedback) => {
    const data = await obtenerInfo(feedback.selection.index + 1, $idioma.value);
    mostrarPokemonSeleccionado(data, $idioma.value);
  },
});
