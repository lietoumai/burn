/**
 * Created by lcx on 2017/4/23.
 */
var sql = {

    getUserByTel:'select uname,utel from user where utel=?',  //根据手机号获取用户昵称和手机号(检测用户是否存在)
    addUser:'insert into user (utel,upwd,uname,uregtime) values (?,?,?,?)',   //用户注册
    getUserPwd:'select uid,uname,upwd,uicon,upointcount from user where utel=?',       //获取用户密码(登录)


    upLoadIcon:'update user set uicon=? where uid=?',   //修改用户头像


    getUserIcon:'select uicon from user where uid=?',//获取用户头像
    getUserById:'select uname,usex,utel,usignature from user where uid=?',   //根据Id查询用户基本信息
    getUserTrueInfo:'select utname,ucard,upic1,upic2 from user where uid=?',//获取用户真实信息
    updateUserInfo:'update user set uname=?,usex=?,usignature=? where uid=?',   //更新用户信息
    updateUserTrueInfo:'update user set utname=?,ucard=?,upic1=?,upic2=? where uid=?',//实名认证


    selectOldPwd:'select upwd from user where uid=?',  //查询密码
    updatePwd:'update user set upwd=? where uid=?',//修改密码

    //检测用户是否已经实名认证
    alreadyTrueName:'select utname from user where uid=?',
}

module.exports = sql;