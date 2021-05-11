/**公用js方法*/

/**
 * ajax处理页面显示时，调用
 */
function isNull(valItem){
    if(valItem==null||valItem=='null'){
        valItem="";
    }
    return valItem;
}
/**
 * 判断字符串是否为空，空返回true
 *
 * @param str
 * @returns {Boolean}空返回true
 */
function checkStrIsNull(str) {

    return str==null ||  $.trim(str)=="" || $.trim(str)=="null";

   /* if (str != null && str != undefined && $.trim(str) != "" && $.trim(str) != "null" && $.trim(str) != "undefined" ) {
        return false;
    } else {
        return true;
    }*/
}
/**
 * 下拉框显示被选中的值
 * checkValue 选择的值
 * selectedId 下拉框id
 * defaultValue 下拉框默认值
 */
function checkSelectedShow(checkValue,selectedId,defaultValue){
    if(!checkStrIsNull(checkValue)){
        document.getElementById(selectedId).value=checkValue;
    }else{
        document.getElementById(selectedId).value=defaultValue;
    }
};
/**
 * 复选框回显
 * @param name name属性
 * @param value value值
 */
function showSelectedcheckbox(name, value){
    // 把真正的radio选中
    $("input[type=checkbox][name='" + name + "'][value='" + value + "']").prop("checked",true);
    $("input[type=checkbox][name='" + name + "'][value='" + value + "']").parent().removeClass("checkbox");
    $("input[type=checkbox][name='" + name + "'][value='" + value + "']").parent().addClass("checkbox checkbox1");
}
/**
 * 获取地址栏某个参数的值
 * @param name 参数名称
 * @returns 参数值
 */
function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

// 多选select 数据初始化
function chose_mult_set_ini(select, values){
    checkSelecedShows(values, select);
}
/**
 * 下拉框多选显示被选中的值
 * @param checkValue 选择的值
 * @param selectedId 下拉框id
 */
function checkSelecedShows(checkValue, selectedId) {
    if (checkValue != '' && checkValue != "null") {
        var qwyList = checkValue.split(",");
        for (var i = 0; i < qwyList.length; i++) {
            var maNum = qwyList[i].replace(/ /g, "");
            $(selectedId + " option" ).each(function() {
                if (maNum == $(this).val()) {
                    $(this).attr("selected", true);
                }
            });
        }
        $(selectedId).trigger("chosen:updated");
    }else{
        $(selectedId + " option" ).each(function() {
            $(this).attr("selected", false);
        });
        $(selectedId).trigger("chosen:updated");
    }

}

/**
 * 下拉列表赋值,渲染
 * @param id 下拉列表的id
 * @param list 数据
 * @param key option的值,list对象的属性 例如 "id"
 * @param value option显示的值 list对象的属性 例如:"stuName"
 * @returns
 */
function setCheckSelecedMultiple(id,list,key,value){
    $("#"+id).chosen("destroy");
    $("#"+id).html("");
    $.each(list,function(i){
        $("<option value='"+list[i][key]+"'>"+list[i][value]+"</option>").appendTo("#"+id);
    });
    $("#"+id).attr("multiple",true);
    $("#"+id).chosen({
        no_results_text : "未找到此选项!",
    });
}

/**
 * 公用界面跳转 查询方法
 * @param type open：打开新窗口，href：当前界面打开url，close：返回父界面查询刷新，默认是：form表单查询 ,reload:刷新当前界面
 * @param id form表单查询的 form  id
 * @param url 访问地址
 * @param contentText 弹出层 提示
 */
