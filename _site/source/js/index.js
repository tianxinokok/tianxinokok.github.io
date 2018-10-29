var config ={
	interfaces:{
		booklist:"../source/interface/booklist.json"
	}
};
function IEVersion() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return 7;
                } else if(fIEVersion == 8) {
                    return 8;
                } else if(fIEVersion == 9) {
                    return 9;
                } else if(fIEVersion == 10) {
                    return 10;
                } else {
                    return 6;//IE版本<=7
                }   
            } else if(isEdge) {
                return 'edge';//edge
            } else if(isIE11) {
                return 11; //IE11  
            }else{
                return -1;//不是ie浏览器
            }
};
function getCookie(c_name){
	if (document.cookie.length>0){ 
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return ""
}
function setCookie(c_name,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : "; expires="+exdate.toGMTString()) + 
	";path=/;"
	}
var night = null;
function checkCookie(){
	night=getCookie('night');
	night == 1 ? $('html').attr('class','night-mode') : $('html').attr('class','');
}
checkCookie();

if (window.ActiveXObject || "ActiveXObject" in window){
	$('.post_list li').on('mouseover',function(e){
		$(this).find('img').attr('class','gray img_over_ie');
	});
	$('.post_list li').on('mouseout',function(e){
		$(this).find('img').attr('class','gray');
	});
	if(IEVersion() >= 10){                  //ie10+
		$('.header').on('mouseover',function(e){
			//$(this).find('.poster_img').attr('class','poster_img gray img_over');
			var newcolor = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0";
			var ie_svg = document.getElementById('ie_svg');
			ie_svg.setAttribute('values',newcolor);
			/*ie_svg.animate({
				values:newcolor
			},1000);*/
		});
		$('.header').on('mouseout',function(e){
			var newcolor = "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0";
			var ie_svg = document.getElementById('ie_svg');
			ie_svg.setAttribute('values',newcolor);
		});
	}
}else{
	$('.post_list li').on('mouseover',function(e){
		$(this).find('img').attr('class','gray img_over');
	});
	$('.post_list li').on('mouseout',function(e){
		$(this).find('img').attr('class','gray');
	});
	///
	$('.header').on('mouseover',function(e){
		$(this).find('.poster_img').attr('class','poster_img gray img_over');
	});
	$('.header').on('mouseout',function(e){
		$(this).find('.poster_img').attr('class','poster_img gray');
	});
	

}
$('.post_list li').on('click',function(e){
	e.preventDefault();
	var lala  = $(this).find('a').attr('data-post-href');
	window.location.href = lala;
});
$('.fa-moon-o').parent().on('click',function(e){
	e.preventDefault();
	$('html').toggleClass("night-mode");
	if($('html').attr('class') == "night-mode"){
		setCookie('night',"",-1,"/");
        setCookie('night',1,1,"/");
	}else{
		setCookie('night',"",-1,"/");
		setCookie('night',-1,1,"/");
	}
});
$(document).ready(function(){

//获取浏览器宽度
var _width = $(window).width(); 
if(_width < 479){
	var Arr = ["#5fcdc7","#ff8a00","#70d5b3","#ea5480"];  
	var n = Math.floor(Math.random() * Arr.length + 1)-1;  
	$('.post_list').find('li:first').css({
	   	"background-color":Arr[n]
	})
	$('.bottom_line').css({
		"background-color":Arr[n]
	})
}
function log(){
	console.log('本站访客数:' + $('#busuanzi_value_site_uv').html());
	console.log('总点击量:' + $('#busuanzi_value_site_pv').html());
	console.log('本页面点击人数:' + $('#busuanzi_value_page_pv').html());	
};
log();
});