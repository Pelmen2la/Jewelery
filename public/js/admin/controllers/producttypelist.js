angular.module('jeweleryAdminApp.controllers').controller('AdminProductTypeListController', ['$scope', '$state', 'ProductType',
    function($scope, $state, ProductType) {
        loadData();
        $scope.newProductTypeData = {
            name: ''
        };

        $scope.tryDeleteProductType = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить тип товара?')) {
                ProductType.delete({id: id}, function() {
                    loadData();
                });
            }
        };

        $scope.onAddProductTypeClick = function() {
            new ProductType($scope.newProductTypeData).$save(function() {
                loadData();
                $scope.newProductTypeData.name = '';
            });
        };

        function loadData() {
            $scope.producttypes = ProductType.query({}, function() {
            });
        };
    }]);