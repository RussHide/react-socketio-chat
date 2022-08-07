import { useEffect } from "react"
import { useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom';
const Chat = ({ socket, userName, room }) => {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
            setMessageList(list => [...list, messageData])
            setCurrentMessage('')

        }
    }

    useEffect(() => {
        socket.on('recive_message', (data) => {
            setMessageList(list => [...list, data])

        })
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {
                        messageList.map(mess => {
                            return (
                                <div className="message" id={userName === mess.author ? 'other' : 'you'}>
                                    <div>
                                        <div className="message-content">
                                            <p>{mess.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{mess.time}</p>
                                            <p id="author">{mess.author}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" value={currentMessage} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Say hello..." onChange={e => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage} >&#9658;</button>
            </div>
        </div>
    )
}

export default Chat