const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {
  initWorld,
  addPlayer,
  movePlayer,
  spawnZombie,
  moveZombies,
} = require('./game/world')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static('public'))

const world = initWorld()


// Criar zumbis periodicamente
setInterval(() => {
  if (world.zombies.length < 5) {
    spawnZombie(world)
  }
}, 5000) // a cada 5 segundos

// Mover zumbis e atualizar clientes
setInterval(() => {
  moveZombies(world)
  io.emit('worldUpdate', world)
}, 1000) // a cada 1 segundo

io.on('connection', (socket) => {
  console.log(`Novo jogador conectado: ${socket.id}`)

  socket.on('join', (name) => {
    addPlayer(world, socket.id, name)
    io.emit('worldUpdate', world)
  })

  socket.on('move', (direction) => {
    movePlayer(world, socket.id, direction)
    io.emit('worldUpdate', world)
  })

  socket.on('disconnect', () => {
    delete world.players[socket.id]
    io.emit('worldUpdate', world)
  })
})

server.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000')
})
