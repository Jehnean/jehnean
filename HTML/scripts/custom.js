/* ----------------- Start Document ----------------- */
(function($){
"use strict";


$(document).ready(function(){


	/*----------------------------------------------------*/
	/*  Window Load Stuff */

	$(window).load(function() {
		// OwlCarousel
		runOwl();

		// Isotope init
		$(window).on('resize',setWidth);
		isotopeInit();

		// Preloader init
		preloaderLoad();

		// Sticky Sidebar
		stickyLoadInit();

		// Before & After Plugin
		$(".before-after").twentytwenty()

		// Fullscreen menu trigger positioning 
		triggerPositioning();

		// Counters
		$('.counter').counterUp({
	        delay: 100,
	        time: 1600
	    });
	});

	/*----------------------------------------------------*/


	/*----------------------------------------------------*/
	/* Top Bar
	/*----------------------------------------------------*/

	$('.top-bar-dropdown').on('click', function(event){
		$('.top-bar-dropdown').not(this).removeClass('active');
		if ($(event.target).parent().parent().attr('class') == 'options' ) {
			hideDD();
		} else {
			if($(this).hasClass('active') &&  $(event.target).is( "span" )) {
				hideDD();
			} else {
				$(this).toggleClass('active');
			}
		}
		event.stopPropagation();
	});

	$(document).click(function() { hideDD(); });

	function hideDD(){
		$('.top-bar-dropdown').removeClass('active');
	}

	// Positioning transparent header with topbar
	$(window).bind("load resize scroll",function(e){
		if ($("#top-bar").hasClass('transparent')) {

			var topbarHeight = $("#top-bar").height();
			$('#main-header').css('margin-top', topbarHeight);

		}
	});
	

	/*----------------------------------------------------*/
	/* Search Form
	/*----------------------------------------------------*/

	// Search
	var headerContent = $("#main-header .menu, #main-header #logo")

	$('li.search').on('click', function(e){
		e.preventDefault();
		console.log('text');
		$(this).parents('#main-header').find('.search-container').fadeIn(150);
		$(this).parents("#main-header").find(' .menu, #logo ').stop().animate({opacity: 0}, 150, 'linear');
	});

	$('.search-container .close-search a').on('click', function(e){
		e.preventDefault();
		$(this).parents('#main-header').find('.search-container').fadeOut(150);
		$(this).parents("#main-header").find(' .menu, #logo ').animate({opacity: 1}, 150, 'linear');
	});

	$(document).mouseup(function (e) {
		 var container = $(".search-container");
		 var headerContent = $("#main-header .menu, #main-header #logo")
		 if (!container.is(e.target) && container.has(e.target).length === 0) { container.fadeOut(150); headerContent.animate({opacity: 1});  }
	});


	/*--------------------------------------------------*/
	/*  Preloader
	/*--------------------------------------------------*/

	// Shows page when window is loaded
	function preloaderLoad() {
		setTimeout(function(){
			$('body').addClass('loaded');
		}, 250);
	}

	function preloader() {

		$('#header-container').addClass('moz-fix');

		var newLocation;

	    $.expr[':'].external = function (a) {
	      	var PATTERN_FOR_EXTERNAL_URLS = /^(\w+:)?#/;
	        var href = $(a).attr('href');
	        return href !== undefined && href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1;
	    };

	    $.expr[':'].internal = function (a) {
	        return $(a).attr('href') !== undefined && !$.expr[':'].external(a);
	    };
	    var winWidth = $(window).width();
	    // Fading
		if(winWidth>992) {
			$('body').css('display', 'none');
			$('html').addClass('page-loader-bg')
			$('body').fadeIn(400);

			$('a:internal:not(.mfp-gallery, a[data-gallery] )').on('click', function(event){
				event.preventDefault();
				newLocation = this.href;
				$('body').fadeOut(400, newpage);
				$('html').addClass('page-loader-bg')
			});


		}
			function newpage() {
				window.location = newLocation;
			}

		// Firefox fix
		$(window).unload(function () { $(window).unbind('unload'); });

		// iOS Safari fix
		$(window).bind('pageshow', function(event) {
			if (event.originalEvent.persisted) {
				window.location.reload() 
			}
		});
	}

	// Show page after 9 seconds
	setTimeout(function(){
		$('body').addClass('loaded');
	}, 9000);

	// Preloader init
	preloader();


	/*--------------------------------------------------*/
	/*  Mobile Navigation
	/*--------------------------------------------------*/
	var jPanelMenu = $.jPanelMenu({
	  menu: '#responsive',
	  animated: false,
	  duration: 200,
	  keyboardShortcuts: false,
	  closeOnContentClick: true
	});


	// Desktop devices
	$('.menu-trigger').on('click', function(){

	  var jpm = $(this);

	  if( jpm.hasClass('active') )
	  {
	    jPanelMenu.off();
	    jpm.removeClass('active');
	  }
	  else
	  {
	    jPanelMenu.on();
	    jPanelMenu.open();
	    jpm.addClass('active');
			// Removes SuperFish Styles
		$('#jPanelMenu-menu').removeClass('menu');
		$('ul#jPanelMenu-menu li').removeClass('dropdown');
		$('ul#jPanelMenu-menu li ul').removeAttr('style');
		$('ul#jPanelMenu-menu li div').removeClass('mega');
		$('ul#jPanelMenu-menu li div').removeAttr('style');
		$('ul#jPanelMenu-menu li div div').removeClass('mega-container');
	  }
	  return false;
	});

	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth>992) {
			jPanelMenu.close();
		}
	});


	// Mobile Search Menu Trigger
	$('.search-trigger')
	.on('click', function(e){
		$('.responsive-search').slideToggle(200);
		$('.search-trigger').toggleClass("active");
	});


	/*----------------------------------------------------*/
	/*  Sticky Header 
	/*----------------------------------------------------*/
	$( "#main-header" ).clone(true).addClass('cloned').insertAfter( "#main-header" );
	// $("#main-header.cloned a img").attr("src", "images/logo-2.png");

	var stickyHeader = document.querySelector("#main-header.cloned");

	var headroom = new Headroom(stickyHeader, {
	  // "offset": $("#main-header").height(),
	  "offset": $("#main-header").height(),
	  "tolerance": 0
	});

	// disabling on mobile
	$(window).resize(function (){
		var winWidth = $(window).width();

		if(winWidth>992) {
			headroom.init();
			}

			else if(winWidth<992) {
				headroom.destroy();
			}
	});


	/*----------------------------------------------------*/
	/* Fullscreen Menu
	/*----------------------------------------------------*/
	$('.fullscreen-nav-trigger').on('click', function(){
		$(this).toggleClass('is-active');
		$('#main-header').not('#main-header.cloned').toggleClass('nav-active');
		$('body').toggleClass('fsnav');
	});

	// trigger positioning
	function triggerPositioning() {
		var headerHeight = $("#main-header").height();
		$('.fullscreen-nav-trigger').css('margin-top', headerHeight/2);
	}
		


	/*----------------------------------------------------*/
	/*  Flexslider
	/*----------------------------------------------------*/
	$('.testimonials-slider').flexslider({
		 animation: "fade",
		 directionNav: false
	});


	$('.simple-slider').flexslider({
		animation: "fade",
		controlNav: false,
		prevText: "",           //String: Set the text for the "previous" directionNav item
		nextText: ""
	});


	/*----------------------------------------------------*/
	/*  Skill Bars Animation
	/*----------------------------------------------------*/

		if($('.skills-container').length !==0){
			var skillbar_active = false;
			$('.skill-bar-value').hide();

			if($(window).scrollTop() === 0 && isScrolledIntoView($('.skills-container')) === true){
				skillbarActive();
				skillbar_active = true;
			}
			else if(isScrolledIntoView($('.skills-container')) === true){
				skillbarActive();
				skillbar_active = true;
			}
			$(window).bind('scroll', function(){
				if(skillbar_active === false && isScrolledIntoView($('.skills-container')) === true ){
					skillbarActive();
					skillbar_active = true;
				}
			});
		}

		function isScrolledIntoView(elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();

			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();

			return ((elemBottom <= (docViewBottom + $(elem).height())) && (elemTop >= (docViewTop - $(elem).height())));
		}

		function skillbarActive(){
			setTimeout(function(){

				$('.skill-bar-value').each(function() {
					$(this)
					.data("origWidth", $(this)[0].style.width)
					.css('width','1%').show();
					$(this)
					.animate({
						width: $(this).data("origWidth")
					}, 1200);
				});

			}, 250);}


		$(".skill-bar-value").each(function() {
			var skillBarPercentage = $(this).attr('data-percentage');
			$(this).css('width', ''+skillBarPercentage+'');
		});


	/*----------------------------------------------------*/
	/*  Inline CSS Replacement for backgrounds etc.
	/*----------------------------------------------------*/
	function inlineCSS() {

		// Common Inline CSS
		$(".section-background, .image-edge, .edge-bg, .full-width-box-content, .address-container, .section").each(function() {
			var attrImageBG = $(this).attr('data-background-image');
			var attrColorBG = $(this).attr('data-background-color');

			$(this).css('background-image', 'url('+attrImageBG+')');
			$(this).css('background', ''+attrColorBG+'');
		});


		// Fullscreen Navigation Styling
		if ($(".fullscreen-nav-container").attr('data-nav-bg-color')) {
			$(".fullscreen-nav-container").each(function() {

				var attrNavOP = $(this).attr('data-nav-bg-opacity');
				var attrNavBG = $(this).attr('data-nav-bg-color');

				var rgbaCol = 'rgba(' + parseInt(attrNavBG.slice(-6,-4),16)
				    + ',' + parseInt(attrNavBG.slice(-4,-2),16)
				    + ',' + parseInt(attrNavBG.slice(-2),16)
				    +','+attrNavOP+'';

				$('.fullscreen-nav-container').css('background-color', rgbaCol);
			});

		}

	}

	// Init
	inlineCSS();


	/*----------------------------------------------------*/
	/*  Header Parallax Background
	/*----------------------------------------------------*/
	function parallaxBg() {
		$('#header-container, .parallax, .video').prepend('<div class="bg-color"></div>');

		$( "#header-container, .parallax, .video").each(function() {
			var attrImage = $(this).attr('data-background');
			var attrColor = $(this).attr('data-color');
			var attrOpacity = $(this).attr('data-color-opacity');

			$(this).css('background-image', 'url('+attrImage+')');
			$(this).find(".bg-color").css('background-color', ''+attrColor+'');
			$(this).find(".bg-color").css('opacity', ''+attrOpacity+'');
		});
	}


	// Sliding Out Elements
	function parallaxSlide() {
		var headerElem = $('#titlebar h2, #titlebar span, #titlebar #breadcrumbs, #titlebar #filters, #titlebar #portfolio-nav, #titlebar ul.post-categories');

		$(window).bind("load resize scroll",function(e){
			if ($("#header-container").attr('data-background')) {

				// flying out and fading for header content
				$(headerElem).css({  'transform': 'translateY(' + (  $(window).scrollTop() / 8 ) + 'px)', });
				$(headerElem).not("#filters").css({ 'opacity': 1 - $(window).scrollTop() / 600 });	

				// Calculating Background Position
				$("#header-container").css('background-position', '50% ' + (- 200 - ($(window).scrollTop()) * 1.12) + 'px');
			}

			// styles reset for mobile
			if ($("#header-container").hasClass('mobile')) {

				// flying out and fading for header content
				$(headerElem).css({  'transform': 'none', });
				$(headerElem).not("#filters").css({ 'opacity': 1 });

				// Calculating Background Position
				$("#header-container").css('background-position', '50% ');
			}

			// Flying out for fullscreen parallax
			$(".parallax-content, .CaptionContent").css({ 
				'transform': 'translateY(' + (  $(window).scrollTop() / 6 ) + 'px)',
				'opacity': 1 - $(window).scrollTop() / 600
			});

			// Flying out slider captions
			$(".tp-caption.custom-caption-2").css({ 
				'opacity': 1 - $(window).scrollTop() / 600
			});

			// scroll to content flying in
			$(".scroll-to-content").css({ 
				'transform': 'translateY(' + ( - $(window).scrollTop() / 6 ) + 'px)',
			});


			// styles reset for mobile
			if ($("body").hasClass('mobile')) {

				var mobileElems = $('.tp-caption.custom-caption-2, .parallax-content, .CaptionContent, .scroll-to-content');

				// flying out and fading for header content
				$(mobileElems).css({  'transform': 'none', });
				$(mobileElems).css({ 'opacity': 1 });	

			}

		});
		
	}

	// Init
	parallaxBg()
	parallaxSlide()


	// parallaxSlide() disabling on mobile
	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth<992) {
			$('#header-container').addClass('mobile');
			$('body').addClass('mobile');
		}
		else if(winWidth>992) {
			$('#header-container').removeClass('mobile');
			$('body').removeClass('mobile');
		}
	});


    // Scroll Arrow
    $(".scroll-to-content").on('click touchstart', function() {
        $('html, body').animate({
            scrollTop: $(window).height()
        }, 800);
    });


	// Jumping background fix for IE
	if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
	    $('body').on("mousewheel", function () {
	        // remove default behavior
	        event.preventDefault(); 

	        //scroll without smoothing
	        var wheelDelta = event.wheelDelta;
	        var currentScrollPosition = window.pageYOffset;
	        window.scrollTo(0, currentScrollPosition - wheelDelta);
	    });
	}


	/*----------------------------------------------------*/
	/*  Full-Screen Parallax
	/*----------------------------------------------------*/
	/* detect touch */
	if("ontouchstart" in window){
	    document.documentElement.className = document.documentElement.className + " touch";
	}
	if(!$("html").hasClass("touch")){
	    /* background fix */
	    $(".parallax").css("background-attachment", "fixed");
	}

	/* fix vertical when not overflow
	call fullscreenFix() if .fullscreen content changes */
	function fullscreenFix(){
	    var h = $('body').height();
	    // set .fullscreen height
	    $(".parallax-content").each(function(i){
	        if($(this).innerHeight() > h){ $(this).closest(".fullscreen").addClass("overflow");
	        }
	    });
	}
	$(window).resize(fullscreenFix);
	fullscreenFix();



	/* resize background images */
	function backgroundResize(){
	    var windowH = $(window).height();
	    $(".background").each(function(i){
	        var path = $(this);
	        // variables
	        var contW = path.width();
	        var contH = path.height();
	        var imgW = path.attr("data-img-width");
	        var imgH = path.attr("data-img-height");
	        var ratio = imgW / imgH;
	        // overflowing difference
	        var diff = parseFloat(path.attr("data-diff"));
	        diff = diff ? diff : 0;
	        // remaining height to have fullscreen image only on parallax
	        var remainingH = 0;
	        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
	            var maxH = contH > windowH ? contH : windowH;
	            remainingH = windowH - contH;
	        }
	        // set img values depending on cont
	        imgH = contH + remainingH + diff;
	        imgW = imgH * ratio;
	        // fix when too large
	        if(contW > imgW){
	            imgW = contW;
	            imgH = imgW / ratio;
	        }
	        //
	        path.data("resized-imgW", imgW);
	        path.data("resized-imgH", imgH);
	        path.css("background-size", imgW + "px " + imgH + "px");
	    });
	}
	$(window).resize(backgroundResize);
	$(window).focus(backgroundResize);
	$(window).load(function() {	backgroundResize(); });



	/* set parallax background-position */
	function parallaxPosition(e){
	    var heightWindow = $(window).height();
	    var topWindow = $(window).scrollTop();
	    var bottomWindow = topWindow + heightWindow;
	    var currentWindow = (topWindow + bottomWindow) / 2;
	    $(".parallax").each(function(i){
	        var path = $(this);
	        var height = path.height();
	        var top = path.offset().top;
	        var bottom = top + height;
	        // only when in range
	        if(bottomWindow > top && topWindow < bottom){
	            var imgW = path.data("resized-imgW");
	            var imgH = path.data("resized-imgH");
	            // min when image touch top of window
	            var min = 0;
	            // max when image touch bottom of window
	            var max = - imgH + heightWindow;
	            // overflow changes parallax
	            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
	            top = top - overflowH;
	            bottom = bottom + overflowH;
	            // value with linear interpolation
	            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
	            // set background-position
	            var orizontalPosition = path.attr("data-oriz-pos");
	            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
	            $(this).css("background-position", orizontalPosition + " " + value + "px");

	        }
	    });
	}
	if(!$("html").hasClass("touch")){
	    $(window).resize(parallaxPosition);
	    //$(window).focus(parallaxPosition);
	    $(window).scroll(parallaxPosition);
	    parallaxPosition();
	}



	/*----------------------------------------------------*/
	/*  Owl Carousel
	/*----------------------------------------------------*/
	$('.logo-carousel').owlCarousel({
	  loop: false,
	  margin:10,
	  nav:true,
	  responsive:{
			0:{
				 items:1
			},
			600:{
				 items:3
			},
			1000:{
				 items:5
			}
	  },
	  navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	});	

	$('.owl-carousel').owlCarousel({
	  loop: false,
	  margin:30,
	  nav:true,
	  responsive:{
			0:{
				 items:1
			},
			992:{
				 items:2
			},
			1240:{
				 items:3
			},
			1660:{
				 items:3
			}
	  },
	  navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	});

	$('.shop-carousel').owlCarousel({
	  loop: false,
	  margin:31,
	  nav:true,
	  responsive:{
			0:{
				 items:1
			},
			600:{
				 items:2
			},
			1000:{
				 items:3
			},
			1300:{
				 items:4
			}
	  },
	  navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	});


	$('.full-width-carousel').owlCarousel({
	  loop: true,
	  margin:0,
	  nav:false,
	  center: true,
	  responsive:{
			0:{
				 items:1
			},
			600:{
				 items:1
			},
			768:{
				 items:2
			},
			1000:{
				 items:2
			}
	  }
	});


	$('.logo-carousel-alt').owlCarousel({
	  loop: true,
	  margin:0,
	  autoPlay: 1,
	  nav:false,
	  responsive:{
			0:{
				 items:1
			},
			600:{
				 items:3
			},
			1000:{
				 items:5
			}
	  }
	});


	$('.basic-carousel').owlCarousel({
	  loop: true,
	  margin:30,
	  nav:false,

	  responsive:{
			0:{
				 items:1
			},
			600:{
				 items:2
			},
			1000:{
				 items:3
			}
	  }
	});

	function runOwl() {
		$('.testimonial-carousel').owlCarousel({
			loop: true,
			margin:0,
			nav:true,
			autoHeight : true,
			slideSpeed : 500,
		  responsive:{
				0:{
					 items:1
				},
				600:{
					 items:1
				},
				1000:{
					 items:1
				}
		  }, navText:["<i class='ln  ln-icon-Left-3'></i>","<i class='ln  ln-icon-Right-3'></i>"]
		});
	}
	

	/*----------------------------------------------------*/
	/*  Back to Top
	/*----------------------------------------------------*/
	  var pxShow = 400; // height on which the button will show
	  var fadeInTime = 400; // how slow / fast you want the button to show
	  var fadeOutTime = 400; // how slow / fast you want the button to hide
	  var scrollSpeed = 400; // how slow / fast you want the button to scroll to top.

	  $(window).scroll(function(){
		 if($(window).scrollTop() >= pxShow){
			$("#backtotop").fadeIn(fadeInTime);
		 } else {
			$("#backtotop").fadeOut(fadeOutTime);
		 }
	  });

	  $('#backtotop a').on('click', function(){
		 $('html, body').animate({scrollTop:0}, scrollSpeed);
		 return false;
	  });


	/*----------------------------------------------------*/
	/*  Projects Filtering
	/*----------------------------------------------------*/

	$('.option-set.alt li').on('click',function(event) {
	  event.preventDefault();

	  var item = $(".projects.basic-filter a, .og-grid li"),
	  image = item.find('.projects.basic-filter a img');
	  item.removeClass('clickable unclickable');
	  image.stop().animate({opacity: 1});
	  var filter = $(this).children('a').data('filter');
	  item.filter(filter).addClass('clickable');
	  item.filter(':not('+filter+')').addClass('unclickable');
	});

	$('#filters a').on('click', function(e){
		 e.preventDefault();
		 $(this).parents('ul').find('a').removeClass('selected');
		 $(this).addClass('selected');
	});

	$('.projects.basic-filter a').on('click',function(e) {
	  if($(this).hasClass('unclickable')){
			e.preventDefault();
		}
	});



	/*----------------------------------------------------*/
	/*  Responsive Tables
	/*----------------------------------------------------*/
	$('.responsive-table').stacktable();



	/*----------------------------------------------------*/
	/*  Flexbox for IE
	/*----------------------------------------------------*/
	if (document.all) {
		$('html').addClass('ie10');
	}


	if (document.all) {
		flexibility(document.documentElement);
	}




	/*----------------------------------------------------*/
	/*  Notifications
	/*----------------------------------------------------*/

	$("a.close").removeAttr("href").on('click', function(){
		$(this).parent().fadeOut(200);
	});




	/*----------------------------------------------------*/
	/*  Isotope
	/*----------------------------------------------------*/

	// Isotope Fix
	function setWidth() {
		$('.isotope-wrapper.fw.style-1, .isotope-wrapper.fw.style-2, .isotope-wrapper.fw.style-3').not(".isotope-wrapper.fw.style-3.photo-gallery").width( $(window).width() );
	}

	function isotopeInit() {
		$('.isotope-wrapper').isotope({
		  itemSelector: '.isotope-item',
		  percentPosition: false,
		  masonry: {
		    // use outer width of grid-sizer for columnWidth
		    columnWidth: '.isotope-sizer'
		  }
		})
	}

	// Filters
	$('#filters a').on('click', function(e){
	  e.preventDefault();

	  var selector = $(this).attr('data-filter');
	  $('.projects.isotope-wrapper').isotope({ filter: selector });

	  $(this).parents('ul').find('a').removeClass('selected');
	  $(this).addClass('selected');
	});

	// Puregrid init
	PureGrid.init();


	/*----------------------------------------------------*/
	/*  Magnific Popup
	/*----------------------------------------------------*/   
	  
	$('body').magnificPopup({
		 type: 'image',
		 delegate: 'a.mfp-gallery',

		 fixedContentPos: true,
		 fixedBgPos: true,

		 overflowY: 'auto',

		 closeBtnInside: true,
		 preloader: true,

		 removalDelay: 0,
		 mainClass: 'mfp-fade',

		 gallery:{enabled:true},

		 callbacks: {
			  buildControls: function() {
					console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			  }
		 }
	});


	$('.popup-with-zoom-anim').magnificPopup({
		 type: 'inline',

		 fixedContentPos: false,
		 fixedBgPos: true,

		 overflowY: 'auto',

		 closeBtnInside: true,
		 preloader: false,

		 midClick: true,
		 removalDelay: 300,
		 mainClass: 'my-mfp-zoom-in'
	});


	$('.mfp-image').magnificPopup({
		 type: 'image',
		 closeOnContentClick: true,
		 mainClass: 'mfp-fade',
		 image: {
			  verticalFit: true
		 }
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		 disableOn: 700,
		 type: 'iframe',
		 mainClass: 'mfp-fade',
		 removalDelay: 160,
		 preloader: false,

		 fixedContentPos: false
	});



	/*----------------------------------------------------*/
	/* Sticky Kit
	/*----------------------------------------------------*/ 
	function stickyLoadInit() {

		function stickyload() {
			$('.sticky')
			.on("sticky_kit:bottom", function(e) {
				 $(this).parent().css('position', 'static');
			})
			.on("sticky_kit:unbottom", function(e) {
				 $(this).parent().css('position', 'relative');
			});
		}

		var winWidth = $(window).width();
		
		if(winWidth>992) {
			$('.project-photos').imagesLoaded( function() {
				$(".sticky").stick_in_parent({
					 parent: '.sticky-wrapper',
					 offset_top: 20
				});
	 			stickyload();
			});
		}

		$(window).bind("load resize",function(e){
			var winWidth = $(window).width();
			if(winWidth < 992) {
				$(".sticky").trigger("sticky_kit:detach");
			} else {
				$(".sticky").stick_in_parent({
					 parent: '.sticky-wrapper',
					 offset_top: 20
				});
			}
		});

	}


	/*----------------------------------------------------*/
	/*  Photo Grid
	/*----------------------------------------------------*/
	 $('body').imagesLoaded()
	     .always( function() {
		$('.small').photoGrid({
			rowHeight: $(window).height() / 4
		});

		$('.big').photoGrid({
		 	rowHeight: $(window).height() / 2
		});  

    });

	 $(window).resize(function (){
		$('.small').photoGrid({
			rowHeight: $(window).height() / 4
		});

		$('.big').photoGrid({
		 	rowHeight: $(window).height() / 2
		});  

	 });

	 

	/*----------------------------------------------------*/
	/*  Share Buttons
	/*----------------------------------------------------*/ 	

	var $Filter = $('.share-buttons');
	var FilterTimeOut;
	$Filter.find('ul li:first').addClass('active');
	$Filter.find('ul li:not(.active)').hide();
	$Filter.hover(function(){
		clearTimeout(FilterTimeOut);
		if( $(window).width() < 959 )
		{
			return;
		}
		FilterTimeOut=setTimeout(function(){
			$Filter.find('ul li:not(.active)').stop(true, true).animate({width: 'show' }, 250, 'swing');
			$Filter.find('ul li:first-child a').addClass('share-hovered');
		}, 100);

	},function(){
		if( $(window).width() < 960 )
		{
			return;
		}
		clearTimeout(FilterTimeOut);
		FilterTimeOut=setTimeout(function(){
			$Filter.find('ul li:not(.active)').stop(true, true).animate({width: 'hide'}, 250, 'swing');
			$Filter.find('ul li:first-child a').removeClass('share-hovered');

		}, 250);
	});
	$(window).resize(function() {
		if( $(window).width() < 960 )
		{
			$Filter.find('ul li:not(.active)').show();
		}
		else
		{
			$Filter.find('ul li:not(.active)').hide();
		}
	});
	$(window).resize();



	/*----------------------------------------------------*/
	/*  Tabs
	/*----------------------------------------------------*/ 

	var $tabsNav    = $('.tabs-nav'),
	$tabsNavLis = $tabsNav.children('li');

	$tabsNav.each(function() {
		 var $this = $(this);

		 $this.next().children('.tab-content').stop(true,true).hide()
		 .first().show();

		 $this.children('li').first().addClass('active').stop(true,true).show();
	});

	$tabsNavLis.on('click', function(e) {
		 var $this = $(this);

		 $this.siblings().removeClass('active').end()
		 .addClass('active');

		 $this.parent().next().children('.tab-content').stop(true,true).hide()
		 .siblings( $this.find('a').attr('href') ).fadeIn();

		 e.preventDefault();
	});
	var hash = window.location.hash;
	var anchor = $('.tabs-nav a[href="' + hash + '"]');
	if (anchor.length === 0) {
		 $(".tabs-nav li:first").addClass("active").show(); //Activate first tab
		 $(".tab-content:first").show(); //Show first tab content
	} else {
		 console.log(anchor);
		 anchor.parent('li').click();
	}


	/*----------------------------------------------------*/
	/*  Accordions
	/*----------------------------------------------------*/
	var $accor = $('.accordion');

	 $accor.each(function() {
		 $(this).toggleClass('ui-accordion ui-widget ui-helper-reset');
		 $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
		 $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
		 $(this).find("div").hide();

	});

	var $trigger = $accor.find('h3');

	$trigger.on('click', function(e) {
		 var location = $(this).parent();

		 if( $(this).next().is(':hidden') ) {
			  var $triggerloc = $('h3',location);
			  $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
			  $triggerloc.find('span').removeClass('ui-accordion-icon-active');
			  $(this).find('span').addClass('ui-accordion-icon-active');
			  $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
		 }
		  e.preventDefault();
	});


	/*----------------------------------------------------*/
	/*	Toggle
	/*----------------------------------------------------*/

	$(".toggle-container").hide();

	$('.trigger, .trigger.opened').on('click', function(a){
		$(this).toggleClass('active');
		a.preventDefault();
	});

	$(".trigger").on('click', function(){
		$(this).next(".toggle-container").slideToggle(300);
	});

	$(".trigger.opened").addClass("active").next(".toggle-container").show();


	/*----------------------------------------------------*/
	/*  Filter by Price
	/*----------------------------------------------------*/
	$( "#slider-range" ).slider({
	  range: true,
	  min: 0,
	  max: 500,
	  values: [ 0, 500 ],
	  slide: function( event, ui ) {
		 event = event;
		 $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	  }
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	  " - $" + $( "#slider-range" ).slider( "values", 1 ) );


	/*----------------------------------------------------*/
	/*  Tooltips
	/*----------------------------------------------------*/

	$(".tooltip.top").tipTip({
	  defaultPosition: "top"
	});

	$(".tooltip.bottom").tipTip({
	  defaultPosition: "bottom"
	});

	$(".tooltip.left").tipTip({
	  defaultPosition: "left"
	});

	$(".tooltip.right").tipTip({
	  defaultPosition: "right"
	});


	/*----------------------------------------------------*/
	/*  Product Quantity
	/*----------------------------------------------------*/
	var thisrowfield;
	$('.qtyplus').on('click', function(e){
	  e.preventDefault();
	  thisrowfield = $(this).parent().parent().parent().find('.qty');

	  var currentVal = parseInt(thisrowfield.val());
	  if (!isNaN(currentVal)) {
		 thisrowfield.val(currentVal + 1);
	  } else {
		 thisrowfield.val(0);
	  }
	});

	$(".qtyminus").on('click', function(e){
	  e.preventDefault();
	  thisrowfield = $(this).parent().parent().parent().find('.qty');
	  var currentVal = parseInt(thisrowfield.val());
	  if (!isNaN(currentVal) && currentVal > 0) {
		 thisrowfield.val(currentVal - 1);
	  } else {
		 thisrowfield.val(0);
	  }
	});


// ------------------ End Document ------------------ //
});

})(this.jQuery);


