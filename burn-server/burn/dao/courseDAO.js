/**
 * Created by lcx on 2017/4/23.
 */
/**
 * Created by lcx on 2017/4/23.
 */
var getClient = require('./../util/DBHelper').getClient;
var domain = require('domain');
var coursesql = require('./sql/courseSql');
var domain_sql = domain.create();
var sd = require('silly-datetime');


var course = {
    //课程简介
    getCourse:function (callback) {
        getClient(coursesql.getCourse,function (result) {
                callback(result);
        })
    },


    //今日课程
    getTodayCourse:function (callback) {
        getClient(coursesql.getTodayCourse,function (result) {
            callback(result);
        })
    },

    //选择日期查看课程
    selectcal:function(course,callback){
        getClient(coursesql.selectcal,[course.cdate],function (result) {
            callback(result);
        })
    },
    
    //查看课程详细信息
    selectCourseDetailed:function (course,callback) {
        getClient(coursesql.selectCourseDetailed,[course.cid],function (result) {
            callback(result);
        })
    },
    //查看课程选择了有多少人
    selectCourseCount:function (course,callback) {
        getClient(coursesql.selectCourseCount,[course.cid],function (result) {
            callback(result);
        })
    },
    //查看该用户是否选择了该课程
    isSelectCourse:function (course,callback) {
        getClient(coursesql.isSelectCourse,[course.uid,course.cid],function (result) {
            callback(result.length);
        })
    },

    //查看当前课程是否已经过期
    sellectCourseTime:function (course,callback) {
        getClient(coursesql.sellectCourseTime,[course.cid],function (result) {
            callback(result.length);
        })
    },


    //选择课程
    selectCourse:function (course,callback) {
        // that = this;
        that.isSelectCourse(course,function (_res) {
            that = this;
            if(_res>=1){
                callback(5);//已经选择该课程
            }else{
                getClient(coursesql.selectCourse,[course.cid,course.uid],function (result) {
                    callback(1);
                })
            }
        })

    },


    //个人中心查看选课记录
    showCourseById:function (course,callback) {
        getClient(coursesql.showCourseById,[course.uid],function (result) {
            callback(result);
        })
    },

    //删除选课
    deleteCourse:function (course,callback) {
        getClient(coursesql.deleteCourse,[course.chid],function (result) {
            callback(result.affectedRows);
        })
    },


    //发布课程
    ReleaseCourse:function (course,callback) {
        getClient(coursesql.ReleaseCourse,[course.cname,course.coid,course.ctimestart,course.ctimeend,course.cdate,course.cintroduce,course.cpic1,course.cpic2,course.ccount],function (result) {
            callback(result.affectedRows);
        })
    },

    //教练课程推送
    getCourseThree:function (course,callback) {
        getClient(coursesql.getCourseThree,[course.coid],function (result) {
            callback(result);
        })
    },

    //申请轮播
    insertBanner:function (course,callback) {
        var batime=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        getClient(coursesql.insertBanner,[course.cid,course.cpicc2,course.cname,batime],function (result) {
            callback(result.affectedRows);
        })
    },


    //展示轮播
    bannerPush:function (callback) {
        getClient(coursesql.bannerPush,function (result) {
            callback(result);
        })
    }
}

module.exports=course;