// src/scenes/CharacterSelect.ts

import { Scene, GameObjects } from 'phaser';

export class CharacterSelect extends Scene {
    private swordCard!: GameObjects.Container;
    private bowCard!: GameObjects.Container;
    private startButton!: GameObjects.Text;
    private selectedType: string | null = null;
    
    private cardWidth = 280;
    private cardHeight = 400;
    private defaultTint = 0x888888;
    private selectedTint = 0xffffff;

    constructor() {
        super('CharacterSelect');
    }

    create() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        
        this.add.image(screenWidth / 2, screenHeight / 2, 'background');
        
        const title = this.add.text(screenWidth / 2, 80, 'ESCOLHA SUA ARMA', {
            fontFamily: 'Creepster',
            fontSize: '64px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.swordCard = this.createCharacterCard(
            screenWidth / 2 - 180,
            screenHeight / 2 + 20,
            'sword_character',
            'Espadachim',
            'Ataques rápidos e poderosos \na curta distância.',
            'sword'
        );

        this.bowCard = this.createCharacterCard(
            screenWidth / 2 + 180,
            screenHeight / 2 + 20,
            'bow_character',
            'Arqueira',
            'Mantenha distância e elimine \nos inimigos antes que cheguem perto.',
            'bow'
        );

        this.startButton = this.add.text(screenWidth / 2, screenHeight - 80, 'INICIAR AVENTURA', {
            fontFamily: 'Creepster',
            fontSize: '48px',
            color: '#c9b47a'
        }).setOrigin(0.5).setAlpha(0.3);
        
        // <<< CORREÇÃO APLICADA AQUI >>>
        this.add.tween({
            targets: [title, this.swordCard, this.bowCard, this.startButton],
            y: '+=20', // Mudado para `+=` para que eles "caiam" no lugar, parece mais natural. `y: '-=20'` também funciona.
            alpha: { from: 0, to: 1 },
            duration: 800,
            ease: 'Power2',
            delay: this.tweens.stagger(150, { from: 'start' }) 
        });
    }

    // Função createCharacterCard permanece a mesma
    private createCharacterCard(x: number, y: number, charKey: string, name: string, description: string, type: string): GameObjects.Container {
        const card = this.add.container(x, y).setAlpha(0);

        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.6);
        bg.fillRoundedRect(-this.cardWidth / 2, -this.cardHeight / 2, this.cardWidth, this.cardHeight, 10);
        bg.lineStyle(2, 0xaaaaaa, 0.7);
        bg.strokeRoundedRect(-this.cardWidth / 2, -this.cardHeight / 2, this.cardWidth, this.cardHeight, 10);
        card.add(bg);

        const charImage = this.add.image(0, -70, charKey).setScale(0.3).setTint(this.defaultTint);
        card.add(charImage);
        
        const nameText = this.add.text(0, 80, name, { fontFamily: 'Creepster', fontSize: '36px', color: '#ffffff' }).setOrigin(0.5);
        card.add(nameText);
        
        const descText = this.add.text(0, 140, description, { fontFamily: 'Arial', fontSize: '16px', color: '#dddddd', align: 'center', wordWrap: { width: this.cardWidth - 20 } }).setOrigin(0.5);
        card.add(descText);

        card.setSize(this.cardWidth, this.cardHeight);
        card.setInteractive({ useHandCursor: true });

        card.on('pointerdown', () => this.selectCharacter(type));
        card.on('pointerover', () => {
            if (this.selectedType !== type) { this.tweens.add({ targets: card, scale: 1.05, duration: 200, ease: 'Power1' }); }
        });
        card.on('pointerout', () => {
            if (this.selectedType !== type) { this.tweens.add({ targets: card, scale: 1.0, duration: 200, ease: 'Power1' }); }
        });

        return card;
    }
    
    // Função selectCharacter permanece a mesma
    private selectCharacter(type: string) {
        if (this.selectedType) {
            const previousCard = (this.selectedType === 'sword') ? this.swordCard : this.bowCard;
            this.setCardSelected(previousCard, false);
        }
        this.selectedType = type;
        const newCard = (type === 'sword') ? this.swordCard : this.bowCard;
        this.setCardSelected(newCard, true);
        this.activateStartButton();
        this.sound.play('menu_select');
    }
    
    // Função setCardSelected permanece a mesma
    private setCardSelected(card: GameObjects.Container, isSelected: boolean) {
        const charImage = card.getAt(1) as GameObjects.Image;
        if (isSelected) {
            charImage.setTint(this.selectedTint);
            this.tweens.add({ targets: card, scale: 1.1, duration: 200, ease: 'Back.easeOut' });
        } else {
            charImage.setTint(this.defaultTint);
            this.tweens.add({ targets: card, scale: 1.0, duration: 200 });
        }
    }
    
    // Função activateStartButton permanece a mesma
    private activateStartButton() {
        this.startButton.setAlpha(1);
        this.startButton.setInteractive({ useHandCursor: true });
        
        this.startButton.off('pointerdown');
        this.startButton.on('pointerdown', () => {
            this.registry.set('characterType', this.selectedType);
            this.sound.play('menu_select', { volume: 0.6 });

            this.cameras.main.fadeOut(3000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('Game');
            });
        });
    }
}