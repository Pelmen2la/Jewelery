angular.module('jeweleryAdminApp.controllers')
    .controller('PartnerEditController', ['$scope', '$stateParams', 'Partner', function($scope, $stateParams, Partner) {
        $scope.partner = Partner.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('PartnerCreateController', ['$scope', 'Partner', function($scope, Partner) {
        $scope.partner = new Partner();
    }])
    .controller('PartnerFormController', ['$scope', '$state', 'FileUploader', function($scope, $state, FileUploader) {
        var uploaderName = 'partnerImageUploader',
            uploader = $scope[uploaderName] = new FileUploader({
                url: 'admin/upload/partner/image/'
            });
        uploader.onAfterAddingFile = function(fileItem) {
            uploader.uploadAll();
        };
        uploader.onCompleteItem = function(fileItem, response) {
            response.success && ($scope.partner['imageUrl'] = response.imageUrl);
            $('#' + uploaderName).val(null);
        };

        $scope.submitPartner = function() {
            if($scope.partner._id) {
                $scope.partner.$update({id: $scope.partner._id}, function() {
                    $state.go('partners');
                });
            } else {
                $scope.partner.$save(function(result) {
                    $state.go('partners');
                });
            }
        };
        $scope.back = function() {
            $state.go('partners');
        };
    }]);

