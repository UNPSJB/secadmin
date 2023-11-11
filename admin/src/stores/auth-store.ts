// stores/counter.js
import { defineStore } from 'pinia'
import { getUserFromToken, isTokenExpired } from '../services/auth/auth.service';

export const useAuthStore = defineStore('auth', {
  state: ():{
    token: string | null,
    user: any
  } => {
    return { 
      token: null,
      user: null 
    }
  },
  actions: {
    async login(email:string, password:string, onLoginSuccess: any) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password
              }),
            });
    
            if (!response.ok) {
              throw new Error('Login failed');
            }
    
            const { access_token } = await response.json();
            this.token = access_token;

            const user = getUserFromToken(access_token);

            // Guarda el token en localStorage
            localStorage.setItem('jwt_token', access_token);

            this.user = user;
            
            onLoginSuccess();

          } catch (error: any) {
            console.error(error.message);
          }
    
    },
    logout(){
      this.token=null
      this.user=null
    },

    async recoverPass(email:string, onEmailSubmit:any)
    {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/recover-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email
          }),
        });
        if(!response.ok){
          throw new Error('Email no encontrado');
        }
            const { access_token } = await response.json();
            this.token = access_token;

            const user = getUserFromToken(access_token);

            this.user = user;

            onEmailSubmit();

    }catch (error: any) {
      console.error(error.message);
    }
  },

  initialize() {
    const token = localStorage.getItem('jwt_token');
    if ( token && !isTokenExpired(token)) {
      this.token = token;
      const user = getUserFromToken(token);
      this.user = user;
    }
  }
}
})