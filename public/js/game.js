const socket = io()

let playerName = prompt("Digite seu nome:")
if (!playerName) playerName = "Jogador"
socket.emit('join', playerName)

const TILE_SIZE = 32
const MAX_TILE_INDEX = 99 // Ajuste conforme o número de arquivos .png disponíveis

let worldState = null
let playerSprites = {}
let zombieSprites = []
let tileGroup

socket.on('worldUpdate', (world) => {
  worldState = world
})

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  pixelArt: true,
  scene: {
    preload,
    create,
    update,
  }
}

const game = new Phaser.Game(config)

function preload() {
  // Carrega todos os tiles dinamicamente
  for (let i = 0; i <= MAX_TILE_INDEX; i++) {
    const indexStr = i.toString().padStart(4, '0')
    this.load.image(`tile_${indexStr}`, `assets/tiles/tile_${indexStr}.png`)
  }

  // Sprites
  this.load.image('player', 'assets/sprites/player.png')
  this.load.image('zombie', 'assets/sprites/zombie.png')
}

function create() {
  tileGroup = this.add.group()
  this.players = {}
  this.zombies = []

  this.input.keyboard.on('keydown', (event) => {
    const key = event.key.toLowerCase()
    const direction = { w: 'up', s: 'down', a: 'left', d: 'right' }[key]
    if (direction) socket.emit('move', direction)
  })
}

function update() {
  if (!worldState) return

  const map = worldState.map

  // Limpa tiles anteriores
  tileGroup.clear(true, true)

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tileData = map[y][x]
      const index = tileData?.tileIndex ?? 0
      const tileKey = `tile_${index.toString().padStart(4, '0')}`

      this.add.image(x * TILE_SIZE, y * TILE_SIZE, tileKey).setOrigin(0)
    }
  }

  // Limpa e redesenha jogadores
  for (const id in this.players) this.players[id].destroy()
  this.players = {}

  for (const id in worldState.players) {
    const p = worldState.players[id]
    this.players[id] = this.add.image(p.x * TILE_SIZE + TILE_SIZE / 2, p.y * TILE_SIZE + TILE_SIZE / 2, 'player')
  }

  // Limpa e redesenha zumbis
  for (const z of this.zombies) z.destroy()
  this.zombies = []

  for (const z of worldState.zombies) {
    const zombie = this.add.image(z.x * TILE_SIZE + TILE_SIZE / 2, z.y * TILE_SIZE + TILE_SIZE / 2, 'zombie')
    this.zombies.push(zombie)
  }
}
