// src/scenes/Preloader.ts

import { Scene } from 'phaser';
import { loadSwordPlayerSprites } from '../player/sword/main';
import { loadBowPlayerSprites } from '../player/bow/main';
import { loadShotArrowSprites } from '../fight/main';
import { loadZombieSprites } from '../enemy/main';
import WebFontLoader from 'webfontloader';

export class Preloader extends Scene {
    private loadingMessages: string[] = [
        'CHECANDO FONTES DE ENERGIA...',
        'SINTONIZANDO TRANSMISSÕES DE EMERGÊNCIA...',
        'ANALISANDO AMEAÇAS EXTERNAS...',
        'RECALIBRANDO SISTEMAS DEFENSIVOS...',
        'ACESANDO REGISTROS DOS SOBREVIVENTES...',
        'FORTALECENDO AS BARRICADAS...'
    ];
    
    private loadingText!: Phaser.GameObjects.Text;
    private messageTimer!: Phaser.Time.TimerEvent;

    constructor() {
        super('Preloader');
    }

    init() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        this.loadingText = this.add.text(screenWidth / 2, screenHeight - 60, '', {
            fontFamily: 'Arial', fontSize: '20px', color: '#a9a9a9',
            fontStyle: 'italic', stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(10);

        this.load.on('complete', () => {
            const minLoadTime = 10000;
            const elapsedTime = this.time.now - this.time.startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);
            this.time.delayedCall(remainingTime, this.readyToContinue, [], this);
        });
    }

    preload() {
        this.loadAssets();
        WebFontLoader.load({ custom: { families: ['Creepster'] } });
    }

    private loadAssets() {
        // Novos assets para esta cena
        this.load.image('preloader_bg', 'assets/loading/loading_bg.png'); 
        this.load.image('glow', 'assets/ui/glow.png'); 

        // Áudio
        this.load.audio('intro_eod', 'assets/audio/eod_intro.mp3');
        this.load.audio('menu_select', 'assets/audio/menu_select.mp3');
        this.load.audio('loading', 'assets/audio/loading.mp3');
        
        // Imagens de UI
        this.load.image('logo', './assets/logo.png'); 
        this.load.image('background', './assets/background.png'); // Imagem do menu principal
        this.load.image('sword_character', './assets/ui/sword_character.png');
        this.load.image('bow_character', './assets/ui/bow_character.png');
        
        // Assets do Jogo
        this.load.image('floor_tiles_map', './assets/map/floor.png');
        this.load.image('wall_tiles_map', './assets/map/wall.png');
        this.load.image('vegetation_tiles_map', './assets/map/vegetation.png');
        this.load.image('fog', './assets/map/fog.png');
        this.load.tilemapTiledJSON('map', './assets/map/map.json');
        
        for (let i = 1; i <= 6; i++) {
            this.load.image(`sword_slash_${i}`, `./assets/sword_slash/File${i}.png`);
        }
        
        // Spritesheets
        loadBowPlayerSprites(this);
        loadSwordPlayerSprites(this);
        loadShotArrowSprites(this);
        loadZombieSprites(this);
    }
    
    create() {
        this.createAtmosphericBackground();

        let messageIndex = 0;
        this.loadingText.setText(this.loadingMessages[messageIndex]);
        this.messageTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                messageIndex = (messageIndex + 1) % this.loadingMessages.length;
                this.loadingText.setText(this.loadingMessages[messageIndex]);
            },
            loop: true
        });
    }

    private readyToContinue() {
        this.messageTimer.remove();

        this.loadingText.setText('PRESSIONE QUALQUER TECLA PARA CONTINUAR');
        this.tweens.add({ targets: this.loadingText, alpha: { from: 0.3, to: 1 }, duration: 800, yoyo: true, repeat: -1 });

        this.input!.keyboard!.once('keydown', () => {
            this.cameras.main.fadeOut(1500, 0, 0, 0, (_camera: any, progress: any) => {
                if (progress === 1) this.scene.start('MainMenu');
            });
        });
    }

    private createAtmosphericBackground() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        this.add.image(screenWidth / 2, screenHeight / 2, 'preloader_bg').setDisplaySize(screenWidth, screenHeight).setAlpha(0.9);
        this.cameras.main.zoomTo(1.1, 10000);

        const eyeX_center = 860, eyeY = 400, eyeDistance = 88, originalImgWidth = 1920;
        const scaleFactor = screenWidth / originalImgWidth;
        const finalEyeX = (eyeX_center / originalImgWidth) * screenWidth;
        const finalEyeY = (eyeY / this.textures.get('preloader_bg').getSourceImage().height) * screenHeight;
        const finalEyeDistance = eyeDistance * scaleFactor;
        
        const eye1 = this.add.image(finalEyeX - finalEyeDistance / 2, finalEyeY, 'glow').setScale(0.15 * scaleFactor).setBlendMode(Phaser.BlendModes.ADD);
        const eye2 = this.add.image(finalEyeX + finalEyeDistance / 2, finalEyeY, 'glow').setScale(0.15 * scaleFactor).setBlendMode(Phaser.BlendModes.ADD);

        [eye1, eye2].forEach(eye => {
            this.tweens.add({
                targets: eye, alpha: { from: 0.1, to: 0.7 }, duration: Phaser.Math.Between(2000, 3500),
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: Phaser.Math.Between(0, 500)
            });
        });

        const flickerOverlay = this.add.rectangle(screenWidth / 2, screenHeight / 2, screenWidth, screenHeight, 0x000000, 0).setDepth(5);
        
        this.time.addEvent({
            delay: Phaser.Math.Between(3000, 8000),
            callback: () => {
                this.tweens.add({
                    targets: flickerOverlay, alpha: 0.2, duration: 80, ease: 'Stepped',
                    onComplete: () => {
                        this.tweens.add({
                            targets: flickerOverlay, alpha: 0, duration: 120, ease: 'Stepped',
                            onComplete: () => {
                                this.tweens.add({
                                    targets: flickerOverlay, alpha: 0.3, duration: 50, ease: 'Stepped',
                                    onComplete: () => {
                                        this.tweens.add({
                                            targets: flickerOverlay, alpha: 0, duration: 200, ease: 'Stepped'
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            },
            loop: true
        });
    }
}