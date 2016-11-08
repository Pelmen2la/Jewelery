'use strict';

var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: String,
    smallImageUrl: String,
    bigImageUrl: String,
    videoUrl: String,
    typeId: String,
    showInSlider: Boolean,
    showOnMainPage: Boolean,
    description: String
});

mongoose.model('product', Product);