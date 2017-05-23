/**
 * Created by Yezi on 2017/4/21.
 */
angular.module('course')
    .directive('coursePage', function () {
            return {
                restrict: "ACE",
                replace: true,
                templateUrl: 'course/course-page.template.html',
                controller: ['$http','$scope','serverUrl','IconUrl','selectcal','$filter','courseUrl','courseTimeService',
                    function ($http,$scope,serverUrl,IconUrl,selectcal,$filter,courseUrl,courseTimeService) {

                    //明日课程信息
                    $scope.now = new Date().getTime()+1000*60*60*24;   //获取明天日期



                    //倒计时
                        var starttime = new Date("2017/5/10 15:00:00");
                        setInterval(function () {
                            var nowtime = new Date();
                            var time = starttime - nowtime;
                            var day = parseInt(time / 1000 / 60 / 60 / 24);
                            var hour = parseInt(time / 1000 / 60 / 60 % 24);
                            var minute = parseInt(time / 1000 / 60 % 60);
                            var seconds = parseInt(time / 1000 % 60);
                            $('.timespan').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
                        }, 1000);

                    $scope.IconUrl = IconUrl;
                    $scope.courseUrl = courseUrl;

                    //获取今日课程
                        $http.get(serverUrl+'courses/getTodayCourse/')
                            .then(function successCallback(response) {
                                if(response.data.result.length>0){
                                    $scope.coursedataToday = response.data.result;
                                }else{
                                    $('#noneCourse').html('<p style="color: #e84e40">明日暂未发布课程，请预约其他日期</p>');
                                }
                            });



                    //获取未来的全部课程
                    $http.get(serverUrl+'courses/getCourse/')
                        .then(function successCallback(response) {
                            if(response.data.result.length>0){
                                $scope.coursedata = response.data.result;
                            }
                    });



                    //根据日历选择课程
                    $scope.selectcal = function () {
                        var myJsDate=$filter('date')($scope.loanDate,'yyyy-MM-dd');
                        selectcal.selectcal({cdate:myJsDate});
                    }



                }]
            }
        }
    )