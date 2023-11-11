export function generarBotonesPaginacion(totalElementos: number, paginaActual:number, elementosPorPagina  = 10) {
    const botones = [];
    const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
    let inicio, fin;
  
    // Ajuste de límites para el rango de botones
    if (paginaActual <= 2 || totalPaginas <= 5) {
      // Primeros 5 botones o menos
      inicio = 1;
      fin = Math.min(5, totalPaginas);
    } else if (paginaActual >= totalPaginas - 1) {
      // Últimos 5 botones
      inicio = Math.max(1, totalPaginas - 4);
      fin = totalPaginas;
    } else {
      // En el medio, mostrar dos páginas a cada lado de la actual
      inicio = paginaActual - 2;
      fin = paginaActual + 2;
    }
  
    // Crear botones
    for (let i = inicio; i <= fin; i++) {
      botones.push({seleccionado: i === paginaActual , pagina:i});
    }
  
    return botones;
  }