/**
 * Created by lcx on 2017/4/23.
 */
/**
 * Created by lcx on 2017/4/23.
 */
var getClient = require('./../util/DBHelper').getClient;
var domain = require('domain');
var coachsql = require('./sql/coachSql');
var sd = require('silly-datetime');
var domain_sql = domain.create();


var coach = {
    //分类
    showkindtype:function (callback) {
        getClient(coachsql.showkindtype,function (result) {
            callback(result);
        })
    },
    //展示兼职全职
    showjobtype:function (callback) {
        getClient(coachsql.showjobtype,function (result) {
            callback(result);
        })
    },

    //展示教练基本信息
    showcoach:function (callback) {
        getClient(coachsql.showcoach,function (result) {
            callback(result);
        })
    },

    //根据ID展示教练详细信息
    showcoachDetail:function(coach,callback) {
        getClient(coachsql.showcoachDetail,[coach.coid],function (result) {
            callback(result);
            })
    },


    //预约教练
    appointCoach:function (coach,callback) {
        that = this;
        that.getappointtime(coach,function (_res) {
            //判断该时段自己是否已经预约教练
            if(typeof _res=='object'){
                if(_res.length==1){
                    //表示该时段自己已经预约其他教练
                    callback(5);
                }else{
                    var atime = sd.format(new Date().getTime()+1000*60*60*24,'YYYY-MM-DD');
                    getClient(coachsql.appointCoach,[coach.uid,coach.coid,coach.appointtime,atime],function (result) {
                        callback(result.affectedRows);
                    })
                }
            }
        })
    },


    //获取该时段教练是否已经被预约
    getappointInfo1:function (coach,callback) {
        var atime = sd.format(new Date().getTime()+1000*60*60*24,'YYYY-MM-DD');
        getClient(coachsql.getappointInfo1,[coach.coid,atime],function (result) {
            callback(result);
        })
    },

    //查看该时段自己是否已经预约
    getappointtime:function (coach,callback) {
        var atime = sd.format(new Date().getTime()+1000*60*60*24,'YYYY-MM-DD');
        getClient(coachsql.getappointtime,[coach.uid,coach.appointtime,atime],function (result) {
            callback(result);
        })
    },

    //查看个人中心预约记录
    showAppoById:function (coach,callback) {
        getClient(coachsql.showAppoById,[coach.uid],function (result) {
            callback(result);
        })
    },

    //成为教练
    becomeCoach:function (coach,callback) {
        var myDate = new Date();
        var cojointime=myDate.toLocaleString();
        getClient(coachsql.becomeCoach,[coach.coid,coach.bpic,coach.jobtype,cojointime,coach.cotag],function (result) {
            callback(result.affectedRows);
        })
    },

    //教练经历
    coachExpress:function (coach,callback) {
        getClient(coachsql.coachExpress,[coach.coid,coach.starttime,coach.endtime,coach.mainjob],function (result) {
            callback(result.affectedRows);
        })
    },

    //检测是否是教练
    alreadyCoach:function (coach,callback) {
        getClient(coachsql.alreadyCoach,[coach.coid],function (result) {
            callback(result);
        })
    },


    //查询教练课程
    getCoachCourse:function (data,callback) {
        getClient(coachsql.getCoachCourse,[data.uid],function (result) {
            callback(result);
        })
    }
}

module.exports=coach;