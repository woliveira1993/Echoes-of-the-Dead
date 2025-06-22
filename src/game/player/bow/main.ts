let bowAnimationsCreated = false

export interface BowPlayer extends Phaser.Physics.Arcade.Sprite {
    isAttacking?: boolean,
    isHit?: boolean,
    lastDirection?: string
}

export const createBowPlayer = (scene: Phaser.Scene) => {
    const player = scene.physics.add.sprite(200, 200, 'player_idle_bow_down');
    player.setScale(0.7)
    return player;
}

export const loadBowPlayerSprites = (scene: Phaser.Scene): void => {
    // IDLE
    scene.load.spritesheet('player_idle_bow_up', './assets/player/Idle_Bow/Idle_Bow_Body_000.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_idle_bow_down', './assets/player/Idle_Bow/Idle_Bow_Body_180.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_idle_bow_left', './assets/player/Idle_Bow/Idle_Bow_Body_292.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_idle_bow_right', './assets/player/Idle_Bow/Idle_Bow_Body_090.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_idle_bow_upleft', './assets/player/Idle_Bow/Idle_Bow_Body_337.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_idle_bow_upright', './assets/player/Idle_Bow/Idle_Bow_Body_045.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_idle_bow_downleft', './assets/player/Idle_Bow/Idle_Bow_Body_247.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_idle_bow_downright', './assets/player/Idle_Bow/Idle_Bow_Body_157.png', { frameWidth: 180, frameHeight: 180 });

    // WALK
    scene.load.spritesheet('player_walk_bow_up', './assets/player/Run_Bow/Run_Bow_Body_000.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_walk_bow_down', './assets/player/Run_Bow/Run_Bow_Body_180.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_walk_bow_left', './assets/player/Run_Bow/Run_Bow_Body_292.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_walk_bow_right', './assets/player/Run_Bow/Run_Bow_Body_090.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_walk_bow_upleft', './assets/player/Run_Bow/Run_Bow_Body_337.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_walk_bow_upright', './assets/player/Run_Bow/Run_Bow_Body_045.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_walk_bow_downleft', './assets/player/Run_Bow/Run_Bow_Body_247.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_walk_bow_downright', './assets/player/Run_Bow/Run_Bow_Body_157.png', { frameWidth: 180, frameHeight: 180 });

    // ATTACK
    scene.load.spritesheet('player_attack_bow_up', './assets/player/Attack_Bow/Attack_Bow_Body_000.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_attack_bow_down', './assets/player/Attack_Bow/Attack_Bow_Body_180.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_attack_bow_left', './assets/player/Attack_Bow/Attack_Bow_Body_292.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_attack_bow_right', './assets/player/Attack_Bow/Attack_Bow_Body_090.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_attack_bow_upleft', './assets/player/Attack_Bow/Attack_Bow_Body_337.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_attack_bow_upright', './assets/player/Attack_Bow/Attack_Bow_Body_045.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_attack_bow_downleft', './assets/player/Attack_Bow/Attack_Bow_Body_247.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_attack_bow_downright', './assets/player/Attack_Bow/Attack_Bow_Body_157.png', { frameWidth: 180, frameHeight: 180 });

    // HIT
    scene.load.spritesheet('player_hit_bow_up', './assets/player/Hit_Bow/Hit_Bow_Body_000.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_hit_bow_down', './assets/player/Hit_Bow/Hit_Bow_Body_180.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_hit_bow_left', './assets/player/Hit_Bow/Hit_Bow_Body_292.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_hit_bow_right', './assets/player/Hit_Bow/Hit_Bow_Body_090.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_hit_bow_upleft', './assets/player/Hit_Bow/Hit_Bow_Body_337.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_hit_bow_upright', './assets/player/Hit_Bow/Hit_Bow_Body_045.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_hit_bow_downleft', './assets/player/Hit_Bow/Hit_Bow_Body_247.png', { frameWidth: 180, frameHeight: 180 });
    scene.load.spritesheet('player_hit_bow_downright', './assets/player/Hit_Bow/Hit_Bow_Body_157.png', { frameWidth: 180, frameHeight: 180 });

    // DEAD
    scene.load.spritesheet('player_dead_bow', './assets/player/Death_Bow/Death_Bow_Body_000.png', { frameWidth: 180, frameHeight: 180 });
}

export const createBowAnimations = (scene: Phaser.Scene, player: BowPlayer): void => {
    
    if (bowAnimationsCreated) return;
    bowAnimationsCreated = true;

    const dirs = [
        "up", "down", "left", "right",
        "upleft", "upright", "downleft", "downright"
    ];

    // Idle
    dirs.forEach(dir => {
        scene.anims.create({
            key: `player_idle_bow_${dir}`,
            frames: scene.anims.generateFrameNumbers(`player_idle_bow_${dir}`, { start: 0, end: 15 }),
            frameRate: 16,
            repeat: -1,
            yoyo: true
        });
    });

    // Walk
    dirs.forEach(dir => {
        scene.anims.create({
            key: `player_walk_bow_${dir}`,
            frames: scene.anims.generateFrameNumbers(`player_walk_bow_${dir}`, { start: 0, end: 19 }),
            frameRate: 20,
            repeat: -1
        });
    });

    // Attack
    dirs.forEach(dir => {
        scene.anims.create({
            key: `player_attack_bow_${dir}`,
            frames: scene.anims.generateFrameNumbers(`player_attack_bow_${dir}`, { start: 0, end: 23 }),
            frameRate: 24,
            repeat: 0
        });
    });

    // Hit (novo, igual ao padrão do zumbi)
    dirs.forEach(dir => {
        scene.anims.create({
            key: `player_hit_bow_${dir}`,
            frames: scene.anims.generateFrameNumbers(`player_hit_bow_${dir}`, { start: 0, end: 15 }),
            frameRate: 20,
            repeat: 0
        });
    });

    // Death (uma só)
    scene.anims.create({
        key: 'player_dead_bow',
        frames: scene.anims.generateFrameNumbers('player_dead_bow', { start: 0, end: 29 }),
        frameRate: 30,
        repeat: 0
    });

    // Controle de ataque/hit: libera o movimento após animação de ataque/hit acabar
    player.on('animationcomplete', function (animation: any) {
        if (animation.key.startsWith('player_attack_bow_')) {
            player.isAttacking = false;
        }
        if (animation.key.startsWith('player_hit_bow_')) {
            player.isHit = false;
        }
    }, scene);
};

