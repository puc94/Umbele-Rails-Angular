'user strict';

// Define Controller
angular.module('amahleApp.controllers', []);
// Define Directive
angular.module('amahleApp.directives', []);
// Define Services
angular.module('amahleApp.services', []);

angular.module('amahleApp.filters', []);

angular.module('amahleApp.elements', []);

angular.module('amahleApp.templates', []);
//models

var dependencies = [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ngMaterial',
    'angularGrid',
    'templates',
    'amahleApp.controllers',
    'amahleApp.directives',
    'amahleApp.services',
    'amahleApp.filters',
    'amahleApp.elements',
    'amahleApp.templates',
];

angular.module('amahleApp', dependencies)

    .constant('wsEntryPoint', window.location.host)
    .constant('wsConfig', {
        'reconnection delay': 1000,
        'reconnection limit': 1000,
        'max reconnection attempts': 'Infinity'
    })

    .constant('firstLoadEventList', ['connected'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        // for location prefix
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        // for router
        $routeProvider.
        when('/', {
            templateUrl: 'images/index.html',
            controller: 'imagesController as vm'
        }).
        when('/upload', {
            templateUrl: 'upload/index.html',
            controller: 'uploadController as vm'
        }).
        otherwise({
            redirectTo: '/'
        });

        // for CSRF errors
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }])
    .run(function ($http) {

    });