import { defineStore } from 'pinia'
import { request } from '../services/requests/requests.service'

export const useChangePasswordStore = defineStore('change-password', {
  state: () => {
    return {}
    },
    actions: {
        async changePassword(contraseñaActual: string, nuevaContraseña: string, confirmarContraseña: string, onCambioCorrecto: any) {
          try {
            console.log('Antes de la solicitud fetch')
            const response = await request(
              'usuarios/change-password',
              'POST',
              {
                contraseñaActual,
                nuevaContraseña,
                confirmarContraseña
              }
            );
            console.log('Despues de la solicitud fetch')
    
            if (!response.ok) {
              const respuesta = await response.json();
              onCambioCorrecto(respuesta.message, false)
            }else{
              const respuesta = await response.json();
              onCambioCorrecto(respuesta.mensaje, true)
            }

            
          } catch (error: any) {
            console.error(error.message)
          }
        }
      }
    })
