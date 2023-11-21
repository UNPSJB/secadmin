import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';
import { OrderDeOrdenamiento } from '../types';

export const useAfiliadosStore = defineStore('afiliados', {
  state: () => {
    return {  
      afiliados: [],
      afiliado: null,
      cantidadDeAfiliados: 0
    }
  },
  actions: {
    async guardarAula(
      codigoAula:string,
      capacidad:number,
      localidad:any,
      direccion:string
    ) {
      const response = await request(`afiliados`, 'POST', {
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
      const response = await request(`afiliados/${aulaId}`, 'PATCH', {
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

    async borrarAula(afiliadoId: number) {
      const response = await request(`afiliados/${afiliadoId}`, 'DELETE');

      if (!response.ok) {
        throw new Error('Fallo el borrado');
      }
    },

    async obtenerListadoDeAfiliados(like?: string, ordernamiento?:{atributo: string, orden:OrderDeOrdenamiento}, pagina:number=1) {
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

      const response = await request(`afiliados?${filters.join('&')}`, 'GET');

      if (!response.ok) {
        throw new Error('Error obteniendo los datos');
      }
      const respuesta = await response.json();
      this.afiliados = respuesta.afiliados;
      this.cantidadDeAfiliados = respuesta.cantidadDeAfiliados;
    },

    async obtenerAfiliado(id:string) {
      const response = await request(`afiliados/${id}`, 'GET');

      if (!response.ok) {
        throw new Error('Error encontrando el afiliado');
      }
      this.afiliado = await response.json();
    },

  },
})
