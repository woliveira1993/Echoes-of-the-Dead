function generateMap(width, height) {
  const map = []
  for (let y = 0; y < height; y++) {
    const row = []
    for (let x = 0; x < width; x++) {
      const tileIndex = Math.floor(Math.random() * 100)
      row.push({ tileIndex })
    }
    map.push(row)
  }
  return map
}

function initWorld() {
  return {
    map: generateMap(20, 20),
    players: {},
    zombies: [],
  }
}

function addPlayer(world, id, data) {
  world.players[id] = {
    name: data.name,
    gender: data.gender,
    skinKey: data.skinKey,
    hairKey: data.hairKey,
    clothesKey: data.clothesKey,
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
    hp: 100,
  }
}

function movePlayer(world, id, direction) {
  const player = world.players[id]
  if (!player) return

  switch (direction) {
    case 'up': player.y -= 1; break
    case 'down': player.y += 1; break
    case 'left': player.x -= 1; break
    case 'right': player.x += 1; break
  }
}

function spawnZombie(world) {
  world.zombies.push({
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
    hp: 50,
  })
}

function moveZombies(world) {
  for (const zombie of world.zombies) {
    const target = getClosestPlayer(world, zombie)
    if (target) {
      if (target.x > zombie.x) zombie.x++
      else if (target.x < zombie.x) zombie.x--

      if (target.y > zombie.y) zombie.y++
      else if (target.y < zombie.y) zombie.y--
    }
  }
}

function getClosestPlayer(world, zombie) {
  const players = Object.values(world.players)
  if (players.length === 0) return null

  return players.reduce((closest, player) => {
    const d1 = Math.abs(player.x - zombie.x) + Math.abs(player.y - zombie.y)
    const d2 = Math.abs(closest.x - zombie.x) + Math.abs(closest.y - zombie.y)
    return d1 < d2 ? player : closest
  }, players[0])
}

module.exports = {
  initWorld,
  addPlayer,
  movePlayer,
  spawnZombie,
  moveZombies,
}
