/**
 * Created by Yezi on 2017/4/28.
 */
var indexSql = {

    //查询博客推荐
    getBlogPush:'SELECT bid,SUBSTRING(btitle FROM 1 FOR 6) AS btitle,SUBSTRING(bzhaiyao FROM 1 FOR 80) AS bzhaiyao,blog.uid,uname,uicon,DATE_FORMAT(btime,"%Y-%m-%d") as btime FROM blog,user WHERE blog.uid=user.uid ORDER BY btime DESC LIMIT 3',
    //查询视频推荐
    getVideoPush:'SELECT vid,vname,vcount,vprice,vtime FROM video ORDER BY vlikecount desc LIMIT 3',
    //查询课程推荐
    getCoursePush:'SELECT cid,cname,DATE_FORMAT(ctimestart,"%Y-%m-%d") as ctimestart,cpicc1 FROM course ORDER BY ctimestart DESC LIMIT 4',
    //教练推荐
    getCoachPush:'SELECT coid,uname,coevaluate,copic FROM coach,user WHERE coach.coid=user.uid ORDER BY coevaluate DESC LIMIT 3',
};

module.exports = indexSql;