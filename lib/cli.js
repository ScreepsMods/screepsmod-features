module.exports = function (config, featureMod) {
    config.cli.on("cliSandbox", function (sandbox) {
        sandbox.defineFeature = featureMod.defineFeature;
        sandbox.setFeatureEnabled = featureMod.setFeatureEnabled;
        sandbox.getFeatureEnabled = featureMod.getFeatureEnabled;
        sandbox.getFeature = featureMod.getFeature;
    });
};