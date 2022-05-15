import { Canvastein } from './canvastein.js';

let canvastein: Canvastein;

window.addEventListener('load', () => {
	canvastein = new Canvastein(); canvastein.Run();
});
