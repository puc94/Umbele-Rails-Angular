angular
.module('amahleApp.elements')
.directive('elementUploadSelect', ['$rootScope',
function ($rootScope){
    return {
        restrict: 'E',
        scope: true,
        transclude: true,
        templateUrl: 'elements/upload/select/template.html',
        link: function (scope, element, attrs) {
            scope.setImage = function(fileInput) {
                var files = fileInput.files;
                if (FileReader && files && files.length) {
                    var fr = new FileReader();
                    fr.onload = function () {
                        $rootScope.setImage(fr.result, files[0]);
                        $rootScope.$apply();
                    }
                    fr.readAsDataURL(files[0]);
                }
            }
        }
    }
}]);