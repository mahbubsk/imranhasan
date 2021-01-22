( function($) {
  'use strict';



  	/*-------------------------------------------------------------------------------
	  Detect mobile device 
	-------------------------------------------------------------------------------*/



	var mobileDevice = false; 

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	  	$('html').addClass('mobile');
	  	mobileDevice = true;
	}

	else{
		$('html').addClass('no-mobile');
		mobileDevice = false;
	}



    /*-------------------------------------------------------------------------------
	  Window load
	-------------------------------------------------------------------------------*/



	$(window).load(function(){

		$('.loader').fadeOut();

    	var wow = new WOW({
		    offset: 150,          
		    mobile: false
		  }
		);
		wow.init();
	});

	var navbar=$('.js-navbar-affix');
	var windowHeight=$(window).height();
	var navbarAffixHeight=79




	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/



    $('.js-target-scroll, .navbar-nav li a[href^="#"]').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });



    /*-------------------------------------------------------------------------------
	  Affix
	-------------------------------------------------------------------------------*/



	navbar.affix({
	  offset: {
	    top: navbarAffixHeight
	  }
	});

	navbar.on('affix.bs.affix', function() {
		if (!navbar.hasClass('affix')){
			navbar.addClass('animated slideInDown');
		}
	});

	navbar.on('affixed-top.bs.affix', function() {
	  	navbar.removeClass('animated slideInDown');
	  	$('.navbar-collapse').collapse('hide');
	});



	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/



	$('.navbar-collapse').on('show.bs.collapse', function () {
	 	navbar.addClass('affix');
	});

	$('.navbar-collapse').on('hidden.bs.collapse', function () {
		if (navbar.hasClass('affix-top')){
			navbar.removeClass('affix');
		}
	});

	$(".navbar-nav > li > a").on('click', function() {
	    $(".navbar-collapse").collapse('hide');
	});



	/*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/



	$('body').scrollspy({
		offset:  navbarAffixHeight + 1
	});

	
	/*-------------------------------------------------------------------------------
	  Parallax
	-------------------------------------------------------------------------------*/



	if(!mobileDevice){
		$(window).stellar({
		  	responsive: true,
		  	horizontalScrolling: false,
		  	hideDistantElements: false,
		  	horizontalOffset: 0,
		  	verticalOffset: 0
		});
	}


	/*-------------------------------------------------------------------------------
	  Popup Gallery
	-------------------------------------------------------------------------------*/



	$('.js-gallery').each(function(){
		$(this).magnificPopup({
			delegate: 'a:not(.link)',
		    type: 'image',
		    removalDelay: 300,
		    tLoading: 'Loading image #%curr%...',
		    gallery: {
		       enabled: true,
		       navigateByImgClick: true,
		       preload:[0,1]
		    },
		    image: {
		       tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		       titleSrc: function(item) {
		          return item.el.attr('title') + '<small></small>';
		       }
		    }

		});
	});


	/*-------------------------------------------------------------------------------
	  Progress bar
	-------------------------------------------------------------------------------*/


	function progress_bars() {
		$(".progress .progress-bar:in-viewport").each(function() {
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				$(this).width($(this).attr("data-width") + "%");
			}
			
		});
	}

	$(window).scroll(function() {
		progress_bars();
	});



	/*-------------------------------------------------------------------------------
	  Isotope
	-------------------------------------------------------------------------------*/



    $('.isotope').each(function() {		
		var $container = $(this);
		$container.imagesLoaded( function(){
			$container.isotope({		 
				itemSelector: '.isotope-item',
				percentPosition: true,
				layoutMode: 'masonry',	
				masonry: {
				  columnWidth: '.isotope-item'
				}	
			});	
		});
    }); 



    /*-------------------------------------------------------------------------------
	  Isotope Filter
	-------------------------------------------------------------------------------*/



	$('.filter li a').on('click', function() {
		$('.filter .active').removeClass('active');
		$(this).closest('li').addClass('active');
		var selector = $(this).attr('data-filter');
		$('.isotope').isotope({
			filter: selector,
			animationOptions: {
				duration: 500,
				queue: false
			}
		});
		return false;
	});



	/*-------------------------------------------------------------------------------
	  Video pop-up
	-------------------------------------------------------------------------------*/



	$('.js-play').magnificPopup({
	    type: 'iframe',
	    removalDelay: 300
    });



	/*-------------------------------------------------------------------------------
	  Reviews carousel
	-------------------------------------------------------------------------------*/



	$(".review-carousel").owlCarousel({
		singleItem:true,
	 	autoHeight : true
	});



	/*-------------------------------------------------------------------------------
	  Reviews carousel
	-------------------------------------------------------------------------------*/



	$(".partners-carousel").owlCarousel({
		itemsMobile:[479,1],
		itemsTablet:[768,2],
		itemsDesktopSmall:[979,3],
		items:4,
	 	autoHeight : true,
	 	pagination:false
	});


	/*-------------------------------------------------------------------------------
	  Ajax Form
	-------------------------------------------------------------------------------*/



	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function(){
			$(this).validate({
				errorClass: 'error wobble-error',
			    submitHandler: function(form){
		        	$.ajax({
			            type: "POST",
			            url:"mail.php",
			            data: $(form).serialize(),
			            success: function() {
			                $('.modal').modal('hide');
		                	$('#success').modal('show');
		                },

		                error: function(){
			            	$('.modal').modal('hide');
			                $('#error').modal('show');
			            }
			        });
			    }
			});
		});
	}
})(jQuery);
