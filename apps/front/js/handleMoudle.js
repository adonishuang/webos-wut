
let curActive = "query";
let registerCurIndex = 1;
let updateCurIndex = 1;
const queryA = document.getElementById("queryA");
const registerA = document.getElementById("registerA");
const updateA = document.getElementById("updateA");
const deleteA = document.getElementById("deleteA");
queryA.addEventListener("click", () => {
	if(curActive === "query") return;
	document.getElementById(curActive + "A").setAttribute("class", "navA");
	document.getElementById(curActive + "Panel").setAttribute("class", "noneDisplay");
	
	curActive = "query";
	document.getElementById("queryA").setAttribute("class", "navACur");
	document.getElementById("queryPanel").setAttribute("class", "fun-panel");
})
registerA.addEventListener("click", () => {
	if(curActive === "register") return;
	document.getElementById(curActive + "A").setAttribute("class", "navA");
	document.getElementById(curActive + "Panel").setAttribute("class", "noneDisplay");
	
	curActive = "register";
	document.getElementById("registerA").setAttribute("class", "navACur");
	document.getElementById("registerPanel").setAttribute("class", "fun-panel");
})
updateA.addEventListener("click", () => {
	if(curActive === "update") return;
	document.getElementById(curActive + "A").setAttribute("class", "navA");
	document.getElementById(curActive + "Panel").setAttribute("class", "noneDisplay");
	
	curActive = "update";
	document.getElementById("updateA").setAttribute("class", "navACur");
	document.getElementById("updatePanel").setAttribute("class", "fun-panel");
})
deleteA.addEventListener("click", () => {
	if(curActive === "delete") return;
	document.getElementById(curActive + "A").setAttribute("class", "navA");
	document.getElementById(curActive + "Panel").setAttribute("class", "noneDisplay");
	
	curActive = "delete";
	document.getElementById("deleteA").setAttribute("class", "navACur");
	document.getElementById("deletePanel").setAttribute("class", "fun-panel");
})

//初始绑定
document.getElementById("register_valuenum").addEventListener("change",() => {
	let num = document.getElementById("register_valuenum").value;
	let registervalueList = "";
	for (let i = 1; i <= num; i++) {
		registervalueList += '<p class="valueIndex">第' + i + '个标识属性</p>' +
		'<input type="text" id="register_value' + i + '_auth" placeholder="请输入权限码" class="input-item">' +
		'<input type="number" id="register_value' + i + '_index" placeholder="请输入标识属性索引" class="input-item">' +
		'<input type="text" id="register_value' + i + '_type" placeholder="请输入标识属性类型" class="input-item">' +
		'<input type="text" value="string" id="register_value' + i + '_data_format" placeholder="请输入标识属性内容格式" class="input-item">' +
		'<input type="text" id="register_value' + i + '_data_value" placeholder="请输入标识属性内容值" class="input-item">';
	}
	document.getElementById("register_value").innerHTML = registervalueList;
});
document.getElementById("update_valuenum").addEventListener("change",() => {
	let num = document.getElementById("update_valuenum").value;
	let updatevalueList = "";
	for (let i = 1; i <= num; i++) {
		updatevalueList += '<p class="valueIndex">第' + i + '个标识属性</p>' +
		'<input type="text" id="update_value' + i + '_auth" placeholder="请输入权限码" class="input-item">' +
		'<input type="number" id="update_value' + i + '_index" placeholder="请输入标识属性索引" class="input-item">' +
		'<input type="text" id="update_value' + i + '_type" placeholder="请输入标识属性类型" class="input-item">' +
		'<input type="text" value="string" id="update_value' + i + '_data_format" placeholder="请输入标识属性内容格式" class="input-item">' +
		'<input type="text" id="update_value' + i + '_data_value" placeholder="请输入标识属性内容值" class="input-item">';
	}
	document.getElementById("update_value").innerHTML = updatevalueList;
});


