/**
 * Created by Yezi on 2017/4/23.
 */
angular.module('personalCourse')
    .directive('personalCoursePart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'personal/personal-course/personal-course.template.html',
            controller: ['$state',
                'showCourseByIdService',
                '$rootScope',
                '$scope',
                'showappoByIdService',
                'getVideoOrderService',
                'videoUrl',
                'deleteCourseService',
                'getVideohistoryService',
                function (
                    $state,
                    showCourseByIdService,
                    $rootScope,$scope,
                    showappoByIdService,
                    getVideoOrderService,
                    videoUrl,
                    deleteCourseService,
                    getVideohistoryService) {

                $scope.videoUrl = videoUrl;


                //页面加载时执行
                $(function () {
                    $scope.alreadyCourse();
                })

                //查看选课信息
                $scope.showCourseById = function () {
                    showCourseByIdService.showCourseById($rootScope.uid);
                }
                //查看已经购买的课程
                $scope.alreadyCourse = function () {
                    getVideoOrderService.getVideoOrder($rootScope.uid);
                }

                //查看预约记录
                $scope.showAppoById = function () {
                    showappoByIdService.showAppoById($rootScope.uid);
                }
                
                //退课
                $scope.deleteCourse = function (k) {
                    deleteCourseService.deleteCourse(k);
                }
                
                $("#recent-watch").click(function(){
                    $("#personal-course-recent-watch").siblings().hide()

                    $("#personal-course-recent-watch").show();
                });
                $("#purchased").click(function(){
                    $("#personal-course-purchased").siblings().hide()
                    $("#personal-course-purchased").show();
                });

                $("#schedule").click(function(){
                    $("#personal-course-schedule").siblings().hide()

                    $("#personal-course-schedule").show();
                });
                $("#appoinment").click(function(){
                    $("#personal-course-appoinment").siblings().hide()

                    $("#personal-course-appoinment").show();
                });

            }]
        }
    });