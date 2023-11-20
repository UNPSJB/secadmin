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
    dni: number;
    cuil: string;
    nombre: string
    apellido: string;
    telefono: string;
    direccion: string;
    fecha_nacimiento: Date;
    nacionalidad: Nacionalidad;
    estado_civil: EstadoCivil;
    localidad: Localidad;
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
    Soltero = "Soltero/a",
    Casado = "Casado/a",
    UnionFree = "Unión libre o unión de hecho",
    Separado = "Separado/a",
    Divorciado = "Divorciado/a",
    Viudo = "Viudo/a",
}

export const EstadosCiviles = [
    EstadoCivil.Casado,
    EstadoCivil.Soltero,
    EstadoCivil.UnionFree,
    EstadoCivil.Viudo,
    EstadoCivil.Divorciado,
    EstadoCivil.Separado
]

export enum EstadoAfiliacion {
    APROBADO = 'Aprobado',
    EVALUANDO = 'Evaluando',
    RECHAZADO = 'Rechazado'
}

export type Nacionalidad = {
    nombre_es: string;
    nombre_en: string;
}