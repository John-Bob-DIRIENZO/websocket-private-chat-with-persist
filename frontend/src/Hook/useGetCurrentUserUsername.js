import {useSelector} from "react-redux";

export default function useGetCurrentUserUsername() {
    const storedUser = useSelector(store => store.SigninReducer);
    return JSON.parse(atob(storedUser.split('.')[1])).username;
}