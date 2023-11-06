import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';

export const useAulasStore = defineStore('aulas', {
  state: () => {
    return {  
      aulas: [],
    }
  },
  actions: {
    async guardarAula(
      codigoAula:string,
      capacidad:number,
      localidad:any,
      direccion:string
    ) {
      const response = await request(`aulas`, 'POST', {
        localidad: localidad.id, 
        codigo_aula: codigoAula, 
        capacidad, 
        direccion
      });

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    },

    async actualizarAula(
      aulaId: number,
      codigoAula:string,
      capacidad:number,
      localidad:any,
      direccion:string
    ) {
      const response = await request(`aulas/${aulaId}`, 'PATCH', {
        id: aulaId,
        localidad: localidad.id, 
        codigoAula, 
        capacidad, 
        direccion
      });

      if (!response.ok) {
        throw new Error('Fallo la actualización');
      }
    },

    async borrarAula(aulaId: number) {
      const response = await request(`aulas/${aulaId}`, 'DELETE');

      if (!response.ok) {
        throw new Error('Fallo el borrado');
      }
    },

    async obtenerListadoDeAulas() {
      const response = await request(`aulas`, 'GET');

      if (!response.ok) {
        throw new Error('Error guardando los datos');
      }
      this.aulas = await response.json();
    },


  },
})
