// src/scenes/HUD.ts

import Phaser from 'phaser';

// Constantes para fácil configuração do design
const BAR_WIDTH = 220;
const BAR_HEIGHT = 20;
const BAR_RADIUS = 8;
const FONT_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#ffffff',
    stroke: '#000000',
    strokeThickness: 4,
};

// Cores
const COLOR_BACKGROUND = 0x000000;
const COLOR_HP = 0xde3434;          // Vermelho para vida
const COLOR_LATE_HP = 0xffa500;   // Laranja para dano recente
const COLOR_XP = 0x1e90ff;          // Azul para experiência

export class HUDScene extends Phaser.Scene {
    // Agora os elementos são do tipo Graphics
    private hpContainer!: Phaser.GameObjects.Container;
    private hpText!: Phaser.GameObjects.Text;
    private hpBarFill!: Phaser.GameObjects.Graphics;
    private lateHpBar!: Phaser.GameObjects.Graphics;

    private xpContainer!: Phaser.GameObjects.Container;
    private xpText!: Phaser.GameObjects.Text;
    private xpBarFill!: Phaser.GameObjects.Graphics;

    private currentHp = 0;
    private maxHp = 0;
    private currentXp = 0;
    private maxXp = 100;

    constructor() {
        super({ key: 'HUD' });
    }
    
    create() {
        const screenWidth = this.sys.game.config.width as number;
        const screenHeight = this.sys.game.config.height as number;

        this.createHpBar(screenWidth / 2, screenHeight - 60);
        this.createXpBar(screenWidth / 2, screenHeight - 35);
        
        this.game.events.on('update-hp', this.handleHpUpdate, this);
        this.game.events.on('update-xp', this.handleXpUpdate, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.game.events.off('update-hp', this.handleHpUpdate, this);
            this.game.events.off('update-xp', this.handleXpUpdate, this);
        });

        this.game.events.emit('hud-ready');
    }

    private createHpBar(x: number, y: number) {
        this.hpContainer = this.add.container(x, y);

        // Fundo da barra
        const bg = this.add.graphics();
        bg.fillStyle(COLOR_BACKGROUND, 0.7);
        bg.fillRoundedRect(-BAR_WIDTH / 2, -BAR_HEIGHT / 2, BAR_WIDTH, BAR_HEIGHT, BAR_RADIUS);
        this.hpContainer.add(bg);

        // Barras de 'dano recente' e vida principal
        this.lateHpBar = this.add.graphics();
        this.hpBarFill = this.add.graphics();
        this.hpContainer.add([this.lateHpBar, this.hpBarFill]);
        
        // Texto da vida
        this.hpText = this.add.text(0, 0, '', FONT_CONFIG).setOrigin(0.5);
        this.hpContainer.add(this.hpText);

        // Para animação, guardamos a largura atual em um 'data' object
        this.hpBarFill.setData('width', BAR_WIDTH);
        this.lateHpBar.setData('width', BAR_WIDTH);
    }

    private createXpBar(x: number, y: number) {
        this.xpContainer = this.add.container(x, y);
        
        const bg = this.add.graphics();
        bg.fillStyle(COLOR_BACKGROUND, 0.7);
        bg.fillRoundedRect(-BAR_WIDTH / 2, -BAR_HEIGHT / 2, BAR_WIDTH, BAR_HEIGHT, BAR_RADIUS);
        this.xpContainer.add(bg);

        this.xpBarFill = this.add.graphics();
        this.xpContainer.add(this.xpBarFill);
        
        this.xpText = this.add.text(0, 0, 'XP: 0 / 100', FONT_CONFIG).setOrigin(0.5);
        this.xpContainer.add(this.xpText);

        this.xpBarFill.setData('width', 0);
    }

    private redrawBar(bar: Phaser.GameObjects.Graphics, width: number, color: number) {
        bar.clear();
        bar.fillStyle(color);
        if (width > 0) {
            bar.fillRoundedRect(-BAR_WIDTH / 2, -BAR_HEIGHT / 2, width, BAR_HEIGHT, BAR_RADIUS);
        }
    }

    private handleHpUpdate(hp: number, maxHp: number) {
        this.currentHp = Phaser.Math.Clamp(hp, 0, maxHp);
        this.maxHp = maxHp;

        this.hpText.setText(`${this.currentHp} / ${this.maxHp}`);
        const newWidth = (this.maxHp > 0) ? (this.currentHp / this.maxHp) * BAR_WIDTH : 0;
        
        // Animamos a propriedade 'width' dentro do objeto 'data'
        // e usamos o onUpdate para redesenhar a barra a cada frame da animação.

        // Animação SUAVE para a barra de vida principal
        this.tweens.add({
            targets: this.hpBarFill.data.values,
            width: newWidth,
            duration: 250,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.redrawBar(this.hpBarFill, this.hpBarFill.data.values.width, COLOR_HP);
            }
        });

        // Animação para a barra de "dano recente"
        this.tweens.add({
            targets: this.lateHpBar.data.values,
            width: newWidth,
            duration: 700,
            delay: 300,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.redrawBar(this.lateHpBar, this.lateHpBar.data.values.width, COLOR_LATE_HP);
            }
        });
    }

    private handleXpUpdate(xp: number, maxXp: number) {
        this.currentXp = Phaser.Math.Clamp(xp, 0, maxXp);
        this.maxXp = maxXp;

        this.xpText.setText(`XP: ${this.currentXp} / ${this.maxXp}`);
        const newWidth = (this.maxXp > 0) ? (this.currentXp / this.maxXp) * BAR_WIDTH : 0;

        this.tweens.add({
            targets: this.xpBarFill.data.values,
            width: newWidth,
            duration: 500,
            ease: Phaser.Math.Easing.Cubic.Out,
            onUpdate: () => {
                this.redrawBar(this.xpBarFill, this.xpBarFill.data.values.width, COLOR_XP);
            }
        });
    }
}