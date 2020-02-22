import { capitalize } from '../utils.js';

function crearContainerFoto(tipos, urlFoto) {
    const containerBadgeTipoPokemon = $('<div id="container-badge-tipo-pokemon" class="container"></div>');
    const containerFotoPokemon = $('<div id="container-foto-pokemon"></div>');
    const fotoPokemon = $('<img id="foto-pokemon" src="./src/img/loading.gif" class="img-responsive" alt="">');
    
    $('#container-pokemon').append(containerBadgeTipoPokemon);

    for (let i = 0; i < tipos.length; i += 1) {
        const tipoPokemon = tipos[i].type.name;
        const imgSrc = `./src/img/pokemon-types/${tipoPokemon}.png`;
        containerBadgeTipoPokemon.append($(`<img class="icon ${tipoPokemon}" alt="tipo ${tipoPokemon}" title="${capitalize(tipoPokemon)}" src="${imgSrc}"/>`));
    }
    
    $('#container-pokemon').append(containerFotoPokemon);
    containerFotoPokemon.append(fotoPokemon);
    fotoPokemon.attr('src', urlFoto);
}

export default crearContainerFoto; 
