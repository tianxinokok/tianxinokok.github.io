if (window.ActiveXObject || "ActiveXObject" in window){
	$('.post_list li').on('mouseover',function(e){
		$(this).find('img').attr('class','gray img_over_ie');
	});
	$('.post_list li').on('mouseout',function(e){
		$(this).find('img').attr('class','gray');
	});
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
	var pathname = window.document.location.pathname;
		var json = {a:1};
		var currentPage = 5;
	function go(d) {
     setupPage(currentPage + d);
     history.pushState(currentPage, document.title, '?x=' + currentPage);
 }
 onpopstate = function(event) {
     setupPage(event.state);
 }
 function setupPage(page) {
     currentPage = page;
     //document.title = 'Line Game - ' + currentPage;
     //document.getElementById('coord').textContent = currentPage;
     this.href = '?x=' + (currentPage+1);
     //document.links[0].textContent = 'Advance to ' + (currentPage+1);
    // document.links[1].href = '?x=' + (currentPage-1);
    // document.links[1].textContent = 'retreat to ' + (currentPage-1);
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