/**
 * Created by Yezi on 2017/5/1.
 */
var getClient = require('./../util/DBHelper');
var domain = require('domain');
var indexSql = require('./sql/indexSql');
var util = require('./../util/MD5');
var domain_sql = domain.create();

var indexPushFunction={

    //博客推荐
    getBlogPush:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(indexSql.getBlogPush,function (error,result) {
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
    //视频推荐
    getVideoPush:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(indexSql.getVideoPush,function (error,result) {
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

    //课程推荐
    getCoursePush:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(indexSql.getCoursePush,function (error,result) {
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

    //课程推荐
    getCoachPush:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(indexSql.getCoachPush,function (error,result) {
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
    }
};


module.exports=indexPushFunction;