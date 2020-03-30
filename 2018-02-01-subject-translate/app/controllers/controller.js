'use strict';

angular.module('myApp.views', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/views', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.LanguageDb = {
        ru: 'ru'
    };
    $scope.Data = [];
    $scope.query = []; //filter query

    var database = firebase.database().ref('language/' + $scope.LanguageDb.ru);

    database.on('value', function(snapshot) {
        angular.forEach(snapshot.val(), function(item) {
            $scope.Data.push(item);
        });
    });

    //New data input
    $scope.SendTranslation = function(){
        database.push({
            subject: $scope.input_original,
            translation: $scope.input_translation
        });
        $scope.input_original = null;
        $scope.input_translation = null;
        // $('.alert-success').show();
    };

    //empty object\array check
    $scope.isEmpty = function(obj) {
        for (var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    //Data load timer
    setTimeout(function(){
        $scope.$apply();
    }, 4000);
}]);