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