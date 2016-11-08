'use strict';

var mongoose = require('mongoose');

var ImageSliderItemScheme = new mongoose.Schema({
    text: String,
    imageUrl: String
});

mongoose.model('imageSliderItem', ImageSliderItemScheme);