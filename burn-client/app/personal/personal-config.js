/**
 * Created by Yezi on 2017/4/24.
 */
angular.module('personal')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/homepage');
        $stateProvider
            .state('personal.homepage', {
                url: '/homepage',
                template: '<personal-homepage-part></personal-homepage-part>',
            })
            .state('personal.course', {
                url: '/personal.course',
                template: '<personal-course-part></personal-course-part>',
            })
            .state('personal.order', {
                url: '/personal.order',
                template: '<personal-order-part></personal-order-part>',
                controller: ['$state', function ($state) {
                    $state.go('personal.order');
                }]
            })
            .state('personal.collect', {
                url: '/personal.collect',
                template: '<personal-collect-part></personal-collect-part>',
            })
            .state('personal.set', {
                url: '/personal.set',
                template: '<personal-set-part></personal-set-part>',
            })
            .state('personal.coach', {
                url: '/personal.coach',
                template: '<personal-coach-part></personal-coach-part>',
            })
            .state('personal.coachwork', {
                url: '/personal.coachwork',
                template: '<personal-coach-work-part></personal-coach-work-part>',
            })
    }])
