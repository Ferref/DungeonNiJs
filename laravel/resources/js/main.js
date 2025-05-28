import $ from 'jquery';
import Player from './game/Parts/Player';
import Game from './game/Parts/Game';


$(document).ready(() => {
    const player = new Player('player');
    const game = new Game(player);
    game.start();

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(10, 10, 150, 100);
});
