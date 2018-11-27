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
                narrowItDown.found =  response;
            })
        };
        narrowItDown.removeItem = function(index){
            console.log(narrowItDown.found.length);                   
            narrowItDown.found.slice(index,1);
            console.log('itemremoved');
            console.log(narrowItDown.found.length);     
        };
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
                if (searchTerm != ""){
                    foundItems = result.data.menu_items.filter(o => o.description.indexOf(searchTerm) != -1);
                }               
                // return processed items
                return foundItems;
            });
        };

    }

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemstemplate.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    };


})();
