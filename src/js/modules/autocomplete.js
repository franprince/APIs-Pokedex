/* eslint-disable no-new */
import { obtenerInfoDelPokemonSeleccionado, urlPokemon } from './fetchinfo.js';

const offset = 0;
const limite = 807;

// eslint-disable-next-line new-cap
// eslint-disable-next-line no-undef
new autoComplete({
	data: { // Data src [Array, Function, Async] | (REQUIRED)
		src: async () => {
			// Fetch External Data Source
			const source = await fetch(`${urlPokemon}?offsset=${offset}&limit=${limite}`);
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
	placeHolder: 'Pokemon...', // Place Holder text                 | (Optional)         // Input field selector              | (Optional)
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
	onSelection: (feedback) => { // Action script onSelection event | (Optional)
		obtenerInfoDelPokemonSeleccionado(feedback.selection.index + 1);
	},
});

export default autoComplete;
