const socket = io()

let playerName = prompt("Digite seu nome:")
if (!playerName) playerName = "Jogador"

let gender = prompt('Sexo (male/female):', 'male')
if (gender !== 'female') gender = 'male'
const skinKey = gender === 'male' ? 'maleSkin1' : 'femaleSkin1'
const hairKey = gender === 'male' ? 'maleHair1' : 'femaleHair1'
const clothesKey = gender === 'male' ? 'maleClothes1' : 'femaleClothes1'

socket.emit('join', { name: playerName, gender, skinKey, hairKey, clothesKey })

const TILE_SIZE = 32
const MAX_TILE_INDEX = 99 // Ajuste conforme o número de arquivos .png disponíveis

let worldState = null
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

  // Sprites do personagem
  this.load.image('maleSkin1', 'assets/sprites/Character-skin-colors/Male Skin1.png')
  this.load.image('femaleSkin1', 'assets/sprites/Character-skin-colors/Female Skin1.png')
  this.load.image('maleHair1', 'assets/sprites/Male-Hair/Male Hair1.png')
  this.load.image('femaleHair1', 'assets/sprites/Female-Hair/Female Hair1.png')
  this.load.image('maleClothes1', 'assets/sprites/Male-Clothing/Blue Shirt v2.png')
  this.load.image('femaleClothes1', 'assets/sprites/Female-Clothing/Blue Corset v2.png')

  // Zumbi como spritesheet para animações
  this.load.spritesheet('zombieSheet', 'assets/sprites/Zombies/Zombie.png', {
    frameWidth: 32,
    frameHeight: 32,
  })
}

function create() {
  tileGroup = this.add.group()
  this.players = {}
  this.zombies = []

  this.anims.create({
    key: 'zombieWalk',
    frames: this.anims.generateFrameNumbers('zombieSheet', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1,
  })

  this.anims.create({
    key: 'zombieDie',
    frames: this.anims.generateFrameNumbers('zombieSheet', { start: 4, end: 7 }),
    frameRate: 6,
    repeat: 0,
  })

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
    const container = this.add.container(p.x * TILE_SIZE + TILE_SIZE / 2, p.y * TILE_SIZE + TILE_SIZE / 2)
    const body = this.add.image(0, 0, p.skinKey).setOrigin(0.5)
    const hair = this.add.image(0, 0, p.hairKey).setOrigin(0.5)
    const clothes = this.add.image(0, 0, p.clothesKey).setOrigin(0.5)
    container.add([body, hair, clothes])
    this.players[id] = container
  }

  // Limpa e redesenha zumbis
  for (const z of this.zombies) z.destroy()
  this.zombies = []

  for (const z of worldState.zombies) {
    const zombie = this.add.sprite(z.x * TILE_SIZE + TILE_SIZE / 2, z.y * TILE_SIZE + TILE_SIZE / 2, 'zombieSheet')
    zombie.play('zombieWalk')
    this.zombies.push(zombie)
  }
}
