/**
 * Created by Yezi on 2017/4/30.
 */
/**
 * Created by lcx on 2017/4/23.
 */
var videoSql = {
    //video 查询所有视频数据
    //video 查询所有视频数据
    getVideoList:'select vid,vname,vbrief,vpic,vprice,vlookcount,vtime,pname,kname,rname from ((video LEFT JOIN parttype on video.vparttype=parttype.pid) LEFT JOIN kindtype on video.vkindtype=kindtype.kid) LEFT JOIN ranktype on video.vranktype=ranktype.rid',
    getPartType:'SELECT pname FROM parttype',   // 查询健身部位分类
    getKindType:'SELECT kname FROM kindtype',   // 查询健身种类分类
    getRankType:'SELECT rname FROM ranktype',   // 查询健身难度分类
    //查询视频详情
    getVideoDetail:'SELECT vname,vtime,vlookcount,DATE_FORMAT(vuploadtime,"%Y-%m-%d") as vuploadtime,vlikecount,vcontent,vranktype,rname,video.coid,uname,uicon from (((video left join ranktype on video.vranktype=ranktype.rid) left join coach on coach.coid=video.coid) left join user on uid=coach.coid) where vid=?',
    //查询视频评论
    getVideoComment:'select uname,uicon,vccomment,DATE_FORMAT(vctime,"%Y-%m-%d") as vctime,vclikecount from videocomment left join user on  videocomment.uid=user.uid where vid=? order by vctime desc',
    //查询视频收藏
    getVideoCollect:'select * from videokeep where vid=? and uid=?',
    //根据视频难度推荐视频
    getVideoByRank:'select vid,vname,vbrief,vpic,vprice,vlookcount,vtime,pname,kname,rname from ((video LEFT JOIN parttype on video.vparttype=parttype.pid) LEFT JOIN kindtype on video.vkindtype=kindtype.kid) LEFT JOIN ranktype on video.vranktype=ranktype.rid limit 6',
    //更新视频点赞数
    updateVideoLikeCount:'UPDATE video SET vlikecount=vlikecount+1 WHERE vid =?',
    //视频收藏
    insertVideoCollect:'INSERT INTO videokeep (vid,uid,vktime) VALUES(?,?,?)',
    //插入视频评论
    insertVideoComment:'INSERT INTO videocomment (vid,uid,vccomment,vctime) VALUES(?,?,?,?)',
    //增加浏览量
    updateVideoLookCount:'UPDATE video SET vlookcount=vlookcount+1 WHERE vid =?',
    //查询视频视频购买情况
    getOrderVideo:'SELECT * FROM ordervideo WHERE vid=? AND uid=?',
    //购买视频
    insertVideoOrder:'INSERT INTO ordervideo (vid,uid,otime,vprice) VALUES(?,?,now(),?)',

    /*个人中心------------------------------------------------*/
    //查询视频订单
    getVideoOrder:'select oid,DATE_FORMAT(otime,"%Y-%m-%d %H:%m:%s") as otime,ordervideo.vid as vid,vpic,vname,vcount,kname,vtime,ordervideo.vprice,rname,uname from ordervideo,video,kindtype,ranktype ,user where ordervideo.vid=video.vid and video.vkindtype=kindtype.kid and video.vranktype = ranktype.rid and user.uid = video.coid and ordervideo.uid=? and ovstatus=0 order by otime desc',

    //视频收藏
    keepVideo:'select vkid,videokeep.vid as vid,DATE_FORMAT(vktime,"%Y-%m-%d %H:%m:%s") as vktime,vpic,vname,vcount,kname,vtime,vprice,rname,uname from videokeep,video,kindtype,ranktype ,user where videokeep.vid=video.vid and video.vkindtype=kindtype.kid and video.vranktype = ranktype.rid and user.uid = video.coid and videokeep.uid=? order by vktime desc',

    //视频浏览记录表
    videohistory:'select vhid,DATE_FORMAT(vhtime,"%Y-%m-%d %H:%m:%s") as vhtime,vpic,vname,vcount,kname,vtime,vprice,rname,uname from videohistory,video,kindtype,ranktype ,user where videohistory.vid=video.vid and video.vkindtype=kindtype.kid and video.vranktype = ranktype.rid and user.uid = video.coid and videohistory.uid=? order by vhtime desc',

    //删除订单
    deleteOrder:'update ordervideo set ovstatus=1 where oid = ?;',

    //取消视频收藏
    deleteVideoCollect:'delete from videokeep where vkid=?'

}

module.exports = videoSql;