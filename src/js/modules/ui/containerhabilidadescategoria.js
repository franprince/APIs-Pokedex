function crearContainerHabilidadesCategoria(idiomaSeleccionado, habilidades, categoria) {
    const containerInfoTop2 = $('<div id="container-peso-altura" class="col-md-5 ml-auto mt-0"></div>');
    const habilidadesPokemon = $('<div id="pesoPokemon" class="text-left">Cargando...</div>');
    const categoriaPokemon = $('<div id="alturaPokemon" class="text-left pt-3">Cargando...</div>');

    $('#fila-info').append(containerInfoTop2);
    containerInfoTop2.append(habilidadesPokemon);
    habilidadesPokemon.html(`<strong>${idiomaSeleccionado.habilidades}:</strong> ${habilidades.join(', ')}`);
    containerInfoTop2.append(categoriaPokemon);
    categoriaPokemon.html(`<strong>${idiomaSeleccionado.categoria}:</strong> ${categoria}`);
}

export default crearContainerHabilidadesCategoria;
