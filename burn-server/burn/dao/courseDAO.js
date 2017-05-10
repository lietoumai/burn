/**
 * Created by lcx on 2017/4/23.
 */
/**
 * Created by lcx on 2017/4/23.
 */
var getClient = require('./../util/DBHelper');
var domain = require('domain');
var coursesql = require('./sql/courseSql');
var domain_sql = domain.create();


var course = {
    //课程简介
    getCourse:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        getClient(function (client) {
            client.query(coursesql.getCourse,function (error,result) {
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


    //今日课程
    getTodayCourse:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        getClient(function (client) {
            client.query(coursesql.getTodayCourse,function (error,result) {
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

    //选择日期查看课程
    selectcal:function(course,callback){
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.selectcal,[course.cdate],function (error,result) {
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
    
    //查看课程详细信息
    selectCourseDetailed:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.selectCourseDetailed,[course.cid],function (error,result) {
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
    //查看课程选择了有多少人
    selectCourseCount:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.selectCourseCount,[course.cid],function (error,result) {
                console.log(course.cid);
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
    //查看该用户是否选择了该课程
    isSelectCourse:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.isSelectCourse,[course.uid,course.cid],function (error,result) {
                console.log(course.uid)
                if(error){
                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result.length);
                client.release();
            })
        })
    },

    //查看当前课程是否已经过期
    sellectCourseTime:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.sellectCourseTime,[course.cid],function (error,result) {

                console.log(course.cid)
                if(error){
                    console.log(error.message);
                    client.release();
                    //4表示数据库连接错误
                    callback(4);
                }
                callback(result.length);
                client.release();
            })
        })
    },


    //选择课程
    selectCourse:function (course,callback) {
        that = this;
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        that.isSelectCourse(course,function (_res) {
            that = this;
            if(_res>=1){
                callback(5);//已经选择该课程
            }else{
                getClient(function (client) {
                    client.query(coursesql.selectCourse,[course.cid,course.uid],function (error,result) {
                        if(error){
                            console.log(error.message);
                            client.release();
                            //4表示数据库连接错误
                            callback(4);
                        }
                        callback(1);
                        client.release();
                    })
                })
            }
        })

    },


    //个人中心查看选课记录
    showCourseById:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.showCourseById,[course.uid],function (error,result) {
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

    //删除选课
    deleteCourse:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.deleteCourse,[course.chid],function (error,result) {
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
    },


    //发布课程
    ReleaseCourse:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {
            client.query(coursesql.ReleaseCourse,[course.cname,course.coid,course.ctimestart,course.ctimeend,course.cdate,course.cintroduce,course.cpic,course.ccount],function (error,result) {
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
    },

    //教练课程推送
    getCourseThree:function (course,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        getClient(function (client) {


            client.query(coursesql.getCourseThree,[course.coid],function (error,result) {
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
}

module.exports=course;