import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export default function NeedAuth(props) {
    let location = useLocation();
    const storedUser = useSelector(store => store.SigninReducer);

    if (storedUser) {
        return props.children;
    } else {
        return <Navigate to='/login' state={{from: location}}/>
    }
}