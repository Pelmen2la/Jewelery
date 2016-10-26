angular.module('jeweleryAdminApp.controllers').controller('AdminProductListController', ['$scope', '$state', 'Product',
    function($scope, $state, Product) {
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

        function loadData() {
            $scope.products = Product.query({}, function() {
            });
        }
    }]);