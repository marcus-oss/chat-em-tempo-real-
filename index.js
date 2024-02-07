const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://127.0.0.1:5173'}})

const PORT = 3001

io.on('connection', socket =>{
    console.log('o usuario está conectado', socket.id)

    socket.on('disconnect', reason => {
        console.log('usuario desconectado!', socket.id)
    })
    socket.on('set_nomedousuario', username => {
        socket.data.username = username
        
    })
    socket.on('message', text => {
        io.emit('receive_message' ,{
            text,
            authorId : socket.id,
            author: socket.data.username
        })
    })

} 

)

server.listen(PORT, () => console.log('server running'));

