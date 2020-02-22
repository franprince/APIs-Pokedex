function crearContainerDescripcion(idiomaSeleccionado, descripcion) {
    const divDescRowClass = $('<div id="fila-desc" class="row"></div>');
    const containerInfoBottom = $('<div id="container-descripcion" class="col-md-11 ml-auto mt-0"><p class="titulo"></div>');
    
    $('#container-info').append(divDescRowClass);
    (divDescRowClass).append(containerInfoBottom);
    containerInfoBottom.html(`<p>${idiomaSeleccionado.descripcion}:</p>`)
    containerInfoBottom.append(`<p>${descripcion}</p>`);
}

export default crearContainerDescripcion;
