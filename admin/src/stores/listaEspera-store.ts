import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';
import { OrderDeOrdenamiento } from '../types';

export const uselistaEsperaStore = defineStore('listaEspera', {
  state: () => {
    return {  
      listasEspera: [],
      listaEspera: null,
      cantidadDeInscriptos: 0
    }
  },
  actions: {
    async guardarlistaDeEspera(curso:any) {
      const response = await request(`cursos`, 'POST', this.listaEspera);

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    },

    async actualizarlistaDeESpera(
      cursoId: string,
      nombre: string,
      apellido:string,
      DNI:string,
       fecha_creacion: Date
    ) {
      const response = await request(`cursos/${cursoId}`, 'PATCH', {
        id: Number(cursoId),
        nombre, 
        apellido, 
        DNI, 
        fecha_creacion

      });

      if (!response.ok) {
        throw new Error('Fallo la actualización');
      }
    },

    async borrarListaEspera(inscriptoId: number) {
      const response = await request(`alumnos/${inscriptoId}`, 'DELETE')

      if (!response.ok) {
        throw new Error('Fallo el borrado')
      }
    },

    async obtenerListaDeEspera(
      like?: string,
      ordernamiento?: { atributo: string; orden: OrderDeOrdenamiento },
      pagina = 1,
    ) {
      const filters = []

      if (like) {
        filters.push(`like=${like}`)
      }

      if (ordernamiento) {
        filters.push(`ordenPor=${ordernamiento.atributo}`)
        filters.push(`ordenDireccion=${ordernamiento.orden}`)
      }

      if (pagina) {
        filters.push(`pagina=${pagina}`)
      }

      const response = await request(`alumnos?${filters.join('&')}`, 'GET')

      if (!response.ok) {
        throw new Error('Error guardando los datos')
      }
      const respuesta = await response.json()
      this.listasEspera = respuesta.alumnos
      this.cantidadDeInscriptos = respuesta.cantidadDeALumnos
    },

    async obtenerlistaDeEspera(id: string) {
      const response = await request(`alumnos/${id}`, 'GET')

      if (!response.ok) {
        throw new Error('Error encontrando el curso')
      }
      this.listaEspera= await response.json()
    },
  },
})
