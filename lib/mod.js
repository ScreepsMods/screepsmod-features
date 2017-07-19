const _ = require('lodash');

module.exports = function (config) {
    function ensureCollection(collectionName) {
        if (!_.includes(config.common.dbCollections, collectionName)) {
            config.common.dbCollections.push(collectionName);
        }
    }
    ensureCollection("features");

    var storage = config.common.storage;
    
    return {
        name: "features",
        defineFeature(name, version, label, enabled = true, force = false) {
            return storage.db.features.findOne({ name }).then((result) => {
                if (!result) {
                    return storage.db.features.insert({ name, label, version, enabled });
                } else {
                    var update = force;
                    if (result.label !== label) {
                        if (!force) throw `Conflict definitions for feature ${name}: tried to save ${label}@${version}, found ${result.label}@${version}`;
                        else update = true;
                    }

                    if (result.version !== version) update = true;

                    if (update) {
                        var entry = { label, version, enabled };
                        console.log("Updating feature ", name, JSON.stringify(entry));
                        storage.db.features.update(result._id, { $set: entry });
                    }
                }
            });
        },
        setFeatureEnabled(feature, enabled) {
            return storage.db.features.findOne({ name }).then((result) => {
                if (result && result.enabled !== enabled) {
                    return storage.db.features.update(result._id, { $set: { enabled } });
                }
            });
        }
    }
};