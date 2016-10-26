angular.module('jeweleryAdminApp.controllers', []);

angular.module('jeweleryAdminApp.controllers')
    .controller('MainController', ['$scope', 'Utils', function($scope, Utils) {
        $scope.utils = Utils;
    }]);