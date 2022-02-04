import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import useGetConversation from "../Hook/useGetConversation";
import {useEffect, useState} from "react";
import useGetCurrentUserId from "../Hook/useGetCurrentUserId";
import Message from "./Message";
import useGetCurrentUserUsername from "../Hook/useGetCurrentUserUsername";
import usePersistMessage from "../Hook/usePersistMessage";

export default function ChatRoom() {
    const {topic} = useParams();
    const session = useSelector(store => store.SessionReducer)

    const getConversation = useGetConversation();
    const currentUserId = useGetCurrentUserId();
    const currentUserUsername = useGetCurrentUserUsername();
    const persistMessage = usePersistMessage();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const onEvent = (args, kwargs, event) => {
        if (topic === event.topic) {
            setMessages(prevState => [
                {
                    content: args[0],
                    user: {
                        id: kwargs.senderId,
                        username: kwargs.senderUsername
                    }
                },
                ...prevState
            ])
            console.log(args);
        } else {
            console.log('wrong topic');
        }
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const stringTopic = topic;
        session.publish(stringTopic,
            [newMessage],
            {
                senderId: currentUserId,
                senderUsername: currentUserUsername
            }
        );
        setMessages(prevState => [
            {
                content: newMessage,
                user: {
                    id: currentUserId,
                    username: currentUserUsername
                }
            },
            ...prevState
        ]);
        persistMessage(stringTopic, newMessage);
        setNewMessage('');
    }

    useEffect(() => {
        getConversation(topic).then(data => {
            if (data.chat !== null) {
                setMessages(data.chat.messages);
                console.log(data);
            } else {
                console.log('ce chat est vide');
            }

        });

        const stringTopic = topic;
        let subscription;
        session.subscribe(stringTopic, onEvent)
            .then((sub) => {
                subscription = sub
            });

        return () => {
            session.unsubscribe(subscription);
        }
    }, [])

    return (
        <div className='p-3' style={{height: '100vh', overflow: 'auto', position: 'relative'}}>
            <h1 className='mb-3'>Le Chat room !</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor='message' className='form-label'>Ajoutez un message</label>
                <input type="text" className='w-75 mb-5 d-block form-control' id='message'
                       onChange={handleChange} value={newMessage}/>
            </form>

            {messages.map((message) => {
                if (currentUserId !== message.user.id) {
                    return <Message fromMe={false} content={message.content} username={message.user.username}/>
                } else {
                    return <Message fromMe={true} content={message.content} username={message.user.username}/>
                }
            })}
        </div>
    )
}