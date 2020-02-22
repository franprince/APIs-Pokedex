function crearContainerDescripcion(descripcion) {
    const containerInfoBottom = $('<div id="container-descripcion" class="col-md-11 ml-auto mt-0"><p class="titulo"></div>');
    
    $('#container-info').append(containerInfoBottom);
    containerInfoBottom.html('<p>Descripción:</p>')
    containerInfoBottom.append(`<p>${descripcion}</p>`);
}

export default crearContainerDescripcion;
