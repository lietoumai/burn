/**
 * Created by Yezi on 2017/4/30.
 */
angular.module('coachDetail')
    .directive('coachDetailPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl :'coach/coach-detail/coach-detail.template.html',
            controller:['$scope',
                'showCoachDetailService',
                '$stateParams',
                'IconUrl',
                'showCoachCourseService',
                function ($scope,showCoachDetailService,$stateParams,IconUrl,showCoachCourseService) {
                $scope.IconUrl = IconUrl;
                console.log($stateParams.coid);
                showCoachDetailService.showcoachDetail({coid:$stateParams.coid});
                showCoachCourseService.getCourseThree({coid:$stateParams.coid});
            }]
        }
    });