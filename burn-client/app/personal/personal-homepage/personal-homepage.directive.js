/**
 * Created by Yezi on 2017/4/24.
 */
angular.module('personalHomepage')
    .directive('personalHomepagePart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl :'personal/personal-homepage/personal-homepage.template.html',
            controller:['$scope',
                '$http',
                '$state',
                'serverUrl',
                '$rootScope',
                'getBlogByuidService',
                'IconUrl',
                'blogCoverUrl',
                function ($scope,$http,$state,$rootScope,serverUrl,getBlogByuidService,IconUrl,blogCoverUrl) {
                $scope.IconUrl = IconUrl;
                $scope.blogCoverUrl =blogCoverUrl;
                $scope.icon = $rootScope.uicon;
                $scope.getBlogByuid1 = function () {
                    getBlogByuidService.getBlogByuid($rootScope.uid);
                }
            }]
        }
    });