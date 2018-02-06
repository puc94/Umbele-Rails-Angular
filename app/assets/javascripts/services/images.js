angular
.module('amahleApp.services')
.service('imagesService', ['$http', '$rootScope', '$q', '$location', '$cookies', function ($http, $rootScope, $q, $location, $cookies){
    // Parse back4app Initialize
    Parse.initialize("vP79sdltVqIv08jXCdIM05Y0o3qk6OEpwHwtTGCX", "vsUGF5AHQjnalQBGgnfRYgdZQOmKWFfVVuj9blv1");
    Parse.serverURL = 'https://parseapi.back4app.com';

    this.getImages = function(scope) {
        var storeCounts = {}, breed;
        var mobileProductList = [];
        var desktopProductList = [];

        // Select Image Table
        var Images = Parse.Object.extend("Images");
        var query = new Parse.Query(Images);

        // Get Rows
        query.descending("likes");
        query.limit(1000);
        query.find()
            .then(function(results) {
                // Split rows by breed
                for (var i = 0; i < results.length; i++) {
                    breed = results[i].get('breed');

                    if (!storeCounts[breed]) {
                        storeCounts[breed] = [];
                        storeCounts[breed].push(results[i]);
                    }

                    storeCounts[breed].push(results[i]);
                }

                // Select highest voted controllers and write it to local variable
                var storeInfo, productImage, productImageUrl, likes, count = 0;
                angular.forEach(storeCounts, function(value, key) {
                    storeInfo = storeCounts[key];
                    breed = storeInfo[0].get('breed');
                    likes = storeInfo[0].get('likes');
                    productImage = storeInfo[0].get("imageFile");
                    productImageUrl = productImage.url();
                    if (count++ % 3 == 0) {
                        mobileProductList.push([{ breed: breed, image: productImageUrl, likes: likes }]);
                    }
                    else {
                        mobileProductList[mobileProductList.length - 1].push({ breed: breed, image: productImageUrl, likes: likes });
                    }

                    desktopProductList.push({ breed: breed, image: productImageUrl, likes: likes });
                })

                scope.loadImages(mobileProductList, desktopProductList);
            })
            .catch(function(err) {
                scope.error = err;
            });
    }

    this.getBreeds = function(scope) {
        var storeCounts = {}, breed;
        var breedList = [];

        // Select Image Table
        var Images = Parse.Object.extend("Images");
        var query = new Parse.Query(Images);

        // Get Rows
        query.descending("likes");
        query.limit(1000);
        query.find()
            .then(function(results) {
                // Split rows by breed
                for (var i = 0; i < results.length; i++) {
                    breed = results[i].get('breed');

                    if (!storeCounts[breed]) {
                        storeCounts[breed] = [];
                        storeCounts[breed].push(results[i]);
                    }

                    storeCounts[breed].push(results[i]);
                }

                // Select highest voted controllers and write it to local variable
                var storeInfo;
                angular.forEach(storeCounts, function(value, key) {
                    storeInfo = storeCounts[key];
                    breed = storeInfo[0].get('breed');
                    breedList.push(breed);
                })

                scope.loadBreeds(breedList);
            })
            .catch(function(err) {
                scope.error = err;
            });
    }

    this.uploadPhoto = function(data, scope) {
        return $http.post(
            '/images/uploadPhoto',
            data,
            {
                headers: {
                    "Content-Type": undefined,
                },
                transformRequest: angular.identity
            }
        ).then(handleSuccess, handleError);
    }

    this.saveImage = function(data, scope) {
        return $http.post(
            '/images/saveImage',
            data,
            {
                headers: {
                    "Content-Type": undefined,
                },
                transformRequest: angular.identity
            }
        ).then(handleSuccess, handleError);
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }
}]);