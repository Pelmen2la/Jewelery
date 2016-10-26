angular.module('jeweleryAdminApp', ['ui.router', 'ngResource', 'jeweleryAdminApp.controllers', 'jeweleryAdminApp.services', 'angularFileUpload', 'ngSanitize', 'textAngular'])
angular.module('jeweleryAdminApp').config(function ($stateProvider) {
    $stateProvider.state('index', {
        url: '',
        templateUrl: '/partials/admin/pagelist.html',
        controller: 'AdminPageListController'
    }).state('pageForm', {
        url: '/pages/edit/:id/',
        templateUrl: '/partials/admin/pageform.html',
        controller: 'PageEditController'
    }).state('newPage', {
        url: '/pages/new',
        templateUrl: '/partials/admin/pageform.html',
        controller: 'PageCreateController'
    }).state('products', {
        url: '/products',
        templateUrl: '/partials/admin/productlist.html',
        controller: 'AdminProductListController'
    }).state('productForm', {
        url: '/products/edit/:id/',
        templateUrl: '/partials/admin/productform.html',
        controller: 'ProductEditController'
    }).state('newProduct', {
        url: '/products/new',
        templateUrl: '/partials/admin/productform.html',
        controller: 'ProductCreateController'
    }).state('producttypes', {
        url: '/producttypes',
        templateUrl: '/partials/admin/producttypelist.html',
        controller: 'AdminProductTypeListController'
    });
}).run(function ($state) {
    $state.go('index');
});