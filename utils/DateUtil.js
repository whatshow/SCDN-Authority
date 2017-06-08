/**
 * 构造一个将来的日期
 * 时间间隔单位：日
 */
module.exports.expiresInDate = function(numDays) {
        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
};
/**
 * 构造一个将来的日期
 * 时间间隔单位：秒
 */
module.exports.expireInSecond = function(seconds){
    var dateObj = new Date();
    return dateObj.setSeconds(dateObj.getSeconds() + seconds);
};


/**
 * 比较两个date是否是同一天
 */
module.exports.isSameDay = function(date1, date2){
    //获取每个参数的年月日
    var d1_y = date1.getFullYear();
    var d1_m = date1.getMonth();
    var d1_d = date1.getDate();
    var d2_y = date2.getFullYear();
    var d2_m = date2.getMonth();
    var d2_d = date2.getDate();
    //比较年
    if(d1_y != d2_y){
        return false;
    }else{
        //比较月
        if(d1_m != d2_m){
            return false;
        }else{
            //比较日
            if(d1_d != d2_d){
                return false;
            }else{
                return true;
            }
        }
    }
};

/**
 * 获取str类型的时间
 */
module.exports.ParseStrDate = function(curDate){
    var y = curDate.getFullYear();
    var M = curDate.getMonth() + 1;
    var sM = null;
    if(M < 10){
        sM = "0" + M
    }else{
        sM = M;
    }
    var d = curDate.getDate();
    var sd = null;
    if(d < 10){
        sd = "0" + d;
    }else{
        sd = d;
    }
    var h = curDate.getHours();
    var sh = null;
    if(h < 10){
        sh = "0" + h;
    }else{
        sh = h;
    }
    var m = curDate.getMinutes();
    var sm = null;
    if(m < 10){
        sm = "0" + m;
    }else{
        sm = m;
    }
    var s = curDate.getSeconds();
    var ss = null;
    if(s < 10){
        ss = "0" + s;
    }else{
        ss = s;
    }
    //返回str类型的时间
    var sTime =  y + "-" + sM + "-" + sd + " " + sh + ":" + sm + ":" + ss;
    return sTime;
};

/**
 * 输出当前时间
 * 格式 YYYY-mm-dd hh:mm:ss
 */
module.exports.GetCurrentTimeStr = function(){
    var curDate = new Date();
    var y = curDate.getFullYear();
    var M = curDate.getMonth() + 1;
    var sM = null;
    if(M < 10){
        sM = "0" + M
    }else{
        sM = M;
    }
    var d = curDate.getDate();
    var sd = null;
    if(d < 10){
        sd = "0" + d;
    }else{
        sd = d;
    }
    var h = curDate.getHours();
    var sh = null;
    if(h < 10){
        sh = "0" + h;
    }else{
        sh = h;
    }
    var m = curDate.getMinutes();
    var sm = null;
    if(m < 10){
        sm = "0" + m;
    }else{
        sm = m;
    }
    var s = curDate.getSeconds();
    var ss = null;
    if(s < 10){
        ss = "0" + s;
    }else{
        ss = s;
    }
    //返回str类型的时间
    var sTime =  y + "-" + sM + "-" + sd + " " + sh + ":" + sm + ":" + ss;
    return sTime;
};