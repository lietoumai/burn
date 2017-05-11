/**
 * Created by Yezi on 2017/4/10.
 */
angular.module('header').
    directive('headerPart',function () {
        return{
            restrict:"ACE",
            replace:true,
            templateUrl:'header-part/header-part.template.html',
            controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
                /*$scope.conditions={
                    _search:'',
                };

                $scope.searchs=function (text) {
                    $scope.conditions._search=text;
                    $scope.filterBooks($scope.conditions);
                }*/
                $scope.content1=function () {
                    $scope.txt=$('.searchText').val();
                }
            }]
        }
});