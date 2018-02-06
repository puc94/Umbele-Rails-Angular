angular
.module('amahleApp.elements')
.directive('elementUploadUpload', ['$rootScope',
function ($rootScope){
    return {
        restrict: 'E',
        scope: {
            'onUploadPhoto': '&'
        },
        transclude: true,
        templateUrl: 'elements/upload/upload/template.html',
        link: function (scope, element, attrs) {
            scope.uploadPhoto = function() {
                if (scope.onUploadPhoto) {
                    scope.onUploadPhoto();
                }
            }
        }
    }
}]);