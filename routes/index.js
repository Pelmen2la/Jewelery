'use strict';

module.exports = function (app) {
    require("./web")(app);
    require("./admin")(app);
};