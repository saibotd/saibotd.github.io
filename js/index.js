(function () {
    var sideBarVisible = false;
    var canvas = document.getElementById('stage'),
    c = canvas.getContext('2d');
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    function showSidebar() {
        if(!sideBarVisible){
            $('.sidebar').transition({ right: '0px' });
            sideBarVisible = true;
            $("#toggle-sidebar").attr("class", "visible");
        }
    }

    function hideSidebar() {
        if(sideBarVisible){
            $('.sidebar').transition({ right: '-640px' });
            sideBarVisible = false;
            $("#toggle-sidebar").attr("class", "hidden");
        }
    }

    $(".content").click(function(e){
        if(e.target.id != "more" && document.width - e.pageX > 640){
            hideSidebar();
        }
    });

    $("#toggle-sidebar").click(function(e){
        e.preventDefault();
        if(sideBarVisible) hideSidebar();
        else showSidebar();
    });

    window.addEventListener('mousemove', drawStuff, false);
    document.addEventListener('touchmove', drawStuff, false);

    var hammertime = $("body").hammer({
        stop_browser_behavior: false,
        prevent_mouseevents: true
    });

    hammertime.on("swipeleft", showSidebar);

    hammertime.on("swiperight", hideSidebar);

    function drawStuff(e) {

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

        c.fillStyle = 'rgba(163,26,11,.25)';
        c.beginPath();
        c.moveTo(0, canvas.height);
        c.lineTo(x, y);
        c.lineTo(canvas.width / 2 + offset_x, canvas.height);
        c.closePath();
        c.fill();

        c.fillStyle = 'rgba(11,148,163,.25)';
        c.beginPath();
        c.moveTo(canvas.width, canvas.height);
        c.lineTo(x, y);
        c.lineTo(canvas.width / 2 + offset_x, canvas.height);
        c.closePath();
        c.fill();

    }

    $(".topbar > nav > a").click(function(e){
        e.preventDefault();
        showSidebar();
        //$('..sidebar-inner').transition({ opacity: 0 });
        $(".sidebar").addClass("loading");
        $(".sidebar-inner").load(this.href, function(){
            $(".sidebar").removeClass("loading");
        });
    });
})();