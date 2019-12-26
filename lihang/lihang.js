function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var onNavlist = document.getElementById('nav_active').children;
var slider = document.getElementById('slider');
var slide = document.getElementById('slide');
var index = 1;
var timer;
function next(){
	changeNav();
	animate(slider,{left:-1536*index},function(){
		if(index==6){
			slider.style.left = '-1536px';
			index=1;
		}
		index++;
	});
}
function pre(){
	changeNav();
	animate(slider,{left:-1536*index},function(){
		if(index==0){
			slider.style.left = '-7680px';
			index = 5;
		}
		index--;
	});
}
timer=setInterval(next,2000);
content_box.onmouseover = function(){
	clearInterval(timer);
}
content_box.onmouseout = function(){
	timer = setInterval(next,2000);
}

/*选择对应图片播放*/
function changeNav(){
	for(var i =0;i<onNavlist.length;++i){
		onNavlist[i].className = '';
		if(index!=0&&index!=6){
			onNavlist[index-1].className = "active";
		}else if(index==0){
			onNavlist[4].className = "active";
		}else if(index==6){
			onNavlist[0].className = "active";
		}
	}
	for(var i = 0;i<onNavlist.length;++i){
		onNavlist[i].index = i;
		onNavlist[i].onmouseover =  function(){
			index = this.index+1;
			for(var i =0;i<onNavlist.length;++i){
				onNavlist[i].className = '';
				if(index!=0&&index!=6){
					onNavlist[index-1].className = "active";
				}else if(index==0){
					onNavlist[4].className = "active";
				}else if(index==6){
					onNavlist[0].className = "active";
				}
			}
			animate(slider,{left:-1366*index});
		};
	}
}
