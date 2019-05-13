/*  ==========================================================================
    Variables
    ========================================================================== */ 

var $nav = $('.nav'),
	$navBtn = $('.nav-btn'),
	$bgMask = $('.nav__bg-mask-rect'),
	$link = $('.nav__link'),
	$linkNum = $('.nav__link-num'),
	$linkTitle = $('.nav__link-title'),
	$linkDesc = $('.nav__link-desc'),
	$linkBase = $('.nav__link-base'),
	$itemLine = $('.nav__item-line'),
	isNavOpen = false,
	navOpenTL = new TimelineMax(),
	navCloseTL = new TimelineMax(),
	logoTL = new TimelineMax(),
	animateGrad = true; // toggle for gradient animation test

/*  ==========================================================================
    Nav Button Events
    ========================================================================== */ 

	$navBtn.on('click', function() {
		$nav.addClass( "js-nav--open" );

		// toggle animations
		if(!isNavOpen) {
			openNav();
		}
		else {
			closeNav();
		}
	})

	$navBtn.on('mouseenter', function() {

		// toggle animations
		if(!isNavOpen) {
			navBtnClosedOver();
		}
		else {
			navBtnOpenOver();
		}

	});

	$navBtn.on('mouseleave', function() {

		// toggle animations
		if(!isNavOpen) {
			navBtnClosedOut();
		}
		else {
			navBtnOpenOut();
		}

	});

/*  ==========================================================================
    Nav Button Animation States
    ========================================================================== */ 

	function navBtnClosedOver() {

		var navIconTL = new TimelineMax();

		navIconTL.set('.burger__stroke-over', { stroke: "#F03694", drawSVG: 0 })
				 .to('.burger__plus', 0.3, { fill: '#fff', rotation: 0, ease: Power4.easeInOut })
				 .to('.burger__stroke-over', 0.4, { drawSVG: "0% 100%", ease: Power4.easeInOut }, 0);
	}

	function navBtnClosedOut() {

		var navIconTL = new TimelineMax();
		navIconTL.to('.burger__stroke-over', 0.4, { drawSVG: 0, ease: Power4.easeInOut })
				 .to('.burger__plus', 0.3, { fill: '#F03694', rotation: 0, ease: Power4.easeInOut }, 0);
	}

	function navBtnOpenOver() {

		var navIconTL = new TimelineMax();
		navIconTL.to('.burger__plus', 0.3, { fill: '#fff', rotation: 135, ease: Power4.easeInOut, transformOrigin: "center center" })
				 .to('.burger__stroke-over', 0.4, { drawSVG: 0, ease: Power4.easeInOut }, 0);
	}

	function navBtnOpenOut() {

		var navIconTL = new TimelineMax();
		navIconTL.to('.burger__plus', 0.3, { fill: '#0E1925', rotation: 45, ease: Power4.easeInOut, transformOrigin: "center center" });
	}

