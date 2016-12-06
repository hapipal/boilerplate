'use strict';

const Path = require('path');
const SailsDisk = require('sails-disk');

module.exports = {

    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    },

    schwifty: { knexFile: require('./knexfile'), dir: __dirname + '/../lib' },

    poop: {
        logPath: Path.normalize(`${__dirname}/../poop.log`)
    }
};
