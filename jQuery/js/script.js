$(window).on('load',function  () {
	waterfall();
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},{"src":'16.jpg'},{"src":'15.jpg'}]}
	$(window).on('scroll',function  () {
		if(checkScrollSlide){
			$.each(dataInt.data,function  (key,value) {
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				var oImg=$('<img>').attr('src','image/'+$(value).attr('src')).appendTo($(oPic));
			})
			waterfall();
		}
	})

})

function waterfall () {
	var $boxs=$('#main>div');    
	var w=$boxs.eq(0).outerWidth();    //jQuery中的eq就是index，outerWidth表示所有margin和padding的值
	var cols=Math.floor($(window).width()/w);    //windoc不是jquery对象，用$()转化成jquery对象   计算宽度
	$('#main').width(w*cols).css('margin','0 auto');   //设置main的宽度及整体居中
	var hArr=[];    //记录“第一行”高度的数组
	//设置“第一行”下面第一张图片的css使其定位到相应位置
	$boxs.each(function  (index,value) {    
		var h=$boxs.eq(index).outerHeight();     
		if(index<cols){
			hArr[index]=h;   //初始化第一行图片的高度 
		}else{
			var minH=Math.min.apply(null,hArr);  //在hArr中获取最小的数
			var minHIndex=$.inArray(minH,hArr);   //获取hArr中最小数数组对应的index
			$(value).css({            //设置“新图片的css样式
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'          
			})
			hArr[minHIndex]=hArr[minHIndex]+$boxs.eq(index).outerHeight();   //是”新图片“归位到第一行中
		}
	})

}

function checkScrollSlide () {
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}
