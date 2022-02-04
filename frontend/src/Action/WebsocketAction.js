export function Connect(jwt) {
    return {
        type: 'CONNECT',
        jwt: jwt
    }
}

export function Disconnect() {
    return {
        type: 'DISCONNECT'
    }
}