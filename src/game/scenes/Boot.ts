import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg.png');
        this.load.image('logo', 'assets/logo.png');

        this.load.image('sword_character', 'assets/character/03_wShadow.png');
        this.load.image('bow_character', 'assets/character/08_wShadow.png');

    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
