//este modulo es una herramienta escrita por un tercero, no intervine el codigo.
import { obtenerInfo, urlBase } from './modules/fetchinfo.js';

import mostrarPokemonSeleccionado from './modules/ui.js';

const offset = 0;
const limite = 807;

new autoComplete({
  data: { // Data src [Array, Function, Async] | (REQUIRED)
    src: async () => {
      // Fetch External Data Source
      const source = await fetch(`${urlBase}?offsset=${offset}&limit=${limite}`);
      // Format data into JSON
      const data = await source.json();
      // Return Fetched data
      return data.results;
    },
    key: ['name'],
    cache: false,
  },
  sort: (a, b) => { // Sort rendered results ascendingly | (Optional)
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  placeHolder: 'Buscá tu Pokémon!', // Place Holder text                 | (Optional)         // Input field selector              | (Optional)
  threshold: 2, // Min. Chars length to start Engine | (Optional)
  debounce: 300, // Post duration for engine to start | (Optional)
  searchEngine: 'strict', // Search Engine type/mode           | (Optional)
  resultsList: { // Rendered results list object      | (Optional)
    render: true,
    container: (source) => {
      source.setAttribute('id', 'pokemon-list');
    },
    destination: document.querySelector('#autoComplete'),
    position: 'afterend',
    element: 'ul',
  },
  maxResults: 10, // Max. number of rendered results | (Optional)
  highlight: true, // Highlight matching results      | (Optional)
  resultItem: { // Rendered result item            | (Optional)
    content: (data, source) => {
      source.innerHTML = data.match;
    },
    element: 'li',
  },
  onSelection: async (feedback) => { // Action script onSelection event | (Optional)
    const data = await obtenerInfo(feedback.selection.index + 1);
    console.log(data);
    mostrarPokemonSeleccionado(data);
  },
});
