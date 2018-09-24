/* Code by Iddan Aaronsohn, 2018 */

/**
 * @constructor
 * @param {DOMElement} element
 * @param {{ x: number, y: number }} defaultAngles
 */
function Cube(element, defaultAngles) {
  this.element = element;
  this.defaultAngles = defaultAngles;
  this.lastResult = {};
  this.interval = null;
}

Cube.prototype.rotate = function(x, y) {
  var transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
  this.element.style.transform = transform;
  this.element.style.webkitTransform = transform;
};

Cube.prototype.roll = function() {
  /**
   * X = 0, Y = 1
   */
  var axisToRotate = Math.round(Math.random());
  /**
   * 1 for x is up
   * -1 for x is down
   * 1 for y is left
   * -1 for y is right
   */
  var direction = Math.round(Math.random()) ? 1 : -1;

  /* if result isn't original try again */
  if (
    axisToRotate === this.lastResult.axisToRotate &&
    direction === this.lastResult.direction
  ) {
    this.roll();
  }

  /* Save result */
  this.lastResult = { axisToRotate: axisToRotate, direction: direction };

  var rotationAngleDelta = direction * 90;
  var nextX =
    axisToRotate === 1
      ? this.defaultAngles.x + rotationAngleDelta
      : this.defaultAngles.x;
  var nextY =
    axisToRotate === 0
      ? this.defaultAngles.y + rotationAngleDelta
      : this.defaultAngles.y;

  this.rotate(nextX, nextY);

  /** Easter egg: keep spinning the cube while mouse over */
  var rotate = this.rotate.bind(this);
  var lastY = nextY;

  clearInterval(this.interval);

  this.interval = setInterval(function() {
    var nextY = lastY + 90;
    rotate(nextX, nextY);
    lastY = nextY;
  }, 1000);
};

Cube.prototype.reset = function() {
  this.rotate(this.defaultAngles.x, this.defaultAngles.y);
  clearInterval(this.interval);
};

/* Create a Cube object for each logo element */
var logoElements = document.querySelectorAll(".logo h1 a");

[].forEach.call(logoElements, function(element) {
  var cube = new Cube(element, { x: -35, y: -45 });
  element.addEventListener("mouseenter", function() {
    cube.roll();
  });
  element.addEventListener("mouseleave", function() {
    cube.reset();
  });
});
