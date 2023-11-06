export function getUserFromToken(token:string) {
    const payload = token.split('.')[1];

    const payloadDecodificado = atob(payload);

    const userInfo = JSON.parse(payloadDecodificado);
    
    return userInfo;
}