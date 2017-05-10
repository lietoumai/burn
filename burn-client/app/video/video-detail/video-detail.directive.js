/**
 * Created by Yezi on 2017/4/30.
 */
angular.module('videoDetail')
    .directive('videoDetailPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'video/video-detail/video-detail.template.html',
            controller: [
                '$scope',
                '$stateParams',
                '$rootScope',
                '$http',
                '$state',
                'serverUrl',
                'iconUrl',
                'videoUrl',
                function ($scope, $stateParams, $rootScope, $http, $state, serverUrl, iconUrl, videoUrl) {
                    $scope.vid = $stateParams.vid;
                    $scope.iconUrl = iconUrl;
                    $scope.videoUrl = videoUrl;
                    $scope.number = 3;
                    $scope.vlc = '';

                    //查询视频详情
                    $http({
                        method: 'GET',
                        url: serverUrl + 'video/getVideoDetail?vid=' + $scope.vid + '',
                    }).then(function (response) {
                        $scope.videoDetail = response.data.result;
                        $scope.vlc = $scope.videoDetail[0].vlikecount;

                    }),
                        //查询视频评论
                        $http({
                            method: 'GET',
                            url: serverUrl + 'video/getVideoComment?vid=' + $scope.vid + '',
                        }).then(function (response) {
                            $scope.videoComment = response.data.result;

                        }),

                        //查询视频推荐
                        $http({
                            method: 'GET',
                            url: serverUrl + 'video/getVideoByRank?vid=' + $scope.vid + '',
                        }).then(function (response) {
                            $scope.videoByRank = response.data.result;

                        });


                    $scope.isCharge = function (vid, vprice, vname, vtime, vpic) {
                        if (vprice > 0) {
                            $http({
                                method: 'Get',
                                url: serverUrl + 'video/getOrderVideo?vid=' + vid + '',
                                params: {
                                    vid: $scope.vid,
                                    uid: $scope.uid,
                                }
                            }).then(function (response) {
                                $scope.isOrderVideo = response.data.result;
                                if ($scope.isOrderVideo === 1) {
                                    $state.go('video-detail', {vid: vid});
                                } else {
                                    var data = {
                                        vid: vid,
                                        vprice: vprice,
                                        vname: vname,
                                        vtime: vtime,
                                        vpic: vpic,
                                    }
                                    $state.go('video-buy', {data: JSON.stringify(data)});
                                }
                            })

                        } else {
                            $state.go('video-detail', {vid: vid});
                        }
                    }


                    //点赞
                    var vl = 0;

                    $scope.videoLike = function () {
                        var s = localStorage.getItem('isLogin');
                        var s1 = sessionStorage.getItem('isLogin');
                        if (s || s1) {
                            if (vl === 0) {
                                console.log($scope.vlc)
                                $scope.vlc = $scope.vlc + 1;
                                $http({
                                    method: 'GET',
                                    url: serverUrl + 'video/updateVideoLikeCount?vid=' + $scope.vid + '',
                                }).then(function (response) {
                                    $scope.videolikecount = response.data.result;
                                })
                            }
                            vl++;
                        } else {
                            $state.go('login');
                            alert('请先登录')
                        }


                    }
                    //查询博客收藏
                    $http({
                        method: 'GET',
                        url: serverUrl + 'video/getVideoCollect',
                        params: {
                            vid: $scope.vid,
                            uid: $scope.uid,
                        }
                    }).then(function (response) {
                        $scope.isvc = response.data.result
                        if ($scope.isvc == 1) {
                            $('#isvideoCollect').css('color', '#e84e40')
                        }

                    })

                    //收藏
                    $scope.videoCollect = function () {
                        var s = localStorage.getItem('isLogin');
                        var s1 = sessionStorage.getItem('isLogin');
                        if (s || s1) {
                            if ($scope.isvc === 0) {
                                $http({
                                    method: 'GET',
                                    url: serverUrl + 'video/insertVideoCollect',
                                    params: {
                                        vid: $scope.vid,
                                        uid: $scope.uid,
                                    }
                                }).then(function (response) {
                                    console.log('插入成功')

                                })
                            }
                        } else {
                            $state.go('login');
                            alert('请先登录')
                        }

                    }

                    //评论

                    $scope.videoCommentPush = function () {
                        var s = localStorage.getItem('isLogin');
                        var s1 = sessionStorage.getItem('isLogin');
                        if (s || s1) {
                            if($.trim($scope.vContent)!=''){
                                var date = new Date().toLocaleDateString();
                                console.log(date);
                                var datav = {
                                    uid: $scope.uid,
                                    uname: $scope.uname,
                                    uicon: $scope.uicon,
                                    vid: $scope.vid,
                                    vccomment: $scope.vContent,
                                    vctime: date,
                                };


                                $http({
                                    method: 'GET',
                                    url: serverUrl + 'video/insertVideoComment',
                                    params: {
                                        vid: $scope.vid,
                                        uid: $scope.uid,
                                        vcomment: $scope.vContent,
                                    }
                                }).then(function (response) {
                                    $scope.videoComment.splice(0, 0, datav);
                                    console.log('插入成功')

                                })
                            }else {
                                alert('内容不能为空');
                            }

                        } else {
                            $state.go('login');
                            alert('请先登录')
                        }


                    }


                }]

        }
    });


$(document).on('click', '.comment-tilte div i', function () {
    $(this).css('color', '#e84e40');
})
