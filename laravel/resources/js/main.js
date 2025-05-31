import $ from 'jquery';
import Player from './Player';
import Game from './Game';
import Background from './Background';
import Animator from './Animator';

$(document).ready(() => {
  const player = new Player('player', 'Pink_Monster');
  const game = new Game(player);
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const background = new Background(ctx, canvas);
  const animator = new Animator(player, ctx, canvas, background);
});

