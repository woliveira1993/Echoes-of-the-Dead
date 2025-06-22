const directions = [
  'up', 'down', 'left', 'right',
  'upleft', 'upright', 'downleft', 'downright'
];

let zombieAnimationsCreated = false

export enum ZombieState {
    IDLE,       // Parado
    WANDERING,  // Andando sem rumo (bom para quando o jogador está longe)
    CHASING,    // Perseguindo o jogador
    ATTACKING,  // Executando um ataque
    HIT,        // Foi atingido e está em recuo
    DEAD        // Morto
}

// Modifique a tipagem para incluir o estado e um temporizador de IA
export type ZombieSprite = Phaser.Physics.Arcade.Sprite & {
    hp: number;
    state: ZombieState;
    aiTimer: Phaser.Time.TimerEvent;
    damageTimer?: Phaser.Time.TimerEvent; // <<< NOVO: Para cancelar o dano
    attackCooldownTimer?: Phaser.Time.TimerEvent; // <<< NOVO: Para evitar ataques instantâneos
};
// Quantidade de quadros das animações
const idleFrames = 19;
const walkFrames = 19;
const runFrames = 19;
const attackFrames = [19,23,23,29];
const deathFrames = 23
const hitFrames = 15;
const lookupFrames = 29;
const roarFrames = 23;

// Quantidade de animações de ataque, morte, hit (baseado no seu print)
const attackTypes = 4;
const deathTypes = 2;
const hitTypes = 2;

