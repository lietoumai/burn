/**
 * Created by Yezi on 2017/4/30.
 */

angular.module('blogDetail')
    .directive('blogDetailPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl :'blog/blog-detail/blog-detail.template.html',
            controller: [
                '$scope',
                '$http',
                '$stateParams',
                'iconUrl',
                'serverUrl',
                '$state',
                function ($scope,$http,$stateParams,iconUrl,serverUrl,$state) {
                    $scope.bdid=$stateParams.bid;
                    $scope.iconUrl=iconUrl;
                    $scope.lookMore=6;
                // console.log($scope.bdid);
                    //请求博客博文
                $http({
                    method:'GET',
                    url:serverUrl+'blog/getBlogDetail?bid='+$scope.bdid+'',
                }).then(
                    function (response) {
                        $scope.bDC=response.data;
                    }
                )
                    //请求评论
                $http({
                    method: 'GET',
                    url: serverUrl + 'blog/getBlogComment?bid=' + $scope.bdid + '',
                }).then(
                    function (response) {
                       $scope.bcc = response.data;
                    }
                )
                    //提交评论
                $scope.blogComment=function () {
                    var s = localStorage.getItem('isLogin');
                    var s1 = sessionStorage.getItem('isLogin');
                    if(s||s1){
                        if($.trim($scope.cbccontent)!=''){
                            var date =new Date().toLocaleDateString();
                            var datac={
                                uid:$scope.uid,
                                uname:$scope.uname,
                                uicon:$scope.uicon,
                                bid:$scope.bdid,
                                bccontent:$scope.cbccontent,
                                bctime:date,
                            }

                            $http({
                                method:'GET',
                                url:serverUrl+'blog/insertBlogComment',
                                params:{
                                    bid:$scope.bdid,
                                    uid:$scope.uid,
                                    bccontent:$scope.cbccontent
                                }
                            }).then(
                                function (response) {
                                    $scope.bcc.splice(0,0,datac);
                                }
                            )
                        }else {
                            alert('内容不能不为空')
                        }
                    }else{
                        $state.go('login');
                        alert('请先登录')
                    }
                };


                    //点赞
                    var bl=0;

                    $scope.blogLike=function () {
                        var s = localStorage.getItem('isLogin');
                        var s1 = sessionStorage.getItem('isLogin');
                        if(s||s1){
                            if(bl===0){
                                $http({
                                    method: 'GET',
                                    url: serverUrl + 'blog/updateBlogLike?bid='+$scope.bdid+'',
                                }).then(function (response) {
                                    $("#blog-like").css('color','red');
                                    $("#blog-like").attr('disabled',true);
                                })
                            }
                            bl++;

                        }else{
                            $state.go('login');
                            alert('请先登录')
                        }
                    };




                    //收藏博客
                    $http({
                        method: 'GET',
                        url: serverUrl + 'blog/getBlogCollect',
                        params: {
                            bid: $scope.bdid,
                            uid: $scope.uid,
                        }
                    }).then(
                        function (response) {
                            $scope.res=response.data;
                            if($scope.res==1){
                                $("#blog-collect").css('color','red');
                            }
                        }
                    )



                    //收藏博客
                    $scope.blogCollect=function () {
                        var s = localStorage.getItem('isLogin');
                        var s1 = sessionStorage.getItem('isLogin');
                        if(s||s1){
                            if($scope.res===0){
                                $http({
                                    method: 'GET',
                                    url: serverUrl + 'blog/insertBlogCollect',
                                    params: {
                                        bid: $scope.bdid,
                                        uid: $scope.uid,
                                    }
                                }).then(function (response) {
                                    console.log('插入成功')
                                    $("#blog-collect").css('color','red');
                                })
                            }
                        }else{
                            $state.go('login');
                            alert('请先登录')
                        }

                    }


            }]

        }
    });

$(document).on('click', '.icon-pinglun', function () {
    $(".my-comment-input").show();
});

$(document).on('click', '.my-comment-input button', function () {
    $(".my-comment-input").hide();
});