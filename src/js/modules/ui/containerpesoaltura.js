function crearContainerPesoAltura(idiomaSeleccionado, peso, altura){
    const divInfoRowClass = $('<div id="fila-info" class="row"></div>');
    const containerInfo = $('<div id="container-info" class="col-md-8 mt-5 ml-auto"></div>');
    const containerInfoTop1 = $('<div id="container-peso-altura" class="col-md-5 ml-auto mt-0"></div>');
    const pesoPokemon = $('<div id="pesoPokemon" class="text-left pt-3">Cargando...</div>');
    const alturaPokemon = $('<div id="alturaPokemon" class="text-left">Cargando...</div>');

    $('#fila').append(containerInfo);
    containerInfo.append(divInfoRowClass);
    divInfoRowClass.append(containerInfoTop1);
    containerInfoTop1.append(alturaPokemon);
    alturaPokemon.html(`<strong>${idiomaSeleccionado.altura}:</strong> ${altura * 10} cm`);
    containerInfoTop1.append(pesoPokemon);
    pesoPokemon.html(`<strong>${idiomaSeleccionado.peso}:</strong> ${peso / 10} kg`);
}

export default crearContainerPesoAltura;
