import { SwordPlayer } from "../player/sword/main";
import { BowPlayer } from "../player/bow/main";
import { createArrow, SceneWithArrows } from "../fight/main";
import { Game } from "../scenes/Game";

export type AnyPlayer = SwordPlayer | BowPlayer;
let defaultMove = 100;

export type ExtendedControls = Phaser.Types.Input.Keyboard.CursorKeys & {
    W?: Phaser.Input.Keyboard.Key;
    A?: Phaser.Input.Keyboard.Key;
    S?: Phaser.Input.Keyboard.Key;
    D?: Phaser.Input.Keyboard.Key;
};

// Recebe grupo de zumbis como argumento
export const configControls = (
    player: AnyPlayer,
    controls: ExtendedControls,
    scene: Game, // <<< AQUI! Agora sabemos que é a nossa cena 'Game'
    animPrefix: string,
    zombiesGroup: Phaser.Physics.Arcade.Group
): void => {
    // ... (lógica inicial de bloqueio de movimento inalterada) ...
    if (player.isAttacking || player.isHit) {
        player.setVelocity(0, 0);
        return; 
    }
    
    // ... (lógica de detecção de movimento e velocidade inalterada) ...
    let velocityX = 0;
    let velocityY = 0;
    let direction = player.lastDirection || 'down';
    const left = controls.left.isDown || controls.A?.isDown;
    const right = controls.right.isDown || controls.D?.isDown;
    const up = controls.up.isDown || controls.W?.isDown;
    const down = controls.down.isDown || controls.S?.isDown;
    defaultMove = controls.shift?.isDown ? 150 : 100;
    if (left) velocityX -= defaultMove;
    if (right) velocityX += defaultMove;
    if (up) velocityY -= defaultMove;
    if (down) velocityY += defaultMove;
    if (velocityX !== 0 && velocityY !== 0) {
        velocityX *= 0.7071;
        velocityY *= 0.7071;
    }
    player.setVelocity(velocityX, velocityY);


    // ... (lógica de input de ataque inalterada) ...
    const attackButton = controls.space.isDown;
    if (attackButton) {
        player.isAttacking = true;
        player.setVelocity(0, 0);

        const attackAnimKey = `player_attack_${animPrefix}_${player.lastDirection || 'down'}`;
        player.anims.play(attackAnimKey, true);

        player.once('animationcomplete', () => {
            player.isAttacking = false;
        });

        // --- Lógica de dano do ataque ---
        if (animPrefix === 'sword') {
            zombiesGroup.children.iterate((zombie: any) => { zombie.wasHitThisAttack = false; return null; });
            let offsetX = 0, offsetY = 0, size = 60;
            switch (player.lastDirection) {
                // ... (seu switch case para offset continua o mesmo) ...
                case 'up': offsetY = -size; break;
                case 'down': offsetY = size; break;
                case 'left': offsetX = -size; break;
                case 'right': offsetX = size; break;
                case 'upleft': offsetX = -size * 0.7; offsetY = -size * 0.7; break;
                case 'upright': offsetX = size * 0.7; offsetY = -size * 0.7; break;
                case 'downleft': offsetX = -size * 0.7; offsetY = size * 0.7; break;
                case 'downright': offsetX = size * 0.7; offsetY = size * 0.7; break;
                default: offsetY = size; 
            }

            const hitbox = scene.physics.add.sprite(player.x + offsetX, player.y + offsetY, '')
                .setSize(18, 18).setVisible(false);
            hitbox.body.allowGravity = false;

            // <<< MUDANÇA 2: SIMPLIFICAR O CÓDIGO DO OVERLAP >>>
            scene.physics.add.overlap(hitbox, zombiesGroup, (_hb, zombie: any) => {
                // Para garantir que cada zumbi seja atingido apenas uma vez por ataque
                if (!(zombie as any).wasHitThisAttack) { 
                    (zombie as any).wasHitThisAttack = true; 
                    // Chamamos a função centralizada da cena do jogo para lidar com o dano
                    // Como `scene` agora é do tipo `Game`, podemos acessar `damageZombie` diretamente.
                    scene.damageZombie(zombie, 4); // Causa 1 de dano da espada
                }
            });

            scene.time.delayedCall(200, () => hitbox.destroy()); 
            createSwordSlashEffect(scene, player, offsetX, offsetY);
        }

        // A lógica do arco continua a mesma
        if (animPrefix === 'bow') {
            scene.time.delayedCall(200, () => {
                if (player.isAttacking) {
                    createArrow(player, scene as SceneWithArrows);
                }
            });
        }
        
        return;
    }
    
    // ... (lógica de animação de movimento e idle inalterada) ...
     if (velocityX !== 0 || velocityY !== 0) {
        if (up && left) { direction = 'upleft'; }
        else if (up && right) { direction = 'upright'; }
        else if (down && left) { direction = 'downleft'; }
        else if (down && right) { direction = 'downright'; }
        else if (up) { direction = 'up'; }
        else if (down) { direction = 'down'; }
        else if (left) { direction = 'left'; }
        else if (right) { direction = 'right'; }
        
        player.lastDirection = direction;
        player.anims.play(`player_walk_${animPrefix}_${direction}`, true);
    } else {
        idle(player, animPrefix);
    }
};

const createSwordSlashEffect = (scene: Phaser.Scene, player: AnyPlayer, offsetX: number, offsetY: number) => {
    // Supondo que você criou uma animação chamada 'sword_slash_anim' com os 6 frames
    const slash = scene.add.sprite(player.x + offsetX, player.y + offsetY, 'sword_slash_1')
        .setOrigin(0.5, 0.5)
        .setDepth(10)
        .setScale(0.2);

    // Se você tiver uma animação para o slash, é muito mais limpo:
    // slash.play('sword_slash_anim');
    // slash.once('animationcomplete', () => {
    //     slash.destroy();
    // });
    // Se não, seu método com timer funciona, mas é menos robusto.
    const timer = scene.time.addEvent({
        delay: 30, repeat: 5,
        callback: function (this: Phaser.GameObjects.Sprite & { frameCount?: number }) {
            let frame = (this.getData('frameCount') ?? 1) + 1;
            this.setTexture(`sword_slash_${frame}`);
            this.setData('frameCount', frame);
            if (frame >= 6) { 
                timer.remove(); 
                this.destroy(); 
            }
        }, callbackScope: slash
    });
};

const idle = (player: AnyPlayer, animPrefix: string): void => {
    const idleAnimKey = `player_idle_${animPrefix}_${player.lastDirection || 'down'}`;
    player.anims.play(idleAnimKey, true);
};

export const createControls = (scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys => {
    const cursors = scene.input!.keyboard!.createCursorKeys();
    const wasd = scene.input!.keyboard!.addKeys('W,A,S,D') as any;
    return { ...cursors, ...wasd };
};
