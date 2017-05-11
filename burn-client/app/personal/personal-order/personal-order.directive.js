/**
 * Created by Yezi on 2017/4/23.
 */
angular.module('personalOrder')
    .directive('personalOrderPart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'personal/personal-order/personal-order.template.html',
            controller:['$scope',
                '$http',
                '$state',
                '$rootScope',
                'getVideoOrderService',
                'videoUrl',
                'deletevideoService',
                function ($scope,$http,$state,$rootScope,getVideoOrderService,videoUrl,deletevideoService) {
                    $scope.videoUrl = videoUrl;

                    $(function () {
                        getVideoOrderService.getVideoOrder($rootScope.uid);
                    })


                    $scope.showOrder = function () {
                        getVideoOrderService.getVideoOrder($rootScope.uid);
                    }

                    //删除订单
                    $scope.deleteOrder=function (oid) {
                        deletevideoService.deleteOrder(oid);
                        $scope.showOrder();
                    }

            }]
        }
    });