import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';
import { OrderDeOrdenamiento, Dictado } from '../types';

export const useDictadosStore = defineStore('dictados', {
  state: () => {
    return {  
      dictados: [],
      dictado: null,
      cantidadDeDictados: 0
    }
  },
  actions: {
    async guardarDictado(dictado:any) {
      const response = await request(`dictados`, 'POST', dictado);

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    },

    async actualizarDictado(
      dictadoId: string,
      nombre: string,
      apellido:string,
      dni:string,
      email:string,
      descripcion:string,
      especialidad: string,
      honorarios: number
    ) {
      const response = await request(`dictados/${dictadoId}`, 'PATCH', {
        id: Number(dictadoId),
        nombre, 
        apellido, 
        dni, 
        email,
        descripcion,
        especialidad,
        honorarios

      });

      if (!response.ok) {
        throw new Error('Fallo la actualización');
      }
    },

    async borrarDictado(dictadoId: number) {
      const response = await request(`dictados/${dictadoId}`, 'DELETE');

      if (!response.ok) {
        throw new Error('Fallo el borrado');
      }
    },

    async obtenerListadoDeDictados(curso?: number, like?: string, ordernamiento?:{atributo: string, orden:OrderDeOrdenamiento}, pagina:number=1) {
      let filters = [];

      if (curso){
        filters.push(`curso=${curso}`)
      }

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

      const response = await request(`dictados?${filters.join('&')}`, 'GET');

      if (!response.ok) {
        throw new Error('Error obteniendo los datos');
      }
      const respuesta = await response.json();
      this.dictados = respuesta.dictados;
      this.cantidadDeDictados = respuesta.cantidadDeDictados;
    },

    async obtenerDictado(id:string) {
      const response = await request(`dictados/${id}`, 'GET');

      if (!response.ok) {
        throw new Error('Error encontrando el dictado');
      }
      this.dictado = await response.json();
    },

  },
})
