angular
.module('amahleApp.elements')
.directive('elementUploadInfoCorrect', ['$rootScope', 'imagesService',
function ($rootScope, imagesService){
    return {
        restrict: 'E',
        scope: {
            'onUploadDogInfo': '&',
            'onChangeImage': '&',
            'dogInfo': '='
        },
        transclude: true,
        templateUrl: 'elements/upload/info_correct/template.html',
        link: function (scope, element, attrs) {
            scope.uploadDogInfo = function() {
                if (scope.onUploadDogInfo) {
                    scope.onUploadDogInfo();
                }
            }

            scope.changeImage = function() {
                if (scope.onChangeImage) {
                    scope.onChangeImage();
                }
            }
        }
    }
}]);