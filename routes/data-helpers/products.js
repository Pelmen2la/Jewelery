'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('product');

module.exports = function(app) {
    app.get('/admin/products', function(req, res) {
        Product.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/admin/products/:id', function(req, res, next) {
        Product.findById(req.params.id, function(err, productData) {
            if(err) return next(err);
            res.json(productData);
        });
    });

    app.post('/admin/products', function(req, res, next) {
        var product = new Product(req.body);
        product.save(function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.put('/admin/products/:id', function(req, res, next) {
        Product.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/admin/products/:id', function(req, res, next) {
        Product.findByIdAndRemove(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });
}