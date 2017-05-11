/**
 * Created by Yezi on 2017/4/21.
 */
angular.module('login')
    .directive('loginPart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'login/login.template.html',
            controller:['$scope','loginService2','$rootScope',function ($scope,loginService2,$rootScope) {
                $scope.login=function () {
                    $rootScope.check = $('#chk_remember').get(0).checked;
                    loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                }
            }]
        }
    })
    .directive('utelcheck1',function () {
        var tel_regexp = /^1[34578]\d{9}$/;
        return{
            require:'ngModel',
            link:function (sco,ele,att,con) {
                con.$validators.utelcheck1 = function (v) {
                    if(tel_regexp.test(v)){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
    });
