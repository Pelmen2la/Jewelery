'use strict';

var mongoose = require('mongoose'),
    ImageSliderItem = mongoose.model('imageSliderItem');

module.exports = function(app) {
    app.get('/admin/imageSliderItems', function(req, res) {
        ImageSliderItem.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/admin/imageSliderItems/:id', function(req, res, next) {
        ImageSliderItem.findById(req.params.id, function(err, imageSliderItemData) {
            if(err) return next(err);
            res.json(imageSliderItemData);
        });
    });

    app.post('/admin/imageSliderItems', function(req, res, next) {
        var imageSliderItem = new ImageSliderItem(req.body);
        imageSliderItem.save(function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.put('/admin/imageSliderItems/:id', function(req, res, next) {
        ImageSliderItem.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/admin/imageSliderItems/:id', function(req, res, next) {
        ImageSliderItem.findByIdAndRemove(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });
}