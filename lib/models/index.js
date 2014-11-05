var Path    = require('path');
var Fs      = require('fs');


module.exports = [];

var modelObject;

Fs.readdirSync(__dirname).forEach(function (file) {
    
    /* If it's the current file ignore it */
    if (file === 'index.js') return;
    
    /* Grab a model definition */
    modelObject = require(Path.join(__dirname, file));
    
    /* Push to module.exports.  Should export an array to work with dogwater. */
    module.exports.push(modelObject);
    
});


