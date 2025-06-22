// Fight.ts
export const loadShotArrowSprites = (scene: Phaser.Scene) => {
    scene.load.image('arrow', './assets/character/arrow_bullet/arrow.png')
}

// SceneWithArrows: para garantir que a cena tem .arrows
export type SceneWithArrows = Phaser.Scene & { arrows: Phaser.Physics.Arcade.Group };

export const createArrow = (
    player: any,
    scene: SceneWithArrows,
    delayMs = 300
) => {
    scene.time.delayedCall(delayMs, () => {
        let x = player.x;
        let y = player.y;
        const speed = 600;
        let velocityX = 0, velocityY = 0;
        let angle = 0;

        switch (player.lastDirection) {
            case 'left':      velocityX = -speed; x -= 80; y -= 25; angle = Math.PI; break;
            case 'right':     velocityX = speed;  x += 80; y -= 15; angle = 0; break;
            case 'up':        velocityY = -speed; y -= 80; angle = -Math.PI / 2; break;
            case 'down':      velocityY = speed;  y += 80; angle = Math.PI / 2; break;
            case 'upleft':    velocityX = -speed * 0.7071; velocityY = -speed * 0.7071; x -= 60; y -= 60; angle = -3 * Math.PI / 4; break;
            case 'upright':   velocityX = speed * 0.7071; velocityY = -speed * 0.7071; x += 60; y -= 60; angle = -Math.PI / 4; break;
            case 'downleft':  velocityX = -speed * 0.7071; velocityY = speed * 0.7071; x -= 60; y += 60; angle = 3 * Math.PI / 4; break;
            case 'downright': velocityX = speed * 0.7071; velocityY = speed * 0.7071; x += 60; y += 60; angle = Math.PI / 4; break;
            default:          velocityX = speed; x += 80; angle = 0;
        }

        const arrow = scene.physics.add.image(x, y, 'arrow').setScale(0.030);
        
        scene.arrows.add(arrow);
        arrow.body.allowGravity = false;
        arrow.setVelocity(velocityX, velocityY);
        arrow.setRotation(angle);


        scene.time.delayedCall(2000, () => arrow.destroy());
    });
};
