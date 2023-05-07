let ent_curActive = "register";

const ent_registerA = document.getElementById("registerA-ent");
const ent_configA = document.getElementById("configA-ent");
const ent_configWithoutA = document.getElementById("configWithoutA-ent");
const ent_queryPrefixA = document.getElementById("queryPrefixA-ent");

ent_registerA.addEventListener("click", () => {
	if(ent_curActive === "register") return;
	document.getElementById(ent_curActive + "A-ent").setAttribute("class", "navA");
	document.getElementById(ent_curActive + "Panel-ent").setAttribute("class", "noneDisplay");
	
	ent_curActive = "register";
	document.getElementById("registerA-ent").setAttribute("class", "navACur");
	document.getElementById("registerPanel-ent").setAttribute("class", "fun-panel");
});
ent_configA.addEventListener("click", () => {
	if(ent_curActive === "config") return;
	document.getElementById(ent_curActive + "A-ent").setAttribute("class", "navA");
	document.getElementById(ent_curActive + "Panel-ent").setAttribute("class", "noneDisplay");
	
	ent_curActive = "config";
	document.getElementById("configA-ent").setAttribute("class", "navACur");
	document.getElementById("configPanel-ent").setAttribute("class", "fun-panel");
});
ent_configWithoutA.addEventListener("click", () => {
	if(ent_curActive === "configWithout") return;
	document.getElementById(ent_curActive + "A-ent").setAttribute("class", "navA");
	document.getElementById(ent_curActive + "Panel-ent").setAttribute("class", "noneDisplay");
	
	ent_curActive = "configWithout";
	document.getElementById("configWithoutA-ent").setAttribute("class", "navACur");
	document.getElementById("configWithoutPanel-ent").setAttribute("class", "fun-panel");
});
ent_queryPrefixA.addEventListener("click", () => {
	if(ent_curActive === "queryPrefix") return;
	document.getElementById(ent_curActive + "A-ent").setAttribute("class", "navA");
	document.getElementById(ent_curActive + "Panel-ent").setAttribute("class", "noneDisplay");
	
	ent_curActive = "queryPrefix";
	document.getElementById("queryPrefixA-ent").setAttribute("class", "navACur");
	document.getElementById("queryPrefixPanel-ent").setAttribute("class", "fun-panel");
});

const ent_registerBtn = document.getElementById("registerBtn-ent");
const ent_configBtn = document.getElementById("configBtn-ent");
const ent_configWithoutBtn = document.getElementById("configWithoutBtn-ent");
const ent_queryPrefixBtn = document.getElementById("queryPrefixBtn-ent");

ent_registerBtn.addEventListener("click", () => {
	let obj={
		sysUser:{
			userName: document.getElementById("register_sysUser_userName-ent").value,
			password: SHA256(document.getElementById("register_sysUser_password-ent").value),
			mobile: document.getElementById("register_sysUser_mobile-ent").value,
			email: document.getElementById("register_sysUser_email-ent").value,
			remarks: document.getElementById("register_sysUser_remarks-ent").value,
		},
		entApply:{
			entPrefix: document.getElementById("register_entApply_entPrefix-ent").value,
			entNameCn: document.getElementById("register_entApply_entNameCn-ent").value,
			entType: document.getElementById("register_entApply_entType-ent").value,
			entCrtCode: document.getElementById("register_entApply_entCrtCode-ent").value,
			entIndustry: document.getElementById("register_entApply_entIndustry-ent").value,
			entTrade: document.getElementById("register_entApply_entTrade-ent").value,
			entProvinceCode: document.getElementById("register_entApply_entProvinceCode-ent").value,
			entCityCode: document.getElementById("register_entApply_entCityCode-ent").value,
			entCountyCode: document.getElementById("register_entApply_entCountyCode-ent").value,
			entAddrCn: document.getElementById("register_entApply_entAddrCn-ent").value,
			entCrtType: document.getElementById("register_entApply_entCrtType-ent").value,
			entCrtImgContent: ent_register_entApply_entCrtImgContent_base64,
			entWebSite: document.getElementById("register_entApply_entWebSite-ent").value,
			email: document.getElementById("register_entApply_email-ent").value,
			entDesc: document.getElementById("register_entApply_entDesc-ent").value,
			legalpName: document.getElementById("register_entApply_legalpName-ent").value,
			legalpIdtype: document.getElementById("register_entApply_legalpIdtype-ent").value,
			legalpIdno: document.getElementById("register_entApply_legalpIdno-ent").value,
			legalpIdImgBackContent: ent_register_entApply_legalpIdImgBackContent_base64,
			legalpIdImgFrontContent: ent_register_entApply_legalpIdImgFrontContent_base64,
			contactName: document.getElementById("register_entApply_contactName-ent").value,
			mobile: document.getElementById("register_entApply_mobile-ent").value,
			remarks: document.getElementById("register_entApply_remarks-ent").value,
		}
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
					showNotice("注册成功！");
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
	xmlHttp.open("GET", url_base + "path=snmsapientapply&method=POST&json=" + JSON.stringify(obj), true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});
ent_configBtn.addEventListener("click", () => {
	let obj={
		proxyServerId: Number(document.getElementById("config_proxyServerId-ent").value),
		entPrefixConfig: {
			entPrefix: document.getElementById("config_entPrefixConfig_entPrefix-ent").value,
		}
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
					showNotice("配置成功！");
				}
				else{
					showNotice("配置失败！message:" + res.message);
				}
			}else{
				//请求失败的回调函数
				showNotice("请求失败！");
			}
		}
	};
	xmlHttp.open("GET", url_base + "path=snmsapientconfig&method=POST&json=" + JSON.stringify(obj), true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});
