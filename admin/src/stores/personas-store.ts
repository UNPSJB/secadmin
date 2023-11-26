import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service';

export const usePersonasStore = defineStore('personas', {
  state: () => {
    return {  
      persona: null,
    }
  },
  actions: {
    
    async obtenerPersonaPorDocumento(tipo:string, numero:string, onPersonaObtenida: any) {
      const response = await request(`persona/documento/${tipo}/${numero}`, 'GET');

      if (!response.ok) {
        throw new Error('Error buscando la persona');
      }
      const responseData = await response.json();

      this.persona = responseData.persona
      onPersonaObtenida(responseData.persona);
    },

  },
})
