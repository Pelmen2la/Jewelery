angular.module('jeweleryAdminApp.controllers')
    .controller('ImageSliderItemEditController', ['$scope', '$stateParams', 'ImageSliderItem', function($scope, $stateParams, ImageSliderItem) {
        $scope.imageSliderItem = ImageSliderItem.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('ImageSliderItemCreateController', ['$scope', 'ImageSliderItem', function($scope, ImageSliderItem) {
        $scope.imageSliderItem = new ImageSliderItem();
    }])
    .controller('ImageSliderItemFormController', ['$scope', '$state', 'FileUploader', function($scope, $state, FileUploader) {
        var uploaderName = 'imageSliderItemImageUploader',
            uploader = $scope[uploaderName] = new FileUploader({
                url: 'admin/upload/imageSliderItem/image/'
            });
        uploader.onAfterAddingFile = function(fileItem) {
            uploader.uploadAll();
        };
        uploader.onCompleteItem = function(fileItem, response) {
            response.success && ($scope.imageSliderItem['imageUrl'] = response.imageUrl);
            $('#' + uploaderName).val(null);
        };

        $scope.submitImageSliderItem = function() {
            if($scope.imageSliderItem._id) {
                $scope.imageSliderItem.$update({id: $scope.imageSliderItem._id}, function() {
                    $state.go('imageSliderItems');
                });
            } else {
                $scope.imageSliderItem.$save(function(result) {
                    $state.go('imageSliderItems');
                });
            }
        };
        $scope.back = function() {
            $state.go('imageSliderItems');
        };
    }]);

