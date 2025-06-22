// src/scenes/Game.ts

import { Scene } from 'phaser';
import { createSwordAnimations, createSwordPlayer, SwordPlayer } from '../player/sword/main';
import { createBowAnimations, createBowPlayer, BowPlayer } from '../player/bow/main';
import { createControls, configControls } from '../controls/main';
import { createZombie, createZombieAnimations, ZombieSprite, ZombieState } from '../enemy/main';
import { SceneWithArrows } from '../fight/main';

export type AnyPlayer = SwordPlayer | BowPlayer;

export class Game extends Scene implements SceneWithArrows {
    camera: Phaser.Cameras.Scene2D.Camera;
    player: AnyPlayer;
    controls: any;
    wall: Phaser.Tilemaps.TilemapLayer;
    vegetation: Phaser.Tilemaps.TilemapLayer;

    // --- PROPRIEDADES PARA OS EFEITOS DE NOITE ---
    private playerLight!: Phaser.GameObjects.Light;
    private fogLayer!: Phaser.GameObjects.TileSprite; // <<< NÉVOA ADICIONADA DE VOLTA

    playerHp: number = 10;
    maxPlayerHp: number = 10;
    isDead: boolean = false;

    arrows!: Phaser.Physics.Arcade.Group;
    zombies!: Phaser.Physics.Arcade.Group;

    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setZoom(2);
        this.playerHp = 10;
        this.maxPlayerHp = 10;
        this.isDead = false;
        
        this.lights.enable();
        this.lights.setAmbientColor(0x111122); 

        const characterType = this.registry.get('characterType') || 'sword';
        const map = this.make.tilemap({ key: 'map' });
        
        const tileSetFloor = map.addTilesetImage('floor', 'floor_tiles_map', 16, 16, 0, 0);
        const tileSetWall = map.addTilesetImage('wall', 'wall_tiles_map', 16, 16, 0, 0);
        const tileSetVegetation = map.addTilesetImage('vegetation', 'vegetation_tiles_map', 16, 16, 0, 0);
        
        if (!tileSetFloor || !tileSetWall || !tileSetVegetation) return;

        map.createLayer('floor', tileSetFloor, 0, 0)?.setPipeline('Light2D');
        this.wall = map.createLayer('wall', tileSetWall, 0, 0)!.setPipeline('Light2D');
        this.vegetation = map.createLayer('vegetation', tileSetVegetation, 0, 0)!.setPipeline('Light2D');
        
        this.wall.setCollisionByProperty({ collider: true });
        this.vegetation.setCollisionByProperty({ collider: true });
        
        this.player = (characterType === 'sword' ? createSwordPlayer(this) : createBowPlayer(this))
            .setPipeline('Light2D');
        
        if (characterType === 'sword') createSwordAnimations(this, this.player);
        if (characterType === 'bow') createBowAnimations(this, this.player);
        
        this.player.setSize(40, 60).setOffset(70, 100);
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.collider(this.player, this.vegetation);
        
        this.player.anims.play(`player_idle_${characterType}_down`, true);
        this.player.lastDirection = 'down'; 
        
        this.controls = createControls(this);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        
        const mapWidth = this.wall.tilemap.widthInPixels;
        const mapHeight = this.wall.tilemap.heightInPixels;
        
        this.fogLayer = this.add.tileSprite(0, 0, mapWidth, mapHeight, 'fog')
            .setOrigin(0, 0)
            .setAlpha(0.5)
            .setDepth(20)
            .setBlendMode(Phaser.BlendModes.ADD);

        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        
        this.playerLight = this.lights.addLight(this.player.x, this.player.y, 130, 0xfdde8c, 1.1);

        createZombieAnimations(this);
        
        this.arrows = this.physics.add.group();
        this.zombies = this.physics.add.group({ classType: Phaser.Physics.Arcade.Sprite });

