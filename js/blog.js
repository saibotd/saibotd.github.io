var popState = false;

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function initBackgroundFX2DSubtle(){


var canvas = document.getElementById('stage'),
    c = canvas.getContext('2d'),
    size,
    counter = 0,
    width = 23,
    mouse_x = -1,
    mouse_y = -1,
    fps = 30,
    init = true,
    now,
    then = Date.now(),
    interval = 1000/fps,
    matrix = [];
    //c.globalCompositeOperation="lighter";

window.addEventListener('resize', resizeCanvas, false);
//window.addEventListener('mousemove', trackMouse, false);
//window.addEventListener('touchmove', trackMouse, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size = Math.ceil(canvas.width / width);
  counter = 0;
  matrix = [];
  for(var x = 0; x < (width+1) * 2; x++){
    for(var y = 0; y < Math.ceil(canvas.height / size); y++){
      matrix.push({
        x : x,
        y : y,
        _x : x * size / 2,
        _y : y * size
      });
    }
  }
  init = true;
  window.requestAnimationFrame(draw);
}
resizeCanvas();

function draw(){
  var counter = 6;
  if(init){
    c.clearRect(0, 0, canvas.width, canvas.height);
    counter = matrix.length * 25;
  }
  init = false;
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    while(counter > 0){
      counter = counter - 1;
      var tile = matrix.randomElement();
      
      _color = getRandomInt(230,250);
      color = [_color,_color,_color];
      c.fillStyle = "rgba("+color+",0.05)";
      
      c.beginPath();
      
      if(tile.x % 2 == 0){
        c.moveTo(tile._x - size / 2, tile._y);
        c.lineTo(tile._x + size / 2, tile._y);
        c.lineTo(tile._x, tile._y + size);
      } else {
        c.moveTo(tile._x - size/2, tile._y + size);
        c.lineTo(tile._x, tile._y);
        c.lineTo(tile._x + size/2, tile._y + size);
      }
      c.closePath();
      c.fill();
    }

    then = now - (delta % interval);
  }
  window.requestAnimationFrame(draw);
}



}


(function () {

    if(!!window.CanvasRenderingContext2D) initBackgroundFX2DSubtle();

})();
