import express from 'express'
const app = express()
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log(__dirname);

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    //origin: "http://localhost:5173",
    /* methods: ["GET", "POST"], */
  },
})

io.on("connection", (socket) => {
  //onsole.log(`User Connected: ${socket.id}`);
  
  socket.on("join_room", (data) => {
    //data is the id of the room
    socket.join(data);
    //console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  
  socket.on("send_message", (data) => {
    socket.to(data.room).emit('recive_message', data)
  });
  
  socket.on("disconnect", () => {
    //console.log("User Disconnected", socket.id);
  });
});

app.use(express.static(join(__dirname, '../client/build')))

server.listen( 3001, () => console.log('SERVER RUNNING'))