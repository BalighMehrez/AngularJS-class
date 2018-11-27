(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', foundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;
        narrowItDown.searchTerm = "";
        narrowItDown.found = [];
        narrowItDown.findItems = function () {
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
            promise.then(function(response){
                narrowItDown.found=  response.data;
            })
            //narrowItDown.found = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
        };
        NarrowItDownController.removeItem = function(index){

        }
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http,ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems;
                foundItems = result.data.menu_items.find(o => o.description.indexOf(searchTerm) != -1);
                console.log(foundItems);
                // return processed items
                return foundItems;
            });
        };

    }

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    };


})();
