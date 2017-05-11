/**
 * Created by Yezi on 2017/4/30.
 */

var getClient = require('./../util/DBHelper');
var domain = require('domain');
var videoSql = require('./sql/videoSql');
var util = require('./../util/MD5');
var domain_sql = domain.create();



var videoFunction={


    // 获取视频数据库
    getVideo:function (callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getVideoList,function (error,result) {

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

    // 获取健身部位
    getPartType:function (callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getPartType,function (error,result) {

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


    // 获取健身种类分类
    getKindType:function (callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getKindType,function (error,result) {

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

    // 获取健身难度分类
    getRankType:function (callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getRankType,function (error,result) {

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

    // 获取视频详情
    getVideoDetail:function (vid,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getVideoDetail,[vid],function (error,result) {

                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    callback(result);
                    client.release();
                });
                //更新浏览数量
                client.query(videoSql.updateVideoLookCount,[vid],function (error,result) {
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


    // 更新浏览数量
    updateVideoLookCount:function (vid,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.updateVideoLookCount,[vid],function (error,result) {

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

    // 获取视频评论
    getVideoComment:function (vid,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getVideoComment,[vid],function (error,result) {

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

    // 获取视频推荐
    getVideoByRank:function (vid,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getVideoByRank,[vid],function (error,result) {

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

    // 更新点赞数量
    updateVideoLikeCount:function (vid,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.updateVideoLikeCount,[vid],function (error,result) {

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

// 收藏视频
    insertVideoCollect:function (data,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            var myDate = new Date();
            var publishTime=myDate.toLocaleString();

            getClient(function (client) {
                client.query(videoSql.insertVideoCollect,[data.vid,data.uid,publishTime],function (error,result) {

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


// 视频评论
    insertVideoComment:function (data,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            var myDate = new Date();
            var publishTime=myDate.toLocaleString();

            getClient(function (client) {
                client.query(videoSql.insertVideoComment,[data.vid,data.uid,data.vcomment,publishTime],function (error,result) {

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


// 查询视频收藏
    getVideoCollect:function (data,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getVideoCollect,[data.vid,data.uid],function (error,result) {

                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    if(result.length>0){
                        callback(1);

                    }else {
                        callback(0);
                    }
                    client.release();
                })
            })
        });
    },
    // 购买视频
    insertVideoOrder:function (data,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.insertVideoOrder,[data.vid,data.uid,data.vprice],function (error,result) {
                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    if(result.length>0){
                        callback(result.affectedRows);

                    }else {
                        callback(result.affectedRows);
                    }
                    client.release();
                })
            })
        });
    },




// 查询视频购买
    getOrderVideo:function (data,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getOrderVideo,[data.vid,data.uid],function (error,result) {
                    console.log(result)
                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    if(result.length>0){
                        callback(1);
                        console.log('已购买')

                    }else {
                        callback(0);
                        console.log('未购买')
                    }
                    client.release();
                })
            })
        });
    },




    //获取视频订单
    getVideoOrder:function (video,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.getVideoOrder,[video.uid],function (error,result) {
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

    //个人中心视频收藏表
    keepVideo:function (video,callback) {
        domain_sql.on('error', function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.keepVideo, [video.uid], function (error, result) {
                    if (error) {
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

    //视频浏览记录
    videohistory:function (video,callback) {
        domain_sql.on('error', function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.videohistory, [video.uid], function (error, result) {
                    if (error) {
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

    //删除视频订单
    deleteOrder:function (video,callback) {
        domain_sql.on('error', function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {

                client.query(videoSql.deleteOrder, [video.oid], function (error, result) {
                    if (error) {
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

//取消视频收藏
    deleteVideoCollect: function (video, callback) {
        domain_sql.on('error', function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(videoSql.deleteVideoCollect, [video.vkid], function (error, result) {
                    if (error) {
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



}

module.exports=videoFunction;