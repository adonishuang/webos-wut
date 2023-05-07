const url_base = "http://111.4.83.60:10001/apiTest?"
let xmlHttp = null;
window.onload=function(){
	//创建 XMLHttpRequest 对象，老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
	if(xmlHttp == null){
		if(window.XMLHttpRequest){
			//code for all new browsers
			xmlHttp = new XMLHttpRequest();
		}else if(window.ActiveXObject){
			//code for IE5 and IE6
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	//判断是否支持请求
	if(xmlHttp == null){
		alert("浏览器不支持xmlHttp");
	}
}

function getWantObject(tem){
    return JSON.parse(tem);
}

