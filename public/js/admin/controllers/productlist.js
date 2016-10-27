angular.module('jeweleryAdminApp.controllers').controller('AdminProductListController', ['$scope', '$state', 'Product', 'ProductType',
    function($scope, $state, Product, ProductType) {
        loadData();

        $scope.openProductForm = function(id) {
            $state.go('productForm', {id: id});
        };
        $scope.tryDeleteProduct = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить товар?')) {
                Product.delete({id: id}, function() {
                    loadData();
                });
            }
        };
        $scope.getProductTypeName = function(typeId) {
            for(var type, i = 0; type = $scope.productTypes[i]; i++) {
                if(type._id === typeId) {
                    return type.name;
                }
            }
            return '';
        };

        function loadData() {
            $scope.productsByType = {};
            ProductType.query({}, function(typeData) {
                $scope.productTypes = typeData;
                Product.query({}, function(productsData) {
                    productsData.forEach(function(productData) {
                        if(!$scope.productsByType[productData.typeId]) {
                            $scope.productsByType[productData.typeId] = []
                        }
                        $scope.productsByType[productData.typeId].push(productData);
                    });
                });
            });
        }
    }]);