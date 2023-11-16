import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';

export const useEmpresasStore = defineStore('empresas', {
  state: () => {
    return {  
      empresas: [],
      empresa: null,
      cantidadDeEmpresas: 0
    }
  },
  actions: {
    async guardarEmpresa(
      razon_social:string,
      cuit:string,
      localidad:any,
      direccion:string
    ) {
      const response = await request(`empresas`, 'POST', {
        localidad: localidad.id, 
        razon_social: razon_social, 
        cuit: cuit, 
        direccion
      });

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    },

    async actualizarEmpresa(
      empresaId: string,
      razon_social:string,
      cuit:string,
      localidad:any,
      direccion:string
    ) {
      const response = await request(`empresas/${empresaId}`, 'PATCH', {
        id: Number(empresaId),
        localidad: localidad.id, 
        razon_social, 
        cuit, 
        direccion
      });

      if (!response.ok) {
        throw new Error('Fallo la actualización');
      }
    },

    async borrarEmpresa(empresaId: number) {
      const response = await request(`empresas/${empresaId}`, 'DELETE');

      if (!response.ok) {
        throw new Error('Fallo el borrado');
      }
    },

    async obtenerListadoDeEmpresas(like?: string, ordernamiento?:{atributo: string, orden:OrderDeOrdenamiento}, pagina:number=1) {
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

      const response = await request(`empresas?${filters.join('&')}`, 'GET');

      if (!response.ok) {
        throw new Error('Error guardando los datos');
      }
      const respuesta = await response.json();
      this.empresas = respuesta.empresas;
      this.cantidadDeEmpresas = respuesta.cantidadDeEmpresas;
    },

    async obtenerEmpresa(id:string) {
      const response = await request(`empresas/${id}`, 'GET');

      if (!response.ok) {
        throw new Error('Error encontrando el empresa');
      }
      this.empresa = await response.json();
    },

  },
})
