angular.module('jeweleryAdminApp.controllers', []);

angular.module('jeweleryAdminApp.controllers')
    .controller('MainController', ['$scope', 'Utils', function($scope, Utils) {
        $scope.utils = Utils;
        $scope.menuTypes = {
            top: 'Верхнее меню',
            authorWorks: 'Авторские работы',
            usefullAdditions: 'Секция "полезные дополнения"'
        };
    }]);