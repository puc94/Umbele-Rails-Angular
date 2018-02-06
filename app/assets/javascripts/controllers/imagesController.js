angular
.module('amahleApp.controllers')
.controller('imagesController', ['$scope', '$rootScope', '$cookies', '$http', '$routeParams', '$timeout', 'imagesService',
function ($scope, $rootScope, $cookies, $http, $routeParams, $timeout, imagesService){
    var vm = this;
    vm.mobileProducts = [];
    vm.desktopProducts = [];
    vm.error = "";

    imagesService.getImages(vm);

    vm.loadImages = function(mobileProductList, desktopProductList) {
        $timeout(function () { vm.mobileProducts = angular.copy(mobileProductList);vm.desktopProducts = angular.copy(desktopProductList); }, 1e3);
    }
}]);