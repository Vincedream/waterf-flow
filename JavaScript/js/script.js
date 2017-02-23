window.onload=function() {
	waterfall('main','box');  //函数在页面加载完毕的时候马上运行
	//模拟jason数据
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},{"src":'16.jpg'},{"src":'15.jpg'}]}
	window.onscroll=function  () {
		if(checkScroolSlide){
			var oParent=document.getElementById('main');
			// 添加新的元素进main中
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);

				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);

				var oImg=document.createElement('img');
				oImg.src="image/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box'); 新元素初始化瀑布流
		}
	}
}

function waterfall(parent,box) {
	var oParent=document.getElementById(parent);   //parent的容器
	var oBoxs=getByClass(oParent,box);   //将parent中的div=class的容器加入oboxs容器中
	//console.log(oBoxs.length);
	
	//设置main的宽度
	var oBoxsW=oBoxs[0].offsetWidth; //offsetWidth函数是获取整个div的宽度（包括padding值，但是不包括margin
	var cols=Math.floor(document.documentElement.clientWidth/oBoxsW);  //计算一排放几个div容器
	oParent.style.cssText='width:'+oBoxsW*cols+'px;margin:0 auto;'; //设置main样式（对象.style.cssText="XXXXX";
	var hArr=[];  //一整行所有列的高度数组集合
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);     //获取第一行所有列的高度数组集
		}
		else{
		//	console.log(hArr);
			var minH=Math.min.apply(null,hArr);       //找到高度最小的那一列的高度
		//	console.log(minH); 	                
			var index=getMinhIndex(hArr,minH);        //根据高度获得最小高度那一组是第几张图片
		//	console.log(index);
			oBoxs[i].style.position='absolute';         //设置新的一行第一张图片的css样式
			oBoxs[i].style.top=minH+'px';
			 oBoxs[i].style.left=oBoxsW*index+'px';
			// console.log(oBoxsW*index);
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
		// 	console.log(oBoxs[index].offsetLeft);
			hArr[index]=hArr[index]+oBoxs[i].offsetHeight;       //将当前列的高度更新
		}
	}


}

function getByClass(parent,clsName) {
	var boxArr=new Array();   //用来获取全部div=box的容器数组
	var oElements=parent.getElementsByTagName('*'); // “ * ”用来表示所有，即获取所有parent下的元素
	for(var i=0;i<oElements.length;i++){   //遍历整个parent下的所有元素
		if(oElements[i].className==clsName){   //当元素名字为box时，加入box数组
			boxArr.push(oElements[i]);
		}

	}
	return boxArr;
}

function getMinhIndex (arr,val) {
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
	
}

//检测是否具备了滚动条加载数据的条件
function checkScroolSlide () {
	var oParent=document.getElementById('main');   //parent的容器
	var oBoxs=getByClass(oParent,'box');   //将parent中的div=class的容器加入oboxs容器中
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);  //条件高度
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;   //滑动高度
	var height=document.body.clientHeight || document.documentElement.clientHeight;   //窗口高度
//	console.log(lastBoxH);
	return(lastBoxH<scrollTop+height)?true:false;     //判断满足加载新图片条件
}