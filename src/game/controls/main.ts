import { SwordPlayer } from "../player/sword/main";
import { BowPlayer } from "../player/bow/main";

// Torna o tipo genérico para aceitar ambos
export type AnyPlayer = SwordPlayer | BowPlayer;

const defaultMove = 200;

export type ExtendedControls = Phaser.Types.Input.Keyboard.CursorKeys & {
    W?: Phaser.Input.Keyboard.Key;
    A?: Phaser.Input.Keyboard.Key;
    S?: Phaser.Input.Keyboard.Key;
    D?: Phaser.Input.Keyboard.Key;
};

// Agora é possível passar o prefixo das animações, exemplo: 'player_' ou 'player_bow_'
export const configControls = (
    player: AnyPlayer,
    controls: ExtendedControls,
    scene: Phaser.Scene,
    animPrefix: string // ex: 'player_' para sword ou 'player_bow_' para bow
): void => {
    scene
    let velocityX = 0;
    let velocityY = 0;
    let anim = '';
    let direction = player.lastDirection || 'down';

    // Direção X
    const left = controls.left.isDown || controls.A!.isDown;
    const right = controls.right.isDown || controls.D!.isDown;
    // Direção Y
    const up = controls.up.isDown || controls.W!.isDown;
    const down = controls.down.isDown || controls.S!.isDown;

    const attackButton = controls.space.isDown;

    if (player.isAttacking) {
        return;
    }

    // Monta as velocidades
    if (left) velocityX -= defaultMove;
    if (right) velocityX += defaultMove;
    if (up) velocityY -= defaultMove;
    if (down) velocityY += defaultMove;

    // Normaliza velocidade na diagonal
    if (velocityX !== 0 && velocityY !== 0) {
        velocityX *= 0.7071;
        velocityY *= 0.7071;
    }

    player.setVelocityX(velocityX);
    player.setVelocityY(velocityY);

    if (velocityX !== 0 || velocityY !== 0) {
        if (up && left) {
            anim = `player_walk_${animPrefix}_upleft`;
            direction = 'upleft';
        } else if (up && right) {
            anim = `player_walk_${animPrefix}_upright`;
            direction = 'upright';
        } else if (down && left) {
            anim = `player_walk_${animPrefix}_downleft`;
            direction = 'downleft';
        } else if (down && right) {
            anim = `player_walk_${animPrefix}_downright`;
            direction = 'downright';
        } else if (up) {
            anim = `player_walk_${animPrefix}_up`;
            direction = 'up';
        } else if (down) {
            anim = `player_walk_${animPrefix}_down`;
            direction = 'down';
        } else if (left) {
            anim = `player_walk_${animPrefix}_left`;
            direction = 'left';
        } else if (right) {
            anim = `player_walk_${animPrefix}_right`;
            direction = 'right';
        }

        player.lastDirection = direction;
        player.anims.play(anim, true);

        return;
    }

    if (attackButton) {
        if (!player.isAttacking) {
            player.isAttacking = true;
            attack(player, animPrefix);
        }
        return;
    }

    if (!player.isAttacking) {
        idle(player, animPrefix);
    }
};

///////////////////////////////////////// ATTACK //////////////////////////////////////////////////

const attack = (player: AnyPlayer, animPrefix: string): void => {
    switch (player.lastDirection) {
        case 'up':
            player.anims.play(`player_attack_${animPrefix}_up`, true);
            break;
        case 'down':
            player.anims.play(`player_attack_${animPrefix}_down`, true);
            break;
        case 'left':
            player.anims.play(`player_attack_${animPrefix}_left`, true);
            break;
        case 'right':
            player.anims.play(`player_attack_${animPrefix}_right`, true);
            break;
    }
};

///////////////////////////////////////// IDLE //////////////////////////////////////////////////

const idle = (player: AnyPlayer, animPrefix: string): void => {
    switch (player.lastDirection) {
        case 'up':
            player.anims.play(`player_idle_${animPrefix}_up`, true);
            break;
        case 'down':
            player.anims.play(`player_idle_${animPrefix}_down`, true);
            break;
        case 'left':
            player.anims.play(`player_idle_${animPrefix}_left`, true);
            break;
        case 'right':
            player.anims.play(`player_idle_${animPrefix}_right`, true);
            break;
        case 'upleft':
            player.anims.play(`player_idle_${animPrefix}_upleft`, true);
            break;
        case 'downright':
            player.anims.play(`player_idle_${animPrefix}_downright`, true);
            break;
        case 'downleft':
            player.anims.play(`player_idle_${animPrefix}_downleft`, true);
            break;
        case 'upright':
            player.anims.play(`player_idle_${animPrefix}_upright`, true);
            break;
        default:
            player.anims.play(`player_idle_${animPrefix}_down`, true);
            break;
    }
};

// Função de criação de controles não muda
export const createControls =  (scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys => {
    const cursors = scene.input!.keyboard!.createCursorKeys();
    const wasd = scene.input!.keyboard!.addKeys('W,A,S,D') as any;
    return { ...cursors, ...wasd };
};
