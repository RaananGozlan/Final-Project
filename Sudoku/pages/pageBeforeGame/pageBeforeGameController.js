angular.module("sudokuApp")
    .controller("pageBeforeGameController", function ($scope, $http, $location, $window, $rootScope) {


        //if numbers
        if($rootScope.gameInstance === 0){
            $scope.numbers = true;
            $scope.colors= false;
        }

        //if colors
        if($rootScope.gameInstance === 1){
            $scope.numbers = false;
            $scope.colors= true;
        }


        $scope.start= function () {

            $location.url('/sudokuGame');

        }


    })