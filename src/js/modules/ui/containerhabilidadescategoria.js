function crearContainerHabilidadesCategoria(habilidades, categoria) {
    const containerInfoTop2 = $('<div id="container-peso-altura" class="col-md-5 ml-auto mt-0"></div>');
    const habilidadesPokemon = $('<div id="pesoPokemon" class="text-left">Cargando...</div>');
    const categoriaPokemon = $('<div id="alturaPokemon" class="text-left pt-3">Cargando...</div>');

    $('#fila-info').append(containerInfoTop2);
    containerInfoTop2.append(habilidadesPokemon);
    habilidadesPokemon.html(`<strong>Habilidades:</strong> ${habilidades.join(', ')}`);
    containerInfoTop2.append(categoriaPokemon);
    categoriaPokemon.html(`<strong>Categoría:</strong> ${categoria}`);
}

export default crearContainerHabilidadesCategoria;