function submitUtils(type,id,url,contentText){
    if(type=="open_not_ale"){

    }else{
        show_query_hint(contentText);
        //刷新父级页面
        parent.location.reload();
    }
    if(url!=''){
        if(url.indexOf("?")>-1){
        }else{
            url = url +"?";
        }
        if(url.indexOf("fatherId")>-1){
        }else{
            url = url +"&fatherId="+GetQueryString("fatherId");
        }
        if(url.indexOf("fatherZxId")>-1){
        }else{
            url = url +"&fatherZxId="+GetQueryString("fatherZxId");
        }
        if(url.indexOf("ruleId")>-1){
        }else{
            url = url +"&ruleId="+GetQueryString("ruleId");
        }
        if(url.indexOf("fpType")>-1){
        }else{
            url = url +"&fpType="+GetQueryString("fpType");
        }
        if(url.indexOf("yesr_id")>-1){
        }else{
            url = url +"&yesr_id="+GetQueryString("yesr_id");
        }
    }
    if(type=="open" || type=="open_not_ale"){
        // 打开新窗口
        window.open(url);
    }else if(type=="href"){
        // 当前界面打开url
        window.location.href=url;
    }else if(type=="close"){
        // 返回父界面查询刷新
        window.opener.location.href = window.opener.location.href;
        window.close();
    }else if(type=="reload"){
        // 刷新当前界面
        window.location.reload(true);
    }else{
        // form表单查询
        $("#"+id).attr("action",url);
        $("#"+id).submit();
    }
}

/**
 * 取地址栏的参数值
 * name 参数名称
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    /*console.log(window.location.search.substr(1));
    console.log("r的值:"+r);
    console.log("r[2]解码前的值:"+r[2]);
    console.log("r[2]解码后的值:"+unescape(r[2]));*/
    //if(r!=null)return  unescape(r[2]); return null;
    if(r!=null)return  decodeURIComponent(r[2]); return null;

}
/**
 * 获得绝对路径
 *
 * @returns
 */
function getRootPath() {
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    // 获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    // 获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName
        .substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
/**
 * 判断时间大小
 * @param starttime
 * @param endtime
 * @returns {Boolean} false表示endtime大于starttime
 */
function checkDate(starttime,endtime) {
//  var endtime = $('#txtStorageTimeEnd').val();
//  var starttime = $('#txtStorageTimeStart').val();
    var start = new Date(starttime.replace("-", "/").replace("-", "/"));
    var end = new Date(endtime.replace("-", "/").replace("-", "/"));
    if (end < start) {
        return false;
    }
    else {
        return true;
    }
}


/**
 * 字符串数组去重
 * @param arr 待去重的数组
 * @returns去重后的数组
 */
function removeRepeatStrArr(arr){
    //传入的参数为空，或者不是数组，返回一个空的数组
    if(checkStrIsNull(arr) || !arr instanceof Array){
        return [];
    }
    var newArr = [];
    var len = arr.length;
    for(var i=0; i<len; i++){
        if(newArr.indexOf(arr[i])==-1){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
/**
 * 对象数组去重
 * @param arr 待去重的数组
 * @returns 去重后的数组
 */
function removeRepeatObjArr(arr){
    //传入的参数为空，或者不是数组，返回一个空的数组
    if(checkStrIsNull(arr) || !arr instanceof Array){
        return [];
    }
    var result = [];
    var obj = {};
    for(var i =0; i<arr.length; i++){
        if(!obj[arr[i].key]){
            result.push(arr[i]);
            obj[arr[i].key] = true;
        }
    }
    return result;
}
/**
 * 将数组转成用分割符拼装的字符串
 * @param arr 数组
 * @param split 分割符
 * @returns
 */
function arrToSplitStr(arr,split){
    //传入的参数为空
    if(checkStrIsNull(arr) || checkStrIsNull(split)){
        return "";
    }
    //不是数组
    if(!(arr instanceof Array)){
        return "";
    }
    //不是字符串
    if(typeof split!='string'){
        return "";
    }
    //要返回的字符串
    var str="";
    for(var i=0;i<arr.length;i++){
        str+=arr[i]+split;
    }
    //去掉最后一个分割符
    str=str.substr(0, str.length - 1);

    return str;
}

/**
 * 根据显示位数获取新的字符串(英文占1位,中文占2位)
 *@param str 旧的字符串
 *@param weishu 要显示的位数
 */
function getNewStr(str,weishu) {
    var len = 0;
    var reallen = 0;
    for (var j=0; j<str.length; j++) {
        if (str.charCodeAt(j)>127 || str.charCodeAt(j)==94) {
            len += 2;
        } else {
            len ++;
        }
        if(len<weishu+1){
            reallen++;
        }
    }
    if (len > weishu) {
        str = str.substr(0,reallen)+'···';
    }
    return str;

}