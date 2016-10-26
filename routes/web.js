'use strict';

var mongoose = require('mongoose'),
    path = require('path'),
    Page = mongoose.model('page'),
    Product = mongoose.model('product');

module.exports = function(app) {
    app.get('/', function(req, res) {
        sendPageResponse(req, res);
    });

    app.get('/:url', function(req, res, next) {
        var url = req.params.url;
        if(url.indexOf('admin') === 0 || url == 'login') {
            next();
        } else {
            sendPageResponse(req, res, url);
        }
    });
};

function sendPageResponse(req, res, pageUrl) {
    Page.find({}, function(err, pagesData) {
        var pageData = pagesData.find(function(page) {
            return page.url === pageUrl;
        }) || {},
            menusData = buildMenuData(pagesData);
        if(pageData.productTypeToShowId && parseInt(pageData.productTypeToShowId) !== -1) {
            Product.find(pageData.productTypeToShowId === 'all' ? {} : { typeId: pageData.productTypeToShowId}, function(err, productsData) {
                sendPageResponseCore(req, res, pageData, menusData, productsData);
            });
        } else {
            sendPageResponseCore(req, res, pageData, menusData, []);
        }
    });
};
/*

function prepareProductsData(productsData) {
    productsData.forEach(function(product) {
        ['big', 'small'].forEach(function(sizeName) {
            product(sizeName + 'ImageUrl') = '/resources/images/products/' + sizeName + '/' + product[sizeName + 'imageName']
        });
        entry.
    });
},
*/

function sendPageResponseCore(req, res, pageData, menusData, productsData) {
        res.render('index.pug', {
            menusData: menusData,
            productsData: productsData,
            pageData: pageData
        });
};

function buildMenuData(pages) {
    var menusData = {
        topMenuData: [],
        authorWorksMenuData: [],
        usefullAdditionsMenuData: []
    };
    pages.forEach(function(rec) {
        if(rec.menuType) {
            menusData[rec.menuType + 'MenuData'].push({
                url: rec.url,
                name: rec.menuName || rec.name
            });
        }
    });
    return menusData;
};