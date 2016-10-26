'use strict';

var mongoose = require('mongoose'),
    Page = mongoose.model('page');

module.exports = function(app) {
    app.get('/admin/pages', function(req, res) {
        Page.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/admin/pages/:id', function(req, res, next) {
        Page.findById(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.post('/admin/pages', function(req, res, next) {
        var page = new Page(req.body);
        page.save(function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.put('/admin/pages/:id', function(req, res, next) {
        Page.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/admin/pages/:id', function(req, res, next) {
        Page.findByIdAndRemove(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });
}