/**
 * Created by lcx on 2017/5/1.
 */
var sql = {
    //展示分类
    showkindtype:'select kname from kindtype',
    //展示教练兼职全职
    showjobtype:'select cqname from coachjobtype',
    //展示教练信息
    showcoach:'select uicon,uname,coid,cotag,cqname from user,coach,coachjobtype where user.uid=coach.coid and coach.coquan=coachjobtype.cqid',
    //获取总共有多少教练
    getAllCoachCount:'select count(*) from coach',
    //查看教练详情
    showcoachDetail:'select coach.coid,uicon,uname,cotag,cqname,mainjob from user,coach,coachjobtype,coacheexpress where user.uid=coach.coid and coach.coquan=coachjobtype.cqid and coach.coid=coacheexpress.coid and coach.coid=?',
    //预约教练
    appointCoach:'insert into appointment(uid,coid,appointtime,atime) values(?,?,?,?)',
    //获取教练及其预约时段
    getappointInfo1:'select coid,appointtime,date_format(atime,"%Y-%m-%d") as atime from appointment where coid=? and atime=?',
    //查看自己该书段是否已经被预约
    getappointtime:'select * from appointment where uid=? and appointtime=? and atime=?',
    //个人中心查看教练预约记录
    showAppoById:'select uname,date_format(atime,"%Y-%m-%d") as atime,appointtime from appointment,user where appointment.coid=user.uid and appointment.uid=?',
    //成为教练
    becomeCoach:'insert into coach (coid,copic,coquan,cojointime,cotag) values (?,?,?,?,?)',

    //添加教练工作经历
    coachExpress:'insert into coacheexpress (coid,starttime,endtime,mainjob) values (?,?,?,?)',

    //检测是否成为教练
    alreadyCoach:'select coid from coach where coid=?',

    //获取教练课程
    getCoachCourse:'select cpicc1,cname,date_format(cdate,"%Y-%m-%d") as cdate,date_format(ctimestart,"%m-%d %H:%m") as ctimestart,date_format(ctimeend,"%m-%d %H:%m") as ctimeend,count(coursehistory.cid) as ccount from coursehistory,course where coursehistory.cid = course.cid and coid=? GROUP BY coursehistory.cid',
    //发布课程
    insertCourse:'insert into course(cname,ctimestart,ctimeend,cdate,ccount,cpicc1,cintroduce,coid) values(?,?,?,?,?,?,?,?)',
}
module.exports = sql;