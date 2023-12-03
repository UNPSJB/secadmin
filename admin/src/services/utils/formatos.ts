export function transformarAFechaBostera(fechaISO:string | Date) {

    // Crear un objeto de fecha en JavaScript a partir de la fecha ISO
    var fecha = new Date(fechaISO);

    // Ajustar la fecha a la zona horaria de Argentina
    // Argentina generalmente está a -3 horas de UTC
    fecha.setHours(fecha.getHours() - 3);

    // Formatear la fecha al estilo argentino (dd/mm/yyyy)
    var dia = fecha.getDate().toString().padStart(2, '0');
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    var año = fecha.getFullYear();

    return dia + '/' + mes + '/' + año;

}