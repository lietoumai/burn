/**
 * Created by Yezi on 2017/5/2.
 */
angular.module('videoBuy')
    .directive('videoBuyPage',function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'video/video-buy/video-buy.template.html',
            controller:['$scope','$stateParams','$http','$state','serverUrl',function ($scope,$stateParams,$http,$state,serverUrl) {
               $scope.data=JSON.parse($stateParams.data);
               $scope.vid=$scope.data.vid;
               $scope.vname=$scope.data.vname;
               $scope.vprice=$scope.data.vprice;
               $scope.vtime=$scope.data.vtime;
               $scope.vpic=$scope.data.vpic;


               //购买视频
               $scope.buyVideo=function () {
                   var s = localStorage.getItem('isLogin');
                   var s1 = sessionStorage.getItem('isLogin');
                   if(s||s1){
                       if(parseInt($scope.upointcount)>=parseInt($scope.vprice)){
                           $http({
                               method: 'GET',
                               url: serverUrl + 'video/insertVideoOrder',
                               params: {
                                   vid: $scope.vid,
                                   uid: $scope.uid,
                                   vprice:$scope.vprice,
                               }
                           }).then(function (response) {
                               $scope.isBuy=response.data.result;
                               if($scope.isBuy===1){
                                   alert('购买成功，立即查看')
                                   $state.go('video-detail',{vid:$scope.vid});
                               }
                               else {
                                   alert('购买失败')
                               }
                           })
                       }else {
                           alert('余额不足')
                       }
                   }else{
                       $state.go('login');
                       alert('请先登录')
                   }

               }


            }]
        }
    })