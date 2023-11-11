export function getUserFromToken(token:string) {
    const payload = token.split('.')[1];

    const payloadDecodificado = atob(payload);

    const userInfo = JSON.parse(payloadDecodificado);
    
    return userInfo;
}

export function decodeToken(token:string) {
    try {
      const base64Url = token.split('.')[1]; // Obtiene el payload del token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }
  
  export function isTokenExpired(token:string){
    const decodedToken = decodeToken(token);
    if (decodedToken) {
        const now = Date.now().valueOf() / 1000;
        return typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now
    }

}