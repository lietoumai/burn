/**
 * Created by Yezi on 2017/4/30.
 */

var getClient = require('./../util/DBHelper').getClient;
var domain = require('domain');
var videoSql = require('./sql/videoSql');
var util = require('./../util/MD5');
var domain_sql = domain.create();



var videoFunction={

    // 获取视频数据库
    getVideo:function (callback) {
        getClient(videoSql.getVideoList,function (result) {
            callback(result);
        })
    },

    // 获取健身部位
    getPartType:function (callback) {
        getClient(videoSql.getPartType,function (result) {
            callback(result);
        })
    },


    // 获取健身种类分类
    getKindType:function (callback) {
        getClient(videoSql.getKindType,function (result) {
            callback(result);
        })
    },

    // 获取健身难度分类
    getRankType:function (callback) {
        getClient(videoSql.getRankType,function (result) {
            callback(result);
        })
    },

    // 获取视频详情
    getVideoDetail:function (vid,callback) {
        getClient(videoSql.getVideoDetail,[vid],function (result) {
            callback(result);
        });
        //更新浏览数量
        getClient(videoSql.updateVideoLookCount,[vid],function (result) {
            callback(result);
        })
    },


    // 更新浏览数量
    updateVideoLookCount:function (vid,callback) {
        getClient(videoSql.updateVideoLookCount,[vid],function (result) {
            callback(result);
        })
    },

    // 获取视频评论
    getVideoComment:function (vid,callback) {
        getClient(videoSql.getVideoComment,[vid],function (result) {
            callback(result);
        })
    },

    // 获取视频推荐
    getVideoByRank:function (vid,callback) {
        getClient(videoSql.getVideoByRank,[vid],function (result) {
            callback(result);
        })
    },

    // 更新点赞数量
    updateVideoLikeCount:function (vid,callback) {
        getClient(videoSql.updateVideoLikeCount,[vid],function (result) {
            callback(result);
        })
    },

// 收藏视频
    insertVideoCollect:function (data,callback) {
        var myDate = new Date();
        var publishTime=myDate.toLocaleString();
        getClient(videoSql.insertVideoCollect,[data.vid,data.uid,publishTime],function (result) {
            callback(result);
        })
    },


// 视频评论
    insertVideoComment:function (data,callback) {
        var myDate = new Date();
        var publishTime=myDate.toLocaleString();
        getClient(videoSql.insertVideoComment,[data.vid,data.uid,data.vcomment,publishTime],function (result) {
            callback(result.affectedRows);
        })
    },


// 查询视频收藏
    getVideoCollect:function (data,callback) {
        getClient(videoSql.getVideoCollect,[data.vid,data.uid],function (result) {
            if(result.length>0){
                callback(1);
            }else {
                callback(0);
            }
        })
    },
    // 购买视频
    insertVideoOrder:function (data,callback) {
        getClient(videoSql.insertVideoOrder,[data.vid,data.uid,data.vprice],function (result) {
            if(result.length>0){
                callback(result.affectedRows);
            }else {
                callback(result.affectedRows);
            }
            client.release();
        })
    },




// 查询视频购买
    getOrderVideo:function (data,callback) {
        getClient(videoSql.getOrderVideo,[data.vid,data.uid],function (result) {
            if(result.length>0){
                callback(1);
            }else {
                callback(0);
            }
        })
    },




    //获取视频订单
    getVideoOrder:function (video,callback) {
        getClient(videoSql.getVideoOrder,[video.uid],function (result) {
            callback(result);
        })
    },

    //个人中心视频收藏表
    keepVideo:function (video,callback) {
        getClient(videoSql.keepVideo, [video.uid], function (result) {
            callback(result);
        })
    },

    //视频浏览记录
    videohistory:function (video,callback) {
        getClient(videoSql.videohistory, [video.uid], function (result) {
            callback(result);
        })
    },

    //删除视频订单
    deleteOrder:function (video,callback) {
        getClient(videoSql.deleteOrder, [video.oid], function (result) {
            callback(result.affectedRows);
        })
    },

//取消视频收藏
    deleteVideoCollect: function (video, callback) {
        getClient(videoSql.deleteVideoCollect, [video.vkid], function (result) {
            callback(result.affectedRows);
        })
    },



}

module.exports=videoFunction;