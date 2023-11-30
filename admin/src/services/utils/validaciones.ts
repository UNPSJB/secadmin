export function esEmail(email:string) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

export function esDocumentoValido(nroDocumento:string) {
    return nroDocumento !== undefined && 
      (nroDocumento.length === 10)
}

export function esEnteroPositivo(str: string): boolean {
  const numero = parseInt(str);
  return !isNaN(numero) && numero > 0 && numero.toString() === str;
}

export function esMayorDeCiertaEdad(edadMinima: number, fechaNacimiento: Date) {
    const fechaActual = new Date();
  
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
  
    // Ajustar la edad si el mes actual es menor que el mes de nacimiento
    // o si estamos en el mismo mes pero el día actual es anterior al día de nacimiento
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
  
    return edad >= edadMinima;
  }

export function esNumeroDeTelefonoCompleto(telefono: string){
  return telefono.length === 18;
}

export function esCUILValido(cuil: string){
  return cuil.length === 13;
}
