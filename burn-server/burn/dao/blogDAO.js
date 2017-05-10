/**
 * Created by Yezi on 2017/5/1.
 */
var getClient = require('./../util/DBHelper');
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
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(blogSql.getBlog,function (error,result) {
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

    //博客推荐
    getBlogRecommend:function (callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(blogSql.getBlogRecommend,function (error,result) {
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
    // 博客详情
    getBlogDetail:function (bid,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(blogSql.getBlogDetail,[bid],function (error,result) {
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
            getClient(function (client) {
                client.query(blogSql.updateBlogLookCount,[bid],function (error,result) {
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

    // 博客评论
    getBlogComment:function (bid,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(blogSql.getBlogComment,[bid],function (error,result) {
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

    // 插入评论
    insertBlogComment:function (bc,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            var myDate = new Date();
            var publishTime=myDate.toLocaleString();
            getClient(function (client) {
                client.query(blogSql.insertBlogComment,[bc.bid,bc.uid,bc.bccontent,publishTime,bc.bid],function (error,result) {
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

    // 博客收藏
    insertBlogCollect:function (data,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            var myDate = new Date();
            var publishTime=myDate.toLocaleString();

            getClient(function (client) {
                client.query(blogSql.insertBlogCollect,[data.bid,data.uid,publishTime],function (error,result) {
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

    // 查询博客收藏
    getBlogCollect:function (data,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(blogSql.getBlogCollect,[data.bid,data.uid],function (error,result) {
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

    // 更新博客点赞数量
    updateBlogLike:function (data,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(blogSql.updateBlogLike,[data.bid],function (error,result) {
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



    // 发表博客
    insertBlog:function (data,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            var myDate = new Date();
            var publishTime=myDate.toLocaleString();

            getClient(function (client) {
                client.query(blogSql.insertBlog,[data.btitle,data.bpic,data.bzhaiyao,data.bcontent,data.uid,publishTime,data.btype],function (error,result) {
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

    
    //个人中心展示博客动态
    getBlogByuid:function (blog,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {

                client.query(blogSql.getBlogByuid,[blog.uid],function (error,result) {

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


    //个人中心展示博客收藏
    getBlogKeep:function (blog,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {

                client.query(blogSql.getBlogKeep,[blog.uid],function (error,result) {

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

    //取消博客收藏
    deleteBlogCollect: function (blog, callback) {
        console.log(blog)
        domain_sql.on('error', function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(blogSql.deleteBlogCollect, [blog.bkid], function (error, result) {
                    console.log(blog.bkid)
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


















};


module.exports=blogFunction;