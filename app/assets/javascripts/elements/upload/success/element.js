angular
.module('amahleApp.elements')
.directive('elementUploadSuccess', ['$rootScope',
function ($rootScope){
    return {
        restrict: 'E',
        scope: {
            'onInitPhoto': '&'
        },
        transclude: true,
        templateUrl: 'elements/upload/success/template.html',
        link: function (scope, element, attrs) {
            scope.initPhoto = function() {
                if (scope.onInitPhoto) {
                    scope.onInitPhoto();
                }
            }
        }

    }
}]);