type Aula = {
  id?: number
  codigo_aula: string
  direccion: string
  capacidad: number
  localidad: Localidad
}

type Localidad = {
  id: number
  nombre: string
  codigo_postal: number
}

type OrderDeOrdenamiento = 'ASC' | 'DESC'

type SelectOption = {
  value: string
  text: string
}
