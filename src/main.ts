import { MegaDemoPlayer } from './core/player';

const canvas = document.getElementById('glcanvas') as HTMLCanvasElement;
const player = new MegaDemoPlayer(canvas);

window.addEventListener('resize', () => player.resize());
window.addEventListener('keydown', (event) => {
  if (event.key === 'Tab' || event.key === 'F1') {
    event.preventDefault();
    player.toggleUI();
  }
  if (event.key === 'm' || event.key === 'M') {
    player.setMuted(true);
  }
  if (event.key === ' ') {
    event.preventDefault();
    player.setTestMode(true);
  }
  if (event.key === 'd' || event.key === 'D') {
    event.preventDefault();
    player.cycleDemo();
  }
});

player.init();
