/**
 * Created by lcx on 2017/4/23.
 */
angular.module('indexBurn')
    .directive('indexPage', function () {
            return {
                restrict: "ACE",
                replace: true,
                templateUrl: 'index/index-page.template.html',
                controller: [
                    '$scope',
                    '$http',
                    '$state',
                    'serverUrl',
                    'iconUrl',
                    function ($scope,$http,$state,serverUrl,iconUrl) {
                    $scope.iconUrl=iconUrl;
                    //获取博客推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getBlogPush',
                    }).then(
                        function (response) {
                            $scope.blogPush=response.data.result;
                        }
                    )

                    //获取视频推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getVideoPush',
                    }).then(
                        function (response) {
                            $scope.videoPush=response.data.result;
                        }
                    )


                    //查看视频详细
                    $scope.watchVideoPush = function (vid, vprice, vname, vtime, vpic) {
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


                    //获取课程推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getCoursePush',
                    }).then(
                        function (response) {
                            $scope.coursePush=response.data.result;
                        }
                    )

                    //获取教练推荐
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getCoachPush',
                    }).then(
                        function (response) {
                            $scope.coachPush=response.data.result;
                            console.log($scope.coachPush);
                        }
                    )

                    //推送博客详情页面
                    $scope.blogPushDetail=function (bid) {
                        $state.go('blog-detail',{bid:bid});
                    }

                }]
            }
        }

    );