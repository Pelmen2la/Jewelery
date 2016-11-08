angular.module('jeweleryAdminApp.services', []);

angular.module('jeweleryAdminApp.services')
    .factory('Page', function($resource) {
        return $resource('/admin/pages/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Product', function($resource) {
        return $resource('/admin/products/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    }).factory('ProductType', function($resource) {
        return $resource('/admin/producttypes/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    }).factory('Partner', function($resource) {
        return $resource('/admin/partners/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    }).factory('ImageSliderItem', function($resource) {
        return $resource('/admin/imageslideritems/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    });