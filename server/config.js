'use strict';

const Path = require('path');
const SailsDisk = require('sails-disk');

module.exports = {

    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    },

    main: {
        connection: process.env.NODE_ENV === 'dev' ? 'diskDb' : 'diskDb'
    },

    dogwater: {
        connections: {
            diskDb: {
                adapter: 'disk'
            }
        },
        adapters: {
            disk: SailsDisk
        }
    },

    poop: {
        logPath: Path.normalize(`${__dirname}/../poop.log`)
    }

};
