module.exports = function (config, featureMod) {
    config.cli.on("cliSandbox", function (sandbox) {
        sandbox.defineFeature = featureMod.defineFeature;
        sandbox.setFeatureState = featureMod.setFeatureState;
    });
};