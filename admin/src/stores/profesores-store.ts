import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';
import { OrderDeOrdenamiento } from '../types';

export const useProfesorStore = defineStore('profesores', {
  state: () => {
    return {  
      profesores: [],
      profesor: null,
      cantidadDeProfesores: 0
    }
  },
  actions: {
    async guardarProfesor(
      profesorId: string,
      nombre: string,
      apellido:string,
      dni:string,
      email:string,
      descripcion:string,
      especialidad: string,
      honorarios: number
    ) {
      const response = await request(`profesores`, 'POST', {
        id: Number(profesorId),
        nombre, 
        apellido, 
        dni, 
        email,
        descripcion,
        especialidad,
        honorarios
      });

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    },

    async actualizarProfesor(
      profesorId: string,
      nombre: string,
      apellido:string,
      dni:string,
      email:string,
      descripcion:string,
      especialidad: string,
      honorarios: number
    ) {
      const response = await request(`profesores/${profesorId}`, 'PATCH', {
        id: Number(profesorId),
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

    async borrarProfesor(profesorId: number) {
      const response = await request(`profesores/${profesorId}`, 'DELETE');

      if (!response.ok) {
        throw new Error('Fallo el borrado');
      }
    },

    async obtenerListadoDeProfesores(like?: string, ordernamiento?:{atributo: string, orden:OrderDeOrdenamiento}, pagina:number=1) {
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

      const response = await request(`profesores?${filters.join('&')}`, 'GET');

      if (!response.ok) {
        throw new Error('Error obteniendo los datos');
      }
      const respuesta = await response.json();
      this.profesores = respuesta.profesores;
      this.cantidadDeProfesores = respuesta.cantidadDeProfesores;
    },

    async obtenerProfesor(id:string) {
      const response = await request(`profesores/${id}`, 'GET');

      if (!response.ok) {
        throw new Error('Error encontrando el profesor');
      }
      this.profesor = await response.json();
    },

  },
})
