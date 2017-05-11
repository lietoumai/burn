/**
 * Created by Yezi on 2017/4/30.
 */
angular.module('coach')
    .directive('coachPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'coach/coach.template.html',
            controller: ['$http',
                '$scope',
                '$rootScope',
                'showCoachKindService',
                'showCoachquanService',
                'serverUrl',
                'IconUrl',
                function ($http, $scope,$rootScope,showCoachKindService, showCoachquanService,serverUrl,IconUrl) {
                showCoachKindService.showkindtype();
                showCoachquanService.showjobtype();
                $scope.IconUrl = IconUrl;

                // 筛选条件组合
                $scope.conditions = {
                    kindItem: '',
                    quanItem: '',
                },

                $http.get(serverUrl+'coachs/showcoach/')

                    .then(function successCallback(response) {
                        if(response.data.result.length>0){

                            $scope.CoachList = response.data.result;
                            $scope.showCoach = $scope.CoachList;
                            $scope.part = response.data.result;

                            var page_ave = 4;
                            //默认总的页数
                            var page_count = 1;
                            var page_dis = 0;
                            var sta = 0;
                            var end;

                            $scope.kindSelect = function (k) {
                                $scope.conditions.kindItem = k;
                                $scope.filterCoach($scope.conditions);


                            },
                            $scope.quanSelect = function (q) {
                                $scope.conditions.quanItem = q;
                                $scope.filterCoach($scope.conditions);

                            }


                            $scope.filterCoach = function (conditions) {

                                $scope.showCoach = [];
                                $scope.showCoach = $scope.CoachList;


                                $scope.showcoach_kind = [];
                                if ($scope.conditions.kindItem != 0) {

                                    for (var i = 0; i < $scope.showCoach.length; i++) {
                                        if ($scope.showCoach[i].cotag.indexOf($scope.conditions.kindItem)!=-1) {
                                            $scope.showcoach_kind.push($scope.showCoach[i])
                                        }
                                    }

                                } else {
                                    $scope.showcoach_kind = $scope.showCoach;
                                }

                                $scope.showcoach_quan = [];
                                if ($scope.conditions.quanItem != 0) {
                                    for (var i = 0; i < $scope.showcoach_kind.length; i++) {
                                        if ($scope.showcoach_kind[i].cqname == $scope.conditions.quanItem) {
                                            $scope.showcoach_quan.push($scope.showcoach_kind[i])
                                        }
                                    }
                                } else {
                                    $scope.showcoach_quan = $scope.showcoach_kind;
                                }
                                $scope.part = $scope.showcoach_quan;
                                $scope.turnPage(page_count);

                            }


                            $scope.partNew = [];
                            $scope.page_now = 1;
                            //每页的显示条数
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
                    });



}],
}})


$(document).on('click', '.classify-item ul li', function () {
    $(this).find('i').show().parent().siblings().find('i').hide();
})