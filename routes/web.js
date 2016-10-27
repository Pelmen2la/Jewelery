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
            menusData = buildMenuData(pagesData),
            productsData = [],
            sliderImageUrls = [];
        //: { typeId: pageData.productTypeToShowId}
        Product.find({}, function(err, data) {
            data.forEach(function(productData) {
                if(pageData.productTypeToShowId === productData.typeId) {
                    productsData.push(productData)
                }
                if(productData.showInSlider) {
                    sliderImageUrls.push(productData.bigImageUrl);
                }
            });
            sendPageResponseCore(req, res, pageData, menusData, productsData, sliderImageUrls);
        });
    });
};

function sendPageResponseCore(req, res, pageData, menusData, productsData, sliderImageUrls) {
    res.render('index.pug', {
        menusData: menusData,
        sliderImageUrls: sliderImageUrls,
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