ent_configWithoutBtn.addEventListener("click", () => {
	let obj={
		entPrefixConfig: {
			entPrefix: document.getElementById("configWithout_entPrefixConfig_entPrefix-ent").value,
			hdlType: document.getElementById("configWithout_entPrefixConfig_hdlType-ent").value,
			httpPort: document.getElementById("configWithout_entPrefixConfig_httpPort-ent").value,
			ipType: document.getElementById("configWithout_entPrefixConfig_ipType_V4-ent").checked ? 4 : 6,
			ip: document.getElementById("configWithout_entPrefixConfig_ip-ent").value,
			tcpPort: document.getElementById("configWithout_entPrefixConfig_tcpPort-ent").value,
			udpPort: document.getElementById("configWithout_entPrefixConfig_udpPort-ent").value,
		}
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
					showNotice("配置成功！");
				}
				else{
					showNotice("配置失败！message:" + res.message);
				}
			}else{
				//请求失败的回调函数
				showNotice("请求失败！");
			}
		}
	};
	xmlHttp.open("GET", url_base + "path=snmsapientconfig&method=POST&json=" + JSON.stringify(obj), true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});
ent_queryPrefixBtn.addEventListener("click", () => {
	//查询确定按钮点击触发
	let prefix = document.getElementById("queryPrefix_prefix-ent").value;
	//console.log("token",localStorage.getItem("Bearer-token"));
	//console.log(prefix);
	
	xmlHttp.onreadystatechange = function(){
		//complete
		if(xmlHttp.readyState == 4){
			if(xmlHttp.status == 200){
				//请求成功执行的回调函数
				let res = getWantObject(xmlHttp.responseText);
				if(res.status === 1){
					let notString = "查询成功！<br/>前缀名称: " + res.data.prefix +
					"<br/>前缀创建时间: " + res.data.createDate +
					"<br/>前缀注册服务机构: " + res.data.ghrName +
					"<br/>前缀状态: " ;
					if(res.data.status == 0) notString += " 停用";
					else if(res.data.status == 1) notString += " 启用";
					else if(res.data.status == 2) notString += " 待删除";
					else if(res.data.status == 3) notString += " 被驳回";
					else if(res.data.status == 4) notString += " 待审核";
					else if(res.data.status == 5) notString += " 审核中";
					else notString += " 错误";
					notString += "<br/>企业中文名称: " + res.data.entNameCn +
					"<br/>企业官方地址: " + res.data.entWebSite +
					"<br/>企业所属行业: " + res.data.entIndustry +
					"<br/>企业中文地址: " + res.data.entAddrCn +
					"<br/>企业简介: " + res.data.entDesc;
					
					showNotice( notString );
				}
				else{
					showNotice("查询失败！message: " + res.message);
				}
			}else{
				//请求失败的回调函数
				showNotice("请求失败！");
			}
		}
	};
	xmlHttp.open("GET", url_base + "path=snmsapiprefixquery&method=GET&prefix=" + prefix, true);
	xmlHttp.setRequestHeader("Content-Type","application/json");  //用POST的时候一定要有这句
	xmlHttp.setRequestHeader("authorization",localStorage.getItem("Bearer-token"));
	xmlHttp.send();
});

