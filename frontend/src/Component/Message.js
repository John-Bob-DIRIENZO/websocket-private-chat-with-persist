export default function Message(props) {
    if (!props.fromMe) {
        return (
            <div className='p-3 rounded mb-3 bg-light' style={{marginRight: '25%'}}>
                <p>{props.username}</p>
                <p>{props.content}</p>
            </div>
        )
    } else {
        return (
            <div className='p-3 rounded mb-3 bg-dark text-white' style={{marginLeft: '25%'}}>
                <p>{props.username}</p>
                <p>{props.content}</p>
            </div>
        )
    }
}