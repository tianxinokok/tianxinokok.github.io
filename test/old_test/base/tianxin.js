/*
 * Date: 2016-6-17
 */

(function(window,undefined){
	var doc=document=window.document;
	var location=window.location;
	var document=document.documentElement;

	var roottian;

	var tx=window.tx;

  	var _$=window.$;

/*	var tianxin=function(selector,context){
			return new tianxin.fn.init(	selector,context,roottianxin);
		};

	tianxin.fn = tianxin.prototype = {
		construction:tianxin,
		init:function(selector,context,roottianxin){

			if(!selector){
				return this;
			}

		}

	}


	tianxin.fn.init.prototype  = tianxin.fn;

	window.tianxin = window.$ = tianxin;
*/
var tx = window.tx = function(selector,root,tag){

	switch (selector.charAt(0)){
		case '#':
			tx.queryData = doc.getElementById(selector.substring(1));
			break;
		case '.':
			if(!root && !tag){
				tx.queryData = _getByClass(doc,selector.substring(1));
			}else{
				tx.queryData = _getByClass(root||doc,selector.substring(1));
			}
			break;
		default:
			if(!root){
				tx.queryData = doc.getElementsByTagName(selector);
			}else{
				tx.quertData = root.getElementsByTagName(selector);
			}
		}

		return tx.queryData;
};

var _ajax=function(url,fnSucc,fnFaild/*function*/){

	var oAjax=null;
	if(window.XMLHttpRequest){
		oAjax=new XMLHttpRequest();
	}
	else{
		oAjax=new ActiveXObject("Microsoft,XMLHTTP");
	}

	oAjax.open('get',url,true);

	oAjax.send();

	oAjax.onreadystatechange=function(){

		if(oAjax.readyState == 4){
			if(oAjax.status == 200){
				fnSucc(oAjax.responseText);
			}
			else{
				if(fnFaild){
					fnFaild();
				}
			}
		}
	}
}
// 获取url传入的参数
var _getUrl = function () {
    var search=location.search?location.search.substr(1):'',
        args={},
        i=0,
        pieces=search?search.split('&'):[],
        item;
    
    if(pieces.length===0) return args;
    while(i<pieces.length) {
        item=pieces[i].split('=');
        args[item[0]] = decodeURI(item[1]);
        i+=1;
    };
    return args;
};
//url后面添加参数
var _createQuery = function(u,k,v){
	if(u.indexOf('?') === -1){
		u = u + '?';
	}else{
		u = u + '&';
	}
	u += k + '=' + encodeURI(v);
	return u ; 
};
//获取样式
var _getStyle=function(obj,attr){
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,false)[attr];
	}
};
//设置样式
var _setStyle=function(obj,json){
	var attr='';
	for(attr in json){
		obj.style[attr]=json[attr];
	}
};
// 运动框架
var _startMove=function(obj,json,fn/*function*/){ 
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var bStop=true;
			for(var attr in json)
			{
				var cur=0;
				if(attr == 'opacity')
				{
					cur=parseInt(parseFloat(_getStyle(obj,attr))*100);
				}
				else
				{
					cur=parseInt(_getStyle(obj,attr));
				}
				var speed=((json[attr])-cur)/8;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
				//停止条件
				if(cur != json[attr]){
					bStop = false;
				}

				if(attr == 'opacity')
				{
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}
				else
				{
					obj.style[attr]=cur+speed+'px';
				}
				
			}

			if(bStop){
				clearInterval(obj.timer)
				if(fn)
				fn();
			}
			
		},30)
	};

//绑定事件
var _addEvent=function(obj,sEv,fn){
	if(obj.attactEvent)
	{
		obj.attachEvent('on'+sEv,fn);
	}
	else
	{
		obj.addEventListener(sEv, fn,false);
	}
};
//通过class选取元素
var _getByClass=function(oParent,sClass){
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;

	for(i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
	}

	return aResult;
};
//显示
var _show = function(fn)
{
	var i=0;
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='block';
	}
};
//隐藏
var _hide = function(fn)
{
	var i=0;
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='none';
	}
};
//获取和设置样式，如果参数为2是设置，参数为1是获取
var _css =function(attr,value)
{
	if(arguments.length==2) //设置样式
	{
		var i=0;
		for(i=0;i <this.elements.length;i++)
		{
			this.elements[i].style[attr]=value;
		}
	}
	else
	{
		return _getStyle(this.elements[0],attr);
	}
};
var _html = function (elem, value) {
    if(elem && !_isUndefined(value)){
        elem.innerHTML = value+'';
        return true;
    }
};
//去除空格
var _trim = function (s){
    return s.replace(/^\s*|\s$/g, '');
};
tx.getUrl 		=_getUrl;
tx.createQuery  =_createQuery;
tx.getStyle     =_getStyle;
tx.setStyle 	=_setStyle;
tx.startMove 	=_startMove;
tx.on           =_on
tx.show         =_show;
tx.hide         =_hide;
tx.css   		=_css;  
tx.html         =_html;
tx.trim 		=_trim;

})( window );