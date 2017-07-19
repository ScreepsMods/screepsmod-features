const fs = require("fs");

module.exports = function (config) {
    var mod = require("./mod.js")(config);
    config[mod.name] = mod;

    function tryPatchComponent(componentName) {
        if (config[componentName] && fs.existsSync(`${__dirname}/${componentName}.js`)) {
            require(`./${componentName}`)(config, mod);
        }
    }

    tryPatchComponent("engine");
    tryPatchComponent("backend");
    tryPatchComponent("driver");
    tryPatchComponent("cli");
    tryPatchComponent("cronjobs");
};