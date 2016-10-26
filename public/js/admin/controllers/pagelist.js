angular.module('jeweleryAdminApp.controllers').controller('AdminPageListController', ['$scope', '$state', 'Page',
    function($scope, $state, Page) {
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
            $scope.pages = Page.query({}, function() {
            });
        }
    }]);