Index = {
	Menu: {
		init: function() {
            $(".go-menu").on("click", function(e) {
                e.preventDefault();
                var o = $(this);
                $("html, body").stop().animate({
                    scrollTop: $(o.attr("href")).offset().top
                }, 1e3, "easeOutQuart")
            })
        }
	},
	Carousels: {
		configs: {
			'default' : {
				loop               : true,
				nav                : true,
				pagination         : true,
				items              : 1,
				dots               : true,
				autoplay           : false,
				autoplayTimeout    : 5000,
				autoplayHoverPause : true,
				singleItem         : true,
				navText            : ["<i class='arrow-prev'></i>","<i class='arrow-next'></i>"]
			},
			'agendamobile' : {
				loop               : true,
				nav                : true,
				pagination         : true,
				dots               : true,
				autoplay           : false,
				autoplayTimeout    : 5000,
				autoplayHoverPause : true,
				singleItem         : true,
				navText            : ["<i class='arrow-prev'></i>","<i class='arrow-next'></i>"],
				responsive:{
				    0 : {
				        items:1
				    },
				    768: {
				    	items: 2
				    },
				    1024 : {
				        items:3
				    },
				    1200 : {
				        items:4
				    }
				}
			}
		},
		init: function(){
			$('.carousel-default').owlCarousel(Index.Carousels.configs['default']);
			$('.carrousel-agenda-mobile').owlCarousel(Index.Carousels.configs['agendamobile']);
		}
	},
    init: function(){
    	Index.Menu.init();
		Index.Carousels.init();
    }
}

$(document).ready(function() {
    Index.init();
});