(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', MsgController);

    MsgController.$inject = ['$scope'];
    function MsgController($scope, $filter) {
        $scope.dishes = "";
        $scope.message = "";

        $scope.countDishes = function () {
            if ($scope.dishes == "") {
                $scope.message = "Please enter data first";
            }
            else {
                var noOfDishes = $scope.dishes.split(",").length;
                if (noOfDishes <= 3) {
                    $scope.message = "Enjoy!";
                }
                else {
                    $scope.message = "Too much!";
                };
            };

        };

    }

})();
