angular.module('jeweleryAdminApp.controllers').controller('AdminImageSliderItemListController', ['$scope', '$state', 'ImageSliderItem',
    function($scope, $state, ImageSliderItem) {
        loadData();

        $scope.openImageSliderItemForm = function(id) {
            $state.go('imageSliderItemForm', {id: id});
        };
        $scope.tryDeleteImageSliderItem = function(id) {
            if(window.confirm('¬ы уверены, что хотите удалить партнера?')) {
                ImageSliderItem.delete({id: id}, function() {
                    loadData();
                });
            }
        };

        function loadData() {
            $scope.imageSliderItems = ImageSliderItem.query({}, function() {
            });
        }
    }]);