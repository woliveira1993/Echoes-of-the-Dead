
export interface BowPlayer extends Phaser.Physics.Arcade.Sprite {
    isAttacking?: boolean,
    lastDirection?: string
}

export const createBowPlayer = (scene: Phaser.Scene) => {
    const player = scene.physics.add.sprite(200, 200, 'player_idle_bow_down');
    createBowAnimations(scene, player);
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

    // DEAD
    scene.load.spritesheet('player_dead_bow', './assets/player/Death_Bow/Death_Bow_Body_000.png', { frameWidth: 180, frameHeight: 180 });
}

export const createBowAnimations = (scene: Phaser.Scene, player: BowPlayer): void => {
    // IDLE
    scene.anims.create({
        key: 'player_idle_bow_up',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_up', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });
    scene.anims.create({
        key: 'player_idle_bow_down',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_down', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });
    scene.anims.create({
        key: 'player_idle_bow_left',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_left', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });
    scene.anims.create({
        key: 'player_idle_bow_right',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_right', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });
    scene.anims.create({
        key: 'player_idle_bow_upleft',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_upleft', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });
    scene.anims.create({
        key: 'player_idle_bow_upright',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_upright', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });
    scene.anims.create({
        key: 'player_idle_bow_downleft',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_downleft', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });
    scene.anims.create({
        key: 'player_idle_bow_downright',
        frames: scene.anims.generateFrameNumbers('player_idle_bow_downright', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    });

    // WALK
    scene.anims.create({
        key: 'player_walk_bow_up',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_up', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'player_walk_bow_down',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_down', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'player_walk_bow_left',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_left', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'player_walk_bow_right',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_right', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'player_walk_bow_upleft',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_upleft', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'player_walk_bow_upright',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_upright', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'player_walk_bow_downleft',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_downleft', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'player_walk_bow_downright',
        frames: scene.anims.generateFrameNumbers('player_walk_bow_downright', { start: 0, end: 16 }),
        frameRate: 10,
        repeat: -1
    });

    // ATTACK
    scene.anims.create({
        key: 'player_attack_bow_up',
        frames: scene.anims.generateFrameNumbers('player_attack_bow_up', { start: 0, end: 16 }),
        frameRate: 30,
        repeat: 0
    });
    scene.anims.create({
        key: 'player_attack_bow_down',
        frames: scene.anims.generateFrameNumbers('player_attack_bow_down', { start: 0, end: 16 }),
        frameRate: 30,
        repeat: 0
    });
    scene.anims.create({
        key: 'player_attack_bow_left',
        frames: scene.anims.generateFrameNumbers('player_attack_bow_left', { start: 0, end: 16 }),
        frameRate: 30,
        repeat: 0
    });
    scene.anims.create({
        key: 'player_attack_bow_right',
        frames: scene.anims.generateFrameNumbers('player_attack_bow_right', { start: 0, end: 16 }),
        frameRate: 30,
        repeat: 0
    });

    // DEAD
    scene.anims.create({
        key: 'player_dead_bow',
        frames: scene.anims.generateFrameNumbers('player_dead_bow', { start: 0, end: 16 }),
        frameRate: 60,
        repeat: -1
    });

    player.on('animationcomplete', function (animation: any) {
        if (animation.key.startsWith('player_attack_bow_')) {
            player.isAttacking = false;
        }
    }, scene);
};
