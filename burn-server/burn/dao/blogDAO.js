/**
 * Created by Yezi on 2017/5/1.
 */
var getClient = require('./../util/DBHelper').getClient;
var domain = require('domain');
var blogSql = require('./sql/blogSql');
var util = require('./../util/MD5');
var domain_sql = domain.create();

//图片上传
var formidable = require('./../node_modules/formidable');
var AVATAR_UPLOAD_FOLDER = '/uploads/';
var imgForUserCard='images/imgForUserCard/'
var createUnique = require('./../util/createUnique');
var fs = require('fs');
/* GET users listing. */

var blogFunction={

    //博客显示
    getBlog:function (callback) {
        getClient(blogSql.getBlog,function (result) {
            callback(result);
        })
    },

    //博客推荐
    getBlogRecommend:function (callback) {
        getClient(blogSql.getBlogRecommend,function (result) {
            callback(result);
        })
    },
    // 博客详情
    getBlogDetail:function (bid,callback) {

        getClient(blogSql.getBlogDetail,[bid],function (result) {
            callback(result);
        });
        getClient(blogSql.updateBlogLookCount,[bid],function (result) {
            // callback(result);
        });
    },

    // 博客评论
    getBlogComment:function (bid,callback) {
        getClient(blogSql.getBlogComment,[bid],function (result) {
            callback(result);
        })
    },

    // 插入评论
    insertBlogComment:function (bc,callback) {
        var myDate = new Date();
        var publishTime=myDate.toLocaleString();
        getClient(blogSql.insertBlogComment,[bc.bid,bc.uid,bc.bccontent,publishTime,bc.bid],function (result) {
            callback(result);
        })
    },

    // 博客收藏
    insertBlogCollect:function (data,callback) {
            var myDate = new Date();
            var publishTime=myDate.toLocaleString();
        getClient(blogSql.insertBlogCollect,[data.bid,data.uid,publishTime],function (result) {
            callback(result);
        })
    },

    // 查询博客收藏
    getBlogCollect:function (data,callback) {
        getClient(blogSql.getBlogCollect,[data.bid,data.uid],function (result) {
            if(result.length>0){
                callback(1);
            }else {
                callback(0);
            }
        })
    },

    // 更新博客点赞数量
    updateBlogLike:function (data,callback) {
        getClient(blogSql.updateBlogLike,[data.bid],function (result) {
            callback(result);
        })
    },



    // 发表博客
    insertBlog:function (data,callback) {
        var myDate = new Date();
        var publishTime=myDate.toLocaleString();
        getClient(blogSql.insertBlog,[data.btitle,data.bpic,data.bzhaiyao,data.bcontent,data.uid,publishTime,data.btype],function (result) {
            callback(result.affectedRows);
        })
    },

    
    //个人中心展示博客动态
    getBlogByuid:function (blog,callback) {
        getClient(blogSql.getBlogByuid,[blog.uid],function (result) {
            callback(result);
        })
    },


    //个人中心展示博客收藏
    getBlogKeep:function (blog,callback) {
        getClient(blogSql.getBlogKeep,[blog.uid],function (result) {
            callback(result);
        })
    },

    //取消博客收藏
    deleteBlogCollect: function (blog, callback) {
        getClient(blogSql.deleteBlogCollect, [blog.bkid], function (result) {
            callback(result.affectedRows);
        })
    },


















};


module.exports=blogFunction;