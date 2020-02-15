import obtenerInfoDelPokemonSeleccionado from './fetchinfo.js'
import { urlPokemon } from './ui.js';

const offset = 0;
const limite = 807;
let id = 1 + offset;

new autoComplete({
    data: {                              // Data src [Array, Function, Async] | (REQUIRED)
      src: async () => {
        // API key token
        const token = "this_is_the_API_token_number";
        // User search query
        const query = document.querySelector("#autoComplete").value;
        // Fetch External Data Source
        const source = await fetch(`${urlPokemon}?offsset=${offset}&limit=${limite}`);
        // Format data into JSON
        const data = await source.json();
        // Return Fetched data
        console.log(data)
        return data.results;
      },
      key: ["name"],
      cache: false
    },
    sort: (a, b) => {                    // Sort rendered results ascendingly | (Optional)
      if (a.match < b.match) return -1;
      if (a.match > b.match) return 1;
      return 0;
    },
    placeHolder: "Pokemon...",     // Place Holder text                 | (Optional)         // Input field selector              | (Optional)
    threshold: 2,                        // Min. Chars length to start Engine | (Optional)
    debounce: 300,                       // Post duration for engine to start | (Optional)
    searchEngine: "strict",              // Search Engine type/mode           | (Optional)
    resultsList: {                       // Rendered results list object      | (Optional)
      render: true,
      container: source => {
        source.setAttribute("id", "pokemon-list");
      },
      destination: document.querySelector("#autoComplete"),
      position: "afterend",
      element: "ul"
    },
    maxResults: 10,                         // Max. number of rendered results | (Optional)
    highlight: true,                       // Highlight matching results      | (Optional)
    resultItem: {                          // Rendered result item            | (Optional)
      content: (data, source) => {
        source.innerHTML = data.match;
      },
      element: "li"
    },
    noResults: () => {                     // Action script on noResults      | (Optional)
      const result = document.createElement("li");
      result.setAttribute("class", "no_result");
      result.setAttribute("tabindex", "1");
      result.innerHTML = "No Results";
      document.querySelector("#autoComplete_list").appendChild(result);
    },
    onSelection: feedback => {             // Action script onSelection event | (Optional)
      obtenerInfoDelPokemonSeleccionado(feedback.selection.index + 1);
    }
  });

  export default autoComplete;
