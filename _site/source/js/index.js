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
	console.log(lala);
	/*
	无刷新跳转
	 */
	/*console.log(window.location.href);
	console.log(location.hash);
	var state = {
				    title: window.document.title,
				    url: window.location.href,
				    time:new Date().getTime()
				};
	window.history.pushState(state, document.title, lala);*/
	return false;

});