export const loadZombieSprites = (scene: Phaser.Scene): void => {
    // IDLE
    directions.forEach(dir => {
        scene.load.spritesheet(`zombie_idle_${dir}`, `./assets/enemy/zombie/Idle/Idle Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
    });

    // WALK
    directions.forEach(dir => {
        scene.load.spritesheet(`zombie_walk_${dir}`, `./assets/enemy/zombie/Walk/Walk Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
    });

    // RUN
    directions.forEach(dir => {
        scene.load.spritesheet(`zombie_run_${dir}`, `./assets/enemy/zombie/Run/Run Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
    });

    // ATTACKS (Attack1, Attack2, ...)
    for (let a = 1; a <= attackTypes; a++) {
        directions.forEach(dir => {
            scene.load.spritesheet(`zombie_attack${a}_${dir}`, `./assets/enemy/zombie/Attack${a}/Attack${a} Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
        });
    }

    // DEATHS
    for (let d = 1; d <= deathTypes; d++) {
        directions.forEach(dir => {
            scene.load.spritesheet(`zombie_death${d}_${dir}`, `./assets/enemy/zombie/Death${d}/Death${d} Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
        });
    }

    // HITS
    for (let h = 1; h <= hitTypes; h++) {
        directions.forEach(dir => {
            scene.load.spritesheet(`zombie_hit${h}_${dir}`, `./assets/enemy/zombie/Hit${h}/Hit${h} Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
        });
    }

    // LOOKUP, ROAR
    directions.forEach(dir => {
        scene.load.spritesheet(`zombie_lookup_${dir}`, `./assets/enemy/zombie/Lookup/Lookup Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
        scene.load.spritesheet(`zombie_roar_${dir}`, `./assets/enemy/zombie/Roar/Roar Body ${angleOf(dir)}.png`, { frameWidth: 256, frameHeight: 256 });
    });
}

// Helper para transformar 'up' em 0, 'down' em 180 etc
function angleOf(dir: string): string {
    switch (dir) {
        case 'up': return '0';
        case 'down': return '180';
        case 'left': return '292';
        case 'right': return '090';
        case 'upleft': return '337';
        case 'upright': return '045';
        case 'downleft': return '247';
        case 'downright': return '157';
        default: return '0';
    }
}

export const createZombieAnimations = (scene: Phaser.Scene) => {

    if (zombieAnimationsCreated) return;
    zombieAnimationsCreated = true;

    // Loga frames para cada spritesheet antes de criar as animações
    function logTextureInfo(key: string) {
        key
        // if (scene.textures.exists(key)) {
        //     const tex = scene.textures.get(key);
        //     console.log(`[DEBUG SPRITESHEET] ${key}: frameTotal=${tex.frameTotal}, frames=[${tex.getFrameNames()}]`);
        // } else {
        //     console.warn(`[DEBUG SPRITESHEET] ${key}: NÃO carregada!`);
        // }
        return
    }

    // IDLE
    directions.forEach(dir => {
        const key = `zombie_idle_${dir}`;
        logTextureInfo(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: idleFrames }),
            frameRate: idleFrames + 1,
            repeat: -1,
            yoyo: true,
        });
        // console.log(`[ANIM CREATE] ${key}: 0-${idleFrames}`);
    });

    // WALK
    directions.forEach(dir => {
        const key = `zombie_walk_${dir}`;
        logTextureInfo(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: walkFrames }),
            frameRate: walkFrames + 1,
            repeat: -1,
        });
        // console.log(`[ANIM CREATE] ${key}: 0-${walkFrames}`);
    });

    // RUN
    directions.forEach(dir => {
        const key = `zombie_run_${dir}`;
        logTextureInfo(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: runFrames }),
            frameRate: runFrames + 1,
            repeat: -1,
        });
        // console.log(`[ANIM CREATE] ${key}: 0-${runFrames}`);
    });

    // ATTACKS
    for (let a = 1; a <= attackTypes; a++) {
        directions.forEach(dir => {
            const key = `zombie_attack${a}_${dir}`;
            logTextureInfo(key);
            scene.anims.create({
                key,
                frames: scene.anims.generateFrameNumbers(key, { start: 0, end: attackFrames[a - 1] }),
                frameRate: attackFrames[a - 1] + 1,
                repeat: 0,
            });
            // console.log(`[ANIM CREATE] ${key}: 0-${attackFrames[a - 1]}`);
        });
    }

    // DEATHS
    for (let d = 1; d <= deathTypes; d++) {
        directions.forEach(dir => {
            const key = `zombie_death${d}_${dir}`;
            logTextureInfo(key);
            scene.anims.create({
                key,
                frames: scene.anims.generateFrameNumbers(key, { start: 0, end: deathFrames }),
                frameRate: deathFrames + 1,
                repeat: 0,
            });
            // console.log(`[ANIM CREATE] ${key}: 0-${deathFrames}`);
        });
    }

    // HITS
    for (let h = 1; h <= hitTypes; h++) {
        directions.forEach(dir => {
            const key = `zombie_hit${h}_${dir}`;
            logTextureInfo(key);
            scene.anims.create({
                key,
                frames: scene.anims.generateFrameNumbers(key, { start: 0, end: hitFrames }),
                frameRate: hitFrames + 1,
                repeat: 0,
            });
            // console.log(`[ANIM CREATE] ${key}: 0-${hitFrames}`);
        });
    }

    // LOOKUP & ROAR
    directions.forEach(dir => {
        // Lookup
        let key = `zombie_lookup_${dir}`;
        logTextureInfo(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: lookupFrames }),
            frameRate: 8,
            repeat: -1,
        });
        // console.log(`[ANIM CREATE] ${key}: 0-${lookupFrames}`);
        // Roar
        key = `zombie_roar_${dir}`;
        logTextureInfo(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: roarFrames }),
            frameRate: 12,
            repeat: 0,
        });
        // console.log(`[ANIM CREATE] ${key}: 0-${roarFrames}`);
    });
};

export const createZombie = (scene: Phaser.Scene): ZombieSprite => {
    const zombie = scene.physics.add.sprite(getRandomInteger(100, 600), getRandomInteger(100, 600), 'zombie_idle_down') as ZombieSprite;
    
    // Propriedades da IA
    zombie.hp = 10;
    zombie.state = ZombieState.IDLE; // Começa no estado IDLE
    zombie.aiTimer = scene.time.addEvent({
        delay: Phaser.Math.Between(3000, 6000),
        callback: () => {
            // Só muda de ideia se estiver IDLE ou WANDERING e não tiver sido destruído
            if (!zombie.scene || zombie.state === ZombieState.DEAD) {
                zombie.aiTimer.remove();
                return;
            }

            if (zombie.state === ZombieState.IDLE || zombie.state === ZombieState.WANDERING) {
                const willWander = Math.random() > 0.4; // 60% de chance de vagar
                if (willWander) {
                    zombie.state = ZombieState.WANDERING;
                    const randomAngle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
                    const speed = 25; // Velocidade lenta de "vagar"
                    scene.physics.velocityFromRotation(randomAngle, speed, zombie.body!.velocity);
                } else {
                    zombie.state = ZombieState.IDLE;
                    zombie.setVelocity(0, 0);
                }
            }
        },
        loop: true,
    });
    
    zombie.setScale(0.5);
    zombie.setSize(60, 80);
    zombie.setOffset(98, 120);
    zombie.setDrag(200)
    zombie.setPipeline('Light2D');
    
    // Gerenciador de transição de estados via animação
    zombie.on('animationcomplete', function (animation: Phaser.Animations.Animation) {
        // Quando a animação de ataque termina, volta a perseguir.
        if (animation.key.startsWith('zombie_attack')) {
            zombie.state = ZombieState.CHASING; 
        }
        // Quando a animação de hit termina, volta a perseguir.
        if (animation.key.startsWith('zombie_hit')) {
            zombie.state = ZombieState.CHASING;
        }
    });

    return zombie;
};

const getRandomInteger = (min: number, max: number) => {
  min = Math.ceil(min); 
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
