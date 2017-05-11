/**
 * Created by Yezi on 2017/4/30.
 */

angular.module('video')
    .directive('videoPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'video/video.template.html',
            controller: ['$scope', '$state', '$http', 'serverUrl','$stateParams', function ($scope, $state, $http, serverUrl,$stateParams) {

                $scope.charge =new Array()
                $scope.charge=[
                    {"ischar":"免费"},
                    {"ischar":'收费'}
                ]

                $scope.aaa=$stateParams.serchTxt;

                // 筛选条件组合
                $scope.conditions = {
                    partItem: '',
                    kindItem: '',
                    rankItem: '',
                    freeItem: '',
                },


                    //获取部位数据
                    $http({
                        method: 'GET',
                        url: serverUrl + 'video/getPartType',
                    }).then(function (response) {
                        $scope.partType = response.data.result;
                    })

                //获取种类数据
                $http({
                    method: 'GET',
                    url: serverUrl + 'video/getKindType',
                }).then(function (response) {
                    $scope.kindType = response.data.result;
                })

                //获取难度数据
                $http({
                    method: 'GET',
                    url: serverUrl + 'video/getRankType',
                }).then(function (response) {
                    $scope.rankType = response.data.result;
                })





                //获取视频数据
                $http({
                    method: 'GET',
                    url: serverUrl + 'video/getVideo',
                }).then(
                    function (response) {
                        $scope.videoList = response.data.result;
                        $scope.showVideo = $scope.videoList;
                        $scope.part = response.data.result;

                        //每页显示个数
                        var page_ave = 8;
                        //默认总的页数
                        var page_count = 0;
                        var page_dis = 0;
                        var sta = 0;
                        var end;

                        $scope.partSelect = function (p) {
                            $scope.conditions.partItem = p;
                            $scope.filterVideo($scope.conditions);


                        },

                            $scope.kindSelect = function (k) {
                                $scope.conditions.kindItem = k;
                                $scope.filterVideo($scope.conditions);

                            },

                            $scope.rankSelect = function (r) {
                                $scope.conditions.rankItem = r;
                                $scope.filterVideo($scope.conditions);

                            }

                            $scope.free0fCharge=function (fc) {
                                $scope.conditions.freeItem = fc;
                                $scope.filterVideo($scope.conditions);
                            }


                        $scope.filterVideo = function (conditions) {

                            $scope.showVideo = [];
                            $scope.showVideo = $scope.videoList;

                            $scope.showVideo_part = [];
                            if ($scope.conditions.partItem != 0) {
                                for (var i = 0; i < $scope.showVideo.length; i++) {
                                    if ($scope.showVideo[i].pname == $scope.conditions.partItem) {
                                        $scope.showVideo_part.push($scope.showVideo[i])
                                    }
                                }
                            } else {
                                $scope.showVideo_part = $scope.showVideo;
                            };


                            $scope.showVideo_kind = [];
                            if ($scope.conditions.kindItem != 0) {
                                for (var i = 0; i < $scope.showVideo_part.length; i++) {
                                    if ($scope.showVideo_part[i].kname == $scope.conditions.kindItem) {
                                        $scope.showVideo_kind.push($scope.showVideo_part[i])
                                    }
                                }
                            } else {
                                $scope.showVideo_kind = $scope.showVideo_part;
                            };

                            $scope.showVideo_rank = [];
                            if ($scope.conditions.rankItem != 0) {
                                for (var i = 0; i < $scope.showVideo_kind.length; i++) {
                                    if ($scope.showVideo_kind[i].rname == $scope.conditions.rankItem) {
                                        $scope.showVideo_rank.push($scope.showVideo_kind[i])
                                    }
                                }
                            } else {
                                $scope.showVideo_rank = $scope.showVideo_kind;
                            };
                            $scope.showVideo_free = [];
                            if ($scope.conditions.freeItem != 0) {
                                if($scope.conditions.freeItem=='收费'){
                                    for (var i = 0; i < $scope.showVideo_rank.length; i++) {
                                            if ($scope.showVideo_rank[i].vprice>0) {
                                                $scope.showVideo_free.push($scope.showVideo_rank[i])
                                            }
                                    }

                                }else {
                                    for (var i = 0; i < $scope.showVideo_rank.length; i++) {
                                        if ($scope.showVideo_rank[i].vprice<=0) {
                                            $scope.showVideo_free.push($scope.showVideo_rank[i])
                                        }
                                    }
                                }

                            } else {
                                $scope.showVideo_free = $scope.showVideo_rank;
                            }

                            $scope.part = $scope.showVideo_free;
                            $scope.turnPage(0);

                        }


                        $scope.partNew = [];
                        $scope.page_now = 1;
                        //每页的评论条数
                        $scope.turnPage = function turnPage(page_now) {
                            $scope.part_count = [];
                            //获取总的数据量
                            var countAll = $scope.part.length;
                            //获取总的页数
                            page_count = Math.ceil(countAll / page_ave);
                            if (page_now < 1) {
                                $scope.page_now = 1;
                            } else if (page_now > page_count) {
                                $scope.page_now = page_count;
                            } else {
                                $scope.page_now = page_now;
                            }
                            if ($scope.page_now == 1) {
                                document.querySelector("#backPage").style.cursor = "not-allowed";
                                document.querySelector("#backPage").style.opacity = "0.8";
                            } else {

                                document.querySelector("#backPage").style.cursor = "pointer";
                                document.querySelector("#backPage").style.opacity = "1";

                            }

                            if ($scope.page_now == page_count) {

                                document.querySelector("#goPage").style.cursor = "not-allowed";
                                document.querySelector("#goPage").style.opacity = "0.8";

                            } else {

                                document.querySelector("#goPage").style.cursor = "pointer";
                                document.querySelector("#goPage").style.opacity = "1";

                            }
                            //当前页的显示数据
                            if (countAll == 0) {
                                page_dis = 0;
                            } else {
                                if (countAll % page_ave == 0)
                                    page_dis = page_ave;
                                else {
                                    page_dis = countAll % page_ave
                                }
                            }
                            //将数据定位到数组的指定位置
                            sta = ($scope.page_now - 1) * page_ave;
                            if ($scope.page_now == page_count) {
                                end = ($scope.page_now - 1) * page_ave + page_dis;
                            } else {
                                end = ($scope.page_now - 1) * page_ave + page_ave;
                            }


                            //显示新的数组
                            $scope.partNew = $scope.part.slice(sta, end);
                            //将页数总数放入数组里面
                            if (page_count < 3) {
                                for (var i = 0; i < page_count; i++) {
                                    $scope.part_count[i] = i + 1;
                                }
                            } else {
                                if (($scope.page_now + 2) >= page_count) {

                                    for (var i = 0; i <= 2; i++) {
                                        $scope.part_count[i] = i + page_count - 2;
                                    }
                                } else {
                                    for (var i = 0; i <= 2; i++) {
                                        $scope.part_count[i] = $scope.page_now + i;
                                    }
                                }
                            }
                        };
                        $scope.turnPage($scope.page_now);


                    }
                )

                $scope.isCharge = function (vid, vprice, vname, vtime, vpic) {
                    console.log(vprice);
                    console.log(vname);
                    console.log("vid"+"价格"+vprice);
                    if(vprice>0){
                        $http({
                            method:'Get',
                            url:serverUrl+'video/getOrderVideo',
                            params: {
                                vid: vid,
                                uid: $scope.uid,
                            }
                        }).then(function (response) {
                            $scope.isOrderVideo=response.data.result;
                            if($scope.isOrderVideo===1){
                                $state.go('video-detail',{vid:vid});
                            }else {
                                var data={
                                    vid:vid,
                                    vprice:vprice,
                                    vname:vname,
                                    vtime:vtime,
                                    vpic:vpic,
                                }
                                $state.go('video-buy', {data: JSON.stringify(data)});
                            }
                        })

                    }else {
                        $state.go('video-detail',{vid:vid});
                    }
                }
            }]

        }
    });


$(document).on('click', '.classify-item ul li', function () {
    $(this).find('i').show().parent().siblings().find('i').hide();
})
