import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';
import { OrderDeOrdenamiento } from '../types';

export const useInscriptosStore = defineStore('inscriptos', {
  state: () => {
    return {
      inscriptos: [],
      inscripto: null,
      cantidadDeInscriptos: 0,
    }
  },
  actions: {
    async guardarInscripto(inscripto: any) {
      const response = await request(`inscriptos`, 'POST', inscripto);

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }
    },

    async actualizarInscripto(inscriptoId: string, codigo_inscripto: string, capacidad: number, localidad: any, direccion: string) {
      const response = await request(`inscriptos/${inscriptoId}`, 'PATCH', {
        id: Number(inscriptoId),
        localidad: localidad.id,
        codigo_inscripto,
        capacidad,
        direccion,
      })

      if (!response.ok) {
        throw new Error('Fallo la actualización')
      }
    },

    async borrarInscripto(inscriptoId: number) {
      const response = await request(`inscriptos/${inscriptoId}`, 'DELETE')

      if (!response.ok) {
        throw new Error('Fallo el borrado')
      }
    },

    async obtenerListadoDeInscriptos(
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

      const response = await request(`inscriptos?${filters.join('&')}`, 'GET')

      if (!response.ok) {
        throw new Error('Error guardando los datos')
      }
      const respuesta = await response.json()
      this.inscriptos = respuesta.inscriptos
      this.cantidadDeInscriptos = respuesta.cantidadDeInscriptos
    },

    async obtenerInscripto(id: string) {
      const response = await request(`inscriptos/${id}`, 'GET')

      if (!response.ok) {
        throw new Error('Error encontrando el inscripto')
      }
      this.inscripto = await response.json()
    },
  },
})
