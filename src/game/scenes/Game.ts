import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const map = this.make.tilemap({key: 'map'})
        console.log("map", map)
        const tileSetCentro = map.addTilesetImage('urban-rpg-city', 'tiles')

        console.log(tileSetCentro, "????")
        if(!tileSetCentro){
            return
        }

        map.createLayer('base', tileSetCentro, 0, 0)
        map.createLayer('objetos', tileSetCentro, 0, 0)
    }
}
