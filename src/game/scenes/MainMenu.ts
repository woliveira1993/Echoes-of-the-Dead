// src/scenes/MainMenu.ts

import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    private logo!: GameObjects.Image;
    private particleEmitter: any; 
    private showButtons: boolean

    constructor() {
        super('MainMenu');
    }

    create() {
        this.showButtons = true
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        // ... (código de fundo, vinheta, etc. - inalterado) ...
        this.add.image(screenWidth / 2, screenHeight / 2, 'background')
        //this.add.image(screenWidth / 2, screenHeight / 2, 'vignette').setAlpha(0.6).setDisplaySize(screenWidth, screenHeight);
        this.logo = this.add.image(screenWidth / 2, screenHeight * 0.4, 'logo').setScale(0.4);
        this.cameras.main.zoomTo(1.1, 15000, 'Sine.easeInOut', true);
        this.tweens.add({
            targets: this.logo,
            scale: 0.42,
            duration: 3000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        this.particleEmitter = this.add.particles(0, 0, 'particle', {
            x: { min: 0, max: screenWidth },
            y: screenHeight + 50,
            lifespan: 10000,
            speedY: { min: -15, max: -30 },
            speedX: { min: -5, max: 5 },
            scale: { start: 0.1, end: 0.4 },
            alpha: { start: 0.1, end: 0 },
            quantity: 1,
            blendMode: 'ADD'
        });
        
        // --- 5. Botões Interativos ---

        if(this.showButtons){
            const startButton = this.createMenuButton(
                screenWidth / 2, screenHeight * 0.75, 'JOGAR', () => this.startGame()
            );
            this.createMenuButton(
                screenWidth / 2, startButton.y + 60, 'OPÇÕES', () => this.goToOptions()
            );
        }
    }
    
    // <<< SOLUÇÃO FINAL PARA O ERRO 'onClick' is declared but its value is never read >>>
    private createMenuButton(x: number, y: number, text: string, onClick: () => void): GameObjects.Text {
        const button = this.add.text(x, y, text, {
            fontFamily: 'Creepster',
            fontSize: '48px',
            color: '#c9b47a',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        button
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.tweens.add({ targets: button, scale: 1.1, duration: 150 }))
            .on('pointerout', () => this.tweens.add({ targets: button, scale: 1, duration: 150 }))
            .on('pointerdown', () => {
                if(text !== 'JOGAR'){
                    this.sound.play('menu_select', { volume: 0.6 });
                }
                this.tweens.add({
                    targets: button,
                    scale: 0.95,
                    duration: 100,
                    yoyo: true,
                    onComplete: onClick 
                });
            });
            
        return button;
    }
    
    private startGame() {
        this.showButtons = false
        this.sound.play('intro_eod');
        this.cameras.main.fadeOut(5000, 0, 0, 0);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            // A chamada de destruição está correta.
            if (this.particleEmitter) {
                this.particleEmitter.destroy();
            }
            this.scene.start('CharacterSelect');
        });
    }

     private goToOptions() {
        this.scene.start('OptionsScene');
    }
}