document.getElementById("register_handlenum").addEventListener("change",() => {
	let num = document.getElementById("register_handlenum").value;
	if(num == 0) document.getElementById("register_handlenum").value = 1;
	let registerhandleList = "";
	if(num <= 1){
		document.getElementById("register_handletop").setAttribute("class", "noneDisplay");
		
		registerhandleList = 
		'<div style="width: 100%;" id="register_handle_object">'+
			'<input type="text" id="register_handle" placeholder="请输入待注册标识" value="' + in_prefix + '" class="input-item">'+
			'<input type="text" id="register_templateVersion" placeholder="请输入数据模板的产品型号" class="input-item">'+
			'<input type="number" onkeyup="value=value.replace(/[^\d]/g,"")" id="register_valuenum" min="0" placeholder="请输入标识属性的个数" class="input-item">'+
			'<div style="width: 100%;" id="register_value">'+
			'</div>'+
		'</div>';
	}
	else if(num > 1){
		document.getElementById("register_handletop").setAttribute("class", "registerupdate_handletop_div");
	
		for (let i = 1; i <= num; i++) {
			if(i == 1) registerhandleList += '<div style="width: 100%;" id="register_handle_object' + i + '">';
			else registerhandleList += '<div style="display: none;" id="register_handle_object' + i + '">';
			registerhandleList +=
				'<input type="text" id="register_handle' + i + '" placeholder="请输入待注册标识" value="' + in_prefix + '" class="input-item">'+
				'<input type="text" id="register_templateVersion' + i + '" placeholder="请输入数据模板的产品型号" class="input-item">'+
				'<input type="number" onkeyup="value=value.replace(/[^\d]/g,"")" id="register_valuenum' + i + '" min="0" placeholder="请输入标识属性的个数" class="input-item">'+
				'<div style="width: 100%;" id="register_value' + i + '">'+
				'</div>'+
			'</div>';
		}
		document.getElementById("registerTopIndexText").innerHTML = "当前第1个";
		registerCurIndex = 1;
	}
	
	document.getElementById("register_handles").innerHTML = registerhandleList;
	if(num <= 1){
		document.getElementById("register_valuenum").addEventListener("change",() => {
			let num = document.getElementById("register_valuenum").value;
			let registervalueList = "";
			for (let i = 1; i <= num; i++) {
				registervalueList += '<p class="valueIndex">第' + i + '个标识属性</p>' +
				'<input type="text" id="register_value' + i + '_auth" placeholder="请输入权限码" class="input-item">' +
				'<input type="number" id="register_value' + i + '_index" placeholder="请输入标识属性索引" class="input-item">' +
				'<input type="text" id="register_value' + i + '_type" placeholder="请输入标识属性类型" class="input-item">' +
				'<input type="text" value="string" id="register_value' + i + '_data_format" placeholder="请输入标识属性内容格式" class="input-item">' +
				'<input type="text" id="register_value' + i + '_data_value" placeholder="请输入标识属性内容值" class="input-item">';
			}
			document.getElementById("register_value").innerHTML = registervalueList;
		});
	}
	else if(num > 1){
		for (let j = 1; j <= num; j++) {
			document.getElementById("register_valuenum" + j).addEventListener("change",() => {
				let num = document.getElementById("register_valuenum" + j).value;
				let registervalueList = "";
				for (let i = 1; i <= num; i++) {
					registervalueList += '<p class="valueIndex">第' + i + '个标识属性</p>' +
					'<input type="text" id="register' + j + '_value' + i + '_auth" placeholder="请输入权限码" class="input-item">' +
					'<input type="number" id="register' + j + '_value' + i + '_index" placeholder="请输入标识属性索引" class="input-item">' +
					'<input type="text" id="register' + j + '_value' + i + '_type" placeholder="请输入标识属性类型" class="input-item">' +
					'<input type="text" value="string" id="register' + j + '_value' + i + '_data_format" placeholder="请输入标识属性内容格式" class="input-item">' +
					'<input type="text" id="register' + j + '_value' + i + '_data_value" placeholder="请输入标识属性内容值" class="input-item">';
				}
				document.getElementById("register_value" + j).innerHTML = registervalueList;
			});
		}
	}
});

document.getElementById("registerLastA").addEventListener("click",() => {
	if(registerCurIndex > 1){
		document.getElementById("register_handle_object" + registerCurIndex).setAttribute("style", "display: none;");
		registerCurIndex -= 1;
		document.getElementById("registerTopIndexText").innerHTML = "当前第" + registerCurIndex + "个";
		document.getElementById("register_handle_object" + registerCurIndex).setAttribute("style", "width: 100%;");
	}
});
document.getElementById("registerNextA").addEventListener("click",() => {
	if(registerCurIndex < document.getElementById("register_handlenum").value){
		document.getElementById("register_handle_object" + registerCurIndex).setAttribute("style", "display: none;");
		registerCurIndex += 1;
		document.getElementById("registerTopIndexText").innerHTML = "当前第" + registerCurIndex + "个";
		document.getElementById("register_handle_object" + registerCurIndex).setAttribute("style", "width: 100%;");
	}
});

