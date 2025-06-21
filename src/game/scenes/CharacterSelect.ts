// CharacterSelect.ts

import { Scene, GameObjects } from 'phaser';

export class CharacterSelect extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    swordTitle: GameObjects.Text;
    bowTitle: GameObjects.Text;
    swordIcon: GameObjects.Image;
    bowIcon: GameObjects.Image;

    constructor ()
    {
        super('CharacterSelect');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.title = this.add.text(512, 700, 'Selecione seu personagem', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'bottom'
        }).setOrigin(0.5);

        ///////////////////////////////////////SWORD/////////////////////////////////////////////////////////
        this.swordIcon = this.add.image(330, 300, 'sword_character').setInteractive({ useHandCursor: true });

        this.swordTitle = this.add.text(330, 400, 'Espada', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'bottom'
        }).setOrigin(0.5);

        this.swordIcon.setScale(0.3)

        this.swordIcon.on('pointerdown', () => {
            this.registry.set('characterType', 'sword');
            this.scene.start('Game');
        });

        /////////////////////////////////////////BOW///////////////////////////////////////////////////////////////////////
        this.bowIcon = this.add.image(670, 300, 'bow_character').setInteractive({ useHandCursor: true });

        this.swordTitle = this.add.text(670, 400, 'Arco', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'bottom'
        }).setOrigin(0.5);

        this.bowIcon.setScale(0.3)
    

        this.bowIcon.on('pointerdown', () => {
            this.registry.set('characterType', 'bow');
            this.scene.start('Game');
        });
    }
}
