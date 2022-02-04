export default function SigninReducer(state = false, action) {
    switch (action.type) {
        case 'LOGIN':
            return action.jwt;
        case 'LOGOUT':
            return false;
        default:
            return state;
    }
}