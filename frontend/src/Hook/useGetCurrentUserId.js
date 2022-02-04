import {useSelector} from "react-redux";

export default function useGetCurrentUserId() {
    const storedUser = useSelector(store => store.SigninReducer);
    return JSON.parse(atob(storedUser.split('.')[1])).id;
}