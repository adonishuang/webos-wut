
let template_curActive = "query";

const template_queryA = document.getElementById("queryA-template");
const template_saveA = document.getElementById("saveA-template");
const template_deleteA = document.getElementById("deleteA-template");
template_queryA.addEventListener("click", () => {
	if(template_curActive === "query") return;
	document.getElementById(template_curActive + "A-template").setAttribute("class", "navA");
	document.getElementById(template_curActive + "Panel-template").setAttribute("class", "noneDisplay");
	
	template_curActive = "query";
	document.getElementById("queryA-template").setAttribute("class", "navACur");
	document.getElementById("queryPanel-template").setAttribute("class", "fun-panel");
})
template_saveA.addEventListener("click", () => {
	if(template_curActive === "save") return;
	document.getElementById(template_curActive + "A-template").setAttribute("class", "navA");
	document.getElementById(template_curActive + "Panel-template").setAttribute("class", "noneDisplay");
	
	template_curActive = "save";
	document.getElementById("saveA-template").setAttribute("class", "navACur");
	document.getElementById("savePanel-template").setAttribute("class", "fun-panel");
})
template_deleteA.addEventListener("click", () => {
	if(template_curActive === "delete") return;
	document.getElementById(template_curActive + "A-template").setAttribute("class", "navA");
	document.getElementById(template_curActive + "Panel-template").setAttribute("class", "noneDisplay");
	
	template_curActive = "delete";
	document.getElementById("deleteA-template").setAttribute("class", "navACur");
	document.getElementById("deletePanel-template").setAttribute("class", "fun-panel");
})

document.getElementById("save_itemnum-template").addEventListener("change",() => {
	let num = document.getElementById("save_itemnum-template").value;
	let saveItemList = "";
	for (let i = 1; i <= num; i++) {
		saveItemList += '<p class="valueIndex">第' + i + '个模板内容条目</p>' +
		'<input type="text" id="save_item' + i + '_name-template" placeholder="请输入中文名称" class="input-item">' +
		'<input type="text" id="save_item' + i + '_idType-template" placeholder="请输入英文名称" class="input-item">' +
		'<div class="myradio-panel">'+
			'<input type="radio" name="save_item' + i + '_required_name-template" id="save_item' + i + '_required_no-template" checked=checked />' +
			'<label for="save_item' + i + '_required_no-template">非必填</label>' +
			'<input type="radio" name="save_item' + i + '_required_name-template" id="save_item' + i + '_required_yes-template"/>' +
			'<label for="save_item' + i + '_required_yes-template">必填</label> ' +
		'</div>'+
		'<input type="text" value="string" id="save_item' + i + '_metadata_type-template" placeholder="请输入数据类型限制" class="input-item">' +
		'<input type="number" id="save_item' + i + '_metadata_minLength-template" placeholder="请输入最小长度限制" class="input-item">' +
		'<input type="number" id="save_item' + i + '_metadata_maxLength-template" placeholder="请输入最大长度限制" class="input-item">' ;
	}
	document.getElementById("save_items-template").innerHTML = saveItemList;
});


const template_queryBtn = document.getElementById("queryBtn-template");
const template_saveBtn = document.getElementById("saveBtn-template");
const template_deleteBtn = document.getElementById("deleteBtn-template");
template_queryBtn.addEventListener("click", () => {
	//查询确定按钮点击触发
	let prefix = document.getElementById("query_prefix-template").value;
	let version = document.getElementById("query_version-template").value;
	//console.log("token",localStorage.getItem("Bearer-token"));
	//console.log(prefix);
	//console.log(version);
	xmlHttp.onreadystatechange = function(){
		//complete
		if(xmlHttp.readyState == 4){
			if(xmlHttp.status == 200){
				//请求成功执行的回调函数
				let res = getWantObject(xmlHttp.responseText);
				if(res.status === 1){
					let notString = "查询成功！<br/>前缀: " + res.data.prefix +
					"<br/>模板版本: " + res.data.version +
					"<br/>描述: " + res.data.description;
					for(let i = 0; i < res.data.items.length; i++){
						notString += "<br/>第" + (i+1) + "个模板内容条目:" +
						"<br/>    权限码: " + res.data.items[i].authorizationKey +
						"<br/>    索引: " + res.data.items[i].idIndex +
						"<br/>    英文名称: " + res.data.items[i].idType +
						"<br/>    中文名称: " + res.data.items[i].name +
						"<br/>    是否必填项: " + res.data.items[i].required +
						"<br/>    数据类型限制: " + res.data.items[i].metadata.type +
						"<br/>    最小长度限制: " + res.data.items[i].metadata.minLength +
						"<br/>    最大长度限制: " + res.data.items[i].metadata.maxLength;
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
	xmlHttp.open("GET", url_base + "path=snmsapitemplatev1&method=GET&prefix=" + prefix + "&version=" + version , true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});
template_saveBtn.addEventListener("click", () => {
	//保存确定按钮点击触发
	let num = document.getElementById("save_itemnum-template").value;
	if(num === "" || num === null) num = 0;
	var items=new Array(num);
	for(let i = 1; i <= num; i++){
		items[i-1]={
			name: document.getElementById('save_item' + i + '_name-template').value,
			idType: document.getElementById('save_item' + i + '_idType-template').value,
			required: document.getElementById('save_item' + i + '_required_yes-template').checked,
			metadata:{
				type:document.getElementById('save_item' + i + '_metadata_type-template').value,
				minLength: Number(document.getElementById('save_item' + i + '_metadata_minLength-template').value),
				maxLength: Number(document.getElementById('save_item' + i + '_metadata_maxLength-template').value),
			}
		}
	};
	let obj = {
		prefix: document.getElementById("save_prefix-template").value,
		version: document.getElementById("save_version-template").value,
		description: document.getElementById("save_description-template").value,
		items: items
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
					showNotice( "保存成功！" );
				}
				else{
					showNotice("保存失败！message:" + res.message);
				}
			}else{
				//请求失败的回调函数
				showNotice("请求失败！");
			}
		}
	};
	xmlHttp.open("GET", url_base + "path=snmsapitemplatev1&method=POST&json=" + JSON.stringify(obj), true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});
template_deleteBtn.addEventListener("click", () => {
	//删除确定按钮点击触发
	let prefix = document.getElementById("delete_prefix-template").value;
	let version = document.getElementById("delete_version-template").value;
	let obj = {
		prefix: prefix,
		version: version
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
	xmlHttp.open("GET", url_base + "path=snmsapitemplatev1&method=DELETE&json=" + JSON.stringify(obj), true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});
