export function getUserFromToken(token:string) {
    debugger
    const payload = token.split('.')[1];

    const payloadDecodificado = atob(payload);

    const userInfo = JSON.parse(payloadDecodificado);
    
    return userInfo;
}