# screepsmod-features

Provides feature-management functionality to server and exposes info to clients+sandbox

[![NPM info](https://nodei.co/npm/screepsmod-features.png?downloads=true)](https://npmjs.org/package/screepsmod-features)

# Installation 

1. `npm install screepsmod-features` in your server folder.
2. Enjoy!

# Usage
##### Other mods:
    config.engine.on('init', function (processType) {
        if (config.features && processType === "main") {
            config.features.defineFeature(<feature name>, <feature source, e.g. mod name>, <feature version>); // features are enabled by default when defined
        }
    });
    ...
    config.features.getFeatureEnabled("my-feature").then((enabled) => {
        if (enabled) {
            // run code
        }
    });

##### User code:
    if (Game.features['my-feature'].enabled) {
        // run code
    }

##### External tools/clients:
    connection.get("api/features/list").then((features) => {
        if (features['my-features'].enabled) {
            // run code
        }
    })

##### Server CLI:
    setFeatureEnabled('my-feature', <boolean>);