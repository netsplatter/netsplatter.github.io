'use strict';

angular.module('myApp.home', ['ngRoute', "chart.js"])
    //Declared route 
    .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
        $routeProvider.when('/', {templateUrl: 'views/main.html', controller: 'HomeCtrl'});

        ChartJsProvider.setOptions({
            chartColors: ['#c3eaf1', '#FF8A80', '#39282f'],
            legend: {
                display: true
            },
            tooltips: {
                enabled: true
            },
            title: {
                display: true
            }
        });
    }])

.controller('HomeCtrl', ['$scope', function ($scope) {

    var countRef = firebase.database().ref("testvalue/");


    // pieChart labels
    $scope.labels = ["Christian", "Pastafarian", "Muslim"];
    //$scope.data = [$scope.ChristCount, $scope.PastaCount, $scope.MuslimCount];

    // dynamic server values updates

    countRef.on('value', function(snapshot) {
        $scope.ChristCount = snapshot.val().christian;
        $scope.PastaCount = snapshot.val().pastafarian;
        $scope.MuslimCount = snapshot.val().muslim;
        $scope.data = [$scope.ChristCount, $scope.PastaCount, $scope.MuslimCount];
    });

    $scope.Vote = function(countName){
        if (countName == "ChristVote"){
            countRef.update({
                christian: $scope.ChristCount + 1
            });
        }
        if (countName == "PastaVote"){
            countRef.update({
                pastafarian: $scope.PastaCount + 1
            });
        }
        if (countName == "MuslimVote"){
            countRef.update({
                muslim: $scope.MuslimCount + 1
            });
        }
    };
    //Data load timer
    setTimeout(function(){
        $scope.$apply();
    }, 2000);
}]);

angular.module('myApp.feedback', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/feedback', {templateUrl: 'views/feedback.html', controller: 'FeedbackCtrl'});
    }])

        .controller('FeedbackCtrl', ['$scope', function ($scope) {


    }]);