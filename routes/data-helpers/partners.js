'use strict';

var mongoose = require('mongoose'),
    Partner = mongoose.model('partner');

module.exports = function(app) {
    app.get('/admin/partners', function(req, res) {
        Partner.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/admin/partners/:id', function(req, res, next) {
        Partner.findById(req.params.id, function(err, partnerData) {
            if(err) return next(err);
            res.json(partnerData);
        });
    });

    app.post('/admin/partners', function(req, res, next) {
        var partner = new Partner(req.body);
        partner.save(function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.put('/admin/partners/:id', function(req, res, next) {
        Partner.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/admin/partners/:id', function(req, res, next) {
        Partner.findByIdAndRemove(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });
}