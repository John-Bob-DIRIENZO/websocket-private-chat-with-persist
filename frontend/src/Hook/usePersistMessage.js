import {useSelector} from "react-redux";

export default function usePersistMessage() {
    const storedUser = useSelector(store => store.SigninReducer);

    return function (topic, content) {
        return fetch(`http://localhost:8245/chat/persist-message`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${storedUser}`
            },
            body: new URLSearchParams({
                topic: topic,
                content: content
            })
        })
            .then(res => res.json())
    }
}