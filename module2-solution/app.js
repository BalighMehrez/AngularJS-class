(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var showList = this;

        showList.items = ShoppingListCheckOffService.getToBuyItems();

        showList.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var showList = this;
        showList.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuy = [
            { name: "cookies", quantity: 10 },
            { name: "Chips", quantity: 5 },
            { name: "Cheese", quantity: 15 },
            { name: "Eggs", quantity: 20 },
            { name: "Apples", quantity: 8 }
        ];
        var alreadyBought = [];

        service.buyItem = function (itemIdex) {
            alreadyBought.push(toBuy.splice(itemIdex, 1)[0]);
        };
        service.getToBuyItems = function () {
            return toBuy;
          };
          service.getBoughtItems = function () {
            return alreadyBought;
          };
    }

})();
