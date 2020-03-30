'use strict';

angular.module("myApp", ["ngRoute", "myApp.home", "myApp.feedback"]).config(["$routeProvider", function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);