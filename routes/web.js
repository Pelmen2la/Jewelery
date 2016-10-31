'use strict';

var mongoose = require('mongoose'),
    path = require('path'),
    Page = mongoose.model('page'),
    Product = mongoose.model('product'),
    Partner = mongoose.model('partner');

module.exports = function(app) {
    Page.find({isMainPage: true}, function(err, data) {
        if(!data || !data.length) {
            var mainPage = new Page({
                title: 'Главная страница',
                name: 'Главная страница',
                content: 'Текст главной страницы',
                isMainPage: true
            });
            mainPage.save();
        }
    });

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
            return pageUrl ? page.url === pageUrl : page.isMainPage;
        }) || {},
            menusData = buildMenuData(pagesData),
            productsData = [],
            sliderImageUrls = [];
        Product.find({}, function(err, data) {
            data.forEach(function(productData) {
                if(pageData.productTypeToShowId === productData.typeId || (pageData.isMainPage && productData.showOnMainPage)) {
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
    Partner.find({}, function(err, partnersData) {
        res.render('index.pug', {
            menusData: menusData,
            sliderImageUrls: sliderImageUrls,
            productsData: productsData,
            pageData: pageData,
            partnersData: partnersData
        });
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