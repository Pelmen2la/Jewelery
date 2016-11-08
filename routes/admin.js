'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    authMw = require('../middlewares/auth'),
    multer = require('multer'),
    Product = mongoose.model('product'),
    multerInstance = multer({ dest: 'upload/' }),
    fs = require('fs');


module.exports = function(app) {
    require("./data-helpers/products")(app);
    require("./data-helpers/pages")(app);
    require("./data-helpers/producttypes")(app);
    require("./data-helpers/partners")(app);
    require("./data-helpers/imageslideritems")(app);

    app.all('/admin', authMw);
    app.all('/admin/*', authMw);

    app.post('/login', passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        if (req.body.remember == 'on') {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.redirect('/admin' + req.body.hash);
    });

    app.get('/login', function(req, res) {
        res.render('admin_login.pug', {
            error: req.flash('error')
        });
    });

    app.get('/admin', function(req, res) {
        res.render('admin_index.pug', {
            user: req.user.username
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.post('/admin/upload/product/image/:size', multerInstance.single('file'), function(req, res) {
        tryUploadFile('public/resources/images/products/' + req.params.size +'/', req, res);
    });

    app.post('/admin/upload/partner/image/', multerInstance.single('file'), function(req, res) {
        tryUploadFile('public/resources/images/partners/', req, res);
    });

    app.post('/admin/upload/imageslideritem/image/', multerInstance.single('file'), function(req, res) {
        tryUploadFile('public/resources/images/imageslider/', req, res);
    });

    function tryUploadFile(targetPath, req, res) {
        function getImageName() {
            var name = req.file.originalname,
                dotPos = name.lastIndexOf('.');
            return [name.slice(0, dotPos), suffix, name.slice(dotPos)].join('');
        }

        function getTargetPath() {
            return targetPath + getImageName();
        }

        var tmp_path = req.file.path,
            imageName = getImageName(req.file.originalname),
            suffix = '';

        if(!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
        }
        while(fs.existsSync(getTargetPath())) {
            suffix = parseInt(suffix + 1);
        }

        var src = fs.createReadStream(tmp_path),
            dest = fs.createWriteStream(getTargetPath());
        src.pipe(dest);
        src.on('end', function() {
            res.json({
                success: true,
                imageUrl: getTargetPath().substring(getTargetPath().indexOf('/'))
            });
        });
        src.on('error', function(err) {
            res.json({
                success: true,
                imageUrl: ''
            });
        });
    }
};