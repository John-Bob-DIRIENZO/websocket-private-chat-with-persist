export default function SessionReducer(state = false, action) {
    switch (action.type) {
        case 'ADD_SESSION':
            return action.session;
        default:
            return state;
    }
}