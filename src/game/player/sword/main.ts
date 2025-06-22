let swordAnimationsCreated = false

export interface SwordPlayer extends Phaser.Physics.Arcade.Sprite {
    isAttacking?: boolean,
    isHit?: boolean
    lastDirection?: string
}

export const createSwordPlayer = (scene: Phaser.Scene) => {
    const player = scene.physics.add.sprite(200, 200, 'player_idle_sword_down')
    player.setScale(0.7)
    return player;
}

export const loadSwordPlayerSprites = (scene: Phaser.Scene) : void => {

   ///////////////////////////////////////// IDLE //////////////////////////////////////////////////
    scene.load.spritesheet('player_idle_sword_up', './assets/player/Idle_Sword/Idle_Sword_Body_000.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_idle_sword_down', './assets/player/Idle_Sword/Idle_Sword_Body_180.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_idle_sword_left', './assets/player/Idle_Sword/Idle_Sword_Body_292.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_idle_sword_right', './assets/player/Idle_Sword/Idle_Sword_Body_090.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_idle_sword_upleft', './assets/player/Idle_Sword/Idle_Sword_Body_337.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_idle_sword_upright', './assets/player/Idle_Sword/Idle_Sword_Body_045.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_idle_sword_downleft', './assets/player/Idle_Sword/Idle_Sword_Body_247.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_idle_sword_downright', './assets/player/Idle_Sword/Idle_Sword_Body_157.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    
    ///////////////////////////////////////// WALK //////////////////////////////////////////////////
    
    scene.load.spritesheet('player_walk_sword_up', './assets/player/Run_Sword/Run_Sword_Body_000.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_walk_sword_down', './assets/player/Run_Sword/Run_Sword_Body_180.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_walk_sword_left', './assets/player/Run_Sword/Run_Sword_Body_292.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_walk_sword_right', './assets/player/Run_Sword/Run_Sword_Body_090.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_walk_sword_upleft', './assets/player/Run_Sword/Run_Sword_Body_337.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_walk_sword_upright', './assets/player/Run_Sword/Run_Sword_Body_045.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_walk_sword_downleft', './assets/player/Run_Sword/Run_Sword_Body_247.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_walk_sword_downright', './assets/player/Run_Sword/Run_Sword_Body_157.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    
     ///////////////////////////////////////// ATTACK //////////////////////////////////////////////////
    
    scene.load.spritesheet('player_attack_sword_up', './assets/player/Attack_Sword/Attack_Sword_Body_000.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_attack_sword_down', './assets/player/Attack_Sword/Attack_Sword_Body_180.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_attack_sword_left', './assets/player/Attack_Sword/Attack_Sword_Body_292.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_attack_sword_right', './assets/player/Attack_Sword/Attack_Sword_Body_090.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_attack_sword_upleft', './assets/player/Attack_Sword/Attack_Sword_Body_337.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_attack_sword_upright', './assets/player/Attack_Sword/Attack_Sword_Body_045.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_attack_sword_downleft', './assets/player/Attack_Sword/Attack_Sword_Body_247.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_attack_sword_downright', './assets/player/Attack_Sword/Attack_Sword_Body_157.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
///////////////////////////////////////// HIT //////////////////////////////////////////////////
    scene.load.spritesheet('player_hit_sword_up', './assets/player/Hit_Sword/Hit_Sword_Body_000.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_hit_sword_down', './assets/player/Hit_Sword/Hit_Sword_Body_180.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_hit_sword_left', './assets/player/Hit_Sword/Hit_Sword_Body_292.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_hit_sword_right', './assets/player/Hit_Sword/Hit_Sword_Body_090.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_hit_sword_upleft', './assets/player/Hit_Sword/Hit_Sword_Body_337.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_hit_sword_upright', './assets/player/Hit_Sword/Hit_Sword_Body_045.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_hit_sword_downleft', './assets/player/Hit_Sword/Hit_Sword_Body_247.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
    scene.load.spritesheet('player_hit_sword_downright', './assets/player/Hit_Sword/Hit_Sword_Body_157.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
///////////////////////////////////////// DEAD //////////////////////////////////////////////////
    scene.load.spritesheet('player_dead_sword', './assets/player/Death_Sword/Death_Sword_Body_000.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
}

export const createSwordAnimations = (scene: Phaser.Scene, player: SwordPlayer): void => {
    if (swordAnimationsCreated) return;
    swordAnimationsCreated = true;

    const directions = [
        'up', 'down', 'left', 'right',
        'upleft', 'upright', 'downleft', 'downright'
    ];

    // Helper para logar frames disponíveis
    function logFrames(name: string) {
        try {
            return name
            // const texture = scene.textures.get(name);
            // const frameTotal = texture.frameTotal;
            // const frames = Object.keys(texture.frames)
            //     .filter(f => f !== '__BASE')
            //     .map(Number)
            //     .sort((a, b) => a - b);
            // console.log(`[DEBUG SWORD] ${name} frameTotal=${frameTotal}, frames=[${frames.join(',')}]`);
        } catch (e) {
            // console.warn(`[DEBUG SWORD] Falha ao acessar textura: ${name}`, e);
        }
    }

    // IDLE
    directions.forEach(dir => {
        const key = `player_idle_sword_${dir}`;
        logFrames(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 15 }),
            frameRate: 16,
            repeat: -1,
            yoyo: true
        });
    });

    // WALK
    directions.forEach(dir => {
        const key = `player_walk_sword_${dir}`;
        logFrames(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 19 }),
            frameRate: 20,
            repeat: -1
        });
    });

    // ATTACK
    directions.forEach(dir => {
        const key = `player_attack_sword_${dir}`;
        logFrames(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 23 }),
            frameRate: 24,
            repeat: 0
        });
    });

    // HIT
    directions.forEach(dir => {
        const key = `player_hit_sword_${dir}`;
        logFrames(key);
        scene.anims.create({
            key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 15 }),
            frameRate: 20,
            repeat: 0
        });
    });

    // DEAD (só uma animação)
    const deadKey = 'player_dead_sword';
    logFrames(deadKey);
    scene.anims.create({
        key: deadKey,
        frames: scene.anims.generateFrameNumbers(deadKey, { start: 0, end: 29 }),
        frameRate: 30,
        repeat: 0
    });

    // Handler para liberar movimento após fim do ataque/hit
    player.on('animationcomplete', function (animation: any) {
        if (animation.key.startsWith('player_attack_sword_')) {
            player.isAttacking = false;
        }
        if (animation.key.startsWith('player_hit_sword_')) {
            player.isHit = false;
        }
    }, scene);
};

