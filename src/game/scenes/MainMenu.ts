import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');
        this.logo.setScale(0.4);

        this.title = this.add.text(512, 550, 'Iniciar', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'bottom'
        }).setOrigin(0.5);

        this.title.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('CharacterSelect');
            });
    }
}
