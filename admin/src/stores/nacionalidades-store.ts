import { defineStore } from 'pinia';
import { request } from '../services/requests/requests.service';

export const useNacionalidadesStore = defineStore('nacionalidades', {
  state: () => {
    return {
        nacionalidades: [],
    }
  },
  actions: {
    async obtenerNacionalidades(nacionalidades?: string) {
      let filters = 'limit=20'

      if(nacionalidades) {
        filters += `&like=${nacionalidades}`
      }

      try {
          const response = await request(`persona/nacionalidades?${filters}`, 'GET');
  
          if (!response.ok) {
            throw new Error('Login failed');
          }
          
          this.nacionalidades = await response.json();
      } catch (error: any) {
        console.error(error.message);
      }
    }
  },
});
