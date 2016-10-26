angular.module('jeweleryAdminApp.controllers')
    .controller('ProductEditController', ['$scope', '$stateParams', 'Product', function($scope, $stateParams, Product) {
        $scope.product = Product.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('ProductCreateController', ['$scope', 'Product', function($scope, Product) {
        $scope.product = new Product();
    }])
    .controller('ProductFormController', ['$scope', '$state', 'FileUploader', 'ProductType', function($scope, $state, FileUploader, ProductType) {
        $scope.productTypes = ProductType.query({}, function() {
        });

        ['small', 'big'].forEach(function(imageSize) {
            var uploaderName = imageSize + 'ImageUploader',
                uploader = $scope[uploaderName] = new FileUploader({
                url: 'admin/upload/product/image/' + imageSize
            });
            uploader.onAfterAddingFile = function(fileItem) {
                uploader.uploadAll();
            };
            uploader.onCompleteItem = function(fileItem, response) {
                response.success && ($scope.product[imageSize + 'ImageUrl'] = response.imageUrl);
                $('#' + uploaderName).val(null);
            };
        });

        $scope.submitProduct = function() {
            if($scope.product._id) {
                $scope.product.$update({id: $scope.product._id}, function() {
                    $state.go('products');
                });
            } else {
                $scope.product.$save(function(result) {
                    $state.go('products');
                });
            }
        };
        $scope.back = function() {
            $state.go('products');
        };
    }]);

