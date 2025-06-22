// main.ts

import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { HUDScene } from './scenes/HUD';
import { AUTO, Game, Scale } from 'phaser'; 
import { Preloader } from './scenes/Preloader';
import { CharacterSelect } from './scenes/CharacterSelect';
import { OptionsScene } from './scenes/Options'; 

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    pixelArt: true,
    type: AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#000',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        OptionsScene,
        CharacterSelect,
        MainGame,
        HUDScene,
        GameOver
    ],
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 }
        }
    },
    scale: {
        mode: Scale.FIT, // Ajusta o jogo para caber na tela, mantendo a proporção
        autoCenter: Scale.CENTER_BOTH // Centraliza o jogo na janela
    },
    fps: {
        target: 0,
        forceSetTimeOut: true
  } ,
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;