        this.zombies.add(createZombie(this));
        this.zombies.add(createZombie(this));
        this.zombies.add(createZombie(this));
        this.zombies.add(createZombie(this));

        this.physics.add.collider(this.zombies, this.zombies);
        this.physics.add.collider(this.zombies, this.wall);
        this.physics.add.collider(this.zombies, this.vegetation);

        this.physics.add.overlap(this.zombies, this.arrows, (zombieObj, arrowObj) => {
            const zombie = zombieObj as ZombieSprite;
            this.damageZombie(zombie, 2);
            arrowObj.destroy();
        }, undefined, this);
        
        this.scene.launch('HUD');
        this.game.events.once('hud-ready', () => {
            this.game.events.emit('update-hp', this.playerHp, this.maxPlayerHp);
        });
    }

    update() {
        if (this.isDead) return;
        
        // <<< ADICIONADO: ANIMAÇÃO DA NÉVOA >>>
        if (this.fogLayer) {
            this.fogLayer.tilePositionX += 0.05;
            this.fogLayer.tilePositionY += 0.03;
        }
        
        if (this.playerLight) {
            this.playerLight.x = this.player.x + Phaser.Math.FloatBetween(-2, 2);
            this.playerLight.y = this.player.y + Phaser.Math.FloatBetween(-2, 2);
        }
        
        this.updateZombieVisibility();
        
        this.player.setDepth(this.player.y);

        const characterType = this.registry.get('characterType') || 'sword';
        configControls(this.player, this.controls, this, characterType, this.zombies);

        this.zombies.children.iterate((z) => {
            const zombie = z as ZombieSprite;
            if (!zombie.active) return null;
            this.updateZombieAI(zombie);
            return null;
        });
    }
    
    private updateZombieVisibility() {
        if (!this.playerLight) return;
        const visionRadius = this.playerLight.radius;

        this.zombies.children.iterate((z: any) => {
            const zombie = z as ZombieSprite;
            if (!zombie.active) return null;
            
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, zombie.x, zombie.y);
            
            if (dist < visionRadius * 0.7) {
                zombie.setAlpha(1);
            } else if (dist < visionRadius) {
                const alpha = 1 - (dist - visionRadius * 0.7) / (visionRadius * 0.3);
                zombie.setAlpha(alpha);
            } else {
                zombie.setAlpha(0);
            }
            return null;
        });
    }

    updateZombieAI(zombie: ZombieSprite) {
        if (!zombie.body) return;
        
        if (zombie.alpha === 0 && zombie.state !== ZombieState.CHASING) {
             zombie.setVelocity(0, 0);
             return;
        }

        if (zombie.state === ZombieState.DEAD || zombie.state === ZombieState.HIT || zombie.state === ZombieState.ATTACKING) {
            zombie.setVelocity(0, 0);
            return;
        }

        const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, zombie.x, zombie.y);
        const chaseDistance = 300; 
        const attackDistance = 65;  

        if (dist < attackDistance && (!zombie.attackCooldownTimer || zombie.attackCooldownTimer.getProgress() === 1)) {
            zombie.state = ZombieState.ATTACKING;
        } else if (dist < chaseDistance) {
            zombie.state = ZombieState.CHASING;
        } else if (zombie.state === ZombieState.CHASING) {
            zombie.state = ZombieState.WANDERING;
        }

        switch (zombie.state) {
            case ZombieState.ATTACKING:
                zombie.setVelocity(0, 0);
                const dirAttack = getDirection(zombie, this.player);
                zombie.anims.play(`zombie_attack${this.getRandomInteger(1, 4)}_${dirAttack}`, true);
                zombie.damageTimer = this.time.delayedCall(500, () => {
                    if (zombie.state === ZombieState.ATTACKING && Phaser.Math.Distance.Between(this.player.x, this.player.y, zombie.x, zombie.y) <= attackDistance + 10) {
                        this.damagePlayer();
                    }
                });
                break;
            case ZombieState.IDLE:
                zombie.setVelocity(0, 0);
                zombie.anims.play(`zombie_idle_${getDirection(zombie, this.player)}`, true);
                break;
            case ZombieState.WANDERING:
                const dirWander = getDirection(zombie, this.player);
                if (zombie.body.velocity.x === 0 && zombie.body.velocity.y === 0) {
                    zombie.anims.play(`zombie_idle_${dirWander}`, true);
                } else {
                    zombie.anims.play(`zombie_walk_${dirWander}`, true);
                }
                break;
            case ZombieState.CHASING:
                this.physics.accelerateToObject(zombie, this.player, 70, 75, 75);
                zombie.anims.play(`zombie_walk_${getDirection(zombie, this.player)}`, true);
                break;
        }
        zombie.setDepth(zombie.y);
    }

    damageZombie(zombie: ZombieSprite, damage: number) {
        if (zombie.state === ZombieState.HIT || zombie.state === ZombieState.DEAD) { return; }
        if (zombie.damageTimer) { zombie.damageTimer.remove(); }
        zombie.hp -= damage;
        zombie.state = ZombieState.HIT;
        const dir = getDirection(zombie, this.player);
        zombie.anims.play(`zombie_hit${this.getRandomInteger(1, 2)}_${dir}`, true);
        if (zombie.attackCooldownTimer) { zombie.attackCooldownTimer.remove(); }
        zombie.attackCooldownTimer = this.time.addEvent({ delay: 700, callback: () => {} });
        if (zombie.hp <= 0) { this.killZombie(zombie); }
    }

    damagePlayer() {
        if (this.playerHp <= 0 || this.isDead || this.player.isHit) return;
        this.playerHp--;
        this.game.events.emit('update-hp', this.playerHp, this.maxPlayerHp);
        this.player.isHit = true;
        this.player.anims.play(`player_hit_${this.registry.get('characterType')}_${this.player.lastDirection}`, true);
        if (this.playerHp <= 0) {
            this.isDead = true;
            this.player.setVelocity(0, 0);
            this.player.anims.play(`player_dead_${this.registry.get('characterType')}`, true);
            this.physics.world.colliders.destroy();
            if (this.player.body) this.player.body.enable = false;
            this.player.once('animationcomplete', () => {
                this.cameras.main.fadeOut(3000, 0, 0, 0, (_camera: any, progress: any) => {
                    if (progress === 1) { this.scene.start('MainMenu'); this.scene.stop('HUD'); }
                });
            });
        }
    }
    
    killZombie(zombie: ZombieSprite) {
        zombie.state = ZombieState.DEAD;
        if (zombie.aiTimer) zombie.aiTimer.remove();
        if (zombie.attackCooldownTimer) zombie.attackCooldownTimer.remove();
        zombie.setVelocity(0, 0);
        zombie.anims.play(`zombie_death${this.getRandomInteger(1, 2)}_${getDirection(zombie, this.player)}`, true);
        zombie.setDepth(0);
        if (zombie.body) zombie.body.enable = false;
        zombie.once('animationcomplete', () => this.time.delayedCall(5000, () => zombie.destroy()));
    }

    getRandomInteger(min: number, max: number) { 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export function getDirection(source: any, target: any): string { 
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const angle = Phaser.Math.RadToDeg(Math.atan2(dy, dx));

    if (angle > -22.5 && angle <= 22.5) return 'right';
    if (angle > 22.5 && angle <= 67.5) return 'downright';
    if (angle > 67.5 && angle <= 112.5) return 'down';
    if (angle > 112.5 && angle <= 157.5) return 'downleft';
    if (angle > 157.5 || angle <= -157.5) return 'left';
    if (angle > -157.5 && angle <= -112.5) return 'upleft';
    if (angle > -112.5 && angle <= -67.5) return 'up';
    if (angle > -67.5 && angle <= -22.5) return 'upright';

    return 'down';
}
