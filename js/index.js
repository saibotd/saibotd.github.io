var sideBarVisible = true;
var sideBarWidthNormal = 640;
var sideBarWidthWide = 840;
var popState = false;

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
}


function initBackgroundFX2D(){
    resizeCanvas = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    drawStuff = function(e) {
        x = 500;
        y = 0;
        offset_x = 0;

        if (e && e.type === "mousemove") {
            x = e.clientX;
            y = e.clientY;
        }

        if (e && e.type === "touchmove") {
            var touch = e.touches[0];
            x = touch.clientX;
            y = touch.clientY;
        }
        var center = (sideBarVisible) ? (canvas.width - 640) / 2 : canvas.width / 2
        c.fillStyle = 'rgba(163,26,11,.15)';
        c.beginPath();
        c.moveTo(0, canvas.height);
        c.lineTo(x, y);
        c.lineTo(center + offset_x, canvas.height);
        c.closePath();
        c.fill();

        c.fillStyle = 'rgba(11,148,163,.15)';
        c.beginPath();
        c.moveTo(canvas.width, canvas.height);
        c.lineTo(x, y);
        c.lineTo(center + offset_x, canvas.height);
        c.closePath();
        c.fill();

    };
    if(!!window.CanvasRenderingContext2D){
        var canvas = document.getElementById('stage'),
        c = canvas.getContext('2d');
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
        window.addEventListener('mousemove', drawStuff, false);
        window.addEventListener('touchmove', drawStuff, false);
    }
}

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

    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('mousemove', trackMouse, false);
    window.addEventListener('touchmove', trackMouse, false);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      size = Math.ceil(canvas.width / width);
      counter = 0;
      for(var x = 0; x < width * 2; x++){
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
  draw();
}
resizeCanvas();

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

      _color = getRandomInt(110,130);
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

function draw(){
  init = false;
  var counter = 12;
  if(init) counter = matrix.length;
  console.log();
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    while(counter > 0){
      counter = counter - 1;
      var tile = matrix.randomElement();
      
      _color = getRandomInt(160,200);
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

then = now - (delta % interval);
}
window.requestAnimationFrame(draw);
}

}

function initBackgroundFX3D(){
    var container;

    var camera, scene, renderer;

    var geometry, group;

    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    init();
    animate();

    function init() {

        $(".centered").hide();

        container = document.createElement( 'div' );
        container.id = "stage3d";
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 95, window.innerWidth / window.innerHeight, 1, 20000 );
        camera.position.z = 500;

        scene = new THREE.Scene();

        var geometry = new THREE.CylinderGeometry( 0, 100, 100, 3 );
        var materials = [
        new THREE.MeshPhongMaterial({
        // light
        specular: '#b03b2e',
        // intermediate
        color: '#a31a0b',
        // dark
        emissive: '#7d1409',
        shininess: 50 ,
        transparent: true,
        opacity: 0.9,
        overdraw: true
    }),
        new THREE.MeshPhongMaterial({
        // light
        specular: '#2fa4b1',
        // intermediate
        color: '#0b94a3',
        // dark
        emissive: '#0b7681',
        shininess: 50 ,
        transparent: true,
        opacity: 0.9,
        overdraw: true
    })];

        group = new THREE.Object3D();

        for ( var i = 0; i < 350; i ++ ) {

            var mesh = new THREE.Mesh( geometry, materials[Math.floor(Math.random() * materials.length)] );
            mesh.position.x = Math.random() * 2000 - 1000;
            mesh.position.y = Math.random() * 2000 - 1000;
            mesh.position.z = Math.random() * 2000 - 1000;
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            mesh.opacity = 50;
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();
            group.add( mesh );


        }
        scene.add( group );

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        directionalLight.intensity = 0.2;
        scene.add(directionalLight);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.sortObjects = false;
        container.appendChild( renderer.domElement );


                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 4;
                windowHalfY = window.innerHeight / 4;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function onDocumentMouseMove(event) {

                mouseX = ( event.clientX - windowHalfX ) * 2;
                mouseY = ( event.clientY - windowHalfY ) * 2;

            }

            //

            function animate() {

                requestAnimationFrame( animate );
                render();

            }

            function render() {
             camera.position.x += ( mouseX - camera.position.x ) * .0080;
             camera.position.y += ( - mouseY - camera.position.y ) * .0080;

             camera.lookAt( scene.position );

             var currentSeconds = Date.now();
             group.rotation.x = Math.sin( currentSeconds * 0.0007 ) * 0.5;
             group.rotation.y = Math.sin( currentSeconds * 0.0003 ) * 0.5;
             group.rotation.z = Math.sin( currentSeconds * 0.0002 ) * 0.5;

             renderer.render( scene, camera );

         } 
     }

     function initSidebar(){
        var $sidebar = $('.sidebar');
        var $content = $('.content');
        var $toggleSidebar = $('#toggle-sidebar');
        showSidebar = function() {
            if(!sideBarVisible){
                $sidebar.removeClass("hidden");
                $toggleSidebar.removeClass("hidden");
                sideBarVisible = true;
            }
        };

        hideSidebar = function() {
            var sideBarWidth = ($('body').hasClass("wide") ? sideBarWidthWide : sideBarWidthNormal);
            if(sideBarVisible){
                $sidebar.addClass("hidden");
                $toggleSidebar.addClass("hidden");
                sideBarVisible = false;
            }
        };

        $content.click(function(e){
            var sideBarWidth = ($('body').hasClass("wide") ? sideBarWidthWide : sideBarWidthNormal);
            if(e.target.id != "more" && document.width - e.pageX > sideBarWidth){
                hideSidebar();
            }
        });

        $toggleSidebar.click(function(e){
            e.preventDefault();
            if(sideBarVisible) hideSidebar();
            else showSidebar();
        });
    }

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
        ga('send', 'pageview', href);
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
        $(".topbar > .nav a, .work > li > a").ajaxify();

        if(window.location.pathname === "/") hideSidebar();

        if ("popState" in window || "popstate" in window) {
            window.addEventListener('popstate', function(e) {
                if(popState) navigate(window.location.pathname);
                else popState = true;
            });
        }

    }

    function initSwipe(){
        var hammertime = $("body").hammer({
            stop_browser_behavior: false,
            prevent_mouseevents: true
        });

        hammertime.on("swipeleft", showSidebar);

        hammertime.on("swiperight", hideSidebar);
    }


    (function () {
        if ((Math.random() < 0.2  || window.location.hash == "#3d") && window.WebGLRenderingContext) initBackgroundFX3D();
        else initBackgroundFX2D();
        initSidebar();
        initNavigation();
        initSwipe();

    })();
