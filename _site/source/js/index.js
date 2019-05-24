//全局配置
var config = {
    'workPageIndex' : 1,
    'prosePageIndex': 1,
    'bookPageIndex' : 1,
    colorArr  :[
                //'#83ac4f',  /*深绿*/
                '#ff4e00',  /*橘黄*/
                '#7de87d',  /*浅绿*/
                '#fee800',  /*浅黄*/
                '#e7073f',  /*玫红*/
                '#6c29df'   /*深蓝*/
    ]
};
var isNavOpen = false;
var navOpenTL = new TimelineMax();
var navCloseTL = new TimelineMax();
var logoTL = new TimelineMax();

var $nav = $('.nav');
var $navBtn = $('.nav-btn');
var $navBtnPhone  = $('.nav_btn_phone');
var $phonebtnclose = $('.phone_btn_close');
var $bgMask = $('.nav__bg-mask-rect');
var $link = $('.nav__link');
var $linkNum = $('.nav__link-num');
var $linkTitle = $('.nav__link-title');
var $linkDesc = $('.nav__link-desc');
var $linkBase = $('.nav__link-base');
var $itemLine = $('.nav__item-line');


var animateGrad = true;
function domToString (node) {  
   let tmpNode = document.createElement('div');
   tmpNode.appendChild(node) ;
   let str = tmpNode.innerHTML;
   tmpNode = node = null; // 解除引用，以便于垃圾回收  
   return str;  
}
var tec_post = [];
var prose_post = [];
var book_post = [];
if(!Array.from){
    Array.from = function(iterable){
        // IE(包括IE11)没有这个方法,用[].slice.call()代替。
        return [].slice.call(iterable);
    }
}  
function createPostDom(){
  var tec_lisdom   = document.querySelectorAll('#post_list_false_1 li');
  var prose_lisdom = document.querySelectorAll('#post_list_false_2 li');
  var book_lisdom = document.querySelectorAll('#post_list_false_3 li');
  var tec_lisArray   = Array.from(tec_lisdom);
  var prose_lisArray = Array.from(prose_lisdom);
  var book_lisArray = Array.from(book_lisdom);
  for(let i = 0; i< tec_lisArray.length ;i+=4){
     tec_post.push(tec_lisArray.slice(i,i+4));
  }
  for(let i = 0 ; i<tec_post.length ; i++){
     var str = '<ul class="post_list work_list">';
      for(let j = 0 ;j <tec_post[i].length;j++){
             str += domToString(tec_post[i][j]) ;
      }
      str += '</ul>';
      $('#content_1').append(str);
  }
  //
  for(let i = 0; i< prose_lisArray.length ;i+=4){
     prose_post.push(prose_lisArray.slice(i,i+4));
  }
  for(let i = 0 ; i<prose_post.length ; i++){
     var str = '<ul class="post_list prose_list">';
      for(let j = 0 ;j <prose_post[i].length;j++){
             str += domToString(prose_post[i][j]) ;
      }
      str += '</ul>';
      $('#content_2').append(str);
  }
  //
  for(let i = 0; i< book_lisArray.length ;i+=5){
     book_post.push(book_lisArray.slice(i,i+5));
  }
  for(let i = 0 ; i<book_post.length ; i++){
     var str = '<ul class="post_list book_list">';
      for(let j = 0 ;j <book_post[i].length;j++){
             str += domToString(book_post[i][j]) ;
      }
      str += '</ul>';
      $('#content_3').append(str);
  }
}
createPostDom();
function setColor(){
  var colorArr = config.colorArr;
  // var randomColor = colorArr[Math.floor((Math.random()*colorArr.length))]; 
  var n = Math.floor(Math.random() * colorArr.length + 1)-1;  
  $('.bac_title').css({
    backgroundColor:colorArr[n]
  })
}
setColor();
function addClasszhx(type,n){
  var len = tec_post.length;
  if(type === 'work'){
    len = tec_post.length;
  }else if(type === 'prose'){
    len = prose_post.length;
  }else if(type === 'book'){
    len = book_post.length;
  }
  if(n === len && n === 1){
     $('.'+ type + '_next , ' + '.'+ type + '_prev').addClass('zhx');
  }else if(n === len && n != 1){
    $('.' + type + '_next').addClass('zhx');
    $('.' + type + '_prev').removeClass('zhx');
  }else if(n != len && n === 1){
    $('.' + type + '_prev').addClass('zhx');
    $('.' + type + '_next').removeClass('zhx');
  }else{
    $('.'+ type + '_next , ' + '.'+ type + '_prev').removeClass('zhx');
  } 
}
//
function navBtnClosedOver() {

  var navIconTL = new TimelineMax();

  navIconTL.set('.burger__stroke-over', { stroke: "#1cb5e0", drawSVG: 0 })
       .to('.burger__plus', 0.3, { fill: '#fff', rotation: 0, ease: Power4.easeInOut })
       .to('.burger__stroke-over', 0.4, { drawSVG: "0% 100%", ease: Power4.easeInOut }, 0);
}