document.getElementById("update_handlenum").addEventListener("change",() => {
	let num = document.getElementById("update_handlenum").value;
	if(num == 0) document.getElementById("update_handlenum").value = 1;
	let updatehandleList = "";
	if(num <= 1){
		document.getElementById("update_handletop").setAttribute("class", "noneDisplay");
		
		updatehandleList = 
		'<div style="width: 100%;" id="update_handle_object">'+
			'<input type="text" id="update_handle" placeholder="请输入待更新标识" value="' + in_prefix + '" class="input-item">'+
			'<input type="text" id="update_templateVersion" placeholder="请输入数据模板的产品型号" class="input-item">'+
			'<input type="number" onkeyup="value=value.replace(/[^\d]/g,"")" id="update_valuenum" min="0" placeholder="请输入标识属性的个数" class="input-item">'+
			'<div style="width: 100%;" id="update_value">'+
			'</div>'+
		'</div>';
	}
	else if(num > 1){
		document.getElementById("update_handletop").setAttribute("class", "registerupdate_handletop_div");
	
		for (let i = 1; i <= num; i++) {
			if(i == 1) updatehandleList += '<div style="width: 100%;" id="update_handle_object' + i + '">';
			else updatehandleList += '<div style="display: none;" id="update_handle_object' + i + '">';
			updatehandleList +=
				'<input type="text" id="update_handle' + i + '" placeholder="请输入待更新标识" value="' + in_prefix + '" class="input-item">'+
				'<input type="text" id="update_templateVersion' + i + '" placeholder="请输入数据模板的产品型号" class="input-item">'+
				'<input type="number" onkeyup="value=value.replace(/[^\d]/g,"")" id="update_valuenum' + i + '" min="0" placeholder="请输入标识属性的个数" class="input-item">'+
				'<div style="width: 100%;" id="update_value' + i + '">'+
				'</div>'+
			'</div>';
		}
		document.getElementById("updateTopIndexText").innerHTML = "当前第1个";
		updateCurIndex = 1;
	}
	
	document.getElementById("update_handles").innerHTML = updatehandleList;
	if(num <= 1){
		document.getElementById("update_valuenum").addEventListener("change",() => {
			let num = document.getElementById("update_valuenum").value;
			let updatevalueList = "";
			for (let i = 1; i <= num; i++) {
				updatevalueList += '<p class="valueIndex">第' + i + '个标识属性</p>' +
				'<input type="text" id="update_value' + i + '_auth" placeholder="请输入权限码" class="input-item">' +
				'<input type="number" id="update_value' + i + '_index" placeholder="请输入标识属性索引" class="input-item">' +
				'<input type="text" id="update_value' + i + '_type" placeholder="请输入标识属性类型" class="input-item">' +
				'<input type="text" value="string" id="update_value' + i + '_data_format" placeholder="请输入标识属性内容格式" class="input-item">' +
				'<input type="text" id="update_value' + i + '_data_value" placeholder="请输入标识属性内容值" class="input-item">';
			}
			document.getElementById("update_value").innerHTML = updatevalueList;
		});
	}
	else if(num > 1){
		for (let j = 1; j <= num; j++) {
			document.getElementById("update_valuenum" + j).addEventListener("change",() => {
				let num = document.getElementById("update_valuenum" + j).value;
				let updatevalueList = "";
				for (let i = 1; i <= num; i++) {
					updatevalueList += '<p class="valueIndex">第' + i + '个标识属性</p>' +
					'<input type="text" id="update' + j + '_value' + i + '_auth" placeholder="请输入权限码" class="input-item">' +
					'<input type="number" id="update' + j + '_value' + i + '_index" placeholder="请输入标识属性索引" class="input-item">' +
					'<input type="text" id="update' + j + '_value' + i + '_type" placeholder="请输入标识属性类型" class="input-item">' +
					'<input type="text" value="string" id="update' + j + '_value' + i + '_data_format" placeholder="请输入标识属性内容格式" class="input-item">' +
					'<input type="text" id="update' + j + '_value' + i + '_data_value" placeholder="请输入标识属性内容值" class="input-item">';
				}
				document.getElementById("update_value" + j).innerHTML = updatevalueList;
			});
		}
	}
});

