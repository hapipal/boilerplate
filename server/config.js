'use strict';

const Path = require('path');

module.exports = {

    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    },

    schwifty: {
        knex: require('./knexfile')[process.env.NODE_ENV],
        migrationsDir: __dirname + '/../lib'
    },

    poop: {
        logPath: Path.normalize(`${__dirname}/../poop.log`)
    }
};
