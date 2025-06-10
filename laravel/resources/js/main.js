import $ from 'jquery';
import Player from './Player';
import Game from './Game';
import Background from './Background';
import Animator from './Animator';
import Asset from './Asset';
import Map from './Map';
import { MagnificantForest } from './Maps/MagnificantForest';

$(document).ready(() => {
  // Set up player
  const player = new Player('player', {
      idle: './textures/lilheroes/1 Pink_Monster/Pink_Monster_Idle_4.png',
      moveUp: './textures/lilheroes/1 Pink_Monster/Pink_Monster_Climb_4.png',
      moveDown: './textures/lilheroes/1 Pink_Monster/Pink_Monster_Walk_6.png',
      run: './textures/lilheroes/1 Pink_Monster/Pink_Monster_Run_6.png',
      attack1: './textures/lilheroes/1 Pink_Monster/Pink_Monster_Attack1_4.png'
  });

  const game = new Game(player);
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const assets =
    {
      'tree1' :
        new Asset('tree1', {
          'idle' : './textures/textures/PNG/Assets_separately/Trees/Tree1.png'
        })
    };

  const map = new MagnificantForest(assets);
  const background = new Background(ctx, canvas, assets, map);
  const animator = new Animator(player, ctx, canvas, background, assets);
});

