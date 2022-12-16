export var RandomHelper;
(function (RandomHelper) {
    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    RandomHelper.randomFloat = randomFloat;
})(RandomHelper || (RandomHelper = {}));
