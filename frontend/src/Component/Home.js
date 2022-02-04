import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useBuildTopicName from "../Hook/useBuildTopicName";
import {NavLink} from "react-router-dom";

export default function Home() {

    const getUserList = useGetUserList();
    const buildTopicName = useBuildTopicName();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUserList().then(data => {
            setUsers(data.users);
        })
    }, [])

    return (
        <div className='p-3' style={{height: '100vh', overflow: 'auto'}}>
            <h1 className='mb-3'>Liste des utilisateurs</h1>
            {users.map((user) => {
                return (
                    <div className='p-3 rounded mb-3 bg-dark mx-5'>
                        <NavLink to={`/chat/${buildTopicName(user.id)}`}
                                 className='text-white text-decoration-none w-100 d-block text-center'>
                            {user.username}
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}