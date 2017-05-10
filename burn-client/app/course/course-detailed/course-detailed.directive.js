/**
 * Created by lcx on 2017/4/30.
 */
angular.module('courseDetaileds')
    .directive('courseDetailedPages',function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'course/course-detailed/course-detailed.template.html',
            controller: ['$scope',
                '$stateParams',
                'selectCourseDetailed',
                'selectCourseService',
                'courseCountService',
                '$rootScope',
                'IconUrl',
                'courseUrl',
                'courseTimeService',
                '$state',
                function ($scope,$stateParams,selectCourseDetailed,selectCourseService,courseCountService,$rootScope,IconUrl,courseUrl,courseTimeService,$state) {
                $scope.courseUrl = courseUrl;
                $scope.IconUrl = IconUrl;

                //查看课程是否已经过期
                $(function () {
                    courseTimeService.sellectCourseTime({cid:$stateParams.cid});
                })


                selectCourseDetailed.selectCourseDetailed({cid:$stateParams.cid});
                courseCountService.selectCourseCount({cid:$stateParams.cid});



                        $scope.selectCourse = function () {
                            var s = localStorage.getItem('isLogin');
                            var s1 = sessionStorage.getItem('isLogin');
                            if(s||s1){
                            selectCourseService.selectCourse({cid:$stateParams.cid,uid:$rootScope.uid});
                            }else{
                                $state.go('login');
                                alert('请先登录')
                            }
                        }


            }]
        }
    })