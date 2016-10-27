angular.module('jeweleryAdminApp.controllers').controller('AdminPageListController', ['$scope', '$state', 'Page',
    function($scope, $state, Page) {
        $scope.pagesByMenuTypes = {};
        loadData();

        $scope.openPageForm = function(id) {
            $state.go('pageForm', {id: id});
        };
        $scope.tryDeletePage = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить страницу?')) {
                Page.delete({id: id}, function() {
                    loadData();
                });
            }
        };

        function loadData() {
            Page.query({}, function(pagesData) {
                pagesData.forEach(function(pageData) {
                    if(!$scope.pagesByMenuTypes[pageData.menuType]) {
                        $scope.pagesByMenuTypes[pageData.menuType] = []
                    }
                    $scope.pagesByMenuTypes[pageData.menuType].push(pageData);
                });
            });
        }
    }]);