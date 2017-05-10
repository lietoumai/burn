/**
 * Created by Yezi on 2017/5/1.
 */
var blogSql = {
    //查询博客前六条
    getBlog:'select blog.bid,btitle,bpic,bzhaiyao,DATE_FORMAT(btime,"%Y-%m-%d") as btime,blikecount,uicon,uname,count(blogcomment.bid) as bcomment from ((blog left join user on blog.uid=user.uid)left join blogcomment on blog.bid=blogcomment.bid) group by btime desc',
    //博客推荐
    getBlogRecommend:'SELECT bid,btitle,blikecount,blookcount,bcomment FROM blog ORDER BY blookcount desc LIMIT 6',
    //博客详情
    getBlogDetail:'SELECT bid,btitle,bcontent,blookcount,DATE_FORMAT(btime,"%Y-%m-%d") as btime,user.uid,user.uicon,user.uname FROM blog,user WHERE blog.uid=user.uid AND bid=?',
    //博客品论查询
    getBlogComment:'SELECT bid,blogcomment.bccontent,DATE_FORMAT(bctime,"%Y-%m-%d") as bctime,uicon,uname FROM blogcomment,user WHERE blogcomment.uid=user.uid AND bid=? ORDER BY bctime desc ',
    //博客评论
    insertBlogComment:'INSERT INTO blogcomment (bid,uid,bccontent,bctime) VALUES(?,?,?,?)',
    //博客收藏
    insertBlogCollect:'INSERT INTO blogkeep (bid, uid,bktime) VALUES(?,?,?)',
    //查询博客是否被收藏
    getBlogCollect:'SELECT  bkid FROM blogkeep WHERE bid=? AND uid=?',
    //更新博客点赞数量
    updateBlogLike:'UPDATE blog SET blikecount=blikecount+1 WHERE bid=?',
    //插入博客
    insertBlog:'INSERT INTO blog (btitle,bpic,bzhaiyao,bcontent,uid,btime,btype) VALUES(?,?,?,?,?,?,?)',
    //更新博客的浏览量
    updateBlogLookCount:'UPDATE blog SET blookcount=blookcount+1 WHERE bid =?',


    //个人中心显示博客信息（我的动态）
    getBlogByuid:'select bid,uicon,uname,btitle,date_format(btime,"%Y-%m-%d %h:%m:%s") as btime,bpic,bzhaiyao,substring(bcontent,1,100) as bcontent,bcomment,blikecount from user,blog where user.uid=blog.uid and blog.uid=? order by btime desc',

    //个人中心显示博客收藏
    getBlogKeep:'select blogkeep.bid as bid,uicon,uname,bkid,btitle,date_format(bktime,"%Y-%m-%d %h:%m:%s") as bktime,bpic,bzhaiyao,substring(bcontent,1,600) as bcontent,bcomment,blikecount from user,blog,blogkeep where user.uid=blog.uid and blog.bid=blogkeep.bid and blogkeep.uid=?',

    //删除个人中心博客收藏
    deleteBlogCollect:'delete from blogkeep where bkid=?',
}

module.exports = blogSql;