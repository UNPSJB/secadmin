import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';
import { OrderDeOrdenamiento, categoriaCurso, tipoCurso } from '../types';

export const useCursosStore = defineStore('cursos', {
  state: () => {
    return {
      cursos: [],
      curso: null,
      cantidadDeCursos: 0,
    }
  },
  actions: {
    async guardarCurso(codigo_curso: string, nombre_curso: string, categoria_curso:categoriaCurso, tipo_curso: tipoCurso) {
      const response = await request(`cursos`, 'POST', {
        codigo_curso: codigo_curso,
        nombre_curso: nombre_curso,
        categoria_curso,
        tipo_curso
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }
    },

    async actualizarCurso(cursoId: string, codigo_curso: string, nombre_curso: string, categoria_curso: categoriaCurso, tipo_curso: tipoCurso) {
      const response = await request(`cursos/${cursoId}`, 'PATCH', {
        id: Number(cursoId),
        codigo_curso: codigo_curso,
        nombre_curso,
        categoria_curso,
        tipo_curso
      })
    
      if (!response.ok) {
        throw new Error('Fallo la actualización')
      }
    },
    

    async borrarCurso(cursoId: number) {
      const response = await request(`cursos/${cursoId}`, 'DELETE')
    
      if (!response.ok) {
        throw new Error('Fallo el borrado')
      }
    },

    async obtenerListadoDeCursos(
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

      const response = await request(`cursos?${filters.join('&')}`, 'GET')

      if (!response.ok) {
        throw new Error('Error guardando los datos')
      }
      const respuesta = await response.json()
      this.cursos = respuesta.cursos
      this.cantidadDeCursos = respuesta.cantidadDeCursos
    },

    async obtenerCurso(id: string) {
      const response = await request(`cursos/${id}`, 'GET')

      if (!response.ok) {
        throw new Error('Error encontrando el curso')
      }
      this.curso = await response.json()
    },
  },
})
