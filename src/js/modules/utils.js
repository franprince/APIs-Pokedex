function agregarCeros(numero, digitos) {
  return Array(Math.max(digitos - String(numero).length + 1, 0)).join(0) + numero;
}

function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { agregarCeros, capitalize };
