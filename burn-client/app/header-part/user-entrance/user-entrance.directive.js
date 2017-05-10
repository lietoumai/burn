/**
 * Created by Yezi on 2017/4/21.
 */
angular.module('userEntrance').
directive('userEntrancePart',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'header-part/user-entrance/user-entrance.template.html',
        controller:['$scope','$http','$rootScope','logout','$window','$state','IconUrl',function ($scope,$http,$rootScope,logout,$window,$state,IconUrl) {
            $scope.IconUrl = IconUrl;
            $scope.zhuxiao=function () {
                logout.logout();
                $scope.reloadRoute = function () {
                    $window.location.reload();
                    $state.go('index');
                };
                $scope.reloadRoute();

            }

        }]
    }
});