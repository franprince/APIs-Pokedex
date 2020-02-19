function agregarCeros(numero, digitos) {
  return Array(Math.max(digitos - String(numero).length + 1, 0)).join(0) + numero;
}

export default agregarCeros;
