import { Scene } from 'phaser';
import { loadSwordPlayerSprites } from '../player/sword/main';
import { loadBowPlayerSprites } from '../player/bow/main';

export class Preloader extends Scene
{
    player: any
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        this.load.image('floor_tiles_map', './assets/map/floor.png')
        this.load.image('wall_tiles_map', './assets/map/wall.png')
        this.load.image('vegetation_tiles_map', './assets/map/vegetation.png')
        this.load.tilemapTiledJSON('map', './assets/map/map.json')
        loadBowPlayerSprites(this)
        loadSwordPlayerSprites(this)
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
