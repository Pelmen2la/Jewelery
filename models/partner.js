'use strict';

var mongoose = require('mongoose');

var PartnerScheme = new mongoose.Schema({
    name: String,
    imageUrl: String,
    url: String
});

mongoose.model('partner', PartnerScheme);