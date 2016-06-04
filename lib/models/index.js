'use strict';

const Path = require('path');
const Fs = require('fs');

const models = module.exports = [];

Fs.readdirSync(__dirname).forEach((file) => {

    /* If it's the current file ignore it */
    if (file === 'index.js') {
        return;
    }

    /* Grab a model definition */
    const model = require(Path.join(__dirname, file));

    /* Push to module.exports.  Should export an array to work with dogwater. */
    models.push(model);
});
