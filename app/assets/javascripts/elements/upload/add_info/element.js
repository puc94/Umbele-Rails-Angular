angular
.module('amahleApp.elements')
.directive('elementUploadAddInfo', ['$rootScope', '$timeout', 'imagesService',
function ($rootScope, $timeout, imagesService){
    return {
        restrict: 'E',
        scope: {
            'onUploadDogInfo': '&',
            'dogInfo': '='
        },
        transclude: true,
        templateUrl: 'elements/upload/add_info/template.html',
        link: function (scope, element, attrs) {
            scope.ages = ["Young", "Puppy", "Juevenille", "Adult", "Old"];
            scope.breeds = ["Beagle", "Border Collie", "Boxer", "Bull Terrier", "Bulldog", "Dachsund", "Dalmation", "German Shepard", "Labrador", "Poodle", "Shiba Inu", "Yorkshire Terrier"];
            scope.photo_types = ['Celebraty', 'Stylelist', 'Yourself', 'Yours', 'Random'];

            scope.uploadDogInfo = function() {
                if (scope.onUploadDogInfo) {
                    scope.onUploadDogInfo();
                }
            }
        }
    }
}]);