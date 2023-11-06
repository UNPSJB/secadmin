import  { useAuthStore } from '../../stores/auth-store';

export function request(endpoint:string, method:string, body:any = undefined) {
    const authStore = useAuthStore();

    const { token } = authStore
    debugger
    const response = fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method,
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    );
    return response;
}