document.getElementById("updateLastA").addEventListener("click",() => {
	if(updateCurIndex > 1){
		document.getElementById("update_handle_object" + updateCurIndex).setAttribute("style", "display: none;");
		updateCurIndex -= 1;
		document.getElementById("updateTopIndexText").innerHTML = "当前第" + updateCurIndex + "个";
		document.getElementById("update_handle_object" + updateCurIndex).setAttribute("style", "width: 100%;");
	}
});
document.getElementById("updateNextA").addEventListener("click",() => {
	if(updateCurIndex < document.getElementById("update_handlenum").value){
		document.getElementById("update_handle_object" + updateCurIndex).setAttribute("style", "display: none;");
		updateCurIndex += 1;
		document.getElementById("updateTopIndexText").innerHTML = "当前第" + updateCurIndex + "个";
		document.getElementById("update_handle_object" + updateCurIndex).setAttribute("style", "width: 100%;");
	}
});


document.getElementById("delete_handlenum").addEventListener("change",() => {
	let num = document.getElementById("delete_handlenum").value;
	if(num == 0) document.getElementById("delete_handlenum").value = 1;
	let deletehandleList = "";
	if(num <= 1){
		deletehandleList = '<input type="text" id="delete_handle1" placeholder="请输入待删除标识" value="' + in_prefix + '" class="input-item">'
	}
	else if(num > 1)
		for (let i = 1; i <= num; i++) {
			deletehandleList += '<input type="text" id="delete_handle' + i + '" placeholder="请输入第' + i + '个待删除标识" value="' + in_prefix + '" class="input-item">';
		}
	document.getElementById("delete_handles").innerHTML = deletehandleList;
});

