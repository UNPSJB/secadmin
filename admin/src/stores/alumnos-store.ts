import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';
import { OrderDeOrdenamiento } from '../types';

export const useAlumnosStore = defineStore('alumnos', {
  state: () => {
    return {  
      alumnos: [],
      alumno: null,
      cantidadDeAlumnos: 0
    }
  },
  actions: {
    async guardarAlumno(formData:any) {
      const response = await request(`alumnos`, 'POST', formData);
     

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    },

    async actualizarAlumno(
      alumnoId: string,
      nombre: string,
      apellido:string,
      dni:string,
      email:string
    ) {
      const response = await request(`alumnos/${alumnoId}`, 'PATCH', {
        id: Number(alumnoId),
        nombre, 
        apellido, 
        dni, 
        email
      });

      if (!response.ok) {
        throw new Error('Fallo la actualización');
      }
    },

    async borrarAlumno(alumnoId: number) {
      const response = await request(`alumnos/${alumnoId}`, 'DELETE');

      if (!response.ok) {
        throw new Error('Fallo el borrado');
      }
    },

    async obtenerListadoDeAlumnos(like?: string, ordernamiento?:{atributo: string, orden:OrderDeOrdenamiento}, pagina:number=1) {
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

      const response = await request(`alumnos?${filters.join('&')}`, 'GET');

      if (!response.ok) {
        throw new Error('Error obteniendo los datos');
      }
      const respuesta = await response.json();
      this.alumnos = respuesta.alumnos;
      this.cantidadDeAlumnos = respuesta.cantidadDeAlumnos;
    },

    async obtenerAlumno(id:string) {
      const response = await request(`alumnos/${id}`, 'GET');

      if (!response.ok) {
        throw new Error('Error encontrando el alumno');
      }
      this.alumno = await response.json();
    },

  },
})
