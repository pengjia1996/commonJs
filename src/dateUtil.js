//时间戳转yyyy-MM-dd HH:mm:ss
function formatUnixtimestamp (unixtimestamp){
        var unixtimestamp = new Date(unixtimestamp);
        var year = 1900 + unixtimestamp.getYear();
        var month = "0" + (unixtimestamp.getMonth() + 1);
        var date = "0" + unixtimestamp.getDate();
        var hour = "0" + unixtimestamp.getHours();
        var minute = "0" + unixtimestamp.getMinutes();
        var second = "0" + unixtimestamp.getSeconds();
        return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
            + " " + hour.substring(hour.length-2, hour.length) + ":"
            + minute.substring(minute.length-2, minute.length) + ":"
            + second.substring(second.length-2, second.length);
 }
/**
 * 根据时间戳转 MM月dd日
 * @param timeStr
 * @returns xx月xx日
 */
function getTimeMMdd(timeStr){
	var dateObj = new Date(timeStr);
	var month;
	if((dateObj.getMonth() + 1) < 10){
		month = "0" + (dateObj.getMonth() + 1);
	} else {
		month = dateObj.getMonth() + 1;
	}
	var date;
	if(dateObj.getDate() < 10){
		date = "0" + dateObj.getDate();
	} else {
		date = dateObj.getDate();
	}
	return month+"月"+date+"日";
}

/**
 * 获取当前时间
 */
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "H+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
 
    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
 
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

/**
 * 根据时间戳 获取当前的星期,参数为一个时默认前缀星期,大于一个时前缀是周
 * @param timeStr 1586248200000  13位数字(java date)
 * @returns
 */
function getWeekName(timeStr){
	var paramsLength=arguments.length;//参数的个数
	//console.log("paramsLength:"+paramsLength);
	var  d= new Date(timeStr);
	var days = d.getDay();
	var weekName="";
	if(paramsLength==1){
		weekName="星期";
	}else if(paramsLength>1){
		weekName="周";
	}
    switch(days){
        case 1:
        	weekName+='一';
            break;
        case 2:
        	weekName+='二';
            break;
        case 3:
        	weekName+='三';
            break;
        case 4:
        	weekName+='四';
            break;
        case 5:
        	weekName+='五';
            break;
        case 6:
        	weekName+='六';
            break;
        case 0:
        	weekName+='日';
            break;

    }
    
    return weekName;
}

/**
 * 字符串左补位(如果待操作字符>补位后字符总长度时 截取的)
 * 例如
 * padLeft("3",5,"a");-->"aaaa3"
 * padLeft("3bfw2",2,"a");--->"w2"
 * @param str 待操作的字符
 * @param lng 补位后字符总长度
 * @param chr 补的字符
 * @returns
 */
function padLeft(str,lng, chr) {
    if (!lng) lng = 0;
    if (!chr) chr = '0';
    if (str.length > lng) {
        return str.substring(str.length - lng,str.length);
    } else if (str.length < lng) {
        var tnum = Math.pow(10,lng - str.length).toString();
        return tnum.substring(1, tnum.length).replace(/0/g,chr) + str;
    }
    /*console.log("原字符串:"+str);
    console.log("补位后字符总长度:"+lng);
    console.log("补的字符:"+chr);*/
    return str;
};


/**
 * 将时间对象转成字符yyyy-MM-dd HH:mm:ss
 * @param date
 * @returns
 */
function fmDateTime(date) {
    return date.getFullYear()
       + '-' + padLeft((date.getMonth() + 1)+"",2,"0")
       + '-' + padLeft(date.getDate()+"",2,"0")
       + ' ' + padLeft(date.getHours()+"",2,"0")
       + ':' + padLeft(date.getMinutes()+"",2,"0") 
       + ':' + padLeft(date.getSeconds()+"",2,"0");
}

/**
 * 将时间对象转成字符yyyy-MM-dd 
 * @param date
 * @returns
 */
function getDateStr(date) {
	var dateStr=date.getFullYear()
    + '-' + padLeft((date.getMonth()+ 1)+"",2,"0")
    + '-' + padLeft(date.getDate()+"",2,"0");
	//console.log(dateStr);
    return dateStr;
}


/**
 * 将 YYYY-MM-dd hh:mm:ss 格式的字符串转成时间对象
 * @param timeStr
 * @returns
 */
function getDateObjByTimeStr(timeStr){
	//var timeStr = "2005-12-15 09:41:30";
	var d = new Date(Date.parse(s.replace(/-/g, "/")));
	return d;
}
