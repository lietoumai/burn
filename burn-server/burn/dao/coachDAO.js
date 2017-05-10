/**
 * Created by lcx on 2017/4/23.
 */
/**
 * Created by lcx on 2017/4/23.
 */
var getClient = require('./../util/DBHelper');
var domain = require('domain');
var coachsql = require('./sql/coachSql');
var sd = require('silly-datetime');
var domain_sql = domain.create();


var coach = {
    //分类
    showkindtype:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        getClient(function (client) {
            client.query(coachsql.showkindtype,function (error,result) {
                if(error){

                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result);
                client.release();
            })
        })
    },
    //展示兼职全职
    showjobtype:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        getClient(function (client) {
            client.query(coachsql.showjobtype,function (error,result) {
                if(error){

                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result);
                client.release();
            })
        })
    },

    //展示教练基本信息
    showcoach:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        getClient(function (client) {
            client.query(coachsql.showcoach,function (error,result) {
                if(error){

                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result);
                client.release();
            })
        })
    },

    //根据ID展示教练详细信息
    showcoachDetail:function(coach,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coachsql.showcoachDetail,[coach.coid],function (error,result) {
                if(error){

                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                console.log(result);
                callback(result);
                client.release();
            })
        })
    },


    //预约教练
    appointCoach:function (coach,callback) {
        that = this;
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        that.getappointtime(coach,function (_res) {
            //判断该时段自己是否已经预约教练
            if(typeof _res=='object'){
                if(_res.length==1){
                    //表示该时段自己已经预约其他教练
                    callback(5);
                }else{
                    getClient(function (client) {
                        var atime = sd.format(new Date().getTime()+1000*60*60*24,'YYYY-MM-DD');
                        client.query(coachsql.appointCoach,[coach.uid,coach.coid,coach.appointtime,atime],function (error,result) {
                            if(error){
                                console.log(error.message);
                                client.release();
                                //4表示数据库连接错误
                                callback(4);
                            }
                            callback(result.affectedRows);
                            client.release();
                        })
                    })
                }
            }
        })
    },


    //获取该时段教练是否已经被预约
    getappointInfo1:function (coach,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            var atime = sd.format(new Date().getTime()+1000*60*60*24,'YYYY-MM-DD');
            client.query(coachsql.getappointInfo1,[coach.coid,atime],function (error,result) {

                if(error){
                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result);
                client.release();
            })
        })
    },

    //查看该时段自己是否已经预约
    getappointtime:function (coach,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            var atime = sd.format(new Date().getTime()+1000*60*60*24,'YYYY-MM-DD');
            client.query(coachsql.getappointtime,[coach.uid,coach.appointtime,atime],function (error,result) {

                if(error){
                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result);
                client.release();
            })
        })
    },

    //查看个人中心预约记录
    showAppoById:function (coach,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coachsql.showAppoById,[coach.uid],function (error,result) {

                if(error){
                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result);
                client.release();
            })
        })
    },

    //成为教练
    becomeCoach:function (coach,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {
            var myDate = new Date();
            var cojointime=myDate.toLocaleString();

            getClient(function (client) {
                client.query(coachsql.becomeCoach,[coach.coid,coach.bpic,coach.jobtype,cojointime,coach.cotag],function (error,result) {
                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    callback(result.affectedRows);
                    client.release();
                })
            })
        });
    },

    //教练经历
    coachExpress:function (coach,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {

            getClient(function (client) {
                client.query(coachsql.coachExpress,[coach.coid,coach.starttime,coach.endtime,coach.mainjob],function (error,result) {
                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    callback(result.affectedRows);
                    client.release();
                })
            })
        });
    },

    //检测是否是教练
    alreadyCoach:function (coach,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {

            getClient(function (client) {
                client.query(coachsql.alreadyCoach,[coach.coid],function (error,result) {
                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    callback(result);
                    client.release();
                })
            })
        });
    },


    //查询教练课程
    getCoachCourse:function (data,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coachsql.getCoachCourse,[data.uid],function (error,result) {

                if(error){
                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result);
                client.release();
            })
        })
    }
}

module.exports=coach;