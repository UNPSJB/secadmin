import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service'

export const useLocalidadesStore = defineStore('localidades', {
  state: () => {
    return {
      localidades: [],
    }
  },
  actions: {
    async obtenerLocalidades(localidades?: string) {
      let filters = 'limit=20'

      if (localidades) {
        filters += `&like=${localidades}`
      }

      try {
        const response = await request(`localidades?${filters}`, 'GET')

        if (!response.ok) {
          throw new Error('Login failed')
        }

        this.localidades = await response.json()
      } catch (error: any) {
        console.error(error.message)
      }
    },
  },
})
