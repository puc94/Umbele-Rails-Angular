angular
.module('amahleApp.controllers')
.controller('uploadController', ['$scope', '$rootScope', '$cookies', '$http', '$routeParams', '$timeout', 'imagesService',
function ($scope, $rootScope, $cookies, $http, $routeParams, $timeout, imagesService){
    $scope.imageSrc = "/images/default.png";
    $scope.imageFile = {};
    $scope.currentStatus = "select";
    $scope.title = "Select Image";
    $scope.loading = false;

    $scope.ages = ["Young", "Puppy", "Juevenille", "Adult", "Old"];
    $scope.breeds = ["Beagle", "Border Collie", "Boxer", "Bull Terrier", "Bulldog", "Dachsund", "Dalmation", "German Shepard", "Labrador", "Poodle", "Shiba Inu", "Yorkshire Terrier"];
    $scope.photo_types = ['Celebraty', 'Stylelist', 'Yourself', 'Yours', 'Random'];

    $scope.dogInfo = { age: "", breed: "", photoType: "" };

    $scope.$watch('currentStatus', function(data) {
        switch (data) {
            case "select":
                $scope.title = "Select Image";
                break;
            case "upload":
                $scope.title = "Upload";
                break;
            case "add_info":
                $scope.title = "Add Info...";
                break;
            case "info_correct":
                $scope.title = "Info Correct?";
                break;
            case "success":
                $scope.title = "Image Uploaded!";
                break;
            default:
                $scope.title = "Select Image";
                break;
        }
    });

    $scope.initPhoto = function() {
        $scope.setStatus("select");
        $rootScope.setImage("/images/default.png");
        $scope.dogInfo = { age: "", breed: "", photoType: "" };
    }

    $rootScope.setImage = function(imgSrc, imgFile) {
        $scope.imageSrc = imgSrc;
        $scope.imageFile = imgFile;
        if (imgSrc && imgSrc != "/images/default.png") {
            $scope.setStatus("upload");
        }
    }

    $scope.changeImage = function() {
        $scope.setStatus("add_info");
    }

    $scope.uploadPhoto = function() {
        var fd = new FormData();
        fd.append("image", $scope.imageFile);

        $scope.setLoading();
        imagesService.uploadPhoto(fd).then(function (res) {
            console.log(res);
            $scope.releaseLoading();
            var dogInfo = { age: "", breed: "", photoType: "" };
            var prediction = res.data.prediction;

            angular.forEach($scope.ages, function(value) {
                var re = new RegExp(value, "i");
                if (prediction.match(re)) { dogInfo.age = value }
            });

            angular.forEach($scope.breeds, function(value) {
                var re = new RegExp(value, "i");
                if (prediction.match(re)) { dogInfo.breed = value }
            });

            $scope.dogInfo = dogInfo;
            $scope.setStatus("info_correct");
        })
            .catch(function (error) {
                console.log(error);
                alert("Invalid Photo");
                $scope.releaseLoading();
                $scope.initPhoto();
                $scope.setStatus("select");
            });
    }

    $scope.uploadDogInfo = function() {
        var fd = new FormData();
        fd.append("image", $scope.imageFile);
        fd.append("breed", $scope.dogInfo.breed);
        fd.append("age", $scope.dogInfo.age);
        fd.append("photoType", $scope.dogInfo.photoType);

        $scope.setLoading();
        imagesService.saveImage(fd).then(function (res) {
            console.log(res);
            $scope.releaseLoading();
            $scope.setStatus("success");
        })
            .catch(function (error) {
                console.log(error);
                $scope.releaseLoading();
            });
    }

    $scope.setStatus = function(status) {
        $scope.setLoading();
        $timeout(function() {
            $scope.currentStatus = status;
            $scope.releaseLoading();
        }, 1200);
    }

    $scope.setLoading = function() {
        $scope.loading = true;
    }

    $scope.releaseLoading = function() {
        $scope.loading = false;
    }
}]);