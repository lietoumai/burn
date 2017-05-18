/**
 * Created by lcx on 2017/4/23.
 */
/**
 * Created by lcx on 2017/4/23.
 */
var getClient = require('./../util/DBHelper');
var domain = require('domain');
var usersql = require('./sql/userSql');
var util = require('./../util/MD5');
var domain_sql = domain.create();

var user = {
    //注册用户
    addUser:function (user,callback) {
        that = this;
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {

            that.getUserByTel(user.utel,function (_res) {
                //判断是否已经存在该用户
                if(typeof _res=='object'){
                    if(_res.length==1){
                        //5 表示用户已存在
                        callback(5);
                    }else{

                        getClient(function (client) {
                            var myDate = new Date();
                            var regtime = myDate.toLocaleDateString();

                            client.query(usersql.addUser,[user.utel,util.MD5(user.upwd),user.uname,regtime],function (error,result) {
                                if(error){
                                    client.release();
                                    callback(4);
                                    return;
                                }
                                callback(result.affectedRows);
                                console.log(result.affectedRows);
                                client.release();

                            })
                        })
                    }
                    //    查询用户是否存在，出现数据库异常
                }else{
                    callback(_res);
                }
            })
        });
    },
    getUserByTel:function (tel,callback) {

        domain_sql.on('error',function (err) {
            console.log(err.message);
            //数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(usersql.getUserByTel,[tel],function (error,result) {
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


    //登录时根据手机号获取密码比较并返回用户ID
    getUserPwd:function(user,callback) {

        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(usersql.getUserPwd,[user.utel],function (error,result) {
                    console.log(user.tel)
                    if(error){

                        console.log(error.message);
                        client.release();
                        //4表示数据库连接错误
                        callback(4);
                    }
                    if(result.length==1){
                        //1表示登陆成功
                        if(result[0].upwd===util.MD5(user.upwd)){
                            console.log(result);
                            callback({uid:result[0].uid,uicon:result[0].uicon,uname:result[0].uname,upointcount:result[0].upointcount,status:1});
                        }else{
                            //2表示密码错误
                            callback(2);
                        }
                    }else{
                        //0表示失败，用户名不存在
                        callback(0);
                    }
                    client.release();
                });
            })
        });
    },




    //保存用户头像
    upLoadIcon:function (uicon,uid,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                console.log()
                client.query(usersql.upLoadIcon,[uicon,uid],function (error,result) {

                    if(error){

                        console.log(error.message);
                        client.release();
                        //4表示数据库连接错误
                        callback(4);
                    }
                    callback(result,uicon);
                    client.release();
                });
            })
        })
    },

    //获取用户头像
    getUserIcon:function (uid,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });

        domain_sql.run(function () {
            getClient(function (client) {
                client.query(usersql.getUserIcon,[uid],function (error,result) {

                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    console.log(result)
                    callback(result);
                    client.release();
                })
            })
        });
    },


    //根据用户ID获取用户基本信息
    getUserById:function (user,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });

        domain_sql.run(function () {
            getClient(function (client) {
                client.query(usersql.getUserById,[user.uid],function (error,result) {

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

    //获取用户真实信息
    getUserTrueInfo:function (user,callback) {
        domain_sql.on('error',function (err) {

            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(usersql.getUserTrueInfo,[user.uid],function (error,result) {
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




    //修改实名制信息

    updateUserTrueInfo:function (user,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(usersql.updateUserTrueInfo,[user.utname,user.ucard,user.upic1,user.upic2,user.uid],function (error,result) {
                    if(error){
                        console.log(error.message);
                        client.release();
                        // 数据库连接错误
                        callback(4);
                    }
                    if(result.length=1){
                        //修改成功
                        console.log(1);
                        callback(result.affectedRows);
                    }else{
                        callback(0)
                    }
                    client.release();
                })
            })
        })



    },


    //修改用户基本信息
    updateUserInfo:function (user,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {
            getClient(function (client) {
                client.query(usersql.updateUserInfo,[user.uname,user.usex,user.usignature,user.uid],function (error,result) {

                    if(error){

                        console.log(error.message);
                        client.release();
                        //4表示数据库连接错误
                        callback(4);
                        return;
                    }
                    callback(result.affectedRows);
                    console.log(result.affectedRows);
                    client.release();
                });
            })
        })

    },


    //查询旧密码
    selectOldPwd:function (uid,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        getClient(function (client) {
            client.query(usersql.selectOldPwd,[uid],function (error,result) {
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

    //修改密码
    updatePwd:function (user,callback) {

        that = this;
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });
        domain_sql.run(function () {
           that.selectOldPwd(user.uid,function (_res) {

               console.log(util.MD5(user.upwd))
               if(_res[0].upwd==util.MD5(user.upwd)){

                   getClient(function (client) {

                       client.query(usersql.updatePwd,[util.MD5(user.upwd2),user.uid],function (error,result) {
                           if(error){
                               client.release();
                               callback(4);
                               return;
                           }

                           callback(result.affectedRows);

                           console.log(result.affectedRows);
                           client.release();

                       })
                   })
               }else{
                   callback(2);    //表示原始密码错误
               }
           })
        });
    },


    //检测用户是否已经实名认证
    alreadyTrueName:function (user,callback) {
        domain_sql.on('error',function (err) {
            console.log(err.message);
            callback(4);
        });

        getClient(function (client) {
            client.query(usersql.alreadyTrueName,[user.uid],function (error,result) {
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


};

module.exports=user;