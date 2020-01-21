const $listaContainer = $('.container-lista');

const urlPokemon = "https://pokeapi.co/api/v2/pokemon"

let offset = 0;
let limite = 807;
let id = 1 + offset;
pokemonData = {};

function cargarListaPokemon() {
    fetch(urlPokemon + '?offsset=140' + offset + "&limit=" + limite)
        .then(res => res.json())
        .then(pokemon => {
            pokemon.results.forEach((element) => {
                const $listaNombrePokemon = $('<a href="#" id="'+id+'" class="text-capitalize list-group-item list-group-item-action bg-light elemento-lista-pokemon">Cargando...</a>');
                $listaContainer.append($listaNombrePokemon);
                $listaNombrePokemon.text(element.name);
                id++;
            })
        })
        .catch(error => console.error("Hubo un error: ", error));

};

function obtenerInfoDelPokemonSeleccionado(id) {

    const pokemonInfo = {
            id: null,
            nombre: "",
            descripcion: "",
            habilidades: [],
            altura: null,
            peso: null,
            tipos: [],
            foto: ""
        };

    fetch(urlPokemon + '/' + id)
        .then(res => res.json())
        .then(pokemon => {
            pokemonInfo.id = pokemon.id;

            pokemonInfo.nombre = pokemon.name;

            pokemon.abilities.forEach(habilidad=>{
                pokemonInfo.habilidades.push(habilidad.ability.name);
            });

            pokemonInfo.altura = pokemon.height * 10; //Según la documentación altura está expresada en decímetros. La paso a centímetros.
            
            pokemonInfo.peso = pokemon.weight /10; //Se pasa el peso de hectogramos a kilogramos.
            pokemon.types.forEach(tipo=>{
                pokemonInfo.tipos.push(tipo.type.name);
            });

            pokemonInfo.foto = pokemon.sprites.front_default;

            fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
            .then(res => res.json())
            .then(pokemonSpecies => {
                pokemonSpecies.flavor_text_entries.some(flavor => {
                    if (flavor.language.name === "es") {
                        return pokemonInfo.descripcion = flavor.flavor_text;
                    }
                })
                mostrarPokemonSeleccionado(pokemonInfo);
            })
            
            .catch(error => console.error("Hubo un error: ", error));
            
        })
    .catch(error => console.error("Hubo un error: ", error));
};

function mostrarPokemonSeleccionado(pokemonSeleccionado){
    console.log(pokemonSeleccionado)
    const   containerPokemon                = $('<div id="container-pokemon" class="card mx-auto mt-5" style="width: 30%;"></div>'),
            nombrePokemon                   = $('<h2 id="nombre-pokemon" class="card-title pt-3 text-capitalize text-center">Card title</h2>'),
            containerBadgeTipoPokemon       = $('<div id="container-badge-tipo-pokemon" class="container"></div>'),
            fotoPokemon                     = $('<img id="foto-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" class="card-img-top" alt="...">'),
            containerPesoAlturaDescripcion  = $('<div id="container-descripcion-peso-altura" class="card-body"></div>'),
            containerPesoAltura             = $('<div id="container-peso-altura" class="row"></div>'),
            pesoPokemon                     = $('<div id="pesoPokemon" class="text-center pt-3 col-6 border-top">Peso: 20KG</div>'),
            alturaPokemon                   = $('<div id="alturaPokemon" class="col-6 pt-3 border-top text-center">Altura: 170CM</div>'),
            descripcionPokemon              = $('<p id="descripcion" class="card-text mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas est reprehenderit rerum eveniet sapiente sunt nihil eos voluptatem nostrum! Nisi ut labore non facere necessitatibus iure nostrum repellat minima similique?</p>');

    

    if($("#container-pokemon")){
        $("#container-pokemon").remove();
    };

    $('#container-principal').append(containerPokemon);
    containerPokemon.append(nombrePokemon);
    nombrePokemon.text(pokemonSeleccionado.nombre);
    containerPokemon.append(containerBadgeTipoPokemon);

        for(let i = 0; i< pokemonSeleccionado.tipos.length; i++){
            containerBadgeTipoPokemon.append($('<span class="badge pb-1 '+pokemonSeleccionado.tipos[i]+'">'+pokemonSeleccionado.tipos[i]+'</span>'));
            console.log(pokemonSeleccionado.tipos[i]);
        }
       
    containerPokemon.append(fotoPokemon);
    fotoPokemon.attr("src", pokemonSeleccionado.foto);
    containerPokemon.append(containerPesoAlturaDescripcion);
    containerPesoAlturaDescripcion.append(containerPesoAltura);
    containerPesoAltura.append(pesoPokemon);
    pesoPokemon.html("<strong>Peso:</strong> " + pokemonSeleccionado.peso + " kg");
    containerPesoAltura.append(alturaPokemon);
    alturaPokemon.html("<strong>Altura:</strong> " + pokemonSeleccionado.altura + " cm");
    containerPesoAlturaDescripcion.append($("<hr/>"));
    containerPesoAlturaDescripcion.append(descripcionPokemon);
    descripcionPokemon.text(pokemonSeleccionado.descripcion);
}


cargarListaPokemon();

const $listaPokemon = document.querySelector('.container-lista');

$listaPokemon.onclick = function (e) {

    if (e.target.classList.contains("elemento-lista-pokemon")) {
        obtenerInfoDelPokemonSeleccionado(e.target.id);
    };
};

$("#buscar").on("keyup input", function () {
    if (this.value.length > 0) {
        $listaContainer.each(function(){
          $(this).children().hide().filter(function () {
            return $(this).text().toLowerCase().lastIndexOf($("#buscar").val().toLowerCase(),0)==  0;
          }).show();
      });
    
    }
    else {
      $(".container-lista").show();
    }
});
