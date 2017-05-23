/**
 * Created by lcx on 2017/4/23.
 */
/**
 * Created by lcx on 2017/4/23.
 */
var getClient = require('./../util/DBHelper').getClient;
var domain = require('domain');
var usersql = require('./sql/userSql');
var util = require('./../util/MD5');
var domain_sql = domain.create();

var user = {
    //注册用户
    addUser:function (user,callback) {
        that = this;
            that.getUserByTel(user.utel,function (_res) {
                //判断是否已经存在该用户
                if(typeof _res=='object'){
                    if(_res.length==1){
                        //5 表示用户已存在
                        callback(5);
                    }else{
                        var myDate = new Date();
                        var regtime = myDate.toLocaleDateString();
                        getClient(usersql.addUser,[user.utel,util.MD5(user.upwd),user.uname,regtime],function (result) {
                            callback(result.affectedRows);
                        })
                    }
                    //    查询用户是否存在，出现数据库异常
                }else{
                    callback(_res);
                }
            })
    },
    getUserByTel:function (tel,callback) {
        getClient(usersql.getUserByTel,[tel],function (result) {
            callback(result);
        })
    },


    //登录时根据手机号获取密码比较并返回用户ID
    getUserPwd:function(user,callback) {
        getClient(usersql.getUserPwd,[user.utel],function (result) {
            if(result.length==1){
                //1表示登陆成功
                if(result[0].upwd===util.MD5(user.upwd)){
                    callback({uid:result[0].uid,uicon:result[0].uicon,uname:result[0].uname,upointcount:result[0].upointcount,status:1});
                }else{
                    //2表示密码错误
                    callback(2);
                }
            }else{
                //0表示失败，用户名不存在
                callback(0);
            }

        });
    },




    //保存用户头像
    upLoadIcon:function (uicon,uid,callback) {
        getClient(usersql.upLoadIcon,[uicon,uid],function (result) {
            callback(result,uicon);
        });
    },

    //获取用户头像
    getUserIcon:function (uid,callback) {
        getClient(usersql.getUserIcon,[uid],function (result) {
            callback(result);
        })
    },


    //根据用户ID获取用户基本信息
    getUserById:function (user,callback) {
        getClient(usersql.getUserById,[user.uid],function (result) {
            callback(result);
        })
    },

    //获取用户真实信息
    getUserTrueInfo:function (user,callback) {
        getClient(usersql.getUserTrueInfo,[user.uid],function (result) {
            callback(result);
        })
    },




    //修改实名制信息
    updateUserTrueInfo:function (user,callback) {
        getClient(usersql.updateUserTrueInfo,[user.utname,user.ucard,user.upic1,user.upic2,user.uid],function (result) {
            if(result.length=1){
                callback(1)
            }else{
                callback(0)
            }
        })
    },


    //修改用户基本信息
    updateUserInfo:function (user,callback) {
        getClient(usersql.updateUserInfo,[user.uname,user.usex,user.usignature,user.uid],function (result) {
            callback(result.affectedRows);
        });
    },


    //查询旧密码
    selectOldPwd:function (uid,callback) {
        getClient(usersql.selectOldPwd,[uid],function (result) {
            callback(result);
        })
    },

    //修改密码
    updatePwd:function (user,callback) {
        that = this;
           that.selectOldPwd(user.uid,function (_res) {
               if(_res[0].upwd==util.MD5(user.upwd)){
                   getClient(usersql.updatePwd,[util.MD5(user.upwd2),user.uid],function (result) {
                       callback(result.affectedRows);
                   })
               }else{
                   callback(2);    //表示原始密码错误
               }
           })
    },


    //检测用户是否已经实名认证
    alreadyTrueName:function (user,callback) {
        getClient(usersql.alreadyTrueName,[user.uid],function (result) {
            callback(result);
        })
    },


};

module.exports=user;