// src/scenes/OptionsScene.ts

import { Scene, GameObjects } from 'phaser';

// Definindo as resoluções que vamos oferecer
const resolutions = [
    { text: '1024 x 768 (Padrão)', width: 1024, height: 768 },
    { text: '1280 x 720 (HD)', width: 1280, height: 720 },
    { text: '1600 x 900', width: 1600, height: 900 },
    { text: '1920 x 1080 (Full HD)', width: 1920, height: 1080 }
];

// Cor para destacar o botão selecionado
const SELECTED_COLOR = '#ffdd00';
const DEFAULT_COLOR = '#c9b47a';

export class OptionsScene extends Scene {

    private selectedResolution: { width: number, height: number };
    private resolutionButtons: GameObjects.Text[] = [];

    constructor() {
        super('OptionsScene');
        // Inicializa com a resolução padrão do jogo
        this.selectedResolution = { width: 1024, height: 768 }; 
    }

    create(data: { applied?: boolean }) {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        // Fundo e título consistentes com o MainMenu
        this.add.image(screenWidth / 2, screenHeight / 2, 'background').setAlpha(0.8);
        this.add.text(screenWidth / 2, 100, 'CONFIGURAÇÕES', {
            fontFamily: 'Creepster',
            fontSize: '64px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // --- Seção de Resolução ---
        this.add.text(screenWidth / 2, 220, 'Resolução da Tela', {
            fontFamily: 'Creepster',
            fontSize: '32px',
            color: DEFAULT_COLOR
        }).setOrigin(0.5);
        
        // Guarda a resolução atual para pre-selecionar o botão correto
        this.selectedResolution = { width: this.scale.width, height: this.scale.height };

        let yPos = 280;
        resolutions.forEach(res => {
            const resButton = this.add.text(screenWidth / 2, yPos, res.text, {
                fontFamily: 'Creepster',
                fontSize: '28px',
                color: DEFAULT_COLOR,
            }).setOrigin(0.5)
              .setInteractive({ useHandCursor: true });
            
            resButton.on('pointerdown', () => {
                this.sound.play('menu_select');
                this.selectedResolution = { width: res.width, height: res.height };
                this.updateButtonStates();
            });
            
            this.resolutionButtons.push(resButton);
            yPos += 50;
        });

        this.updateButtonStates();

        // --- Botões de Ação (Aplicar e Voltar) ---
        this.createActionButton(screenWidth / 2 - 150, screenHeight - 100, 'APLICAR', () => this.applySettings());
        this.createActionButton(screenWidth / 2 + 150, screenHeight - 100, 'VOLTAR', () => this.scene.start('MainMenu'));

        if (data && data.applied) {
            const savedText = this.add.text(screenWidth / 2, screenHeight - 150, 'Salvo!', { fontFamily: 'Creepster', fontSize: '24px', color: '#00ff00' }).setOrigin(0.5);
            this.time.delayedCall(1500, () => savedText.destroy());
        }

    }
    
    private updateButtonStates() {
        this.resolutionButtons.forEach((button, index) => {
            const res = resolutions[index];
            if (res.width === this.selectedResolution.width && res.height === this.selectedResolution.height) {
                button.setColor(SELECTED_COLOR);
                button.setText(`> ${res.text} <`); // Feedback visual extra
            } else {
                button.setColor(DEFAULT_COLOR);
                button.setText(res.text);
            }
        });
    }

    private applySettings() {
        this.sound.play('menu_select');
        
        if (this.scale.width !== this.selectedResolution.width || this.scale.height !== this.selectedResolution.height) {
            
            // Redimensiona o HTML
            const gameContainer = document.getElementById('game-container');
            if (gameContainer) {
                gameContainer.style.width = `${this.selectedResolution.width}px`;
                gameContainer.style.height = `${this.selectedResolution.height}px`;
            }
            
            // Redimensiona o Phaser
            this.scale.resize(this.selectedResolution.width, this.selectedResolution.height);
            
            // <<< A SOLUÇÃO: ESPERAR UM FRAME ANTES DE REINICIAR >>>
            // Isso dá ao renderizador WebGL tempo para se ajustar ao novo tamanho.
            this.time.delayedCall(10, () => { // 10ms é um atraso seguro e imperceptível
                this.scene.restart({ applied: true });
            });
        }
    }
    
    // Função helper para criar os botões de ação, similar ao do MainMenu
    private createActionButton(x: number, y: number, text: string, onClick: () => void): GameObjects.Text {
        const button = this.add.text(x, y, text, {
            fontFamily: 'Creepster', fontSize: '32px', color: DEFAULT_COLOR
        }).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true })
            .on('pointerdown', onClick)
            .on('pointerover', () => button.setColor(SELECTED_COLOR))
            .on('pointerout', () => button.setColor(DEFAULT_COLOR));

        return button;
    }
}