let ent_register_entApply_entCrtImgContent_base64 = "";
let ent_register_entApply_legalpIdImgBackContent_base64 = "";
let ent_register_entApply_legalpIdImgFrontContent_base64 = "";
const ent_register_entApply_entCrtImgContent = document.getElementById("register_entApply_entCrtImgContent-ent");
const ent_register_entApply_legalpIdImgBackContent = document.getElementById("register_entApply_legalpIdImgBackContent-ent");
const ent_register_entApply_legalpIdImgFrontContent = document.getElementById("register_entApply_legalpIdImgFrontContent-ent");
ent_register_entApply_entCrtImgContent.addEventListener('change', function() {
	if (!ent_register_entApply_entCrtImgContent.value) {
		showNotice('没有选择文件！');
		return;
	}
	let file = ent_register_entApply_entCrtImgContent.files[0];
	let size = file.size;
	if (size > 1 * 1024 * 1024) {
		showNotice('图片大小超出1M限制！');
		ent_register_entApply_entCrtImgContent.value = null;
		return ;
	}
	// 获取File信息:
	//info.innerHTML = `文件名称:  + ${file.name}<br>文件大小: ${file.size} <br>上传时间: ${file.lastModifiedDate}`;
	if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
		showNotice('不是有效的图片文件！');
		ent_register_entApply_entCrtImgContent.value = null;
		return;
	}
	
	// 读取文件:
	let reader = new FileReader();
	reader.onload = function(e) {
		ent_register_entApply_entCrtImgContent_base64 = e.target.result;
	};
	reader.readAsDataURL(file);
});
ent_register_entApply_legalpIdImgBackContent.addEventListener('change', function() {
	if (!ent_register_entApply_legalpIdImgBackContent.value) {
		showNotice('没有选择文件！');
		return;
	}
	let file = ent_register_entApply_legalpIdImgBackContent.files[0];
	let size = file.size;
	if (size > 1 * 1024 * 1024) {
		showNotice('图片大小超出1M限制！');
		ent_register_entApply_legalpIdImgBackContent.value = null;
		return ;
	}
	// 获取File信息:
	//info.innerHTML = `文件名称:  + ${file.name}<br>文件大小: ${file.size} <br>上传时间: ${file.lastModifiedDate}`;
	if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
		showNotice('不是有效的图片文件！');
		ent_register_entApply_legalpIdImgBackContent.value = null;
		return;
	}
	
	// 读取文件:
	let reader = new FileReader();
	reader.onload = function(e) {
		ent_register_entApply_legalpIdImgBackContent_base64 = e.target.result;
	};
	reader.readAsDataURL(file);
});
ent_register_entApply_legalpIdImgFrontContent.addEventListener('change', function() {
	if (!ent_register_entApply_legalpIdImgFrontContent.value) {
		showNotice('没有选择文件！');
		return;
	}
	let file = ent_register_entApply_legalpIdImgFrontContent.files[0];
	let size = file.size;
	if (size > 1 * 1024 * 1024) {
		showNotice('图片大小超出1M限制！');
		ent_register_entApply_legalpIdImgFrontContent.value = null;
		return ;
	}
	// 获取File信息:
	//info.innerHTML = `文件名称:  + ${file.name}<br>文件大小: ${file.size} <br>上传时间: ${file.lastModifiedDate}`;
	if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
		showNotice('不是有效的图片文件！');
		ent_register_entApply_legalpIdImgFrontContent.value = null;
		return;
	}
	
	// 读取文件:
	let reader = new FileReader();
	reader.onload = function(e) {
		ent_register_entApply_legalpIdImgFrontContent_base64 = e.target.result;
	};
	reader.readAsDataURL(file);
});