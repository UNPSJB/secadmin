// stores/counter.js
import { defineStore } from 'pinia'
import { getUserFromToken } from '../services/auth/auth.service';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { 
      token: null,
      user: null 
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
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

            this.user = user;
            
            onLoginSuccess();

          } catch (error: any) {
            console.error(error.message);
          }
    
    },
    logout(){
      this.token=null
      this.user=null
    }
  },
})
