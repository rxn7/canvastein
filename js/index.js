import { Canvastein } from './canvastein.js';
let canvastein;
window.addEventListener('load', () => {
    canvastein = new Canvastein();
    canvastein.Run();
});
window.addEventListener('resize', () => {
    canvastein.OnResize();
});
