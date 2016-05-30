'use strict';

const Path = require('path');

module.exports = {

    product: {
        name: 'boilerplate-api'
    },

    server: {
        boilerplateApi: {
            host: '0.0.0.0',
            port: process.env.PORT || 3000
        },
        instance: null
    },

    dogwater: {
        connections: {
            diskDb: {
                adapter: 'disk'
            }
        },
        adapters: {
            disk: require('sails-disk')
        },
        models: Path.normalize(__dirname + '/lib/models'),
        data: {
            dir: Path.normalize(__dirname + '/lib'),
            pattern: 'fixtures.js'
        }
    },

    poop: {
        logPath: Path.join(__dirname, 'poop.log')
    }

};