const queryBtn = document.getElementById("queryBtn");
const registerBtn = document.getElementById("registerBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
queryBtn.addEventListener("click", () => {
	//查询确定按钮点击触发
	let handle = document.getElementById("query_handle").value;
	//console.log("token",localStorage.getItem("Bearer-token"));
	//console.log(handle);
	xmlHttp.onreadystatechange = function(){
		//complete
		if(xmlHttp.readyState == 4){
			if(xmlHttp.status == 200){
				//请求成功执行的回调函数
				let res = getWantObject(xmlHttp.responseText);
				if(res.status === 1){
					let notString = "查询成功！<br/>前缀: " + res.data.prefix +
					"<br/>标识: " + res.data.handle +
					"<br/>模板版本: " + res.data.templateVersion;
					for(let i = 0; i < res.data.value.length; i++){
						notString += "<br/>第" + (i+1) + "个标识属性:" +
						"<br/>    权限码: " + res.data.value[i].auth +
						"<br/>    标识属性索引: " + res.data.value[i].index +
						"<br/>    标识属性类型: " + res.data.value[i].type +
						"<br/>    标识属性内容格式: " + res.data.value[i].data.format +
						"<br/>    标识属性内容值: " + res.data.value[i].data.value;
					}
					showNotice( notString );
				}
				else{
					showNotice("查询失败！message:" + res.message);
				}
			}else{
				//请求失败的回调函数
				showNotice("请求失败！");
			}
		}
	};
	xmlHttp.open("GET", url_base + "path=identityv2datadetail&method=GET&handle=" + handle , true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});
registerBtn.addEventListener("click", () => {
	//注册确定按钮点击触发
	let handlenum = document.getElementById("register_handlenum").value;
	if(handlenum <= 1){
		let num = document.getElementById("register_valuenum").value;
		if(num === "" || num === null) num = 0;
		var value=new Array(num);
		for(let i = 1; i <= num; i++){
			value[i-1]={
				auth: document.getElementById('register_value' + i + '_auth').value,
				index: Number(document.getElementById('register_value' + i + '_index').value),
				type: document.getElementById('register_value' + i + '_type').value,
				data:{
					format: document.getElementById('register_value' + i + '_data_format').value,
					value: document.getElementById('register_value' + i + '_data_value').value,
				}
			}
		};
		let obj = {
			handle: document.getElementById("register_handle").value,
			templateVersion: document.getElementById("register_templateVersion").value,
			value: value
		};
		//console.log("token",localStorage.getItem("Bearer-token"));
		//console.log(obj);
		xmlHttp.onreadystatechange = function(){
			//complete
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					//请求成功执行的回调函数
					let res = getWantObject(xmlHttp.responseText);
					if(res.status === 1){
						showNotice( "注册成功！" );
					}
					else{
						showNotice("注册失败！message:" + res.message);
					}
				}else{
					//请求失败的回调函数
					showNotice("请求失败！");
				}
			}
		};
		xmlHttp.open("GET", url_base + "path=identityv2data&method=POST&json=" + JSON.stringify(obj), true);
		xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
		xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
		xmlHttp.send();
	}
	else{
		//批量
		var handleobjs=new Array(handlenum);
		for(let j = 1; j <= handlenum; j++){
			let num = document.getElementById("register_valuenum" + j).value;
			if(num === "" || num === null) num = 0;
			var value=new Array(num);
			for(let i = 1; i <= num; i++){
				value[i-1]={
					auth: document.getElementById('register' + j + '_value' + i + '_auth').value,
					index: Number(document.getElementById('register' + j + '_value' + i + '_index').value),
					type: document.getElementById('register' + j + '_value' + i + '_type').value,
					data:{
						format: document.getElementById('register' + j + '_value' + i + '_data_format').value,
						value: document.getElementById('register' + j + '_value' + i + '_data_value').value,
					}
				}
			};
			handleobjs[j-1] = {
				handle: document.getElementById("register_handle" + j).value,
				templateVersion: document.getElementById("register_templateVersion" + j).value,
				value: value
			};
		}
		//console.log(handleobjs);
		xmlHttp.onreadystatechange = function(){
			//complete
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					//请求成功执行的回调函数
					let res = getWantObject(xmlHttp.responseText);
					if(res.status === 1){
						let dataList = res.data;
						let noticeTemp = "";
						
						for(let i=0; i<dataList.length; i++){
							if(i != 0) noticeTemp += ";<br/>";
							if(dataList[i].msg === "success")
								noticeTemp += dataList[i].handle + "注册成功";
							else
								noticeTemp += dataList[i].handle + "注册失败，" + dataList[i].msg;
						}
						noticeTemp += "。";
						showNotice( noticeTemp );
					}
					else{
						showNotice("注册失败！message:" + res.message);
					}
				}else{
					//请求失败的回调函数
					showNotice("请求失败！");
				}
			}
		};
		xmlHttp.open("GET", url_base + "path=identityv2databatchCreate&method=POST&json=" + JSON.stringify(handleobjs), true);
		xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
		xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
		xmlHttp.send();
	}
	
});
updateBtn.addEventListener("click", () => {
	//更新确定按钮点击触发
	let handlenum = document.getElementById("update_handlenum").value;
	if(handlenum <= 1){
		let num = document.getElementById("update_valuenum").value;
		if(num === "" || num === null) num = 0;
		var value=new Array(num);
		for(let i = 1; i <= num; i++){
			value[i-1]={
				auth: document.getElementById('update_value' + i + '_auth').value,
				index: Number(document.getElementById('update_value' + i + '_index').value),
				type: document.getElementById('update_value' + i + '_type').value,
				data:{
					format: document.getElementById('update_value' + i + '_data_format').value,
					value: document.getElementById('update_value' + i + '_data_value').value,
				}
			}
		};
		let obj = {
			handle: document.getElementById("update_handle").value,
			templateVersion: document.getElementById("update_templateVersion").value,
			value: value
		};
		//console.log("token",localStorage.getItem("Bearer-token"));
		console.log(obj);
		xmlHttp.onreadystatechange = function(){
			//complete
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					//请求成功执行的回调函数
					let res = getWantObject(xmlHttp.responseText);
					if(res.status === 1){
						showNotice( "更新成功！" );
					}
					else{
						showNotice("更新失败！message:" + res.message);
					}
				}else{
					//请求失败的回调函数
					showNotice("请求失败！");
				}
			}
		};
		xmlHttp.open("GET", url_base + "path=identityv2data&method=PUT&json=" + JSON.stringify(obj), true);
		xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
		xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
		xmlHttp.send();
	}
	else{
		//批量
		var handleobjs=new Array(handlenum);
		for(let j = 1; j <= handlenum; j++){
			let num = document.getElementById("update_valuenum" + j).value;
			if(num === "" || num === null) num = 0;
			var value=new Array(num);
			for(let i = 1; i <= num; i++){
				value[i-1]={
					auth: document.getElementById('update' + j + '_value' + i + '_auth').value,
					index: Number(document.getElementById('update' + j + '_value' + i + '_index').value),
					type: document.getElementById('update' + j + '_value' + i + '_type').value,
					data:{
						format: document.getElementById('update' + j + '_value' + i + '_data_format').value,
						value: document.getElementById('update' + j + '_value' + i + '_data_value').value,
					}
				}
			};
			handleobjs[j-1] = {
				handle: document.getElementById("update_handle" + j).value,
				templateVersion: document.getElementById("update_templateVersion" + j).value,
				value: value
			};
		}
		console.log(handleobjs);
		xmlHttp.onreadystatechange = function(){
			//complete
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					//请求成功执行的回调函数
					let res = getWantObject(xmlHttp.responseText);
					if(res.status === 1){
						let dataList = res.data;
						let noticeTemp = "";
						
						for(let i=0; i<dataList.length; i++){
							if(i != 0) noticeTemp += ";<br/>";
							if(dataList[i].msg === "success")
								noticeTemp += dataList[i].handle + "更新成功";
							else
								noticeTemp += dataList[i].handle + "更新失败，" + dataList[i].msg;
						}
						noticeTemp += "。";
						showNotice( noticeTemp );
					}
					else{
						showNotice("更新失败！message:" + res.message);
					}
				}else{
					//请求失败的回调函数
					showNotice("请求失败！");
				}
			}
		};
		xmlHttp.open("GET", url_base + "path=identityv2databatchUpdate&method=PUT&json=" + JSON.stringify(handleobjs), true);
		xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
		xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
		xmlHttp.send();
	}
});
deleteBtn.addEventListener("click", () => {
	//删除确定按钮点击触发
	let num = document.getElementById("delete_handlenum").value;
	
	if(num <= 1){
		let handle = document.getElementById("delete_handle1").value;
		let obj = {handle: handle};
		//console.log("token",localStorage.getItem("Bearer-token"));
		//console.log(handle);
		xmlHttp.onreadystatechange = function(){
			//complete
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					//请求成功执行的回调函数
					let res = getWantObject(xmlHttp.responseText);
					if(res.status === 1){
						showNotice( "删除成功！" );
					}
					else{
						showNotice("删除失败！message:" + res.message);
					}
				}else{
					//请求失败的回调函数
					showNotice("请求失败！");
				}
			}
		};
		xmlHttp.open("GET", url_base + "path=identityv2data&method=DELETE&json=" + JSON.stringify(obj), true);
		xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
		xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
		xmlHttp.send();
	}
	else if(num > 1){
		var handles=new Array(num);
		for(let i = 1; i <= num; i++)
			handles[i-1] = document.getElementById("delete_handle" + i).value;
		//console.log("token",localStorage.getItem("Bearer-token"));
		//console.log(handles);
		xmlHttp.onreadystatechange = function(){
			//complete
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					//请求成功执行的回调函数
					let res = getWantObject(xmlHttp.responseText);
					if(res.status === 1){
						let dataList = res.data;
						let noticeTemp = "";
						
						for(let i=0; i<dataList.length; i++){
							if(i != 0) noticeTemp += ";<br/>";
							if(dataList[i].code === 1)
								noticeTemp += dataList[i].handle + "删除成功";
							else
								noticeTemp += dataList[i].handle + "删除失败，" + dataList[i].msg;
						}
						noticeTemp += "。";
						showNotice( noticeTemp );
					}
					else{
						showNotice("删除失败！message:" + res.message);
					}
				}else{
					//请求失败的回调函数
					showNotice("请求失败！");
				}
			}
		};
		xmlHttp.open("GET", url_base + "path=identityv2databatchDelete&method=DELETE&json=" + JSON.stringify(handles), true);
		xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
		xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
		xmlHttp.send();
	}
	
});
