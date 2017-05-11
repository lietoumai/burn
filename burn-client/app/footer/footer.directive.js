/**
 * Created by Yezi on 2017/4/10.
 */
angular.module('footer').
    directive('footerPart',function () {
        return{
            restrict:"ACE",
            replace:true,
            templateUrl:'footer/footer.template.html',
        }

})