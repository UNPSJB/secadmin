export type Aula = {
    id?: number;
    codigo_aula: string;
    direccion: string;
    capacidad: number;
    localidad: Localidad
}

export type Localidad = {
    id: number;
    nombre: string;
    codigo_postal: number;
}

export type OrderDeOrdenamiento = 'ASC' | 'DESC';

export type SelectOption = {
    value:string, 
    text:string
};

export type Empresa = {
    id?: number;
    cuit:string;
    razon_social:string;
    direccion:string;
    localidad:Localidad;
}
export type Profesor = {
    id?: number;
    honorarios: number;
    descripcion: string;
    especialidad: string
    persona: Persona;
}

export type Alumno ={
    id?: number
    persona: Persona
    
}
export type Afiliado = {
    id?: number;
    sueldo: number
    ramaDedicacion: string
    cargaHoraria: CargaHoraria[]
    fechaIngreso: Date; 
    estado: EstadoAfiliacion;
    conyuge: Persona;
    hijos: Persona[];
    empresa: Empresa;
    persona: Persona;
}

export type Persona = {
    tipo_documento: TipoDocumento; 
    nroDocumento: string;
    cuil: string;
    nombre: string
    apellido: string;
    telefono: string;
    direccion: string;
    fecha_nacimiento: Date;
    nacionalidad: Nacionalidad;
    estado_civil: EstadoCivil;
    localidad: Localidad;
    email: string;    
}

export type CargaHoraria = {
    dia?: CargaHorariaDias;
    tipo: TipoCargaHoraria;
    horas: number;
}

export enum CargaHorariaDias {
    LUNES = 'Lunes',
    MARTES = 'Martes',
    MIERCOLES = 'Miercoles',
    JUEVES = 'Jueves',
    VIERNES = 'Viernes',
    SABADO = 'Sabado',
    DOMINGO = 'Domingo'
}

export enum TipoCargaHoraria {
    SEMANAL = 'Semanal',
    DIARIA = 'Diaria'
}

export enum EstadoCivil {
    Soltero = "Soltero",
    Casado = "Casado",
    UnionFree = "Unión",
    Separado = "Separado",
    Divorciado = "Divorciado",
    Viudo = "Viudo",
}

export enum TipoDocumento {
    DNI = 'DNI', 
    LC = 'LC',
    LE = 'LE',
    PASAPORTE = 'Pasaporte'
} 

export const listadoEstadosCiviles: SelectOption[] = [
    { value: EstadoCivil.Casado, text: 'Casado/a' },
    { value: EstadoCivil.Soltero, text: 'Soltero/a' },
    { value: EstadoCivil.UnionFree, text: "Unión libre o unión de hecho" },
    { value: EstadoCivil.Viudo, text: 'Viudo/a' },
    { value: EstadoCivil.Divorciado, text: 'Divorciado/a' },
    { value: EstadoCivil.Separado, text: 'Separado/a' }
  ];

export enum EstadoAfiliacion {
    APROBADO = 'Aprobado',
    EVALUANDO = 'Evaluando',
    RECHAZADO = 'Rechazado'
}

export type Nacionalidad = {
    nombre_es: string;
    nombre_en: string;
}

export type DatosPersonalesFormType = {
    tipoDocumento?: TipoDocumento;
    nroDocumento: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fecha_nacimiento?: Date;
    nacionalidad?: any;
    estado_civil?:  SelectOption;
    direccion: string;
    cuil: string;
    localidad?: any;
}

export type DatosProfesionalesFormType = {
    sueldo: number;
    ocupacion?: any;
    fechaIngreso: Date;
    empresa?: SelectOption;
    cargaHoraria: CargaHoraria;
}

export type DatosFamiliaresFormType = {
    hijos?: any[];
    conyuge?: any;
}

export const listaDocumentos: SelectOption[] = [
    { value: TipoDocumento.DNI, text: 'Documento Nacional de Identidad' },
    { value: TipoDocumento.LC, text: 'Libreta Cívica' },
    { value: TipoDocumento.LE, text: 'Libreta de Enrolamiento' },
    { value: TipoDocumento.PASAPORTE, text: 'Pasaporte' }
  ];

export enum TipoOcupacion {
    VENDEDOR = 'vendedor',
    CAJERO = 'cajero',
    ENCARGADO_STOCK = 'encargado_stock',
    SERVICIO_CLIENTE = 'servicio_cliente',
    GERENTE_TIENDA = 'gerente_tienda',
    MERCADERISTA = 'mercaderista',
    COMPRADOR = 'comprador',
    PREVENCION_PERDIDAS = 'prevencion_perdidas',
    VISUAL_MERCHANDISER = 'visual_merchandiser',
    DEMOSTRADOR_PRODUCTO = 'demostrador_producto'
};

export const ocupacionesComercio: SelectOption[]  = [
    { text: 'Vendedor', value: TipoOcupacion.VENDEDOR },
    { text: 'Cajero', value: TipoOcupacion.CAJERO },
    { text: 'Encargado de Stock', value: TipoOcupacion.ENCARGADO_STOCK },
    { text: 'Servicio al Cliente', value: TipoOcupacion.SERVICIO_CLIENTE },
    { text: 'Gerente de Tienda', value: TipoOcupacion.GERENTE_TIENDA },
    { text: 'Mercaderista', value: TipoOcupacion.MERCADERISTA },
    { text: 'Comprador', value: TipoOcupacion.COMPRADOR },
    { text: 'Prevención de PérdidOrderDeOrdenamientoas', value: TipoOcupacion.PREVENCION_PERDIDAS },
    { text: 'Visual Merchandiser', value: TipoOcupacion.VISUAL_MERCHANDISER },
    { text: 'Demostrador de Productos', value: TipoOcupacion.DEMOSTRADOR_PRODUCTO }
];

export enum CategoriaCurso{
    CAPACITACION = 'Capacitacion',
    GIMNASIOSALUDABLE = 'Gimnasio Saludable',
    CULTURA = 'Cultura'
}

export enum TipoCurso{
    UNICO ='Curso unico',
    PERIODO = 'Curso por periodo', 
    NORMAL = 'Curso normal'
}

export type Curso = {
    id?: number;
    codigo_curso: string;
    nombre_curso: string;
    categoria_curso: CategoriaCurso;
    tipo_curso: TipoCurso
}

export const duracionCurso: SelectOption[]  = [
    { text: 'Curso único', value: TipoCurso.UNICO },
    { text: 'Curso por período', value: TipoCurso.PERIODO },
    { text: 'Curso normal', value: TipoCurso.NORMAL },
    
];

export const areaCurso: SelectOption[]  = [
    { text: 'Cultura', value: CategoriaCurso.CULTURA },
    { text: 'Gimnasio saludable', value: CategoriaCurso.GIMNASIOSALUDABLE },
    { text: 'Capacitación', value: CategoriaCurso.CAPACITACION },
    
];

export type Dictado = {
    id?: number;
    curso: Curso;
    profesor: Profesor;
    precio: number;
    precio_afiliado: number;
    capacidad: number;
    fecha_inicio: Date;
    fecha_fin: Date;
}

export type Inscripto = {
    id?: number;
    persona:Persona;
    fecha_creacion: Date | string;
}

export type listaEspera = {
    id?: number;
    inscripto: Inscripto;
    fecha_creacion: Date;
}