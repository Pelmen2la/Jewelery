'use strict';

var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    smallImageUrl: String,
    bigImageUrl: String,
    videoUrl: String,
    typeId: String
});

mongoose.model('product', Product);