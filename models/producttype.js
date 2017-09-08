'use strict';

var mongoose = require('mongoose');

var ProductType = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model('producttype', ProductType);