export interface SwordPlayer extends Phaser.Physics.Arcade.Sprite {
    isAttacking?: boolean,
    lastDirection?: string
}

export const createSwordPlayer = (scene: Phaser.Scene) => {
    const player = scene.physics.add.sprite(200, 200, 'player_idle_sword_down')
    createAnimations(scene, player)
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

     ///////////////////////////////////////// DEAD //////////////////////////////////////////////////

    scene.load.spritesheet('player_dead_sword', './assets/player/Death_Sword/Death_Sword_Body_000.png', { frameWidth: 180, frameHeight: 180, spacing: 0 })
}

export const createAnimations = (scene: Phaser.Scene, player: SwordPlayer): void => {

///////////////////////////////////////// IDLE //////////////////////////////////////////////////

    scene.anims.create({
        key: 'player_idle_sword_up',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_up', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'player_idle_sword_down',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_down', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'player_idle_sword_left',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_left', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'player_idle_sword_right',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_right', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'player_idle_sword_upleft',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_upleft', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'player_idle_sword_downright',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_downright', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'player_idle_sword_downleft',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_downleft', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'player_idle_sword_upright',
        frames: scene.anims.generateFrameNumbers('player_idle_sword_upright', {
            start: 0,
            end: 4
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

///////////////////////////////////////// WALK //////////////////////////////////////////////////
    scene.anims.create({
        key: 'player_walk_sword_up',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_up', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'player_walk_sword_left',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_left', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
    })

    scene.anims.create({
        key: 'player_walk_sword_right',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_right', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'player_walk_sword_down',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_down', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'player_walk_sword_upleft',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_upleft', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'player_walk_sword_upright',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_upright', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
    })

    scene.anims.create({
        key: 'player_walk_sword_downleft',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_downleft', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'player_walk_sword_downright',
        frames: scene.anims.generateFrameNumbers('player_walk_sword_downright', {
            start: 0,
            end: 16
        }),
        frameRate: 10,
        repeat: -1
    })

///////////////////////////////////////// ATTACK //////////////////////////////////////////////////

    scene.anims.create({
        key: 'player_attack_sword_up',
        frames: scene.anims.generateFrameNumbers('player_attack_sword_up', {
            start: 0,
            end: 16
        }),
        frameRate: 30,
        repeat: 0,
    })

    scene.anims.create({
        key: 'player_attack_sword_left',
        frames: scene.anims.generateFrameNumbers('player_attack_sword_left', {
            start: 0,
            end: 16
        }),
        frameRate: 30,
        repeat: 0,
    })

    scene.anims.create({
        key: 'player_attack_sword_right',
        frames: scene.anims.generateFrameNumbers('player_attack_sword_right', {
            start: 0,
            end: 16
        }),
        frameRate: 30,
        repeat: 0,
    })

    scene.anims.create({
        key: 'player_attack_sword_down',
        frames: scene.anims.generateFrameNumbers('player_attack_sword_down', {
            start: 0,
            end: 16
        }),
        frameRate: 30,
        repeat: 0,
    })

///////////////////////////////////////// DEAD //////////////////////////////////////////////////

    scene.anims.create({
        key: 'player_dead_sword',
        frames: scene.anims.generateFrameNumbers('player_dead_sword', {
            start: 0,
            end: 16
        }),
        frameRate: 60,
        repeat: -1
    })

    player.on('animationcomplete', function (animation: any) {
        if (animation.key.startsWith('player_attack_sword_')) {
            player.isAttacking = false;
        }
    }, scene);

}