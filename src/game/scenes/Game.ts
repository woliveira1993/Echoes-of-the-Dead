import { Scene } from 'phaser';
import { createSwordPlayer } from '../player/sword/main';
import { createBowPlayer } from '../player/bow/main';
import { createControls, configControls } from '../controls/main';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    player: any;
    controls: any;
    wall: any;
    vegetation: any;
    
    constructor () {
        super('Game');
    }

    create () {
        const characterType = this.registry.get('characterType') || 'sword';
        const map = this.make.tilemap({ key: 'map' });

        // Ajuste aqui conforme o tamanho real dos tiles, margin e spacing do seu tileset no Tiled
        const tileSetFloor = map.addTilesetImage('floor', 'floor_tiles_map', 16, 16, 0, 0);
        const tileSetWall = map.addTilesetImage('wall', 'wall_tiles_map', 16, 16, 0, 0);
        const tileSetVegetation = map.addTilesetImage('vegetation', 'vegetation_tiles_map', 16, 16, 0, 0);

        if (!tileSetFloor || !tileSetWall || !tileSetVegetation) {
            return;
        }

        map.createLayer('floor', tileSetFloor, 0, 0);
        this.wall = map.createLayer('wall', tileSetWall, 0, 0);
        this.vegetation = map.createLayer('vegetation', tileSetVegetation, 0, 0);

        this.wall.setCollisionByProperty({ collider: true });
        this.vegetation.setCollisionByProperty({ collider: true });

        if(characterType === 'sword'){
            this.player = createSwordPlayer(this);
        }

        if(characterType === 'bow'){
            this.player = createBowPlayer(this);
        }

        this.player.body.setSize(40, 60);
        this.player.body.setOffset(70, 100);
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.collider(this.player, this.vegetation);
        
        this.player.anims.play(`player_idle_${characterType}_down`, true);
        this.controls = createControls(this);

    }

    update () {
        const characterType = this.registry.get('characterType') || 'sword';
        configControls(this.player, this.controls, this, characterType);
    }
}
