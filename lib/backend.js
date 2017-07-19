const _ = require('lodash');
const express = require('express');

function serveFeatures(storage) {
    var router = new express.Router();
    
    router.get('/list', (req, res) => {
        storage.db.features.find().then((data) => {
            var features = {};
            for (let feature of data) {
                features[feature.name] = _.pick(feature, ["enabled", "version", "label"]);
            }

            res.send({ ok: 1, features });
        });
    });

    return router;
}

module.exports = function (config, statsMod) {
    var storage = config.common.storage;

    config.backend.on('expressPreConfig', function (app) {
        app.use('/api/features', serveFeatures(storage));
    });
}