/*  ==========================================================================
    Nav Animation States
    ========================================================================== */ 

	initNav();

	function initNav() {
		TweenMax.set( $bgMask, { scaleX: 0, transformOrigin: "100% 0" });
		TweenMax.set( [$itemLine], { scaleY: 0 });
		TweenMax.set( [$linkBase], { scaleX: 0 });
		TweenMax.set( '.nav__bg', { visibility: 'visible' });
	}

	function openNav() {

		destroyAnimation(navCloseTL); // destroy the close animation so the onComplete doesn't fire is reopened too quickly.

		isNavOpen = true;

		showLogo();
		updateGradient();
		navBtnOpenOver();

		navOpenTL = new TimelineMax();

		navOpenTL.set( $linkDesc, { opacity: 0, x: 40 })
			.set( $linkNum, { opacity: 0, x: -20 })
			.set( $linkTitle, { opacity: 1 })
			.staggerTo( $bgMask, 0.8, { 
				scaleX: 1,
				ease: Power4.easeInOut,
				transformOrigin: "100% 0"
			}, 0.08 )
			.staggerTo( $itemLine, 1.2, { 
				scaleY: 1,
				ease: Power4.easeInOut,
				transformOrigin: "100% 0"
			}, 0.1, "-=0.4" )
			.staggerTo( $linkNum, 0.8, { 
				opacity: 1,
				x: 0,
				ease: Power4.easeOut
			}, 0.1, "-=1.4" )
			.staggerTo( $linkDesc, 0.8, { 
				x: 0,
				opacity: 1,
				ease: Power4.easeOut
			}, 0.1, "-=1.0" )



     $linkTitle.each(function(){
		 
		 
		 if (!$(this).data('cachetxt')) {
			 $(this).data("cachetxt",$(this).html());
			 }
		 word=$(this).data('cachetxt').split(" ");
		 newTxt='';
		 for(i=0;i<word.length; i++){
		 newTxt+= '<div class="word" style="position:relative;display:inline-block;">'
		     for(j=0;j<word[i].length; j++){
	              newTxt+='<div class="titlemin" style="position:relative;display:inline-block;">'+word[i][j]+'</div>';
             }
			 
		 newTxt+= '</div> '
		 }

        $(this).html(newTxt)
		 })
	  
		
		


		hTL = new TimelineMax({ delay: 0.6 });
		hTL.staggerFrom('.titlemin', 0.8, { y: 160, ease: Expo.easeOut }, 0.03);


	}

	function closeNav() {

		destroyAnimation(navOpenTL); // destroy opening animations in case clicking too quickly

		isNavOpen = false;

		hideLogo();
		stopGradient();
		navBtnClosedOver();

		navCloseTL = new TimelineMax( { onComplete: function() { 
			$nav.removeClass( "js-nav--open" );
			console.log('remove class');
		} } );

		navCloseTL.to( $itemLine, 0.3, { 
				scaleY: 0
			} )
			.staggerTo( $bgMask, 0.8, { 
				scaleX: 0,
				ease: Power4.easeInOut,
				transformOrigin: "100% 0"
			}, 0.08, "-=0.2")

		TweenMax.to( [$linkDesc, $linkNum, $linkTitle], 0.3, { opacity: 0 });

	}



	function showLogo() {

		TweenMax.set('.nav__logo-link', { autoAlpha: 1 });

		logoTL = new TimelineMax( { delay: 1 } );

		logoTL.set('.logo__tm', { opacity: 0 })
				.set('.logo__plus-horz', { opacity: 0 })
				.fromTo('.logo__plus-vert', 0.5, { scaleY: 0, transformOrigin: "center center" }, { scaleY: 1, ease: Power4.easeIn })
				.set('.logo__plus-horz', { opacity: 1, immediateRender: false  })
				.fromTo('.logo__boys-border', 1.0, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: Power4.easeOut}, 0.5)
				.fromTo('.logo__girls-border', 1.0, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: Power4.easeOut}, 0.5)
				.fromTo('.logo__plus-horz', 0.5, { rotation: -90, transformOrigin: "center center" } ,{ rotation: 0, ease: Elastic.easeOut.config(1.0, 0.5) }, "-=0.35")
				.staggerFromTo('.logo__boys-letter', 0.4, { y: 150 }, { y: 0, ease: Power2.easeOut }, 0.07, "-=0.4")
				.staggerFromTo('.logo__girls-letter', 0.3, { y: -150 }, { y: 0, ease: Power2.easeOut }, 0.07, "-=0.59")
				.set('.logo__tm', { opacity: 1, immediateRender: false })
				.fromTo('.logo__tm', 0.5, { x: -50 }, { x: 0, ease: Power2.easeOut });

		logoTL.timeScale( 1 );
	}

	function hideLogo() {
		destroyAnimation(logoTL);
		TweenMax.to('.nav__logo-link', 0.3, { autoAlpha: 0 });
	}

	function destroyAnimation(tl) {
		tl.clear();
		tl.eventCallback("onReverseComplete", null);
		tl.eventCallback("onComplete", null);
		tl.eventCallback("onUpdate", null);
		tl.eventCallback("onStart", null);
	}


/*  ==========================================================================
    Gradient Mouse Move
    ========================================================================== */  


	function updateGradient() {

		if(animateGrad) {

			// Bind animation to cursor
			$nav.on('mousemove', function(e) {
				x = e.pageX;
				y = e.pageY
				var xPerc = (e.pageX / document.documentElement.clientWidth) * 100;
				var yPerc = (e.pageY / document.documentElement.clientHeight) * 100

				TweenMax.to('.nav__grad', 2, {
					attr: { x1: yPerc.toString()+"%" },
					ease: Expo.easeOut
				});

				TweenMax.to('.nav__grad', 2, {
					attr: { y1: (xPerc/2).toString()+"%" },
					ease: Expo.easeOut
				});

				TweenMax.to('.nav__grad', 2, {
					attr: { x2: (100-xPerc).toString()+"%" },
					ease: Expo.easeOut
				});

				TweenMax.to('.nav__grad', 2, {
					attr: { y2: (100-yPerc).toString()+"%" },
					ease: Expo.easeOut
				});

			});
		}
	}

	function stopGradient() {
		if(animateGrad) {
			$nav.off('mousemove');
		}
	}


/*  ==========================================================================
    Nav Links Events
    ========================================================================== */  

	$link.on( "mouseenter", function() {
		if(isNavOpen) {
			var $thisBase = $(this).find('.nav__link-base');
			var $thisNum = $(this).find('.nav__link-num');
			var $thisDesc = $(this).find('.nav__link-desc');
			var linkOverTL = new TimelineMax();
			
			linkOverTL.to($thisBase, 0.8, { scaleX: 1, opacity: 1, ease: Power4.easeOut, transformOrigin: "0% 0%" })
				.to($thisNum, 0.8, { y: -14, ease: Elastic.easeOut.config(1.0, 0.5) }, 0)
				.to($thisDesc, 0.8, { x: 20, ease: Elastic.easeOut.config(1.0, 0.5) }, 0);
		}
		
	} );

	$link.on( "mouseleave", function() {
		var $thisBase = $(this).find('.nav__link-base');
		var $thisNum = $(this).find('.nav__link-num');
		var $thisDesc = $(this).find('.nav__link-desc');
		TweenMax.to($thisBase, 0.4, { scaleX: 0, opacity: 0, ease: Power4.easeOut, transformOrigin: "0% 0%" });
		TweenMax.to($thisNum, 0.8, { y: 0, ease: Elastic.easeOut.config(1.0, 0.5) });
		TweenMax.to($thisDesc, 0.8, { x: 0, ease: Elastic.easeOut.config(1.0, 0.5) });
	} );

	$link.on( "click", function(e) {
		e.preventDefault();
	} );



console.clear();