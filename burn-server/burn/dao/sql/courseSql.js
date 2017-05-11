/**
 * Created by lcx on 2017/4/30.
 */

var sql = {
    //查看当前课程是否已经过期
    sellectCourseTime:'select * from course where ctimestart>now() and cid=?',
    //展示课程简介
    getCourse:'select cid,uname,uicon,cpicc1,cname,DATE_FORMAT(ctimestart,"%H:%m") as ctimestart,DATE_FORMAT(cdate,"%Y-%m-%d") as cdate,substring(cintroduce,1,40) as cintroduce from user,coach,course where user.uid=coach.coid and coach.coid=course.coid and course.cdate>=date_format(now(),"%y-%m-%d") order by course.cdate asc',
    //展示课程简介
    getTodayCourse:'select cid,uname,uicon,cpicc1,cname,DATE_FORMAT(ctimestart,"%H:%m") as ctimestart,DATE_FORMAT(cdate,"%Y-%m-%d") as cdate,substring(cintroduce,1,40) as cintroduce from user,coach,course where user.uid=coach.coid and coach.coid=course.coid and course.cdate=date_format(now(),"%y-%m-%d")',
    //根据日期获取课程信息
    selectcal:'select cid,DATE_FORMAT(ctimestart,"%H:%m") as ctimestart,DATE_FORMAT(cdate,"%Y-%m-%d") as cdate,cname from user,coach,course where user.uid=coach.coid and coach.coid=course.coid and cdate=?',
    //查看课程详情
    selectCourseDetailed:'select uname,uicon,cpicc1,ccount,cname,cintroduce,DATE_FORMAT(ctimestart,"%H:%m") as ctimestart,DATE_FORMAT(ctimeend,"%H:%m") as ctimeend,DATE_FORMAT(cdate,"%Y-%m-%d") as cdate,cqname,cotag from user,coach,course,coachjobtype where user.uid=coach.coid and coach.coid=course.coid and coach.coquan=coachjobtype.cqid and cid=?',
    //选择课程
    selectCourse:'insert into coursehistory(cid,uid) values(?,?)',
    //查询选课有多少人
    selectCourseCount:'select count(*) as peopleCount from coursehistory where cid=?',
    //查看该用户是否已经选择该课程
    isSelectCourse:'select cid from coursehistory where uid=? and cid=?',
    //查看该用户的课程信息
    showCourseById:'select chid,cname,DATE_FORMAT(cdate,"%Y-%m-%d") as cdate,(NOW()<ctimestart) as a,DATE_FORMAT(ctimestart,"%Y-%m-%d %H:%m:%s") as stoptime,DATE_FORMAT(ctimestart,"%H:%m") as ctimestart,DATE_FORMAT(ctimeend,"%H:%m") as ctimeend,ccount from course,coursehistory where course.cid = coursehistory.cid and uid=? order by stoptime asc',
    //退课
    deleteCourse:'delete from coursehistory where chid=?',

    //发布课程
    ReleaseCourse:'insert into course(cname,coid,ctimestart,ctimeend,cdate,cintroduce,cpicc1,ccount) values(?,?,?,?,?,?,?,?)',


    //教练课程推送
    getCourseThree:'select cid,uname,cname,DATE_FORMAT(ctimestart,"%H:%m") as ctimestart,DATE_FORMAT(ctimeend,"%H:%m") as ctimeend,DATE_FORMAT(cdate,"%Y-%m-%d") as cdate,substring(cintroduce,1,40) as cintroduce from user,coach,course where user.uid=coach.coid and coach.coid=course.coid and course.cdate>=date_format(now(),"%y-%m-%d") and course.coid=? order by course.cdate asc limit 3',
}
module.exports = sql;