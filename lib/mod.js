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
        defineFeature(name, source, version, enabled = true, force = false) {
            return storage.db.features.findOne({ name }).then((result) => {
                if (!result) {
                    var entry = { source, version, enabled };
                    console.log("Creating feature", name, JSON.stringify(entry));

                    return storage.db.features.insert({ name, source, version, enabled });
                } else {
                    var update = force;
                    if (result.source !== source) {
                        if (!force) throw `Conflicting definitions for feature ${name}: tried to save ${source}@${version}, found ${result.source}@${version}`;
                        else update = true;
                    }

                    if (result.version !== version) update = true;

                    if (update) {
                        var entry = { source, version, enabled };
                        console.log("Updating feature", name, JSON.stringify(entry));
                        storage.db.features.update(result._id, { $set: entry });
                    }
                }
            });
        },
        setFeatureEnabled(name, enabled) {
            return storage.db.features.findOne({ name }).then((result) => {
                if (result && result.enabled !== enabled) {
                    return storage.db.features.update(result._id, { $set: { enabled } });
                }
            });
        },
        getFeatureEnabled(name) {
            return storage.db.features.findOne({ name }).then((result) => {
                return result && result.enabled;
            });
        },
        getFeature(name) {
            return storage.db.features.findOne({ name });
        }
    }
};