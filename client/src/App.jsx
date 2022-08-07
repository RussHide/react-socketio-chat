import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'
//const socket = io.connect('http://localhost:3001')
const socket = io.connect()

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)
  console.clear()

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {
        !showChat ?
          <div className='joinChatContainer'>
            <h3>Join a chat</h3>
            <input type="text" placeholder='Name...' onChange={e => setUserName(e.target.value)} />
            <input type="text" placeholder='Room ID...' onChange={e => setRoom(e.target.value)} />
            <button onClick={joinRoom}>Join Room</button>
          </div> :
          <Chat socket={socket} userName={userName} room={room} />
      }
    </div>
  )
}

export default App
