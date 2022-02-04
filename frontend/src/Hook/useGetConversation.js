import {useSelector} from "react-redux";

export default function useGetConversation() {
    const storedUser = useSelector(store => store.SigninReducer);

    return function (topic) {
        return fetch(`http://localhost:8245/chat/${topic}`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${storedUser}`
            }
        })
            .then(res => res.json())
    }
}