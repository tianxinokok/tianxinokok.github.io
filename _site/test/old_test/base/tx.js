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
}


//设置样式
var _setStyle=function(obj,json){
	var attr='';
	for(attr in json){
		obj.style[attr]=json[attr];
	}
}
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
	}
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
}

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
}
var  _tquery=function(vArg){
	this.elements=[];
	switch(typeof vArg)
	{

		case 'function':
		_addEvent(window,'load',vArg);
		break;

		case 'string':
			switch(vArg.charAt(0))
			{
				case '#':   //ID
					var obj=document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case '.':   //class
					this.elements=_getByClass(document, vArg.substring(1));
					break;
				default:   //tagName
					this.elements=document.getElementsByTagName(vArg);

			}
			break;
		case 'object':
			this.elements.push(vArg);

	}
}

var $=function(vArg){
	return new _tquery(vArg);
}
_tquery.prototype.click=function(fn)
{
	var i=0;
	for(i=0;i<this.elements.length;i++)
	{
		_addEvent(this.elements[i],'click',fn);
	}
};

_tquery.prototype.show=function(fn)
{
	var i=0;
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='block';
	}
};

_tquery.prototype.hide=function(fn)
{
	var i=0;
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='none';
	}
};

_tquery.prototype.hover=function(fnover,fnout)
{
	var i=0;
	for(i=0;i<this.elements.length;i++)
	{
		_addEvent(this.elements[i],'mouseover',fnover);
		_addEvent(this.elements[i],'mouseout',fnout);
	}
};

_tquery.prototype.css=function(attr,value)
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