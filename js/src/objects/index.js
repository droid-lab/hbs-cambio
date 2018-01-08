Index = {
	Menu : {
        config: {
            senseSpeed    : 5,
            previusScroll : 0,
            imediate      : 10,
            openMenu      : false,
        },
		init: function(){
			Index.Menu.setDebounce();
			Index.Menu.setHamburguer();
			Index.Menu.setStart();
			Index.Menu.setLinks();
		},
		setDebounce: function(){
			$(document).scroll(Index.Menu.debounce(function(){ Index.Menu.go() }, Index.Menu.config.imediate));
		},
		setStart: function(){
			var scroller  = $(document).scrollTop();
			var offsetImg = $(".bg-img").height() - ($(window).height() - 200);
		},
		setHamburguer: function(){
			$(".hamburguer").on("click", function(e){
				e.preventDefault();
				$(this).toggleClass("active");
				$(".menu-mobile").toggleClass("active");
				setTimeout(function(){
					$(".menu-mobile").toggleClass("end");
				}, 500);
				if($(".menu-translate").hasClass('active')){
					$(".menu-translate").toggleClass("active");
				}
			});
		},
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		},
		go: function(){
			var scroller  = $(document).scrollTop();
			var offset    = $(window).height() * 1/6;
			var offsetImg = $(".bg-img").height() - ($(window).height() - 200);
            if (scroller - Index.Menu.config.senseSpeed >  Index.Menu.config.previousScroll && scroller > offset){
            	$('#header-menu').addClass('off');
            	$('#header-menu').removeClass('on');
				if($(".menu-mobile").hasClass('active')){
					$(".hamburguer").toggleClass("active");
					$(".menu-mobile").toggleClass("active");
					setTimeout(function(){
						$(".menu-mobile").toggleClass("end");
					}, 500);
				}
            }
            else if (scroller + Index.Menu.config.senseSpeed < Index.Menu.config.previousScroll && scroller > offset){
            	$('#header-menu').addClass('on');
            	$('#header-menu').removeClass('off');
            }
            Index.Menu.config.previousScroll = scroller;
		},
		setLinks: function() {
            $(".go-menu").on("click", function(e) {
                e.preventDefault();
				if($(".menu-mobile").hasClass('active')){
					$(".hamburguer").toggleClass("active");
					$(".menu-mobile").toggleClass("active");
					setTimeout(function(){
						$(".menu-mobile").toggleClass("end");
					}, 500);
				}
                var o = $(this);
                var plus = 30;
                if(o.attr("href") === '#trabalhe-conosco'|| Mobile.isMobile){
                	plus = 0;
                }
                $("html, body").stop().animate({
                    scrollTop: $(o.attr("href")).offset().top - plus
                }, 1e3, "easeOutQuart", function(){
					$('#header-menu').addClass('off');
					$('#header-menu').removeClass('on');
                });
            })
        }
	},
	Stellar : {
		init: function(){
			if(!Mobile.isMobile){
				$(window).stellar({
					horizontalScrolling: false,
				});
			}
		}
	},
    init: function(){
    	Index.Menu.init();
    	Index.Stellar.init();
    }
}

$(document).ready(function() {
    Index.init();
});