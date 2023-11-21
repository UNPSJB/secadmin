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
    domicilio: string;
    
}

export type CargaHoraria = {
    dia: CargaHorariaDias;
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
    fechaNacimiento?: Date;
    nacionalidad?: Nacionalidad;
    estadoCivil?:  EstadoCivil;
    domicilio: string;
    cuil: string;
    localidad?: Localidad;
}


export const listaDocumentos: SelectOption[] = [
    { value: TipoDocumento.DNI, text: 'Documento Nacional de Identidad' },
    { value: TipoDocumento.LC, text: 'Libreta Cívica' },
    { value: TipoDocumento.LE, text: 'Libreta de Enrolamiento' },
    { value: TipoDocumento.PASAPORTE, text: 'Pasaporte' }
  ];