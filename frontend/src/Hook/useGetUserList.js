import {useSelector} from "react-redux";

export default function useGetUserList() {
    const storedUser = useSelector(store => store.SigninReducer);

    return function () {
        return fetch(`http://localhost:8245/user-list`, {
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