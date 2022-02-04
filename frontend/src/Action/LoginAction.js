export function LoginAction(jwt) {
    return {
        type: 'LOGIN',
        jwt: jwt
    }
}

export function LogoutAction() {
    return {
        type: 'LOGOUT'
    }
}