'use strict';

var mongoose = require('mongoose'),
    ProductType = mongoose.model('producttype');

module.exports = function(app) {
    app.get('/admin/producttypes', function(req, res) {
        ProductType.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/admin/producttypes/:id', function(req, res, next) {
        ProductType.findById(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.post('/admin/producttypes', function(req, res, next) {
        var producttype = new ProductType(req.body);
        producttype.save(function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.put('/admin/producttypes/:id', function(req, res, next) {
        ProductType.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/admin/producttypes/:id', function(req, res, next) {
        ProductType.findByIdAndRemove(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });
}