angular.module('jeweleryAdminApp.controllers').controller('AdminPartnerListController', ['$scope', '$state', 'Partner',
    function($scope, $state, Partner) {
        loadData();

        $scope.openPartnerForm = function(id) {
            $state.go('partnerForm', {id: id});
        };
        $scope.tryDeletePartner = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить партнера?')) {
                Partner.delete({id: id}, function() {
                    loadData();
                });
            }
        };

        function loadData() {
            $scope.partners = Partner.query({}, function() {
            });
        }
    }]);