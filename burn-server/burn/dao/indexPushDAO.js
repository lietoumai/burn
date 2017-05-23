/**
 * Created by Yezi on 2017/5/1.
 */
var getClient = require('./../util/DBHelper').getClient;
var domain = require('domain');
var indexSql = require('./sql/indexSql');
var util = require('./../util/MD5');
var domain_sql = domain.create();

var indexPushFunction={

    //博客推荐
    getBlogPush:function (callback) {
        getClient(indexSql.getBlogPush,function (result) {
            callback(result);
        })
    },
    //视频推荐
    getVideoPush:function (callback) {
        getClient(indexSql.getVideoPush,function (result) {
            callback(result);
        })
    },

    //课程推荐
    getCoursePush:function (callback) {
        getClient(indexSql.getCoursePush,function (result) {
            callback(result);
        })
    },

    //课程推荐
    getCoachPush:function (callback) {
        getClient(indexSql.getCoachPush,function (result) {
            callback(result);
        })
    }
};


module.exports=indexPushFunction;