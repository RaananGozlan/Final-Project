angular.module("sudokuApp")
    .controller("pageBeforeGameController", function ($scope, $http, $location, $window, $rootScope) {


        $rootScope.gameInstance = JSON.parse(sessionStorage.getItem("gameInstance"));
        console.log("gameinstance isssssss");
        console.log($rootScope.gameInstance);
        //if numbers
        if($rootScope.gameInstance == 0){
            $scope.numbers = true;
            $scope.colors= false;
            $scope.ks= false;
        }

        //if colors
        if($rootScope.gameInstance == 1){
            $scope.numbers = false;
            $scope.colors= true;
            $scope.ks= false;
        }

        //if ks
        if($rootScope.gameInstance == 2 || $rootScope.gameInstance == 3 ){
            $scope.numbers = false;
            $scope.colors= false;
            $scope.ks= true;
        }


        $scope.start= function () {

            if($rootScope.gameInstance == 2 || $rootScope.gameInstance == 3 ){
                $location.url('/KnapsackGame');
            }else{
                $location.url('/sudokuGame');

            }


        }


    })