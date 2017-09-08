'use strict';

var mongoose = require('mongoose');

var Page = new mongoose.Schema({
    url: String,
    title: String,
    description: String,
    keywords: String,
    menuName: String,
    menuType: String,
    name: String,
    content: String,
    productTypeToShowId: String,
    isMainPage: Boolean
});

mongoose.model('page', Page);