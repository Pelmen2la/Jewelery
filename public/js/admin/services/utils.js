angular.module('jeweleryAdminApp.services').service('Utils', function($resource) {
    this.getProductImageUrl = function(product, size) {
        return getImageUrl(product[size + 'ImageName'], 'products/' + size);
    };

    function getImageUrl(imageName, folderName) {
        return imageName ? '/resources/images/' + folderName + '/' + imageName : '';
    };
});