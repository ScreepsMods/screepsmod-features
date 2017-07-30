const _ = require('lodash');

module.exports = function (config) {
    var driver = config.engine.driver;

    var oldgetRuntimeData = driver.getRuntimeData;
    driver.getRuntimeData = function(userId, onlyInRoom) {
        return oldgetRuntimeData(userId, onlyInRoom).then((runtimeData) => {
            return config.common.storage.db.features.find().then((data) => {
                runtimeData.features = {};
                for (let feature of data) {
                    runtimeData.features[feature.name] = _.pick(feature, ["enabled", "version", "source"]);
                }

                return runtimeData;
            });
        });
    };

    var oldMakeGameObject = driver.config.makeGameObject;
    driver.config.makeGameObject = function(...args) {
        var game = oldMakeGameObject.apply(this, args);
        game.features = args[0].features; // runtimeData.features
        return game;
    };
};