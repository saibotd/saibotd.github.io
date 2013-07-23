var sideBarVisible = true;
var sideBarWidthNormal = 640;
var sideBarWidthWide = 840;
var popState = false;

function initBackgroundFX(){
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

        c.fillStyle = 'rgba(163,26,11,.15)';
        c.beginPath();
        c.moveTo(0, canvas.height);
        c.lineTo(x, y);
        c.lineTo(canvas.width / 2 + offset_x, canvas.height);
        c.closePath();
        c.fill();

        c.fillStyle = 'rgba(11,148,163,.15)';
        c.beginPath();
        c.moveTo(canvas.width, canvas.height);
        c.lineTo(x, y);
        c.lineTo(canvas.width / 2 + offset_x, canvas.height);
        c.closePath();
        c.fill();
    };
    if(!!window.CanvasRenderingContext2D){
        var canvas = document.getElementById('stage'),
        c = canvas.getContext('2d');
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
        window.addEventListener('mousemove', drawStuff, false);
        document.addEventListener('touchmove', drawStuff, false);
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

    if ("popState" in window || "popstate" in window) {
        window.addEventListener('popstate', function(e) {
            if(popState) navigate(window.location.pathname);
            else popState = true;
        });
    }

    if(window.location.pathname === "/") hideSidebar();
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

    initBackgroundFX();
    initSidebar();
    initNavigation();
    initSwipe();

})();
