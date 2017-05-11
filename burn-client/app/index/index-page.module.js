/**
 * Created by lcx on 2017/4/23.
 */
angular.module('indexBurn',[
    'ui.bootstrap',
    'ngAnimate',
    'publicUrl'
])
    .controller('CarouselDemoCtrl', function ($scope) {
        $scope.myInterval = 2000;
        $scope.noWrapSlides = false;
        var slides = $scope.slides = [];
        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'upfile/img03.jpg',
                text: '欢迎来到瑜伽课堂',
            });
            slides.push({
                image: 'upfile/img02.jpg',
                text: '欢迎来到拳击课堂',
            });
            slides.push({
                image: 'upfile/img01.jpg',
                text: '欢迎来到有氧呼吸课堂',
            });
        };
        $scope.addSlide();
    });;