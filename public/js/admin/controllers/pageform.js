angular.module('jeweleryAdminApp.controllers')
    .controller('PageEditController', ['$scope', '$stateParams', 'Page', function($scope, $stateParams, Page) {
        $scope.page = Page.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('PageCreateController', ['$scope', 'Page', function($scope, Page) {
        $scope.page = new Page();
    }])
    .controller('PageFormController', ['$scope', '$state', 'ProductType', function($scope, $state, ProductType) {
        ProductType.query({}, function(productTypes) {
            $scope.productTypes = productTypes.concat([{ name: 'Все', _id: 'all' }, { name: 'Не показывать', _id: -1 }]);
        });

        $scope.submitPage = function() {
            if($scope.page._id) {
                $scope.page.$update({id: $scope.page._id}, function() {
                    $state.go('index');
                });
            } else {
                $scope.page.$save(function(result) {
                    $state.go('index');
                });
            }
        };
        $scope.back = function() {
            $state.go('pages');
        };
    }]);

