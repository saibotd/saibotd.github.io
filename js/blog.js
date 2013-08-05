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
    width = 30,
    mouse_x = -1,
    mouse_y = -1,
    fps = 60,
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

/*
function trackMouse(e){
  mouse_x = -1;
  mouse_y = -1;
  
  if (e && e.type === "mousemove") {
    mouse_x = e.clientX;
    mouse_y = e.clientY;
  }
  
  if (e && e.type === "touchmove") {
    var touch = e.touches[0];
    mouse_x = touch.clientX;
    mouse_y = touch.clientY;
  }
  
for(var i in matrix){
      var tile = matrix[i];
      
      if(
        Math.random() < .2 &&
        tile._x <= mouse_x &&
        tile._x + size > mouse_x &&
        tile._y <= mouse_y &&
        tile._y + size > mouse_y
      ){
        
      _color = getRandomInt(250,255);
      color = [_color,_color,_color];
      
       c.fillStyle = "rgba("+color+",.1)";
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
    }
  
}
*/

function draw(){
  var counter = 6;
  if(init){
    c.clearRect(0, 0, canvas.width, canvas.height);
    counter = matrix.length * 5;
  }
  init = false;
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    while(counter > 0){
      counter = counter - 1;
      var tile = matrix.randomElement();
      
      _color = getRandomInt(246,250);
      color = [_color,_color,_color];
      c.fillStyle = "rgba("+color+",0.1)";
      
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

$.fn.ajaxify = function() {
    $(this).click(function(e){
        e.preventDefault();
        navigate(this.href);
        if(!!history.pushState) history.pushState(null, null, this.href);
        $("body").removeClass("wide");
        if($(this).hasClass("wide")) $("body").addClass("wide");
    });
};

function initNavigation(){

    function navigate(href){
        var $sidebar = $('.sidebar');
        if(!sideBarVisible) $('.sidebar-inner').html("");
        showSidebar();
        $sidebar.addClass("loading");
        $('.sidebar-inner').transition({opacity:0},function(){
            $sidebar.load(href + " .sidebar-inner", function(){
                $('.sidebar-inner').css("opacity", 0);
                $('.sidebar-inner').transition({opacity:1});
                $sidebar.removeClass("loading");
                $(".work > li > a").ajaxify();
            });
        });
    }

    //$(".topbar > .nav a, .work > li > a").ajaxify();

    if ("popState" in window || "popstate" in window) {
        window.addEventListener('popstate', function(e) {
            if(popState) navigate(window.location.pathname);
            else popState = true;
        });
    }

}



(function () {

    initBackgroundFX2DSubtle();
    initNavigation();

})();
