import { RandomHelper } from './randomHelper.js';
export var AudioHelper;
(function (AudioHelper) {
    const footstepSound = new Audio('audio/footstep.wav');
    function playFootstep() {
        footstepSound.playbackRate = RandomHelper.randomFloat(0.5, 1.5);
        footstepSound.load();
        footstepSound.play();
    }
    AudioHelper.playFootstep = playFootstep;
})(AudioHelper || (AudioHelper = {}));
