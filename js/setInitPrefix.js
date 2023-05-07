let in_prefix = "";
if(external_prefix)
	in_prefix = external_prefix;
if(in_prefix && in_prefix != ""){
	if(document.getElementById("query_handle"))
		document.getElementById("query_handle").value = in_prefix;
	if(document.getElementById("register_handle"))
		document.getElementById("register_handle").value = in_prefix;
	if(document.getElementById("update_handle"))
		document.getElementById("update_handle").value = in_prefix;
	if(document.getElementById("delete_handle1"))
		document.getElementById("delete_handle1").value = in_prefix;
	if(document.getElementById("query_prefix-template"))
		document.getElementById("query_prefix-template").value = in_prefix;
	if(document.getElementById("save_prefix-template"))
		document.getElementById("save_prefix-template").value = in_prefix;
	if(document.getElementById("delete_prefix-template"))
		document.getElementById("delete_prefix-template").value = in_prefix;
		
	if(document.getElementById("register_entApply_entPrefix-ent"))
		document.getElementById("register_entApply_entPrefix-ent").value = in_prefix;
	if(document.getElementById("config_entPrefixConfig_entPrefix-ent"))
		document.getElementById("config_entPrefixConfig_entPrefix-ent").value = in_prefix;
	if(document.getElementById("configWithout_entPrefixConfig_entPrefix-ent"))
		document.getElementById("configWithout_entPrefixConfig_entPrefix-ent").value = in_prefix;
	if(document.getElementById("queryPrefix_prefix-ent"))
		document.getElementById("queryPrefix_prefix-ent").value = in_prefix;
}