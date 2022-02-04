import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoginAction} from "../Action/LoginAction";
import {useLocation, useNavigate} from "react-router-dom";
import {Connect} from "../Action/WebsocketAction";

export default function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getJWT = async (usr, pwd) => {
        const data = await fetch('http://localhost:8245/login', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            }),
            body: new URLSearchParams({
                username: usr,
                password: pwd
            })
        });

        const json = await data.json();
        return await json.jwt;
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getJWT(username, password)
            .then(data => {
                dispatch(LoginAction(data));
                dispatch(Connect(data));
            })
            .then(() => navigate(from, {replace: true}));
    }

    return (
        <form className='mx-auto mt-5 rounded p-5 bg-light' style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
            <h1>Please LogIn</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" onChange={handleUsername} value={username}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handlePassword}
                       value={password}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