function navBtnClosedOut() {

  var navIconTL = new TimelineMax();
  navIconTL.to('.burger__stroke-over', 0.4, { drawSVG: 0, ease: Power4.easeInOut })
       .to('.burger__plus', 0.3, { fill: '#1cb5e0', rotation: 0, ease: Power4.easeInOut }, 0);
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

initNav();

function initNav() {
  TweenMax.set( $bgMask, { scaleX: 0, transformOrigin: "100% 0" });
  TweenMax.set( [$itemLine], { scaleY: 0 });
  TweenMax.set( [$linkBase], { scaleX: 0 });
  TweenMax.set( '.nav__bg', { visibility: 'visible' });
}

function openNav(){
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

    var hTL = new TimelineMax({ delay: 0.6 });
        hTL.staggerFrom('.titlemin', 0.8, { y: 160, ease: Expo.easeOut }, 0.03);
}
function closeNav() {

    destroyAnimation(navOpenTL); // destroy opening animations in case clicking too quickly

    isNavOpen = false;

    hideLogo();
    stopGradient();
    navBtnClosedOver();

    navCloseTL = new TimelineMax( { onComplete: function() { 
      $nav.removeClass( "nav_open" );
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
  function showLogo() {
    TweenMax.set('.header_logo', { autoAlpha: 1 });
    logoTL = new TimelineMax( { delay: 1 } );
    logoTL.set('.logo__plus-horz', { opacity: 0 })
          .fromTo('.logo__plus-vert',0.5, { scaleY: 0, transformOrigin: "center center" }, { scaleY: 1, ease: Power4.easeIn })
          .set('.logo__plus-horz',{ opacity: 1, immediateRender: false  })
          .fromTo('.logo_baidu_border', 1.0, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: Power4.easeOut}, 0.5)
          .fromTo('.logo_xiansheng_border', 1.0, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: Power4.easeOut}, 0.5)
          .fromTo('.logo__plus-horz', 0.5, { rotation: -90, transformOrigin: "center center" } ,{ rotation: 0, ease: Elastic.easeOut.config(1.0, 0.5) }, "-=0.35")
          .staggerFromTo('.logo_baidu_letter', 0.4, { y: 150 }, { y: 0, ease: Power2.easeOut }, 0.07, "-=0.4")
          .staggerFromTo('.logo_xiansheng_letter', 0.3, { y: -150 }, { y: 0, ease: Power2.easeOut }, 0.07, "-=0.59");


  }
  function hideLogo() {
    destroyAnimation(logoTL);
    TweenMax.to('.header_logo', 0.3, { autoAlpha: 0 });
  }
  function stopGradient() {
    if(animateGrad) {
      $nav.off('mousemove');
    }
  }
  function destroyAnimation(tl) {
    tl.clear();
    tl.eventCallback("onReverseComplete", null);
    tl.eventCallback("onComplete", null);
    tl.eventCallback("onUpdate", null);
    tl.eventCallback("onStart", null);
  }
$(document).ready(function(){
    addClasszhx('work',config.workPageIndex);
    addClasszhx('prose',config.prosePageIndex);
    addClasszhx('book',config.bookPageIndex);
    //设置横屏宽度
    var workContentWidth  = tec_post.length*1060 + 'px';
    var proseContentWidth = prose_post.length*1060 + 'px';
    var bookContentWidth  = book_post.length*1325 + 'px';
    $('.work_content').css({
      width:workContentWidth
    });
    $('.prose_content').css({
      width:proseContentWidth
    });
    $('.book_content').css({
      width:bookContentWidth
    });
    //work下一页伪翻页
    $('.next').on('click',function(e){
      e.stopPropagation();
      var btn_type = $(this).attr('class');
      var n = 0 ;
      var pageIndex_type = '';
      var list_type = '';
      var move_distance = 0;
      if(btn_type.indexOf('work') != -1){
          btn_type = 'work';
          n = tec_post.length ;
          pageIndex_type =  'workPageIndex';
          list_type = 'work_list';
          move_distance = 1060;
      }else if(btn_type.indexOf('prose') != -1){
          btn_type = 'prose';
          n = prose_post.length;
          pageIndex_type =  'prosePageIndex';
          list_type = 'prose_list';
          move_distance = 1060;
      }else if(btn_type.indexOf('book') != -1){
          btn_type = 'book';
          n = book_post.length;
          pageIndex_type =  'bookPageIndex';
          list_type = 'book_list';
          move_distance = 1325;
      }else{

      }

      if(config[pageIndex_type] < n){
        var move_right = config[pageIndex_type]*move_distance + 'px';
        $('.'+list_type).css({
          right:move_right
        });
        $('.'+list_type + '> li').addClass('move_opacity');

        setTimeout(function(){
        $('.'+list_type + '> li').removeClass('move_opacity');
        },700);

        config[pageIndex_type] ++ ;
        addClasszhx(btn_type,config[pageIndex_type]);
      }else{

      }

    });
    //work_上一页伪翻页
    $('.prev').on('click',function(e){
      e.stopPropagation();
      var btn_type = $(this).attr('class');
      var n = 0 ; 
      var pageIndex_type = '';
      var list_type = '';
      var move_distance = 0;
      if(btn_type.indexOf('work') != -1){
          btn_type = 'work';
          n = tec_post.length ;
          pageIndex_type =  'workPageIndex';
          list_type = 'work_list';
          move_distance = 1060;
      }else if(btn_type.indexOf('prose') != -1){
          btn_type = 'prose';
          n = prose_post.length;
          pageIndex_type =  'prosePageIndex';
          list_type = 'prose_list';
          move_distance = 1060;
      }else if(btn_type.indexOf('book') != -1){
          btn_type = 'book';
          n = book_post.length;
          pageIndex_type =  'bookPageIndex';
          list_type = 'book_list';
          move_distance = 1325;
      }else{

      }
      //addClasszhx(btn_type,pageIndex_type);
      if(config[pageIndex_type] > 1){
        var move_right = -move_distance ;
        var this_right = parseInt($('.'+list_type).css('right'));
          $('.'+list_type).css({
            right:this_right + move_right + 'px'
          });
          $('.'+list_type + '> li').addClass('move_opacity');
          setTimeout(function(){
          $('.'+list_type + '> li').removeClass('move_opacity');
          },700);
          config[pageIndex_type] -- ; 
          addClasszhx(btn_type,config[pageIndex_type]);
      }else {
          config[pageIndex_type] = 1 ; 
          $('.'+list_type).css({
            right:'0px'
          })
      }  

    });
    //new nav
    $navBtn.on('click',function(e){
      e.stopPropagation();
      $('.nav').addClass('nav_open');
      if(!isNavOpen) {
        openNav();
      }
      else {
        closeNav();
      }
    });
    //
    $navBtn.on('mouseenter', function() {
      if(!isNavOpen) {
        navBtnClosedOver();
      }
      else {
        navBtnOpenOver();
      }

    });
    //
    $navBtn.on('mouseleave', function() {
      if(!isNavOpen) {
        navBtnClosedOut();
      }
      else {
        navBtnOpenOut();
      }

    });
    //
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
    
    });

    $link.on( "mouseleave", function() {
      var $thisBase = $(this).find('.nav__link-base');
      var $thisNum = $(this).find('.nav__link-num');
      var $thisDesc = $(this).find('.nav__link-desc');
      TweenMax.to($thisBase, 0.4, { scaleX: 0, opacity: 0, ease: Power4.easeOut, transformOrigin: "0% 0%" });
      TweenMax.to($thisNum, 0.8, { y: 0, ease: Elastic.easeOut.config(1.0, 0.5) });
      TweenMax.to($thisDesc, 0.8, { x: 0, ease: Elastic.easeOut.config(1.0, 0.5) });
    } );

    $link.on( "click", function(e) {
      //e.preventDefault();
    });
    var stopDefault = function(){
        event.preventDefault();
    };
    //phone_nav_btn open
    $navBtnPhone.on('click',function(e){
      e.stopPropagation();
      $('.nav').addClass('_opacity1');
      $('.nav__item').addClass('_opacity1');
      $(document.body).addClass('_overflow_hidden');
      document.addEventListener('touchmove', stopDefault ,{passive:false});
    });
    //phone_nav_btn close
    $phonebtnclose.on('click',function(e){
      e.stopPropagation();
      $('.nav').removeClass('_opacity1');
      $('.nav__item').removeClass('_opacity1');
      $(document.body).removeClass('_overflow_hidden');
      document.removeEventListener('touchmove', stopDefault ,{passive:false});
    });
})
