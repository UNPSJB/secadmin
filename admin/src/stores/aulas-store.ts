import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';

export const useAulasStore = defineStore('aulas', {
  state: () => {
    return {  
      aulas: [],
      aula: null,
      cantidadDeAulas: 0
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
      aulaId: string,
      codigo_aula:string,
      capacidad:number,
      localidad:any,
      direccion:string
    ) {
      const response = await request(`aulas/${aulaId}`, 'PATCH', {
        id: Number(aulaId),
        localidad: localidad.id, 
        codigo_aula, 
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

    async obtenerListadoDeAulas(like?: string, ordernamiento?:{atributo: string, orden:OrderDeOrdenamiento}, pagina:number=1) {
      let filters = [];

      if(like) {
        filters.push(`like=${like}`)
      }


      if(ordernamiento) {
        filters.push(`ordenPor=${ordernamiento.atributo}`)
        filters.push(`ordenDireccion=${ordernamiento.orden}`)
      }

      if (pagina) {
        filters.push(`pagina=${pagina}`)

      }

      const response = await request(`aulas?${filters.join('&')}`, 'GET');

      if (!response.ok) {
        throw new Error('Error guardando los datos');
      }
      const respuesta = await response.json();
      this.aulas = respuesta.aulas;
      this.cantidadDeAulas = respuesta.cantidadDeAulas;
    },

    async obtenerAula(id:string) {
      const response = await request(`aulas/${id}`, 'GET');

      if (!response.ok) {
        throw new Error('Error encontrando el aula');
      }
      this.aula = await response.json();
    },

  },
})
